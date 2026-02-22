import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')

export async function GET() {
  try {
    const metadataFile = path.join(dataDir, 'documents.json')
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json({ documents: [] })
    }

    const data = await readFile(metadataFile, 'utf-8')
    const documents = JSON.parse(data)

    // Sort by creation date (newest first)
    documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return NextResponse.json({ documents })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { message: 'Failed to fetch documents', error: error.message },
      { status: 500 }
    )
  }
}
