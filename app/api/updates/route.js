import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import localUpdates from '@/data/updates.json'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

// Function to update local JSON file as backup
async function updateLocalJsonFile(newUpdate) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'updates.json')
    const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    
    // Add new update to the beginning of the array
    const updatesArray = currentData.updates || currentData || []
    updatesArray.unshift({
      _id: newUpdate._id?.toString() || Date.now().toString(),
      title: newUpdate.title,
      description: newUpdate.description,
      mediaType: newUpdate.mediaType || 'image',
      mediaUrl: newUpdate.mediaUrl || '',
      createdAt: newUpdate.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: newUpdate.updatedAt?.toISOString() || new Date().toISOString(),
    })
    
    // Keep only the latest 20 updates in local file
    const trimmedUpdates = updatesArray.slice(0, 20)
    
    fs.writeFileSync(filePath, JSON.stringify({ updates: trimmedUpdates }, null, 2))
    console.log('Local JSON file updated successfully')
    return true
  } catch (error) {
    console.error('Failed to update local JSON file:', error.message)
    return false
  }
}

// GET - Fetch all updates
export async function GET(request) {
  try {
    const client = await dbConnect()
    const db = client.db()
    const updates = await db
      .collection('updates')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Convert ObjectId to string for proper serialization
    const serializedUpdates = updates.map(update => ({
      ...update,
      _id: update._id?.toString()
    }))

    return NextResponse.json({ updates: serializedUpdates })
  } catch (error) {
    console.error('Error fetching updates from MongoDB:', error.message)
    
    // Fallback to local JSON file if MongoDB is not available
    console.log('Falling back to local updates.json file')
    const fallbackUpdates = localUpdates.updates || localUpdates || []
    return NextResponse.json({ updates: fallbackUpdates, source: 'local' })
  }
}

// Verify auth token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  try {
    const token = authHeader.substring(7)
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check if token is expired
    if (decoded.exp && Date.now() > decoded.exp) {
      return null
    }
    
    return decoded
  } catch (error) {
    return null
  }
}

// POST - Create a new update (admin only)
export async function POST(request) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (!auth) {
      console.error('Auth verification failed')
      return NextResponse.json({ message: 'Unauthorized. Please login first.' }, { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
    }

    if (!body.title || !body.description) {
      return NextResponse.json({ message: 'Title and description are required' }, { status: 400 })
    }

    const validMediaTypes = ['image', 'video']
    if (body.mediaType && !validMediaTypes.includes(body.mediaType)) {
      return NextResponse.json({ message: 'Invalid media type. Must be "image" or "video"' }, { status: 400 })
    }

    const newUpdate = {
      title: body.title,
      description: body.description,
      mediaType: body.mediaType || 'image',
      mediaUrl: body.mediaUrl || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    let client
    try {
      client = await dbConnect()
    } catch (dbError) {
      console.error('Database connection failed:', dbError.message)
      // Fallback: Save directly to local JSON file when MongoDB is not available
      console.log('MongoDB unavailable - saving to local JSON file only')
      const localSaveResult = await updateLocalJsonFile(newUpdate)
      if (localSaveResult) {
        return NextResponse.json({ 
          message: 'Update saved to local storage (MongoDB unavailable)', 
          update: newUpdate,
          source: 'local'
        }, { status: 201 })
      }
      return NextResponse.json({ 
        message: 'Database connection failed. Please ensure MONGODB_URI is configured in Vercel environment variables.', 
        error: dbError.message 
      }, { status: 500 })
    }

    const db = client.db()
    const result = await db.collection('updates').insertOne(newUpdate)

    const saved = await db.collection('updates').findOne({ _id: result.insertedId })

    // Also save to local JSON file as backup
    await updateLocalJsonFile(saved)

    return NextResponse.json({ message: 'Update created successfully', update: saved }, { status: 201 })
  } catch (error) {
    console.error('Error creating update:', error)
    return NextResponse.json({ message: 'Failed to create update', error: error.message }, { status: 500 })
  }
}
