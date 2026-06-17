'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { HomeProgramSection } from '@/lib/cms/types'
import CmsImageField from './CmsImageField'

interface HomeProgramEditorProps {
  program: HomeProgramSection
  setProgramField: <Key extends keyof HomeProgramSection>(
    key: Key,
    value: HomeProgramSection[Key]
  ) => void
  setProgramCtaField: (key: 'label' | 'href', value: string) => void
  setProgramBadgeField: (key: 'line1' | 'line2', value: string) => void
  setProgramImageField: (
    index: number,
    key: 'src' | 'alt',
    value: string
  ) => void
  setProgramBenefit: (index: number, value: string) => void
  addProgramBenefit: () => void
  removeProgramBenefit: (index: number) => void
}

export default function HomeProgramEditor({
  program,
  setProgramField,
  setProgramCtaField,
  setProgramBadgeField,
  setProgramImageField,
  setProgramBenefit,
  addProgramBenefit,
  removeProgramBenefit,
}: HomeProgramEditorProps) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="program-eyebrow">Eyebrow</Label>
        <Input
          id="program-eyebrow"
          value={program.eyebrow}
          onChange={event => setProgramField('eyebrow', event.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="program-title">Title</Label>
        <Input
          id="program-title"
          value={program.title}
          onChange={event => setProgramField('title', event.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="program-description">Description</Label>
        <Textarea
          id="program-description"
          rows={4}
          value={program.description}
          onChange={event =>
            setProgramField('description', event.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="program-cta-label">CTA Label</Label>
          <Input
            id="program-cta-label"
            value={program.cta.label}
            onChange={event => setProgramCtaField('label', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="program-cta-href">CTA Link</Label>
          <Input
            id="program-cta-href"
            value={program.cta.href}
            onChange={event => setProgramCtaField('href', event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="program-badge-line-1">Badge Line 1</Label>
          <Input
            id="program-badge-line-1"
            value={program.badge.line1}
            onChange={event =>
              setProgramBadgeField('line1', event.target.value)
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="program-badge-line-2">Badge Line 2</Label>
          <Input
            id="program-badge-line-2"
            value={program.badge.line2}
            onChange={event =>
              setProgramBadgeField('line2', event.target.value)
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label>Benefits</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addProgramBenefit}
            disabled={program.benefits.length >= 8}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
        {program.benefits.map((benefit, index) => (
          <div key={`${benefit}-${index}`} className="flex gap-2">
            <Input
              value={benefit}
              onChange={event => setProgramBenefit(index, event.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeProgramBenefit(index)}
              disabled={program.benefits.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Label>Image Collage</Label>
        {program.images.map((image, index) => (
          <div
            key={`program-image-${index}`}
            className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <p className="text-[11px] font-bold uppercase text-slate-400">
              Image {index + 1}
            </p>
            <CmsImageField
              id={`program-image-${index}`}
              label="Image"
              value={image.src}
              folder="nextlevel/home/program"
              onChange={value => setProgramImageField(index, 'src', value)}
            />
            <Input
              value={image.alt}
              onChange={event =>
                setProgramImageField(index, 'alt', event.target.value)
              }
            />
          </div>
        ))}
      </div>
    </>
  )
}
