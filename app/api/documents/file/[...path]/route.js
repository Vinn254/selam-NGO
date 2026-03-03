import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import dbConnect from '@/lib/mongodb'

export async function GET(request, { params }) {
  try {
    // Get the fileId from the URL directly
    const url = new URL(request.url)
    const pathname = url.pathname
    // Extract filename from path like /api/documents/file/filename.docx
    const pathParts = pathname.split('/api/documents/file/')
    const fileName = pathParts[1]
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'No filename provided', pathname },
        { status: 400 }
      )
    }
    
    // First, try to find the file in MongoDB by matching the fileUrl
    try {
      const client = await dbConnect()
      const db = client.db()
      
      // Find document by fileUrl containing the filename
      const doc = await db.collection('documents').findOne({
        fileUrl: { $regex: fileName }
      })
      
      if (doc && doc.fileContent) {
        // Decode base64 content
        const buffer = Buffer.from(doc.fileContent, 'base64')
        
        // Determine content type
        const ext = path.extname(doc.fileName || fileName).toLowerCase()
        const contentTypes = {
          '.pdf': 'application/pdf',
          '.doc': 'application/msword',
          '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
        }
        
        const contentType = contentTypes[ext] || 'application/octet-stream'
        
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `inline; filename="${doc.fileName || fileName}"`,
          },
        })
      }
    } catch (dbError) {
      console.log('MongoDB lookup failed:', dbError.message)
    }
    
    // Try different file locations as fallback
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'uploads', 'documents', fileName),
      path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'uploads', 'documents', fileName),
    ]
    
    let fileBuffer = null
    let foundPath = null
    
    for (const p of possiblePaths) {
      if (existsSync(p)) {
        fileBuffer = await readFile(p)
        foundPath = p
        break
      }
    }
    
    if (!fileBuffer) {
      return NextResponse.json(
        { error: 'File not found', path: fileName, searched: possiblePaths },
        { status: 404 }
      )
    }
    
    // Determine content type
    const ext = path.extname(fileName).toLowerCase()
    const contentTypes = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
    }
    
    const contentType = contentTypes[ext] || 'application/octet-stream'
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json(
      { error: 'Failed to serve file', details: error.message },
      { status: 500 }
    )
  }
}
