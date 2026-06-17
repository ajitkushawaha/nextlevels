'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import CountryPageEditor from '@/components/cms/section-editors/CountryPageEditor'
import UniversityPageEditor from '@/components/cms/section-editors/UniversityPageEditor'
import ProgramPageEditor from '@/components/cms/section-editors/ProgramPageEditor'
import ScholarshipPageEditor from '@/components/cms/section-editors/ScholarshipPageEditor'

export default function CourseEditorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  const handleBack = () => {
    router.push('/admin/courses')
  }

  if (!type || !id) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3 bg-slate-50 text-sm font-semibold text-slate-500">
        <p>Invalid editor query parameters.</p>
        <button onClick={handleBack} className="text-[#061331] hover:underline font-bold">
          Go back to dashboard
        </button>
      </div>
    )
  }

  if (type === 'country') {
    return <CountryPageEditor countryId={id} onBack={handleBack} />
  }

  if (type === 'university') {
    return <UniversityPageEditor universityId={id} onBack={handleBack} />
  }

  if (type === 'program') {
    return <ProgramPageEditor programId={id} onBack={handleBack} />
  }

  if (type === 'scholarship') {
    return <ScholarshipPageEditor scholarshipId={id} onBack={handleBack} />
  }

  return (
    <div className="flex h-96 flex-col items-center justify-center gap-3 bg-slate-50 text-sm font-semibold text-slate-500">
      <p>Editor for type "{type}" is not supported yet.</p>
      <button onClick={handleBack} className="text-[#061331] hover:underline font-bold">
        Go back to dashboard
      </button>
    </div>
  )
}
