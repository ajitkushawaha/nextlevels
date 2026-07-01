import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import University from '@/models/University'
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
    const university = await (University as any).findById(id).populate('countryId')
    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }
    return NextResponse.json({ university })
  } catch (error) {
    console.error('Admin university GET failed:', error)
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

    const update = {
      name: body.name,
      logo: body.logo,
      bannerImage: body.bannerImage || '',
      countryId: body.countryId,
      city: body.city,
      globalRanking: body.globalRanking || undefined,
      description: body.description || '',
      websiteUrl: body.websiteUrl || '',
      cmsData: body.cmsData || {},
    }

    await connectDB()
    const updated = await (University as any).findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }
    return NextResponse.json({ university: updated })
  } catch (error) {
    console.error('Admin university PUT failed:', error)
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
    const programCount = await (Program as any).countDocuments({ universityId: id })
    if (programCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete this university because ${programCount} programs are linked to it.` },
        { status: 409 }
      )
    }
    const deleted = await (University as any).findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'University deleted successfully' })
  } catch (error) {
    console.error('Admin university DELETE failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
