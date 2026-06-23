import LegalPageContent from '@/components/legal/LegalPageContent'
import { defaultTermsContent } from '@/lib/cms/legalDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Terms & Conditions | Next Level Education',
  description: 'Read the terms and conditions for using Next Level Education services and website.',
}

export default async function TermsPage() {
  const content = (await getPublishedCmsContent('/terms')) || defaultTermsContent

  return <LegalPageContent content={content} />
}
