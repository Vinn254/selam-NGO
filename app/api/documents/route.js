import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')

export async function GET() {
  try {
    // Try MongoDB first
    let mongoDocs = []
    try {
      const client = await dbConnect()
      const db = client.db()
      
      mongoDocs = await db
        .collection('documents')
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      // Convert ObjectId to string for proper serialization
      mongoDocs = mongoDocs.map(doc => ({
        ...doc,
        _id: doc._id?.toString()
      }))
    } catch (dbError) {
      console.log('MongoDB not available for documents, using local data')
    }
    
    // Always get local documents as well
    const localDocuments = getLocalDocuments()
    
    // Merge MongoDB and local data, avoiding duplicates (prefer MongoDB)
    const mongoIds = new Set(mongoDocs.map(doc => doc._id))
    const localOnlyDocs = localDocuments.filter(doc => !mongoIds.has(doc._id))
    
    // Combine and sort by date
    const allDocuments = [...mongoDocs, ...localOnlyDocs].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )

    return NextResponse.json({ documents: allDocuments })
  } catch (error) {
    console.error('Error fetching documents:', error.message)
    
    // Fallback to local JSON file if MongoDB is not available
    const localDocuments = getLocalDocuments()
    return NextResponse.json({ documents: localDocuments, source: 'local' })
  }
}

function getLocalDocuments() {
  try {
    const metadataFile = path.join(dataDir, 'documents.json')
    if (!existsSync(metadataFile)) {
      return []
    }
    const data = JSON.parse(require('fs').readFileSync(metadataFile, 'utf-8'))
    return data || []
  } catch (error) {
    return []
  }
}
