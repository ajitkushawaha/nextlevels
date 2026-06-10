'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { CmsSection } from '@/lib/cms/types'

interface HomeJsonSectionEditorProps {
  section: CmsSection
  onChange: (section: CmsSection) => void
}

export default function HomeJsonSectionEditor({
  section,
  onChange,
}: HomeJsonSectionEditorProps) {
  const [value, setValue] = useState(() => JSON.stringify(section, null, 2))
  const [error, setError] = useState('')

  return (
    <div className="space-y-2">
      <Label htmlFor={`json-${section.id}`}>Section JSON</Label>
      <Textarea
        id={`json-${section.id}`}
        value={value}
        onChange={event => {
          const nextValue = event.target.value
          setValue(nextValue)

          try {
            const parsed = JSON.parse(nextValue) as CmsSection
            if (parsed.id !== section.id || parsed.type !== section.type) {
              setError('The section id and type must stay unchanged.')
              return
            }

            setError('')
            onChange(parsed)
          } catch {
            setError('Enter valid JSON to update the preview.')
          }
        }}
        rows={24}
        className="font-mono text-[11px] leading-5"
        spellCheck={false}
      />
      {error && (
        <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
      <p className="text-[11px] leading-5 text-slate-400">
        Save validates this content before writing the draft.
      </p>
    </div>
  )
}
