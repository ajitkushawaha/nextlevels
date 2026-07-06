'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from './CmsImageField'
import type { HomeAmbassadorsSection } from '@/lib/cms/types'

interface HomeAmbassadorsEditorProps {
  section: HomeAmbassadorsSection
  onChange: (section: HomeAmbassadorsSection) => void
}

type Ambassador = HomeAmbassadorsSection['ambassadors'][number]

const emptyAmbassador: Ambassador = {
  name: '',
  program: '',
  university: '',
  image: '',
  link: '/chat?name=',
  intro: '',
}

export default function HomeAmbassadorsEditor({
  section,
  onChange,
}: HomeAmbassadorsEditorProps) {
  const setField = <Key extends keyof HomeAmbassadorsSection>(
    key: Key,
    value: HomeAmbassadorsSection[Key]
  ) => {
    onChange({ ...section, [key]: value })
  }

  const updateAmbassador = <Key extends keyof Ambassador>(
    index: number,
    key: Key,
    value: Ambassador[Key]
  ) => {
    onChange({
      ...section,
      ambassadors: section.ambassadors.map((ambassador, ambassadorIndex) =>
        ambassadorIndex === index ? { ...ambassador, [key]: value } : ambassador
      ),
    })
  }

  const updateAmbassadorName = (index: number, name: string) => {
    onChange({
      ...section,
      ambassadors: section.ambassadors.map((ambassador, ambassadorIndex) =>
        ambassadorIndex === index
          ? { ...ambassador, name, link: `/chat?name=${encodeURIComponent(name)}` }
          : ambassador
      ),
    })
  }

  const addAmbassador = () => {
    onChange({
      ...section,
      ambassadors: [...section.ambassadors, emptyAmbassador],
    })
  }

  const removeAmbassador = (index: number) => {
    onChange({
      ...section,
      ambassadors: section.ambassadors.filter((_ambassador, ambassadorIndex) => ambassadorIndex !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Section Title">
          <Input value={section.ambassadorTitle} onChange={event => setField('ambassadorTitle', event.target.value)} />
        </Field>
        <Field label="Section Description">
          <Input value={section.ambassadorDescription} onChange={event => setField('ambassadorDescription', event.target.value)} />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <div>
          <h3 className="text-sm font-black text-[#061331]">Student Ambassadors</h3>
          <p className="mt-1 text-xs text-slate-500">
            Manage ambassador cards and chat page intro text.
          </p>
        </div>
        <Button type="button" onClick={addAmbassador} className="bg-[#061331] text-white hover:bg-[#061331]/95">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-4">
        {section.ambassadors.map((ambassador, index) => (
          <div key={`${ambassador.name}-${index}`} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-black text-[#061331]">
                  {ambassador.name || `Ambassador ${index + 1}`}
                </h4>
                <p className="mt-1 text-xs text-slate-500">{ambassador.university || 'University not set'}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeAmbassador(index)}
                disabled={section.ambassadors.length <= 1}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <Input value={ambassador.name} onChange={event => updateAmbassadorName(index, event.target.value)} />
              </Field>
              <Field label="Program">
                <Input value={ambassador.program} onChange={event => updateAmbassador(index, 'program', event.target.value)} />
              </Field>
              <Field label="University">
                <Input value={ambassador.university} onChange={event => updateAmbassador(index, 'university', event.target.value)} />
              </Field>
              <Field label="Chat Link (automatic)">
                <Input value={`/chat?name=${encodeURIComponent(ambassador.name)}`} readOnly className="bg-slate-50 text-slate-500" />
              </Field>
            </div>

            <CmsImageField
              id={`ambassador-image-${index}`}
              label="Ambassador Image"
              value={ambassador.image}
              onChange={value => updateAmbassador(index, 'image', value)}
              folder="nextlevel/ambassadors"
            />

            <Field label="Chat Page Intro">
              <Textarea
                rows={4}
                value={ambassador.intro || ''}
                onChange={event => updateAmbassador(index, 'intro', event.target.value)}
                placeholder="Hi, I am Aastha. As a student ambassador, I help students understand campus life, application steps, and study abroad preparation."
              />
            </Field>
          </div>
        ))}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</Label>
      {children}
    </div>
  )
}
