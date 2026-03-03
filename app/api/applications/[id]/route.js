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

// Check if string is a valid MongoDB ObjectId
function isValidObjectId(id) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id
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

// Find application by ID (handles both ObjectId and string ID)
function findApplicationById(applications, id) {
  // First try to find by _id (string comparison)
  let app = applications.find(app => app._id === id)
  if (app) return app
  
  // If not found and id looks like ObjectId, try MongoDB query
  if (isValidObjectId(id)) {
    return null // Will be handled by MongoDB
  }
  
  return null
}

// GET - Fetch a single application
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    // Try MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
      let query
      if (isValidObjectId(id)) {
        query = { _id: new ObjectId(id) }
      } else {
        query = { _id: id }
      }
      
      const application = await db.collection('applications').findOne(query)
      
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
      const application = findApplicationById(applications, id)
      
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
    let updatedApp = null
    let updatedInMongo = false
    let updatedInLocal = false
    
    // Try MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
      let query
      if (isValidObjectId(id)) {
        query = { _id: new ObjectId(id) }
      } else {
        query = { _id: id }
      }
      
      const result = await db.collection('applications').findOneAndUpdate(
        query,
        { 
          $set: {
            ...body,
            updatedAt: new Date()
          }
        },
        { returnDocument: 'after' }
      )

      if (result) {
        updatedApp = {
          ...result,
          _id: result._id?.toString()
        }
        updatedInMongo = true
      }
    } catch (dbError) {
      // MongoDB might not have this record
    }
    
    // Also try local file
    if (!updatedApp) {
      const applications = getLocalApplications()
      const appIndex = applications.findIndex(app => app._id === id)
      
      if (appIndex !== -1) {
        applications[appIndex] = {
          ...applications[appIndex],
          ...body,
          updatedAt: new Date().toISOString()
        }
        saveLocalApplications(applications)
        updatedApp = applications[appIndex]
        updatedInLocal = true
      }
    }
    
    // If we updated in either source, return success
    if (updatedApp) {
      return NextResponse.json({
        message: 'Application updated successfully',
        application: updatedApp
      })
    }
    
    // Not found anywhere
    return NextResponse.json(
      { message: 'Application not found' },
      { status: 404 }
    )
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
    let deletedFromMongo = false
    let deletedFromLocal = false
    
    // Try MongoDB first
    try {
      const client = await dbConnect()
      const db = client.db()
      
      let query
      if (isValidObjectId(id)) {
        query = { _id: new ObjectId(id) }
      } else {
        query = { _id: id }
      }
      
      const result = await db.collection('applications').deleteOne(query)

      if (result.deletedCount > 0) {
        deletedFromMongo = true
      }
    } catch (dbError) {
      // MongoDB might not be available, that's okay
    }
    
    // Also try local file
    const applications = getLocalApplications()
    const appIndex = applications.findIndex(app => app._id === id)
    
    if (appIndex !== -1) {
      applications.splice(appIndex, 1)
      saveLocalApplications(applications)
      deletedFromLocal = true
    }
    
    // If we deleted from either source, return success
    if (deletedFromMongo || deletedFromLocal) {
      return NextResponse.json({
        message: 'Application deleted successfully',
      })
    }
    
    // Not found anywhere
    return NextResponse.json(
      { message: 'Application not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { message: 'Failed to delete application', error: error.message },
      { status: 500 }
    )
  }
}
