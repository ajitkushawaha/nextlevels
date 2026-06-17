import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import ServicePage from '@/models/ServicePage'
import { getAdminServicePages } from '@/lib/servicePages'
import {
  parseServiceDetail,
  servicePageStatusSchema,
} from '@/lib/servicePageValidation'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const services = await getAdminServicePages()
    return NextResponse.json({ services })
  } catch (error) {
    console.error('Admin services GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = parseServiceDetail(body.data)
    const status = servicePageStatusSchema.parse(body.status || 'draft')

    await connectDB()

    const created = await (ServicePage as any).create({
      slug: data.slug,
      title: data.title,
      data,
      status,
      publishedAt: status === 'published' ? new Date() : undefined,
    })

    return NextResponse.json({ service: created }, { status: 201 })
  } catch (error: any) {
    console.error('Admin services POST failed:', error)

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
