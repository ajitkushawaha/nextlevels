import CmsSectionEditorClient from '@/components/cms/CmsSectionEditorClient'

type Params = {
  params: Promise<{
    pageKey: string
    sectionId: string
  }>
}

export default async function CmsSectionEditorPage({ params }: Params) {
  const { pageKey, sectionId } = await params

  return <CmsSectionEditorClient pageKey={pageKey} sectionId={sectionId} />
}
