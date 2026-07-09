import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import BlogConfig from '@/models/BlogConfig'

export const dynamic = 'force-dynamic'

// POST - Update only blog authors
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any)

    if (!session || (session as any).user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    console.log('Updating blog config authors')

    const config = await (BlogConfig as any).findOneAndUpdate(
      {},
      {
        $set: {
          authors: body.authors || [],
        },
      },
      { new: true, upsert: true, runValidators: true }
    )

    return NextResponse.json({
      success: true,
      data: config,
      message: 'Blog authors updated successfully',
    })
  } catch (error) {
    console.error('Error updating blog authors:', error)
    return NextResponse.json(
      { error: 'Failed to update blog authors' },
      { status: 500 }
    )
  }
}
