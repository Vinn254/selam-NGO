import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import localUpdates from '@/data/updates.json'

export const dynamic = 'force-dynamic'

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

    return NextResponse.json({ updates })
  } catch (error) {
    console.error('Error fetching updates, using local data fallback:', error.message)
    // Fallback to local JSON data when MongoDB is unavailable
    return NextResponse.json({ updates: localUpdates.updates, source: 'local' })
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
      return NextResponse.json({ 
        message: 'Database connection failed. Please ensure MONGODB_URI is configured in Vercel environment variables.', 
        error: dbError.message 
      }, { status: 500 })
    }

    const db = client.db()
    const result = await db.collection('updates').insertOne(newUpdate)

    const saved = await db.collection('updates').findOne({ _id: result.insertedId })

    return NextResponse.json({ message: 'Update created successfully', update: saved }, { status: 201 })
  } catch (error) {
    console.error('Error creating update:', error)
    return NextResponse.json({ message: 'Failed to create update', error: error.message }, { status: 500 })
  }
}
