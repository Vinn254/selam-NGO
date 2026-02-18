import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export const dynamic = 'force-dynamic'

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
  try {
    const { id } = params
    const client = await dbConnect()
    const db = client.db()

    const result = await db.collection('updates').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Update deleted successfully' })
  } catch (error) {
    console.error('Error deleting update:', error)
    return NextResponse.json({ message: 'Failed to delete', error: error.message }, { status: 500 })
  }
}
