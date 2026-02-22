import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// This would typically verify JWT token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  // In production, verify the JWT token here
  return { authenticated: true }
}

// GET - Fetch a single application
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const client = await dbConnect()
    const db = client.db()
    
    const application = await db.collection('applications').findOne({ _id: new ObjectId(id) })
    
    if (!application) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      application: {
        ...application,
        _id: application._id?.toString()
      }
    })
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { message: 'Failed to fetch application', error: error.message },
      { status: 500 }
    )
  }
}

// PUT - Update application status (for admin)
export async function PUT(request, { params }) {
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
    const body = await request.json()
    
    const client = await dbConnect()
    const db = client.db()
    
    // Update application in MongoDB
    const result = await db.collection('applications').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...body,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Application updated successfully',
      application: {
        ...result,
        _id: result._id?.toString()
      }
    })
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { message: 'Failed to update application', error: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete an application (for admin)
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
    
    const client = await dbConnect()
    const db = client.db()
    
    const result = await db.collection('applications').deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Application deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { message: 'Failed to delete application', error: error.message },
      { status: 500 }
    )
  }
}
