import AboutPageContent from '@/components/about/AboutPageContent'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import { defaultAboutPageContent } from '@/lib/cms/aboutDefaults'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/about-us')
  return generateSEOMetadata(seoData)
}

export default async function AboutUsPage() {
  const content =
    (await getPublishedCmsContent('/about-us')) || defaultAboutPageContent

  return <AboutPageContent content={content} />
}
