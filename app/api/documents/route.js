import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')

export async function GET() {
  try {
    // Try MongoDB first
    const client = await dbConnect()
    const db = client.db()
    
    const documents = await db
      .collection('documents')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Convert ObjectId to string for proper serialization
    const serializedDocuments = documents.map(doc => ({
      ...doc,
      _id: doc._id?.toString()
    }))

    // If MongoDB has no data, also include local documents as fallback
    if (serializedDocuments.length === 0) {
      const localDocuments = getLocalDocuments()
      return NextResponse.json({ documents: localDocuments, source: 'local' })
    }

    return NextResponse.json({ documents: serializedDocuments })
  } catch (error) {
    console.error('Error fetching documents from MongoDB:', error.message)
    
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
