export const dynamic = 'force-dynamic'

import PageRenderer from '@/components/cms/PageRenderer'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/')
  return generateSEOMetadata(seoData)
}

export default async function Home() {
  const content = (await getPublishedCmsContent('/')) || defaultHomePageContent

  return <PageRenderer slug="/" content={content} />
}
