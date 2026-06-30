'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from './CmsImageField'

type SeoValue = {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  robots?: string
}

type SeoFieldsProps = {
  value?: SeoValue
  onChange: (value: SeoValue) => void
  folder: string
  slug?: string
  basePath?: string
  onSlugChange?: (slug: string) => void
}

export default function SeoFields({ value = {}, onChange, folder, slug, basePath, onSlugChange }: SeoFieldsProps) {
  const update = (key: keyof SeoValue, nextValue: string) => {
    onChange({ ...value, [key]: nextValue })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-slate-800">SEO Settings</h3>
        <p className="mt-1 text-xs text-slate-500">
          Control search result text, social sharing image, canonical URL, and indexing rule.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {typeof slug === 'string' && basePath ? (
          <div className="space-y-1 sm:col-span-2">
            <Label>Page Slug</Label>
            <Input
              value={slug}
              onChange={event => onSlugChange?.(
                event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9_-]+/g, '-')
              )}
              className="font-mono text-xs"
            />
            <p className="text-[11px] text-slate-400">
              Public URL: {basePath}/{slug || 'your-slug'}
            </p>
          </div>
        ) : null}
        <div className="space-y-1">
          <Label>Meta Title</Label>
          <Input value={value.metaTitle || ''} onChange={event => update('metaTitle', event.target.value)} className="text-xs" />
        </div>
        <div className="space-y-1">
          <Label>Robots</Label>
          <Input placeholder="index, follow" value={value.robots || ''} onChange={event => update('robots', event.target.value)} className="text-xs" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>Meta Description</Label>
          <Textarea rows={3} value={value.metaDescription || ''} onChange={event => update('metaDescription', event.target.value)} className="text-xs" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>Meta Keywords</Label>
          <Input placeholder="study abroad, student visa, university admissions" value={value.metaKeywords || ''} onChange={event => update('metaKeywords', event.target.value)} className="text-xs" />
        </div>
        <div className="space-y-1">
          <Label>OG Title</Label>
          <Input value={value.ogTitle || ''} onChange={event => update('ogTitle', event.target.value)} className="text-xs" />
        </div>
        <div className="space-y-1">
          <Label>Canonical URL</Label>
          <Input placeholder={basePath && slug ? `${basePath}/${slug}` : '/page-url'} value={value.canonical || ''} onChange={event => update('canonical', event.target.value)} className="text-xs" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>OG Description</Label>
          <Textarea rows={2} value={value.ogDescription || ''} onChange={event => update('ogDescription', event.target.value)} className="text-xs" />
        </div>
        <div className="sm:col-span-2">
          <CmsImageField
            id={`${folder.replace(/[^a-z0-9]/gi, '-')}-og-image`}
            label="OG Image"
            value={value.ogImage || ''}
            onChange={nextValue => update('ogImage', nextValue)}
            folder={folder}
          />
        </div>
      </div>
    </div>
  )
}
