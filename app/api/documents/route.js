import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
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

    return NextResponse.json({ documents: serializedDocuments })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { message: 'Failed to fetch documents', error: error.message },
      { status: 500 }
    )
  }
}
