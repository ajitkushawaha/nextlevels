import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Scholarship from '@/models/Scholarship'

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
    const scholarship = await (Scholarship as any).findById(id)
      .populate('countryId')
      .populate('universityId')
      .populate('programId')
    if (!scholarship) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
    }
    return NextResponse.json({ scholarship })
  } catch (error) {
    console.error('Admin scholarship GET failed:', error)
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
    const updated = await (Scholarship as any).findByIdAndUpdate(id, update, { new: true, runValidators: true })
    if (!updated) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
    }
    return NextResponse.json({ scholarship: updated })
  } catch (error) {
    console.error('Admin scholarship PUT failed:', error)
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
    const deleted = await (Scholarship as any).findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Scholarship deleted successfully' })
  } catch (error) {
    console.error('Admin scholarship DELETE failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
