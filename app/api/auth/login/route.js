import { NextResponse } from 'next/server'

// Simple admin credentials (in production, use proper authentication)
const ADMIN_USER = {
  email: 'admin@selam.co.ke',
  password: 'Selam@2026',
  name: 'Admin User',
  role: 'admin',
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Simple authentication check
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      // Generate a simple token (in production, use proper JWT)
      const token = Buffer.from(JSON.stringify({
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      })).toString('base64')

      return NextResponse.json({
        token,
        name: ADMIN_USER.name,
        email: ADMIN_USER.email,
        role: ADMIN_USER.role,
      })
    }

    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
