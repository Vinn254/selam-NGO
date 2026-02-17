import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// This would typically verify JWT token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  // In production, verify the JWT token here
  // For now, we'll just check if token exists
  return { authenticated: true }
}

export async function POST(request) {
  try {
    // Verify authentication
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

    // Validate file type
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

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'documents')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name)
    const uniqueFilename = `${uuidv4()}${fileExtension}`
    const filePath = path.join(uploadsDir, uniqueFilename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Create document metadata
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

    // In a real application, save this to a database
    // For now, we'll save it to a JSON file
    const metadataDir = path.join(process.cwd(), 'data')
    if (!existsSync(metadataDir)) {
      await mkdir(metadataDir, { recursive: true })
    }

    const metadataFile = path.join(metadataDir, 'documents.json')
    let documents = []
    
    if (existsSync(metadataFile)) {
      const { readFile } = await import('fs/promises')
      const data = await readFile(metadataFile, 'utf-8')
      documents = JSON.parse(data)
    }

    documents.push(documentData)
    await writeFile(metadataFile, JSON.stringify(documents, null, 2))

    return NextResponse.json(
      {
        message: 'Document uploaded successfully',
        document: documentData,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Failed to upload document', error: error.message },
      { status: 500 }
    )
  }
}
