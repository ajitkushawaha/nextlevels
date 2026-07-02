import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Branch from '@/models/Branch'
import { branches as defaultBranches } from '@/lib/branches'
import { listBranchPages } from '@/lib/branchPages'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const branches = await listBranchPages()
    return NextResponse.json({ branches })
  } catch (error) {
    console.error('Admin branches GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const branch = body.branch
    const publish = Boolean(body.publish)

    if (!branch?.slug || !branch?.city) {
      return NextResponse.json({ error: 'Branch slug and city are required.' }, { status: 400 })
    }

    const fallback = defaultBranches.find(item => item.slug === branch.slug)
    const merged = {
      ...(fallback || {}),
      ...branch,
      intro: Array.isArray(branch.intro) ? branch.intro : fallback?.intro || [],
      destinations: Array.isArray(branch.destinations) ? branch.destinations : fallback?.destinations || [],
      areas: Array.isArray(branch.areas) ? branch.areas : fallback?.areas || [],
      stories: Array.isArray(branch.stories) ? branch.stories : fallback?.stories || [],
      team: Array.isArray(branch.team) ? branch.team : fallback?.team || [],
      gallery: Array.isArray(branch.gallery) ? branch.gallery : fallback?.gallery || [],
      faqs: Array.isArray(branch.faqs) ? branch.faqs : fallback?.faqs || [],
      isActive: publish ? true : (branch?.isActive ?? fallback?.isActive ?? true),
    }

    await connectDB()
    const saved = await (Branch as any)
      .findOneAndUpdate({ slug: merged.slug }, merged, { new: true, upsert: true })
      .lean()

    try {
      revalidatePath(`/branches/${merged.slug}`)
      revalidatePath('/')
    } catch (error) {
      console.error('Failed to revalidate branch path:', error)
    }

    return NextResponse.json({ branch: saved })
  } catch (error) {
    console.error('Admin branches PUT failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
