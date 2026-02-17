import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')
const metadataFile = path.join(dataDir, 'updates.json')

// GET - Fetch a single update by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    const data = await readFile(metadataFile, 'utf-8')
    const updatesData = JSON.parse(data)
    const update = updatesData.updates.find(u => u.id === id)

    if (!update) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    return NextResponse.json({ update })
  } catch (error) {
    console.error('Error fetching update:', error)
    return NextResponse.json(
      { message: 'Failed to fetch update', error: error.message },
      { status: 500 }
    )
  }
}

// PUT - Update an existing update
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    const data = await readFile(metadataFile, 'utf-8')
    const updatesData = JSON.parse(data)
    const updateIndex = updatesData.updates.findIndex(u => u.id === id)

    if (updateIndex === -1) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    // Update the update
    updatesData.updates[updateIndex] = {
      ...updatesData.updates[updateIndex],
      title: body.title || updatesData.updates[updateIndex].title,
      description: body.description || updatesData.updates[updateIndex].description,
      mediaType: body.mediaType || updatesData.updates[updateIndex].mediaType,
      mediaUrl: body.mediaUrl !== undefined ? body.mediaUrl : updatesData.updates[updateIndex].mediaUrl,
      updatedAt: new Date().toISOString(),
    }

    await writeFile(metadataFile, JSON.stringify(updatesData, null, 2))

    return NextResponse.json({ 
      message: 'Update updated successfully', 
      update: updatesData.updates[updateIndex] 
    })
  } catch (error) {
    console.error('Error updating update:', error)
    return NextResponse.json(
      { message: 'Failed to update', error: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete an update
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    const data = await readFile(metadataFile, 'utf-8')
    const updatesData = JSON.parse(data)
    const updateIndex = updatesData.updates.findIndex(u => u.id === id)

    if (updateIndex === -1) {
      return NextResponse.json({ message: 'Update not found' }, { status: 404 })
    }

    // Remove the update
    updatesData.updates.splice(updateIndex, 1)

    await writeFile(metadataFile, JSON.stringify(updatesData, null, 2))

    return NextResponse.json({ message: 'Update deleted successfully' })
  } catch (error) {
    console.error('Error deleting update:', error)
    return NextResponse.json(
      { message: 'Failed to delete', error: error.message },
      { status: 500 }
    )
  }
}
