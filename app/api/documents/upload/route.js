import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
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

// Save document to local file
async function saveLocalDocument(documentData) {
  try {
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    let documents = getLocalDocuments()
    documents.push(documentData)
    const fs = require('fs')
    fs.writeFileSync(metadataFile, JSON.stringify(documents, null, 2))
    return true
  } catch (error) {
    console.error('Failed to save to local file:', error)
    return false
  }
}

export async function POST(request) {
  try {
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('document')
    const title = formData.get('title')
    const description = formData.get('description')
    const category = formData.get('category')

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      )
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' },
        { status: 400 }
      )
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'documents')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const fileExtension = path.extname(file.name)
    const uniqueFilename = `${uuidv4()}${fileExtension}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const documentData = {
      _id: uuidv4(),
      title,
      description: description || '',
      category: category || 'other',
      fileName: file.name,
      fileUrl: `/uploads/documents/${uniqueFilename}`,
      fileSize: file.size,
      fileType: file.type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Try to save to MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const result = await db.collection('documents').insertOne({
        ...documentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      
      const savedDocument = {
        ...documentData,
        _id: result.insertedId?.toString() || documentData._id
      }

      return NextResponse.json(
        {
          message: 'Document uploaded successfully',
          document: savedDocument,
        },
        { status: 201 }
      )
    } catch (dbError) {
      console.error('MongoDB error, saving to local file:', dbError.message)
      
      // Fallback: Save to local JSON file
      const saved = await saveLocalDocument(documentData)
      if (saved) {
        return NextResponse.json(
          {
            message: 'Document uploaded successfully (saved locally)',
            document: documentData,
            source: 'local'
          },
          { status: 201 }
        )
      }
      
      return NextResponse.json(
        { message: 'Failed to save document', error: dbError.message },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Failed to upload document', error: error.message },
      { status: 500 }
    )
  }
}
