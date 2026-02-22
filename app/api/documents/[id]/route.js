import { NextResponse } from 'next/server'
import { readFile, writeFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')

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
    const metadataFile = path.join(dataDir, 'documents.json')

    if (!existsSync(metadataFile)) {
      return NextResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }

    const data = await readFile(metadataFile, 'utf-8')
    let documents = JSON.parse(data)

    // Find the document
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

    // Remove from documents array
    documents.splice(documentIndex, 1)

    // Save updated documents
    await writeFile(metadataFile, JSON.stringify(documents, null, 2))

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
    const metadataFile = path.join(dataDir, 'documents.json')

    if (!existsSync(metadataFile)) {
      return NextResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }

    const data = await readFile(metadataFile, 'utf-8')
    const documents = JSON.parse(data)

    const document = documents.find(doc => doc._id === id)
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
