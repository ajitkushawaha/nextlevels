import { NextResponse } from 'next/server'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'

export async function GET() {
  try {
    const content = (await getPublishedCmsContent('/')) || defaultHomePageContent
    const section = content.sections.find(
      item => item.type === 'homeAmbassadors' && item.enabled
    )

    if (section?.type !== 'homeAmbassadors') {
      return NextResponse.json({ ambassadors: [] })
    }

    return NextResponse.json({ ambassadors: section.ambassadors })
  } catch (error) {
    console.error('Public ambassadors GET failed:', error)
    const fallbackSection = defaultHomePageContent.sections.find(
      item => item.type === 'homeAmbassadors'
    )
    return NextResponse.json({
      ambassadors: fallbackSection?.type === 'homeAmbassadors' ? fallbackSection.ambassadors : [],
    })
  }
}
