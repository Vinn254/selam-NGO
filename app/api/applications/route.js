import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

// Ensure data directory exists
const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

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

// GET - Fetch all applications (for admin)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'volunteer', 'partner', 'story', or null for all
    
    const metadataFile = path.join(dataDir, 'applications.json')
    
    if (!existsSync(metadataFile)) {
      return NextResponse.json({ applications: [] })
    }

    const data = await readFile(metadataFile, 'utf-8')
    let applications = JSON.parse(data)

    // Filter by type if specified
    if (type) {
      applications = applications.filter(app => app.type === type)
    }

    // Sort by creation date (newest first)
    applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return NextResponse.json({ applications })
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
      _id: Date.now().toString(36) + Math.random().toString(36).substring(2),
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Read existing applications
    const metadataFile = path.join(dataDir, 'applications.json')
    let applications = []
    
    if (existsSync(metadataFile)) {
      const data = await readFile(metadataFile, 'utf-8')
      applications = JSON.parse(data)
    }

    // Add new application
    applications.push(newApplication)

    // Save to file
    await writeFile(metadataFile, JSON.stringify(applications, null, 2))

    // Send email notification to admin
    await sendAdminEmailNotification(newApplication)

    return NextResponse.json({
      message: 'Application submitted successfully',
      application: newApplication
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { message: 'Failed to submit application', error: error.message },
      { status: 500 }
    )
  }
}
