import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dbConnect from '@/lib/mongodb'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')
const metadataFile = path.join(dataDir, 'documents.json')

// This would typically verify JWT token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return { authenticated: true }
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
    
    // Try MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const document = await db.collection('documents').findOne({ _id: id })
      
      if (!document) {
        return NextResponse.json(
          { message: 'Document not found' },
          { status: 404 }
        )
      }

      // Delete the physical file
      const filePath = path.join(process.cwd(), 'public', document.fileUrl)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }

      await db.collection('documents').deleteOne({ _id: id })

      return NextResponse.json({
        message: 'Document deleted successfully',
      })
    } catch (dbError) {
      console.error('MongoDB error, trying local file:', dbError.message)
      
      // Fallback: Delete from local file
      const documents = getLocalDocuments()
      const documentIndex = documents.findIndex(doc => doc._id === id)
      
      if (documentIndex === -1) {
        return NextResponse.json(
          { message: 'Document not found' },
          { status: 404 }
        )
      }

      const document = documents[documentIndex]

      // Delete the physical file
      const filePath = path.join(process.cwd(), 'public', document.fileUrl)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }

      documents.splice(documentIndex, 1)
      saveLocalDocuments(documents)

      return NextResponse.json({
        message: 'Document deleted successfully',
      })
    }
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
    
    // Try MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const document = await db.collection('documents').findOne({ _id: id })
      
      if (!document) {
        return NextResponse.json(
          { message: 'Document not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ 
        document: {
          ...document,
          _id: document._id?.toString()
        }
      })
    } catch (dbError) {
      // Fallback: Get from local file
      const documents = getLocalDocuments()
      const document = documents.find(doc => doc._id === id)
      
      if (!document) {
        return NextResponse.json(
          { message: 'Document not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ document })
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    return NextResponse.json(
      { message: 'Failed to fetch document', error: error.message },
      { status: 500 }
    )
  }
}
