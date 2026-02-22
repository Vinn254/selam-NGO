import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { ObjectId } from 'mongodb'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}
const metadataFile = path.join(dataDir, 'applications.json')

// This would typically verify JWT token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return { authenticated: true }
}

// Get applications from local file
function getLocalApplications() {
  try {
    if (!existsSync(metadataFile)) {
      return []
    }
    const data = JSON.parse(require('fs').readFileSync(metadataFile, 'utf-8'))
    return data || []
  } catch (error) {
    return []
  }
}

// Save applications to local file
function saveLocalApplications(applications) {
  try {
    require('fs').writeFileSync(metadataFile, JSON.stringify(applications, null, 2))
    return true
  } catch (error) {
    return false
  }
}

// GET - Fetch a single application
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    // Try MongoDB first
    try {
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
    } catch (dbError) {
      // Fallback: Get from local file
      const applications = getLocalApplications()
      const application = applications.find(app => app._id === id)
      
      if (!application) {
        return NextResponse.json(
          { message: 'Application not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ application })
    }
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
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    
    // Try MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
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
    } catch (dbError) {
      // Fallback: Update in local file
      const applications = getLocalApplications()
      const appIndex = applications.findIndex(app => app._id === id)
      
      if (appIndex === -1) {
        return NextResponse.json(
          { message: 'Application not found' },
          { status: 404 }
        )
      }

      applications[appIndex] = {
        ...applications[appIndex],
        ...body,
        updatedAt: new Date().toISOString()
      }

      saveLocalApplications(applications)

      return NextResponse.json({
        message: 'Application updated successfully',
        application: applications[appIndex]
      })
    }
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
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params
    
    // Try MongoDB first
    try {
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
    } catch (dbError) {
      // Fallback: Delete from local file
      const applications = getLocalApplications()
      const appIndex = applications.findIndex(app => app._id === id)
      
      if (appIndex === -1) {
        return NextResponse.json(
          { message: 'Application not found' },
          { status: 404 }
        )
      }

      applications.splice(appIndex, 1)
      saveLocalApplications(applications)

      return NextResponse.json({
        message: 'Application deleted successfully',
      })
    }
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { message: 'Failed to delete application', error: error.message },
      { status: 500 }
    )
  }
}
