'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { HomeScholarshipOfferSection } from '@/lib/cms/types'

interface HomeScholarshipOfferEditorProps {
  section: HomeScholarshipOfferSection
  onChange: (section: HomeScholarshipOfferSection) => void
}

function toDateTimeLocal(value: string) {
  if (!value) return ''
  return value.slice(0, 16)
}

function fromDateTimeLocal(value: string) {
  if (!value) return ''
  return `${value}:00+05:30`
}

export default function HomeScholarshipOfferEditor({
  section,
  onChange,
}: HomeScholarshipOfferEditorProps) {
  const setField = <Key extends keyof HomeScholarshipOfferSection>(
    key: Key,
    value: HomeScholarshipOfferSection[Key]
  ) => {
    onChange({ ...section, [key]: value })
  }

  const updateBenefit = (index: number, value: string) => {
    onChange({
      ...section,
      benefits: section.benefits.map((benefit, benefitIndex) =>
        benefitIndex === index ? value : benefit
      ),
    })
  }

  const addBenefit = () => {
    onChange({
      ...section,
      benefits: [...section.benefits, 'New benefit'],
    })
  }

  const removeBenefit = (index: number) => {
    onChange({
      ...section,
      benefits: section.benefits.filter((_benefit, benefitIndex) => benefitIndex !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-badge">Badge Text</Label>
          <Input
            id="scholarship-badge"
            value={section.badgeText}
            onChange={event => setField('badgeText', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-intake">Intake Label</Label>
          <Input
            id="scholarship-intake"
            value={section.intakeLabel}
            onChange={event => setField('intakeLabel', event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5 rounded-lg border border-amber-200 bg-amber-50 p-3">
        <Label htmlFor="scholarship-countdown-target">Countdown Deadline</Label>
        <Input
          id="scholarship-countdown-target"
          type="datetime-local"
          value={toDateTimeLocal(section.countdownTarget)}
          onChange={event =>
            setField('countdownTarget', fromDateTimeLocal(event.target.value))
          }
        />
        <p className="text-[11px] font-medium text-amber-700">
          Saved as a backend deadline. Refreshing the page keeps counting down to this exact date.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_0.7fr_1fr]">
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-title-prefix">Title Prefix</Label>
          <Input
            id="scholarship-title-prefix"
            value={section.titlePrefix}
            onChange={event => setField('titlePrefix', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-amount">Amount</Label>
          <Input
            id="scholarship-amount"
            value={section.scholarshipAmount}
            onChange={event => setField('scholarshipAmount', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-title-suffix">Title Suffix</Label>
          <Input
            id="scholarship-title-suffix"
            value={section.titleSuffix}
            onChange={event => setField('titleSuffix', event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="scholarship-description">Description</Label>
        <Textarea
          id="scholarship-description"
          rows={4}
          value={section.description}
          onChange={event => setField('description', event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-cta-label">CTA Label</Label>
          <Input
            id="scholarship-cta-label"
            value={section.ctaLabel}
            onChange={event => setField('ctaLabel', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-cta-href">CTA Link</Label>
          <Input
            id="scholarship-cta-href"
            value={section.ctaHref}
            onChange={event => setField('ctaHref', event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-note">CTA Note</Label>
          <Input
            id="scholarship-note"
            value={section.note}
            onChange={event => setField('note', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="scholarship-urgency">Urgency Text</Label>
          <Input
            id="scholarship-urgency"
            value={section.urgencyText}
            onChange={event => setField('urgencyText', event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label>Benefits</Label>
          <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {section.benefits.map((benefit, index) => (
          <div key={`${benefit}-${index}`} className="flex gap-2">
            <Input
              value={benefit}
              onChange={event => updateBenefit(index, event.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeBenefit(index)}
              disabled={section.benefits.length <= 1}
              className="shrink-0 text-red-600 hover:text-red-700"
              aria-label={`Remove benefit ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
