import LegalPageContent from '@/components/legal/LegalPageContent'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'
import { defaultPrivacyPolicyContent } from '@/lib/cms/legalDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/privacy-policy')
  if (seoData.metaTitle === 'Next Level Education Consultancy | Study Abroad Expert') {
    return generateSEOMetadata({
      ...seoData,
      metaTitle: 'Privacy Policy | Next Level Education',
      metaDescription: 'Read how Next Level Education collects, uses and protects personal information.',
      ogTitle: 'Privacy Policy | Next Level Education',
      ogDescription: 'Read how Next Level Education collects, uses and protects personal information.',
    })
  }
  return generateSEOMetadata(seoData)
}

export default async function PrivacyPolicyPage() {
  const content =
    (await getPublishedCmsContent('/privacy-policy')) || defaultPrivacyPolicyContent

  return <LegalPageContent content={content} />
}
