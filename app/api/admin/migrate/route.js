import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')
const metadataFile = path.join(dataDir, 'applications.json')

export async function POST(request) {
  try {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get local applications
    let localApps = []
    if (existsSync(metadataFile)) {
      const fs = require('fs')
      const data = fs.readFileSync(metadataFile, 'utf-8')
      localApps = JSON.parse(data) || []
    }

    if (localApps.length === 0) {
      return NextResponse.json({ message: 'No local applications to migrate', count: 0 })
    }

    // Connect to MongoDB
    const client = await dbConnect()
    const db = client.db()

    // Get existing MongoDB apps to avoid duplicates
    const mongoApps = await db.collection('applications').find({}).toArray()
    const mongoIds = new Set(mongoApps.map(app => app._id.toString()))

    // Filter out apps that already exist in MongoDB
    const appsToMigrate = localApps.filter(app => !mongoIds.has(app._id))

    if (appsToMigrate.length === 0) {
      return NextResponse.json({ 
        message: 'All applications already in MongoDB', 
        count: 0 
      })
    }

    // Insert into MongoDB - KEEP original string IDs
    const appsToInsert = appsToMigrate.map(app => ({
      ...app,
      _id: app._id // Use original string ID, not MongoDB ObjectId
    }))
    
    const result = await db.collection('applications').insertMany(appsToInsert)

    return NextResponse.json({ 
      message: `Successfully migrated ${result.insertedCount} applications to MongoDB`,
      migrated: result.insertedCount,
      skipped: localApps.length - result.insertedCount
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      message: 'Migration failed', 
      error: error.message 
    }, { status: 500 })
  }
}
