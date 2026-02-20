import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export const dynamic = 'force-dynamic'

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

// GET - Fetch a single update by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    const client = await dbConnect()
    const db = client.db()

    const update = await db.collection('updates').findOne({ _id: new ObjectId(id) })

    if (!update) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    return NextResponse.json({ update })
  } catch (error) {
    console.error('Error fetching update:', error)
    return NextResponse.json({ message: 'Failed to fetch update', error: error.message }, { status: 500 })
  }
}

// PUT - Update an existing update
export async function PUT(request, { params }) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized. Please login first.' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const client = await dbConnect()
    const db = client.db()

    const update = await db.collection('updates').findOne({ _id: new ObjectId(id) })
    if (!update) return NextResponse.json({ message: 'Update not found' }, { status: 404 })

    const updated = {
      ...update,
      title: body.title || update.title,
      description: body.description || update.description,
      mediaType: body.mediaType || update.mediaType,
      mediaUrl: body.mediaUrl !== undefined ? body.mediaUrl : update.mediaUrl,
      updatedAt: new Date(),
    }

    await db.collection('updates').updateOne({ _id: new ObjectId(id) }, { $set: updated })

    const saved = await db.collection('updates').findOne({ _id: new ObjectId(id) })
    return NextResponse.json({ message: 'Update updated successfully', update: saved })
  } catch (error) {
    console.error('Error updating update:', error)
    return NextResponse.json({ message: 'Failed to update', error: error.message }, { status: 500 })
  }
}

// DELETE - Delete an update
export async function DELETE(request, { params }) {
  const { id } = await params
  console.log('Delete ID:', id)
  
  // Verify authentication
  const auth = verifyAuth(request)
  if (!auth) {
    return NextResponse.json({ message: 'Unauthorized. Please login first.' }, { status: 401 })
  }
  
  if (!id) {
    return NextResponse.json({ message: 'No ID provided' }, { status: 400 })
  }
  
  let client
  try {
    client = await dbConnect()
  } catch (dbError) {
    console.error('Database connection failed:', dbError.message)
    return NextResponse.json({ 
      message: 'Database connection failed. Please ensure MONGO_URI is configured in Vercel.', 
      error: dbError.message 
    }, { status: 500 })
  }
  
  const db = client.db()

  // Try to delete by ID - handle both string and ObjectId formats
  let result
  try {
    result = await db.collection('updates').deleteOne({ _id: new ObjectId(id) })
  } catch (idError) {
    // If ObjectId conversion fails, try as string
    result = await db.collection('updates').deleteOne({ _id: id })
  }
  
  if (result.deletedCount === 0) {
    return NextResponse.json({ message: 'Update not found. ID: ' + id }, { status: 404 })
  }

  return NextResponse.json({ message: 'Update deleted successfully' })
}
