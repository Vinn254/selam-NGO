import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Verify auth token
function verifyAuth(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  try {
    const token = authHeader.substring(7)
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check if token is expired
    if (decoded.exp && Date.now() > decoded.exp) {
      return null
    }
    
    return decoded
  } catch (error) {
    return null
  }
}

export async function POST(request) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized. Please login first.' }, { status: 401 })
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { message: 'Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image')

    if (!file) {
      return NextResponse.json(
        { message: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, AVIF' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      )
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64Data}`

    // Generate signature for Cloudinary upload
    const timestamp = Math.round(Date.now() / 1000)
    const folder = 'selam-updates'
    
    // Create signature string
    const crypto = await import('crypto')
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex')

    // Upload to Cloudinary
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', dataUri)
    cloudinaryFormData.append('api_key', apiKey)
    cloudinaryFormData.append('timestamp', timestamp.toString())
    cloudinaryFormData.append('signature', signature)
    cloudinaryFormData.append('folder', folder)

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    )

    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.json()
      console.error('Cloudinary upload error:', errorData)
      return NextResponse.json(
        { message: 'Failed to upload to Cloudinary', error: errorData.error?.message || 'Unknown error' },
        { status: 500 }
      )
    }

    const cloudinaryData = await cloudinaryResponse.json()

    return NextResponse.json({
      message: 'Image uploaded successfully',
      imageUrl: cloudinaryData.secure_url,
    }, { status: 201 })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { message: 'Failed to upload image', error: error.message },
      { status: 500 }
    )
  }
}
