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
    const file = formData.get('video')

    if (!file) {
      return NextResponse.json(
        { message: 'No video file provided' },
        { status: 400 }
      )
    }

    // Validate file type - support common video formats
    const allowedTypes = [
      'video/mp4', 
      'video/mpeg', 
      'video/quicktime', 
      'video/webm',
      'video/x-msvideo',
      'video/x-matroska'
    ]
    
    // Also check for common video file extensions in the name
    const fileName = file.name.toLowerCase()
    const allowedExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv']
    const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext))
    
    if (!allowedTypes.includes(file.type) && !hasAllowedExtension) {
      return NextResponse.json(
        { message: 'Invalid file type. Allowed: MP4, MOV, WebM, AVI, MKV' },
        { status: 400 }
      )
    }

    // Validate file size (max 50MB for videos)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File too large. Maximum size is 50MB for videos' },
        { status: 400 }
      )
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')
    const dataUri = `data:${file.type || 'video/mp4'};base64,${base64Data}`

    // Generate signature for Cloudinary upload
    const timestamp = Math.round(Date.now() / 1000)
    const folder = 'selam-updates/videos'
    
    // Create signature string
    const crypto = await import('crypto')
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex')

    // Upload to Cloudinary as video
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', dataUri)
    cloudinaryFormData.append('api_key', apiKey)
    cloudinaryFormData.append('timestamp', timestamp.toString())
    cloudinaryFormData.append('signature', signature)
    cloudinaryFormData.append('folder', folder)
    cloudinaryFormData.append('resource_type', 'video')

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    )

    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.json()
      console.error('Cloudinary video upload error:', errorData)
      return NextResponse.json(
        { message: 'Failed to upload to Cloudinary', error: errorData.error?.message || 'Unknown error' },
        { status: 500 }
      )
    }

    const cloudinaryData = await cloudinaryResponse.json()

    return NextResponse.json({
      message: 'Video uploaded successfully',
      videoUrl: cloudinaryData.secure_url,
      thumbnailUrl: cloudinaryData.secure_url.replace('/video/', '/video/so_0,w_400,h_225,c_fill/'),
      duration: cloudinaryData.duration,
    }, { status: 201 })
  } catch (error) {
    console.error('Error uploading video:', error)
    return NextResponse.json(
      { message: 'Failed to upload video', error: error.message },
      { status: 500 }
    )
  }
}
