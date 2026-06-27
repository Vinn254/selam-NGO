import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { readFile, writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

// Ensure data directory exists
const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const metadataFile = path.join(dataDir, 'applications.json')

// Email transporter configuration
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Send email notification to admin
async function sendAdminEmailNotification(application) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('SMTP not configured, skipping email notification')
    return false
  }

  const transporter = getTransporter()
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

  const typeLabels = {
    volunteer: 'Volunteer Application',
    partner: 'Partnership Request',
    story: 'Story Submission'
  }

  const emailContent = `
New ${typeLabels[application.type]} Received

Date: ${new Date(application.createdAt).toLocaleString()}

Applicant Details:
- Name: ${application.name}
- Email: ${application.email}
- Phone: ${application.phone || 'Not provided'}
- Type: ${typeLabels[application.type]}

${application.interest ? `- Interest: ${application.interest}` : ''}
${application.organization ? `- Organization: ${application.organization}` : ''}
${application.partnershipType ? `- Partnership Type: ${application.partnershipType}` : ''}
${application.message ? `\nMessage:\n${application.message}` : ''}

---
SELAM NGO Website
Automated Notification
  `.trim()

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'SELAM NGO <noreply@selam.co.ke>',
      to: adminEmail,
      subject: `New ${typeLabels[application.type]} - ${application.name}`,
      text: emailContent,
    })
    console.log('Admin email notification sent successfully')
    return true
  } catch (error) {
    console.error('Error sending admin email:', error)
    return false
  }
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

// Save application to local file
async function saveLocalApplication(application) {
  try {
    let applications = getLocalApplications()
    applications.push(application)
    await writeFile(metadataFile, JSON.stringify(applications, null, 2))
    return true
  } catch (error) {
    console.error('Failed to save to local file:', error)
    return false
  }
}

// GET - Fetch all applications (for admin)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    let query = {}
    if (type) {
      query = { type }
    }
    
    // Try MongoDB first
    let mongoApps = []
    try {
      const client = await dbConnect()
      const db = client.db()
      
      mongoApps = await db
        .collection('applications')
        .find(query)
        .sort({ createdAt: -1 })
        .toArray()

      mongoApps = mongoApps.map(app => ({
        ...app,
        _id: app._id?.toString()
      }))
    } catch (dbError) {
      console.log('MongoDB not available, using local data')
    }
    
    // Always get local applications as well
    const localApps = getLocalApplications()
    
    // Merge MongoDB and local data, avoiding duplicates (prefer MongoDB)
    const mongoIds = new Set(mongoApps.map(app => app._id))
    const localOnlyApps = localApps.filter(app => !mongoIds.has(app._id))
    
    // Combine and sort by date
    const allApplications = [...mongoApps, ...localOnlyApps].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )

    return NextResponse.json({ applications: allApplications })
  } catch (error) {
    console.error('Error fetching applications:', error.message)
    
    // Fallback to local JSON file if MongoDB is not available
    const localApps = getLocalApplications()
    return NextResponse.json({ applications: localApps, source: 'local' })
  }
}

// POST - Submit a new application
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'type']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const validTypes = ['volunteer', 'partner', 'story']
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { message: 'Invalid application type' },
        { status: 400 }
      )
    }

    const newApplication = {
      _id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      type: body.type,
      interest: body.interest || '',
      organization: body.organization || '',
      partnershipType: body.partnershipType || '',
      message: body.message || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Try to save to MongoDB
    try {
      const client = await dbConnect()
      const db = client.db()
      
      const result = await db.collection('applications').insertOne({
        ...newApplication,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      const saved = await db.collection('applications').findOne({ _id: result.insertedId })

      const serializedApplication = {
        ...saved,
        _id: saved._id?.toString()
      }

      await sendAdminEmailNotification(serializedApplication)

      return NextResponse.json({
        message: 'Application submitted successfully',
        application: serializedApplication
      }, { status: 201 })
    } catch (dbError) {
      console.error('MongoDB error, saving to local file:', dbError.message)
      
      // Fallback: Save to local JSON file
      const saved = await saveLocalApplication(newApplication)
      if (saved) {
        await sendAdminEmailNotification(newApplication)
        return NextResponse.json({ 
          message: 'Application submitted successfully (saved locally)',
          application: newApplication,
          source: 'local'
        }, { status: 201 })
      }
      
      return NextResponse.json({ 
        message: 'Database connection failed', 
        error: dbError.message 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { message: 'Failed to submit application', error: error.message },
      { status: 500 }
    )
  }
}
