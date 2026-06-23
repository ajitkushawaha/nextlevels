import FaqPageContent from '@/components/faq/FaqPageContent'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { defaultFaqPageContent } from '@/lib/cms/faqDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/faq')
  return generateSEOMetadata(seoData)
}

export default async function FAQPage() {
  const content = (await getPublishedCmsContent('/faq')) || defaultFaqPageContent

  return <FaqPageContent content={content} />
}
