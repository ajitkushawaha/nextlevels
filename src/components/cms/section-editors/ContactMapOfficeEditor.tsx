'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { ContactMapOfficeSection } from '@/lib/cms/types'

type Props = {
  section: ContactMapOfficeSection
  onChange: (section: ContactMapOfficeSection) => void
}

type BranchItem = ContactMapOfficeSection['branches'][number]

export default function ContactMapOfficeEditor({ section, onChange }: Props) {
  const updateField = <Key extends keyof ContactMapOfficeSection>(
    key: Key,
    value: ContactMapOfficeSection[Key]
  ) => {
    onChange({ ...section, [key]: value })
  }

  const updateBranch = (index: number, key: keyof BranchItem, value: string) => {
    onChange({
      ...section,
      branches: section.branches.map((branch, branchIndex) =>
        branchIndex === index ? { ...branch, [key]: value } : branch
      ),
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Eyebrow">
          <Input value={section.eyebrow} onChange={event => updateField('eyebrow', event.target.value)} />
        </Field>
        <Field label="Title">
          <Input value={section.title} onChange={event => updateField('title', event.target.value)} />
        </Field>
      </div>

      <Field label="Default Map Embed URL">
        <Textarea
          value={section.mapUrl}
          rows={3}
          onChange={event => updateField('mapUrl', event.target.value)}
          placeholder="Paste default Google Maps embed URL or iframe src"
        />
        <p className="text-xs text-slate-500">
          This is the old/default section map. Branch cards below can override it with their own map URL.
        </p>
      </Field>

      <div className="space-y-4">
        <div>
          <Label>Branch Location Cards</Label>
          <p className="mt-1 text-xs text-slate-500">
            Add a map query or exact Google Maps embed URL for each branch card.
          </p>
        </div>

        {section.branches.map((branch, index) => (
          <div key={`${branch.name}-${index}`} className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Branch Name">
                <Input value={branch.name} onChange={event => updateBranch(index, 'name', event.target.value)} />
              </Field>
              <Field label="Address Line 1">
                <Input value={branch.addressLine1} onChange={event => updateBranch(index, 'addressLine1', event.target.value)} />
              </Field>
              <Field label="Address Line 2">
                <Input value={branch.addressLine2} onChange={event => updateBranch(index, 'addressLine2', event.target.value)} />
              </Field>
              <Field label="Map Query">
                <Input
                  value={branch.mapQuery || ''}
                  onChange={event => updateBranch(index, 'mapQuery', event.target.value)}
                  placeholder="Example: Next Level Education Jaffna Sri Lanka"
                />
              </Field>
            </div>
            <Field label="Branch Map Embed URL">
              <Textarea
                value={branch.mapUrl || ''}
                rows={3}
                onChange={event => updateBranch(index, 'mapUrl', event.target.value)}
                placeholder="Paste Google Maps embed URL or full iframe code for this branch"
              />
              <p className="text-xs text-slate-500">
                If this is filled, the branch card uses this exact map. If empty, it falls back to Map Query.
              </p>
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
      <Label>{label}</Label>
      {children}
    </div>
  )
}
