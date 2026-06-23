import LegalPageContent from '@/components/legal/LegalPageContent'
import { defaultPrivacyPolicyContent } from '@/lib/cms/legalDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Privacy Policy | Next Level Education',
  description: 'Read how Next Level Education collects, uses and protects personal information.',
}

export default async function PrivacyPolicyPage() {
  const content =
    (await getPublishedCmsContent('/privacy-policy')) || defaultPrivacyPolicyContent

  return <LegalPageContent content={content} />
}
