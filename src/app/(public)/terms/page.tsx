import LegalPageContent from '@/components/legal/LegalPageContent'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { defaultTermsContent } from '@/lib/cms/legalDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/terms')
  if (seoData.metaTitle === 'Next Level Education| Study Abroad Expert') {
    return generateSEOMetadata({
      ...seoData,
      metaTitle: 'Terms & Conditions | Next Level Education',
      metaDescription:
        'Read the terms and conditions for using Next Level Education services and website.',
      ogTitle: 'Terms & Conditions | Next Level Education',
      ogDescription:
        'Read the terms and conditions for using Next Level Education services and website.',
    })
  }
  return generateSEOMetadata(seoData)
}

export default async function TermsPage() {
  const content = (await getPublishedCmsContent('/terms')) || defaultTermsContent

  return <LegalPageContent content={content} />
}
