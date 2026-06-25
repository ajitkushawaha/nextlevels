'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { HomeScholarshipOffer, HomeScholarshipOfferSection } from '@/lib/cms/types'

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

function getOffers(section: HomeScholarshipOfferSection): HomeScholarshipOffer[] {
  if (section.offers?.length) return section.offers
  return [
    {
      badgeText: section.badgeText,
      intakeLabel: section.intakeLabel,
      countdownTarget: section.countdownTarget,
      titlePrefix: section.titlePrefix,
      scholarshipAmount: section.scholarshipAmount,
      titleSuffix: section.titleSuffix,
      description: section.description,
      highlightedAgency: section.highlightedAgency,
      highlightedUniversity: section.highlightedUniversity,
      highlightedOffer: section.highlightedOffer,
      ctaLabel: section.ctaLabel,
      ctaHref: section.ctaHref,
      note: section.note,
      featureChips: section.featureChips,
      benefitsTitle: section.benefitsTitle,
      benefits: section.benefits,
      urgencyText: section.urgencyText,
    },
  ]
}

export default function HomeScholarshipOfferEditor({
  section,
  onChange,
}: HomeScholarshipOfferEditorProps) {
  const offers = getOffers(section)

  const syncOffers = (nextOffers: HomeScholarshipOffer[]) => {
    const firstOffer = nextOffers[0] || offers[0]
    onChange({
      ...section,
      ...firstOffer,
      offers: nextOffers,
    })
  }

  const updateOffer = <Key extends keyof HomeScholarshipOffer>(
    index: number,
    key: Key,
    value: HomeScholarshipOffer[Key]
  ) => {
    syncOffers(offers.map((offer, offerIndex) => (offerIndex === index ? { ...offer, [key]: value } : offer)))
  }

  const addOffer = () => {
    const source = offers[offers.length - 1] || offers[0]
    syncOffers([
      ...offers,
      {
        ...source,
        badgeText: 'Limited Offer',
        intakeLabel: 'New Intake',
        titlePrefix: 'Apply Now & Receive a',
        scholarshipAmount: '£1,000',
        titleSuffix: 'Scholarship',
        description: 'Add offer description here.',
        featureChips: source.featureChips?.length ? source.featureChips : [{ icon: 'Award', text: 'Scholarship offer' }],
        benefits: source.benefits?.length ? source.benefits : ['Priority application support'],
      },
    ])
  }

  const removeOffer = (index: number) => {
    if (offers.length <= 1) return
    syncOffers(offers.filter((_offer, offerIndex) => offerIndex !== index))
  }

  const updateBenefit = (offerIndex: number, benefitIndex: number, value: string) => {
    const offer = offers[offerIndex]
    updateOffer(
      offerIndex,
      'benefits',
      offer.benefits.map((benefit, index) => (index === benefitIndex ? value : benefit))
    )
  }

  const addBenefit = (offerIndex: number) => {
    const offer = offers[offerIndex]
    updateOffer(offerIndex, 'benefits', [...offer.benefits, 'New benefit'])
  }

  const removeBenefit = (offerIndex: number, benefitIndex: number) => {
    const offer = offers[offerIndex]
    updateOffer(offerIndex, 'benefits', offer.benefits.filter((_benefit, index) => index !== benefitIndex))
  }

  const updateChip = (offerIndex: number, chipIndex: number, key: 'text' | 'icon', value: string) => {
    const offer = offers[offerIndex]
    updateOffer(
      offerIndex,
      'featureChips',
      offer.featureChips.map((chip, index) =>
        index === chipIndex ? { ...chip, [key]: value } : chip
      )
    )
  }

  const addChip = (offerIndex: number) => {
    const offer = offers[offerIndex]
    updateOffer(offerIndex, 'featureChips', [...offer.featureChips, { icon: 'Award', text: 'New highlight' }])
  }

  const removeChip = (offerIndex: number, chipIndex: number) => {
    const offer = offers[offerIndex]
    updateOffer(offerIndex, 'featureChips', offer.featureChips.filter((_chip, index) => index !== chipIndex))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#d7a23a]/25 bg-[#fffbeb] p-4">
        <div>
          <h3 className="text-sm font-black text-[#061331]">Offer Slider</h3>
          <p className="mt-1 text-xs text-slate-500">
            Add multiple scholarship offer banners. Homepage will show them as a slider.
          </p>
        </div>
        <Button type="button" onClick={addOffer} className="shrink-0 bg-[#061331] text-white hover:bg-[#061331]/95">
          <Plus className="h-4 w-4" />
          Add Offer
        </Button>
      </div>

      {offers.map((offer, offerIndex) => (
        <div key={offerIndex} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-black text-[#061331]">Offer {offerIndex + 1}</h4>
              <p className="mt-1 text-xs text-slate-500">{offer.badgeText} · {offer.intakeLabel}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeOffer(offerIndex)}
              disabled={offers.length <= 1}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Badge Text">
              <Input value={offer.badgeText} onChange={event => updateOffer(offerIndex, 'badgeText', event.target.value)} />
            </Field>
            <Field label="Intake Label">
              <Input value={offer.intakeLabel} onChange={event => updateOffer(offerIndex, 'intakeLabel', event.target.value)} />
            </Field>
          </div>

          <div className="space-y-1.5 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <Label>Countdown Deadline</Label>
            <Input
              type="datetime-local"
              value={toDateTimeLocal(offer.countdownTarget)}
              onChange={event => updateOffer(offerIndex, 'countdownTarget', fromDateTimeLocal(event.target.value))}
            />
            <p className="text-[11px] font-medium text-amber-700">
              Saved as a backend deadline. Refreshing keeps counting down to this exact date.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_0.7fr_1fr]">
            <Field label="Title Prefix">
              <Input value={offer.titlePrefix} onChange={event => updateOffer(offerIndex, 'titlePrefix', event.target.value)} />
            </Field>
            <Field label="Amount">
              <Input value={offer.scholarshipAmount} onChange={event => updateOffer(offerIndex, 'scholarshipAmount', event.target.value)} />
            </Field>
            <Field label="Title Suffix">
              <Input value={offer.titleSuffix} onChange={event => updateOffer(offerIndex, 'titleSuffix', event.target.value)} />
            </Field>
          </div>

          <Field label="Description">
            <Textarea rows={4} value={offer.description} onChange={event => updateOffer(offerIndex, 'description', event.target.value)} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="CTA Label">
              <Input value={offer.ctaLabel} onChange={event => updateOffer(offerIndex, 'ctaLabel', event.target.value)} />
            </Field>
            <Field label="CTA Link">
              <Input value={offer.ctaHref} onChange={event => updateOffer(offerIndex, 'ctaHref', event.target.value)} />
            </Field>
            <Field label="CTA Note">
              <Input value={offer.note} onChange={event => updateOffer(offerIndex, 'note', event.target.value)} />
            </Field>
            <Field label="Urgency Text">
              <Input value={offer.urgencyText} onChange={event => updateOffer(offerIndex, 'urgencyText', event.target.value)} />
            </Field>
          </div>

          <Field label="Benefits Title">
            <Input value={offer.benefitsTitle} onChange={event => updateOffer(offerIndex, 'benefitsTitle', event.target.value)} />
          </Field>

          <div className="space-y-3">
            <ListHeader title="Feature Chips" onAdd={() => addChip(offerIndex)} />
            {offer.featureChips.map((chip, chipIndex) => (
              <div key={`${chip.text}-${chipIndex}`} className="grid gap-2 sm:grid-cols-[160px_1fr_auto]">
                <select
                  value={chip.icon}
                  onChange={event => updateChip(offerIndex, chipIndex, 'icon', event.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                >
                  <option value="Award">Award</option>
                  <option value="ShieldCheck">Shield Check</option>
                  <option value="GraduationCap">Graduation Cap</option>
                </select>
                <Input value={chip.text} onChange={event => updateChip(offerIndex, chipIndex, 'text', event.target.value)} />
                <IconButton onClick={() => removeChip(offerIndex, chipIndex)} disabled={offer.featureChips.length <= 1} label="Remove chip" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <ListHeader title="Benefits" onAdd={() => addBenefit(offerIndex)} />
            {offer.benefits.map((benefit, benefitIndex) => (
              <div key={`${benefit}-${benefitIndex}`} className="flex gap-2">
                <Input value={benefit} onChange={event => updateBenefit(offerIndex, benefitIndex, event.target.value)} />
                <IconButton onClick={() => removeBenefit(offerIndex, benefitIndex)} disabled={offer.benefits.length <= 1} label="Remove benefit" />
              </div>
            ))}
          </div>
        </div>
      ))}
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

function ListHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label>{title}</Label>
      <Button type="button" variant="outline" size="sm" onClick={onAdd}>
        <Plus className="h-3.5 w-3.5" />
        Add
      </Button>
    </div>
  )
}

function IconButton({ onClick, disabled, label }: { onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className="h-10 w-10 shrink-0 text-red-600 hover:text-red-700"
      aria-label={label}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
