'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from './CmsImageField'
import type { ServiceDetail, ServiceCardDetail } from '@/lib/serviceDetails'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface ServiceDetailFormEditorProps {
  data: ServiceDetail
  onChange: (data: ServiceDetail) => void
}

export default function ServiceDetailFormEditor({
  data,
  onChange,
}: ServiceDetailFormEditorProps) {
  // Helper to update top-level text fields
  const setField = (key: keyof ServiceDetail, value: any) => {
    onChange({
      ...data,
      [key]: value,
    })
  }

  const defaultDescriptions = {
    benefits: [
      'We evaluate your academic background, interests, and goals to match you with the right courses and universities.',
      'Our experts refine your documents for clarity, impact, and a strong reflection of your goals.',
      'We streamline your applications through our partner network to reduce waiting time and speed up the process.',
      'We follow up directly with universities and support you until you receive your offer letter.',
    ],
    process: [
      'We understand your profile, aspirations, and budget to create a strong foundation.',
      'We research and recommend the best-fit universities and programs for you.',
      'We help you create compelling documents that highlight your strengths and goals.',
      'We submit applications, track progress, and follow up until you get the offer.',
    ],
    outcomes: [
      'A focused list of right-fit options that match your profile.',
      'Well-prepared, polished, and university-ready application documents.',
      'Improved chances with the right strategy and fewer setbacks.',
      'A smooth, guided process that saves time and brings peace of mind.',
    ],
  }

  // Normalize a section array to objects
  const getNormalizedCards = (
    field: 'benefits' | 'process' | 'outcomes',
    prefix: string
  ): ServiceCardDetail[] => {
    const rawList = data[field] || []
    return Array.from({ length: 4 }).map((_, idx) => {
      const item = rawList[idx]
      if (!item || typeof item === 'string') {
        const title = typeof item === 'string' ? item : `Card ${idx + 1}`
        return {
          title,
          description: defaultDescriptions[field][idx] || '',
          image: `/service/${prefix}-${idx + 1}.png`,
          iconName: field === 'benefits' ? '' : undefined,
        }
      }
      return {
        title: item.title || '',
        description: item.description || '',
        image: item.image || `/service/${prefix}-${idx + 1}.png`,
        iconName: item.iconName || '',
      }
    })
  }

  const handleCardChange = (
    field: 'benefits' | 'process' | 'outcomes',
    idx: number,
    cardKey: keyof ServiceCardDetail,
    value: string
  ) => {
    const normalized = getNormalizedCards(field, field === 'benefits' ? 'cover' : field === 'process' ? 'process' : 'outcome')
    normalized[idx] = {
      ...normalized[idx],
      [cardKey]: value,
    }
    setField(field, normalized)
  }

  const benefitsCards = getNormalizedCards('benefits', 'cover')
  const processCards = getNormalizedCards('process', 'process')
  const outcomesCards = getNormalizedCards('outcomes', 'outcome')

  const coverIconsOptions = [
    { label: 'User Round', value: 'UserRound' },
    { label: 'Pen Line', value: 'PenLine' },
    { label: 'Rocket', value: 'Rocket' },
    { label: 'Phone Call', value: 'PhoneCall' },
    { label: 'Graduation Cap', value: 'GraduationCap' },
    { label: 'Map Pin', value: 'MapPin' },
    { label: 'Shield Check', value: 'ShieldCheck' },
    { label: 'Wallet', value: 'Wallet' },
    { label: 'Compass', value: 'Compass' },
    { label: 'Sparkles', value: 'Sparkles' },
  ]

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="service-title-input" className="text-xs">Title</Label>
            <Input
              id="service-title-input"
              value={data.title || ''}
              onChange={e => setField('title', e.target.value)}
              className="text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="service-stats-input" className="text-xs">Stats / Badge text</Label>
            <Input
              id="service-stats-input"
              value={data.stats || ''}
              onChange={e => setField('stats', e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="service-short-desc-input" className="text-xs">Short Description</Label>
          <Textarea
            id="service-short-desc-input"
            value={data.shortDesc || ''}
            onChange={e => setField('shortDesc', e.target.value)}
            rows={2}
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="service-desc-input" className="text-xs">Full Description</Label>
          <Textarea
            id="service-desc-input"
            value={data.description || ''}
            onChange={e => setField('description', e.target.value)}
            rows={4}
            className="text-xs"
          />
        </div>
      </div>

      {/* Cards Accordion */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4 font-serif">Page Sections</h3>
        <Accordion type="single" collapsible className="w-full text-xs">
          
          {/* What We Cover */}
          <AccordionItem value="what-we-cover" className="border-slate-200">
            <AccordionTrigger className="text-slate-800 font-bold hover:no-underline py-3">
              What We Cover (Benefits)
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-3">
              {benefitsCards.map((card, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Card {idx + 1}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-slate-500">Heading</Label>
                      <Input
                        value={card.title}
                        onChange={e => handleCardChange('benefits', idx, 'title', e.target.value)}
                        className="text-xs bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-slate-500">Icon</Label>
                      <select
                        value={card.iconName || 'HelpCircle'}
                        onChange={e => handleCardChange('benefits', idx, 'iconName', e.target.value)}
                        className="w-full h-9 border border-slate-200 rounded-md bg-white text-xs px-2.5"
                      >
                        {coverIconsOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Description</Label>
                    <Textarea
                      value={card.description}
                      onChange={e => handleCardChange('benefits', idx, 'description', e.target.value)}
                      rows={2}
                      className="text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Image</Label>
                    <CmsImageField
                      id={`benefit-img-${idx}`}
                      label="Select Card Image"
                      value={card.image || ''}
                      folder="nextlevel/services"
                      onChange={val => handleCardChange('benefits', idx, 'image', val)}
                    />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Our Process */}
          <AccordionItem value="our-process" className="border-slate-200">
            <AccordionTrigger className="text-slate-800 font-bold hover:no-underline py-3">
              Our Process
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-3">
              {processCards.map((card, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Step {idx + 1}</span>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Heading</Label>
                    <Input
                      value={card.title}
                      onChange={e => handleCardChange('process', idx, 'title', e.target.value)}
                      className="text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Description</Label>
                    <Textarea
                      value={card.description}
                      onChange={e => handleCardChange('process', idx, 'description', e.target.value)}
                      rows={2}
                      className="text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Image</Label>
                    <CmsImageField
                      id={`process-img-${idx}`}
                      label="Select Step Image"
                      value={card.image || ''}
                      folder="nextlevel/services"
                      onChange={val => handleCardChange('process', idx, 'image', val)}
                    />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Expected Outcomes */}
          <AccordionItem value="expected-outcomes" className="border-slate-200">
            <AccordionTrigger className="text-slate-800 font-bold hover:no-underline py-3">
              Expected Outcomes
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-3">
              {outcomesCards.map((card, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Outcome {idx + 1}</span>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Heading</Label>
                    <Input
                      value={card.title}
                      onChange={e => handleCardChange('outcomes', idx, 'title', e.target.value)}
                      className="text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Description</Label>
                    <Textarea
                      value={card.description}
                      onChange={e => handleCardChange('outcomes', idx, 'description', e.target.value)}
                      rows={2}
                      className="text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-slate-500">Image</Label>
                    <CmsImageField
                      id={`outcome-img-${idx}`}
                      label="Select Outcome Image"
                      value={card.image || ''}
                      folder="nextlevel/services"
                      onChange={val => handleCardChange('outcomes', idx, 'image', val)}
                    />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  )
}
