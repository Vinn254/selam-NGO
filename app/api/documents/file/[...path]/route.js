import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET(request, { params }) {
  try {
    const { path: filePath } = params
    
    // Prevent directory traversal attacks
    const safePath = filePath.join('/').replace(/\.\./g, '')
    
    // Try different locations
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'uploads', 'documents', safePath),
      path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'uploads', 'documents', safePath),
      path.join('/tmp', 'uploads', 'documents', safePath),
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
        { error: 'File not found', path: safePath },
        { status: 404 }
      )
    }
    
    // Determine content type
    const ext = path.extname(safePath).toLowerCase()
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
        'Content-Disposition': `inline; filename="${safePath}"`,
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
