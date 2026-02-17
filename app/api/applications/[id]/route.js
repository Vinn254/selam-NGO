import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const metadataFile = path.join(dataDir, 'applications.json')

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
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    const data = await readFile(metadataFile, 'utf-8')
    const applications = JSON.parse(data)

    const application = applications.find(app => app._id === id)
    if (!application) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ application })
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
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    const data = await readFile(metadataFile, 'utf-8')
    let applications = JSON.parse(data)

    const appIndex = applications.findIndex(app => app._id === id)
    if (appIndex === -1) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    // Update application
    applications[appIndex] = {
      ...applications[appIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    // Save to file
    await writeFile(metadataFile, JSON.stringify(applications, null, 2))

    return NextResponse.json({
      message: 'Application updated successfully',
      application: applications[appIndex]
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
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    const data = await readFile(metadataFile, 'utf-8')
    let applications = JSON.parse(data)

    const appIndex = applications.findIndex(app => app._id === id)
    if (appIndex === -1) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    // Remove application
    applications.splice(appIndex, 1)

    // Save to file
    await writeFile(metadataFile, JSON.stringify(applications, null, 2))

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
