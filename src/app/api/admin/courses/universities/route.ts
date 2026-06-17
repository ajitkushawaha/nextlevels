import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import University from '@/models/University'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const universities = await (University as any).find({}).populate('countryId').sort({ name: 1 })
    return NextResponse.json({ universities })
  } catch (error) {
    console.error('Admin universities GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, logo, bannerImage, countryId, city, globalRanking, description, websiteUrl } = body

    if (!name || !logo || !countryId || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    const created = await University.create({
      name,
      logo,
      bannerImage: bannerImage || '',
      countryId,
      city,
      globalRanking: globalRanking ? Number(globalRanking) : undefined,
      description: description || '',
      websiteUrl: websiteUrl || '',
    })

    return NextResponse.json({ university: created }, { status: 201 })
  } catch (error: any) {
    console.error('Admin universities POST failed:', error)
    if (error?.code === 11000) {
      return NextResponse.json({ error: 'A university with this name already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
