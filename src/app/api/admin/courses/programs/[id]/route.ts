import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Program from '@/models/Program'

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
    const program = await (Program as any).findById(id).populate('universityId')
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }
    return NextResponse.json({ program })
  } catch (error) {
    console.error('Admin program GET failed:', error)
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
    const updated = await (Program as any).findByIdAndUpdate(id, update, { new: true, runValidators: true })
    if (!updated) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }
    return NextResponse.json({ program: updated })
  } catch (error) {
    console.error('Admin program PUT failed:', error)
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
    const deleted = await (Program as any).findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    console.error('Admin program DELETE failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
