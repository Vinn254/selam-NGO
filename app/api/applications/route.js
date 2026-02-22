import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import nodemailer from 'nodemailer'

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
  // Check if SMTP is configured
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

Date: new Date(application.createdAt).toLocaleString()

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

// GET - Fetch all applications (for admin)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'volunteer', 'partner', 'story', or null for all
    
    const client = await dbConnect()
    const db = client.db()
    
    let query = {}
    if (type) {
      query = { type }
    }
    
    const applications = await db
      .collection('applications')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    // Convert ObjectId to string for proper serialization
    const serializedApplications = applications.map(app => ({
      ...app,
      _id: app._id?.toString()
    }))

    return NextResponse.json({ applications: serializedApplications })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { message: 'Failed to fetch applications', error: error.message },
      { status: 500 }
    )
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

    // Validate application type
    const validTypes = ['volunteer', 'partner', 'story']
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { message: 'Invalid application type' },
        { status: 400 }
      )
    }

    // Create new application
    const newApplication = {
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      type: body.type,
      // Type-specific fields
      interest: body.interest || '', // For volunteer
      organization: body.organization || '', // For partner
      partnershipType: body.partnershipType || '', // For partner
      message: body.message || '',
      // Metadata
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Connect to MongoDB and save
    const client = await dbConnect()
    const db = client.db()
    
    const result = await db.collection('applications').insertOne(newApplication)
    
    const saved = await db.collection('applications').findOne({ _id: result.insertedId })

    // Convert ObjectId to string
    const serializedApplication = {
      ...saved,
      _id: saved._id?.toString()
    }

    // Send email notification to admin
    await sendAdminEmailNotification(serializedApplication)

    return NextResponse.json({
      message: 'Application submitted successfully',
      application: serializedApplication
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { message: 'Failed to submit application', error: error.message },
      { status: 500 }
    )
  }
}
