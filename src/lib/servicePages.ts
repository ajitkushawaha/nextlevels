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

function isDefaultServiceData(service: SerializedServicePage) {
  const defaultService = serviceDetails.find(item => item.number === service.data.number)
  if (!defaultService) return false

  return service.slug === defaultService.slug && service.data.title === defaultService.title
}

function dedupeServicePages(services: SerializedServicePage[]) {
  const serviceMap = new Map<string, SerializedServicePage>()

  services.forEach(service => {
    const key = service.data.number || service.slug
    const existing = serviceMap.get(key)

    if (!existing) {
      serviceMap.set(key, service)
      return
    }

    const existingIsDefault = isDefaultServiceData(existing)
    const nextIsDefault = isDefaultServiceData(service)

    if (existingIsDefault && !nextIsDefault) {
      serviceMap.set(key, service)
    }
  })

  return Array.from(serviceMap.values())
}

export async function seedDefaultServicePages() {
  await connectDB()

  await Promise.all(
    serviceDetails.map(service =>
      (ServicePage as any).findOneAndUpdate(
        { $or: [{ slug: service.slug }, { 'data.number': service.number }] },
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

  return dedupeServicePages(pages.map(serializeServicePage))
}

export async function getPublishedServiceDetail(slug: string) {
  try {
    await connectDB()
    const page = await (ServicePage as any)
      .findOne({ slug, status: 'published' })
      .lean()

    if (page) {
      const service = serializeServicePage(page)
      if (isDefaultServiceData(service)) {
        const editedService = await (ServicePage as any)
          .findOne({
            status: 'published',
            slug: { $ne: service.slug },
            'data.number': service.data.number,
          })
          .lean()

        if (editedService && !isDefaultServiceData(serializeServicePage(editedService))) {
          return null
        }
      }

      return service.data
    }
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
      .lean()

    const dbServices = dedupeServicePages(pages.map(serializeServicePage))
    const dbNumbers = new Set(dbServices.map(service => service.data.number))
    const staticSlugs = serviceDetails
      .filter(service => !dbNumbers.has(service.number))
      .map(service => service.slug)
    const dbSlugs = dbServices.map(service => service.slug)

    return Array.from(new Set([...staticSlugs, ...dbSlugs]))
  } catch {
    return serviceDetails.map(service => service.slug)
  }
}
