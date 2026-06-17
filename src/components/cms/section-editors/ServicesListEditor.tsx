'use client'

import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { ServicesListSection } from '@/lib/cms/types'
import CmsImageField from './CmsImageField'

interface ServicesListEditorProps {
  section: ServicesListSection
  onChange: (section: ServicesListSection) => void
}

export default function ServicesListEditor({
  section,
  onChange,
}: ServicesListEditorProps) {
  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = section.services.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    )
    onChange({
      ...section,
      services: updatedServices,
    })
  }

  const updateServiceArray = (index: number, field: string, value: string[]) => {
    const updatedServices = section.services.map((service, i) =>
      i === index ? { ...service, [field]: value } : service
    )
    onChange({
      ...section,
      services: updatedServices,
    })
  }

  const addArrayItem = (serviceIndex: number, field: 'benefits' | 'process' | 'outcomes') => {
    const updatedServices = section.services.map((service, i) => {
      if (i === serviceIndex) {
        return {
          ...service,
          [field]: [...(service[field] || []), ''],
        }
      }
      return service
    })
    onChange({
      ...section,
      services: updatedServices,
    })
  }

  const removeArrayItem = (serviceIndex: number, field: 'benefits' | 'process' | 'outcomes', itemIndex: number) => {
    const updatedServices = section.services.map((service, i) => {
      if (i === serviceIndex) {
        return {
          ...service,
          [field]: (service[field] || []).filter((_: string, idx: number) => idx !== itemIndex),
        }
      }
      return service
    })
    onChange({
      ...section,
      services: updatedServices,
    })
  }

  const updateArrayItem = (
    serviceIndex: number,
    field: 'benefits' | 'process' | 'outcomes',
    itemIndex: number,
    value: string
  ) => {
    const updatedServices = section.services.map((service, i) => {
      if (i === serviceIndex) {
        return {
          ...service,
          [field]: (service[field] || []).map((item: string, idx: number) =>
            idx === itemIndex ? value : item
          ),
        }
      }
      return service
    })
    onChange({
      ...section,
      services: updatedServices,
    })
  }

  return (
    <div className="space-y-8">
      {section.services.map((service, serviceIndex) => (
        <div
          key={`${service.slug}-${serviceIndex}`}
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 -mx-5 px-5">
            <h3 className="text-sm font-bold text-slate-900">
              Service {serviceIndex + 1}: {service.title || 'Untitled'}
            </h3>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Slug</Label>
                <Input
                  value={service.slug}
                  onChange={e => updateService(serviceIndex, 'slug', e.target.value)}
                  placeholder="e.g., student-counselling"
                  disabled
                  className="bg-slate-100 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Service Number</Label>
                <Input
                  value={service.number}
                  onChange={e => updateService(serviceIndex, 'number', e.target.value)}
                  placeholder="01"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Title</Label>
              <Input
                value={service.title}
                onChange={e => updateService(serviceIndex, 'title', e.target.value)}
                placeholder="Service title"
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Short Description</Label>
              <Textarea
                value={service.shortDesc}
                onChange={e => updateService(serviceIndex, 'shortDesc', e.target.value)}
                placeholder="Brief description for cards"
                rows={2}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Full Description</Label>
              <Textarea
                value={service.description}
                onChange={e => updateService(serviceIndex, 'description', e.target.value)}
                placeholder="Full description"
                rows={3}
                className="text-xs"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Stats Badge</Label>
                <Input
                  value={service.stats}
                  onChange={e => updateService(serviceIndex, 'stats', e.target.value)}
                  placeholder="e.g., 98% Success"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Hero Image</Label>
              <CmsImageField
                id={`service-image-${serviceIndex}`}
                label="Upload service image"
                value={service.image}
                folder="nextlevel/services"
                onChange={value => updateService(serviceIndex, 'image', value)}
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold">Benefits</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem(serviceIndex, 'benefits')}
                className="h-7 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {(service.benefits || []).map((benefit, idx) => (
                <div key={`benefit-${idx}`} className="flex gap-2">
                  <Textarea
                    value={typeof benefit === 'string' ? benefit : benefit?.title || ''}
                    onChange={e => updateArrayItem(serviceIndex, 'benefits', idx, e.target.value)}
                    placeholder="Benefit description"
                    rows={1}
                    className="text-xs flex-1"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeArrayItem(serviceIndex, 'benefits', idx)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold">Process Steps</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem(serviceIndex, 'process')}
                className="h-7 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {(service.process || []).map((step, idx) => (
                <div key={`process-${idx}`} className="flex gap-2">
                  <Textarea
                    value={typeof step === 'string' ? step : step?.title || ''}
                    onChange={e => updateArrayItem(serviceIndex, 'process', idx, e.target.value)}
                    placeholder="Process step"
                    rows={1}
                    className="text-xs flex-1"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeArrayItem(serviceIndex, 'process', idx)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold">Expected Outcomes</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem(serviceIndex, 'outcomes')}
                className="h-7 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {(service.outcomes || []).map((outcome, idx) => (
                <div key={`outcome-${idx}`} className="flex gap-2">
                  <Textarea
                    value={typeof outcome === 'string' ? outcome : outcome?.title || ''}
                    onChange={e => updateArrayItem(serviceIndex, 'outcomes', idx, e.target.value)}
                    placeholder="Expected outcome"
                    rows={1}
                    className="text-xs flex-1"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeArrayItem(serviceIndex, 'outcomes', idx)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
