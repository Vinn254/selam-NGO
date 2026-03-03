import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { ObjectId } from 'mongodb'

// Determine the data directory based on environment
const isVercel = process.env.VERCEL === '1'
const dataDir = path.join(isVercel ? '/tmp' : process.cwd(), 'data')

// Ensure data directory exists
try {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
} catch (e) {
  console.log('Could not create data directory:', e.message)
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

// Check if string is a valid MongoDB ObjectId (24 hex characters)
function isValidObjectId(id) {
  // Strict check: must be exactly 24 hex characters
  return /^[a-fA-F0-9]{24}$/.test(id)
}

// Get applications from local file
function getLocalApplications() {
  try {
    if (!existsSync(metadataFile)) {
      console.log('Applications file does not exist:', metadataFile)
      return []
    }
    const data = JSON.parse(require('fs').readFileSync(metadataFile, 'utf-8'))
    console.log('Loaded local applications:', data.length)
    return data || []
  } catch (error) {
    console.error('Error reading local applications:', error)
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
    
    // Try MongoDB with string ID (since data was migrated with string IDs)
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const result = await db.collection('applications').findOneAndUpdate(
        { _id: id },
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
      console.log('MongoDB update error:', dbError.message)
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
    console.log('DELETE request for application ID:', id, 'Length:', id?.length)
    
    let deletedFromMongo = false
    let deletedFromLocal = false
    
    // Try MongoDB with string ID (since data was migrated with string IDs)
    console.log('Trying MongoDB with string ID...')
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const result = await db.collection('applications').deleteOne({ _id: id })
      console.log('MongoDB delete result:', result)

      if (result.deletedCount > 0) {
        deletedFromMongo = true
      }
    } catch (dbError) {
      console.error('MongoDB delete error:', dbError.message)
    }
    
    // Also try local file (for development/backup)
    if (!deletedFromMongo) {
      console.log('Checking local file for ID:', id)
      const applications = getLocalApplications()
      console.log('Total applications in local file:', applications.length)
      const appIndex = applications.findIndex(app => app._id === id)
      console.log('Found at index:', appIndex)
      
      if (appIndex !== -1) {
        console.log('Deleting from local file:', applications[appIndex].name)
        applications.splice(appIndex, 1)
        saveLocalApplications(applications)
        deletedFromLocal = true
      }
    }
    
    // If we deleted from either source, return success
    if (deletedFromMongo || deletedFromLocal) {
      return NextResponse.json({
        message: 'Application deleted successfully',
      })
    }
    
    // Not found anywhere - return more details for debugging
    return NextResponse.json(
      { 
        message: 'Application not found',
        debug: {
          id,
          idLength: id?.length,
          isValidObjectId: isValidObjectId(id),
          mongoDeleted: deletedFromMongo,
          localDeleted: deletedFromLocal
        }
      },
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
