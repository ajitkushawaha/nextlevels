import { Suspense } from 'react'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import { AmbassadorChatContent } from './ChatClient'

export const revalidate = 60

export default async function ChatPage() {
  const content = (await getPublishedCmsContent('/')) || defaultHomePageContent
  const section = content.sections.find(
    item => item.type === 'homeAmbassadors' && item.enabled
  )
  const serverAmbassadors = section?.type === 'homeAmbassadors' ? section.ambassadors : []

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-400 animate-pulse">Loading...</p>
      </div>
    }>
      <AmbassadorChatContent serverAmbassadors={serverAmbassadors} />
    </Suspense>
  )
}
