import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dbConnect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// Determine the data directory based on environment
const isVercel = process.env.VERCEL === '1'
const dataDir = path.join(isVercel ? '/tmp' : process.cwd(), 'data')
const metadataFile = path.join(dataDir, 'documents.json')

// This would typically verify JWT token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return { authenticated: true }
}

// Check if string is a valid MongoDB ObjectId (24 hex characters)
function isValidObjectId(id) {
  // Strict check: must be exactly 24 hex characters
  return /^[a-fA-F0-9]{24}$/.test(id)
}

// Get documents from local file
function getLocalDocuments() {
  try {
    if (!existsSync(metadataFile)) {
      return []
    }
    const fs = require('fs')
    const data = fs.readFileSync(metadataFile, 'utf-8')
    return JSON.parse(data) || []
  } catch (error) {
    return []
  }
}

// Save documents to local file
function saveLocalDocuments(documents) {
  try {
    const fs = require('fs')
    fs.writeFileSync(metadataFile, JSON.stringify(documents, null, 2))
    return true
  } catch (error) {
    return false
  }
}

// Find document by ID (handles both ObjectId and string ID)
function findDocumentById(documents, id) {
  return documents.find(doc => doc._id === id)
}

export async function DELETE(request, { params }) {
  try {
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    let deletedFromMongo = false
    let deletedFromLocal = false
    let documentToDelete = null
    
    // Try MongoDB with string ID directly
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const document = await db.collection('documents').findOne({ _id: id })
      
      if (document) {
        documentToDelete = document
        // Delete the physical file
        const filePath = path.join(process.cwd(), 'public', document.fileUrl)
        if (existsSync(filePath)) {
          await unlink(filePath)
        }

        await db.collection('documents').deleteOne({ _id: id })
        deletedFromMongo = true
      }
    } catch (dbError) {
      console.error('MongoDB delete error:', dbError.message)
    }
    
    // Also try local file if not deleted from MongoDB
    if (!deletedFromMongo) {
      const documents = getLocalDocuments()
      const documentIndex = documents.findIndex(doc => doc._id === id)
      
      if (documentIndex !== -1) {
        documentToDelete = documents[documentIndex]
        
        // Delete the physical file
        const filePath = path.join(process.cwd(), 'public', documentToDelete.fileUrl)
        if (existsSync(filePath)) {
          await unlink(filePath)
        }

        documents.splice(documentIndex, 1)
        saveLocalDocuments(documents)
        deletedFromLocal = true
      }
    }
    
    // If we deleted from either source, return success
    if (deletedFromMongo || deletedFromLocal) {
      return NextResponse.json({
        message: 'Document deleted successfully',
      })
    }
    
    // Not found anywhere
    return NextResponse.json(
      { message: 'Document not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { message: 'Failed to delete document', error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params
    let document = null
    
    // Try MongoDB with string ID directly
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const mongoDoc = await db.collection('documents').findOne({ _id: id })
      
      if (mongoDoc) {
        document = {
          ...mongoDoc,
          _id: mongoDoc._id?.toString()
        }
      }
    } catch (dbError) {
      console.error('MongoDB error:', dbError.message)
    }
    
    // Also try local file if not found in MongoDB
    if (!document) {
      const documents = getLocalDocuments()
      document = findDocumentById(documents, id)
    }
    
    if (!document) {
      return NextResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ document })
  } catch (error) {
    console.error('Error fetching document:', error)
    return NextResponse.json(
      { message: 'Failed to fetch document', error: error.message },
      { status: 500 }
    )
  }
}
