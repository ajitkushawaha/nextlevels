import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Country from '@/models/Country'
import University from '@/models/University'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function GET(req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    await connectDB()
    const country = await (Country as any).findById(id)
    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    }
    return NextResponse.json({ country })
  } catch (error) {
    console.error('Admin country GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const body = await req.json()
    const { _id, createdAt, updatedAt, __v, ...update } = body

    await connectDB()
    const updated = await (Country as any).findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    }
    return NextResponse.json({ country: updated })
  } catch (error: any) {
    console.error('Admin country PUT failed:', error)
    if (error?.code === 11000) {
      return NextResponse.json({ error: 'This page slug is already used by another country.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    await connectDB()
    const universityCount = await (University as any).countDocuments({ countryId: id })
    if (universityCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete this country because ${universityCount} universities are linked to it.` },
        { status: 409 }
      )
    }
    const deleted = await (Country as any).findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Country deleted successfully' })
  } catch (error) {
    console.error('Admin country DELETE failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
