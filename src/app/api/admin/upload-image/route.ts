import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { authOptions } from '@/lib/authConfig'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const allowedTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
])

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are not configured.')
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
}

function uploadBuffer(buffer: Buffer, folder: string) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Cloudinary upload failed.'))
          return
        }
        resolve(result)
      }
    )

    stream.end(buffer)
  })
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any)

    if (!session || (session as any).user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    configureCloudinary()

    const formData = await request.formData()
    const file = formData.get('file')
    const folderValue = formData.get('folder')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 })
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PNG, JPEG, GIF, or WebP.' },
        { status: 400 }
      )
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 5MB.' }, { status: 400 })
    }

    const folder =
      typeof folderValue === 'string' && folderValue.trim()
        ? folderValue.trim().replace(/[^a-zA-Z0-9/_-]/g, '-')
        : 'nextlevel'

    const arrayBuffer = await file.arrayBuffer()
    const result = await uploadBuffer(Buffer.from(arrayBuffer), folder)

    return NextResponse.json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    })
  } catch (error: any) {
    console.error('Cloudinary image upload failed:', error)
    return NextResponse.json(
      { error: error.message || 'Image upload failed.' },
      { status: 500 }
    )
  }
}
