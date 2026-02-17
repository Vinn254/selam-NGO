import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

// GET - Fetch all updates
export async function GET(request) {
  try {
    const metadataFile = path.join(dataDir, 'updates.json')
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json({ updates: [] })
    }

    const data = await readFile(metadataFile, 'utf-8')
    let updates = JSON.parse(data).updates || []

    // Sort by date (newest first)
    updates.sort((a, b) => new Date(b.date) - new Date(a.date))

    return NextResponse.json({ updates })
  } catch (error) {
    console.error('Error fetching updates:', error)
    return NextResponse.json(
      { message: 'Failed to fetch updates', error: error.message },
      { status: 500 }
    )
  }
}

// POST - Create a new update (admin only)
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Validate media type
    const validMediaTypes = ['image', 'video']
    if (body.mediaType && !validMediaTypes.includes(body.mediaType)) {
      return NextResponse.json(
        { message: 'Invalid media type. Must be "image" or "video"' },
        { status: 400 }
      )
    }

    // Create new update
    const newUpdate = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      title: body.title,
      description: body.description,
      mediaType: body.mediaType || 'image',
      mediaUrl: body.mediaUrl || '',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    // Read existing updates
    const metadataFile = path.join(dataDir, 'updates.json')
    let updatesData = { updates: [] }
    
    if (existsSync(metadataFile)) {
      const data = await readFile(metadataFile, 'utf-8')
      updatesData = JSON.parse(data)
    }

    // Add new update
    updatesData.updates.push(newUpdate)

    // Save to file
    await writeFile(metadataFile, JSON.stringify(updatesData, null, 2))

    return NextResponse.json({ 
      message: 'Update created successfully', 
      update: newUpdate 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating update:', error)
    return NextResponse.json(
      { message: 'Failed to create update', error: error.message },
      { status: 500 }
    )
  }
}
