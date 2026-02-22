import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dbConnect from '@/lib/mongodb'

// This would typically verify JWT token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  // In production, verify the JWT token here
  return { authenticated: true }
}

export async function DELETE(request, { params }) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    
    const client = await dbConnect()
    const db = client.db()
    
    // Find the document first
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

    // Delete from MongoDB
    await db.collection('documents').deleteOne({ _id: id })

    return NextResponse.json({
      message: 'Document deleted successfully',
    })
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
  } catch (error) {
    console.error('Error fetching document:', error)
    return NextResponse.json(
      { message: 'Failed to fetch document', error: error.message },
      { status: 500 }
    )
  }
}
