import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import ServicePage from '@/models/ServicePage'
import {
  parseServiceDetail,
  servicePageStatusSchema,
} from '@/lib/servicePageValidation'

type Params = { params: Promise<{ id: string }> }

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function PUT(req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const data = parseServiceDetail(body.data)
    const status = servicePageStatusSchema.parse(body.status || 'draft')

    await connectDB()

    const updated = await (ServicePage as any)
      .findByIdAndUpdate(
        id,
        {
          $set: {
            slug: data.slug,
            title: data.title,
            data,
            status,
            publishedAt: status === 'published' ? new Date() : undefined,
          },
        },
        { returnDocument: 'after' }
      )
      .lean()

    if (!updated) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json({ service: updated })
  } catch (error: any) {
    console.error('Admin service PUT failed:', error)

    if (error?.code === 11000) {
      return NextResponse.json(
        { error: 'A service with this slug already exists.' },
        { status: 409 }
      )
    }

    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid service content', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await connectDB()
    const deleted = await (ServicePage as any).findByIdAndDelete(id).lean()

    if (!deleted) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin service DELETE failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
