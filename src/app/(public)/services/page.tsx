import ServicesPageContent from '@/components/services/ServicesPageContent'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import { defaultServicesPageContent } from '@/lib/cms/servicesDefaults'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/services')
  return generateSEOMetadata(seoData)
}

export default async function ServicesPage() {
  const content =
    (await getPublishedCmsContent('/services')) || defaultServicesPageContent

  return <ServicesPageContent content={content} />
}
