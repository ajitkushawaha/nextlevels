import connectDB from '@/lib/db'
import BranchModel from '@/models/Branch'
import { branches, getBranch as getStaticBranch, type Branch } from '@/lib/branches'

function serializeBranch(branch: any): Branch {
  return {
    slug: branch.slug,
    city: branch.city,
    province: branch.province,
    seoTitle: branch.seoTitle,
    metaDescription: branch.metaDescription,
    heroImage: branch.heroImage,
    intro: Array.isArray(branch.intro) ? branch.intro : [],
    destinations: Array.isArray(branch.destinations) ? branch.destinations : [],
    areas: Array.isArray(branch.areas) ? branch.areas : [],
    stories: Array.isArray(branch.stories) ? branch.stories : [],
    team: Array.isArray(branch.team) ? branch.team : [],
    gallery: Array.isArray(branch.gallery) ? branch.gallery : [],
    address: branch.address,
    phone: branch.phone,
    email: branch.email,
    workingHours: branch.workingHours,
    mapQuery: branch.mapQuery,
    faqs: Array.isArray(branch.faqs) ? branch.faqs : [],
  }
}

export async function getBranchPage(slug: string) {
  try {
    await connectDB()
    const branch = await (BranchModel as any)
      .findOne({ slug, isActive: { $ne: false } })
      .lean()

    if (branch) return serializeBranch(branch)
  } catch (error) {
    console.error('Branch DB lookup failed:', error)
  }

  return getStaticBranch(slug)
}

export async function getBranchSlugs() {
  try {
    await connectDB()
    const dbBranches = await (BranchModel as any)
      .find({ isActive: { $ne: false } })
      .select('slug')
      .lean()

    const dbSlugs = dbBranches
      .map((branch: { slug?: string }) => branch.slug)
      .filter(Boolean) as string[]

    return Array.from(new Set([...branches.map(branch => branch.slug), ...dbSlugs]))
  } catch {
    return branches.map(branch => branch.slug)
  }
}

export async function listBranchPages() {
  try {
    await connectDB()
    const dbBranches = await (BranchModel as any)
      .find()
      .sort({ city: 1 })
      .lean()

    if (dbBranches.length) return dbBranches.map(serializeBranch)
  } catch (error) {
    console.error('Branch list DB lookup failed:', error)
  }

  return branches
}
