import ContactPageContent from '@/components/contact/ContactPageContent'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import { defaultContactPageContent } from '@/lib/cms/contactDefaults'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/contact-us')
  return generateSEOMetadata(seoData)
}

export default async function ContactUsPage() {
  const content =
    (await getPublishedCmsContent('/contact-us')) || defaultContactPageContent

  return <ContactPageContent content={content} />
}
