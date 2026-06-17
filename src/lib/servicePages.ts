import connectDB from '@/lib/db'
import ServicePage from '@/models/ServicePage'
import {
  getServiceDetail as getStaticServiceDetail,
  serviceDetails,
  type ServiceDetail,
} from '@/lib/serviceDetails'
import { parseServiceDetail } from '@/lib/servicePageValidation'

export type SerializedServicePage = {
  id: string
  slug: string
  title: string
  data: ServiceDetail
  status: 'draft' | 'published'
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

function serializeServicePage(page: any): SerializedServicePage {
  const data = parseServiceDetail(page.data)

  return {
    id: String(page._id),
    slug: page.slug,
    title: page.title,
    data,
    status: page.status,
    createdAt: page.createdAt?.toISOString?.(),
    updatedAt: page.updatedAt?.toISOString?.(),
    publishedAt: page.publishedAt?.toISOString?.(),
  }
}

export async function seedDefaultServicePages() {
  await connectDB()

  await Promise.all(
    serviceDetails.map(service =>
      (ServicePage as any).findOneAndUpdate(
        { slug: service.slug },
        {
          $setOnInsert: {
            slug: service.slug,
            title: service.title,
            data: service,
            status: 'published',
            publishedAt: new Date(),
          },
        },
        { upsert: true, returnDocument: 'after' }
      )
    )
  )
}

export async function getAdminServicePages() {
  await seedDefaultServicePages()

  const pages = await (ServicePage as any)
    .find({})
    .sort({ createdAt: 1 })
    .lean()

  return pages.map(serializeServicePage)
}

export async function getPublishedServiceDetail(slug: string) {
  try {
    await connectDB()
    const page = await (ServicePage as any)
      .findOne({ slug, status: 'published' })
      .lean()

    if (page) return parseServiceDetail(page.data)
  } catch (error) {
    console.error('Published service lookup failed:', error)
  }

  return getStaticServiceDetail(slug) || null
}

export async function getPublishedServiceSlugs() {
  try {
    await connectDB()
    const pages = await (ServicePage as any)
      .find({ status: 'published' })
      .select('slug')
      .lean()

    const dbSlugs = pages.map((page: any) => String(page.slug))
    return Array.from(new Set([...serviceDetails.map(service => service.slug), ...dbSlugs]))
  } catch {
    return serviceDetails.map(service => service.slug)
  }
}
