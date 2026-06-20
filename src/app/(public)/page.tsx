export const dynamic = 'force-dynamic'

import PageRenderer from '@/components/cms/PageRenderer'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export default async function Home() {
  const content = (await getPublishedCmsContent('/')) || defaultHomePageContent

  return <PageRenderer slug="/" content={content} />
}
