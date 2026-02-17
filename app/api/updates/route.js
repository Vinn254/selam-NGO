import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

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

    const client = await dbConnect()
    const db = client.db()
    const result = await db.collection('updates').insertOne(newUpdate)

    const saved = await db.collection('updates').findOne({ _id: result.insertedId })

    return NextResponse.json({ message: 'Update created successfully', update: saved }, { status: 201 })
  } catch (error) {
    console.error('Error creating update:', error)
    return NextResponse.json({ message: 'Failed to create update', error: error.message }, { status: 500 })
  }
}
