import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AmbassadorChatContent } from '@/app/(public)/chat/ChatClient'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import { slugify } from '@/lib/slug'

type Props = {
  params: Promise<{ ambassador: string }>
}

export const revalidate = 60

export default async function LegacyAmbassadorPage({ params }: Props) {
  const { ambassador: requestedSlug } = await params
  const content = (await getPublishedCmsContent('/')) || defaultHomePageContent
  const section = content.sections.find(
    item => item.type === 'homeAmbassadors' && item.enabled
  )

  if (section?.type !== 'homeAmbassadors') notFound()

  const match = section.ambassadors.find(item => slugify(item.name) === slugify(requestedSlug))
  if (!match) notFound()

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AmbassadorChatContent ambassadorName={match.name} serverAmbassadors={section.ambassadors} />
    </Suspense>
  )
}
