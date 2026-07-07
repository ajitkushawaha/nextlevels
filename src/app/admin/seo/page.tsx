'use client'

import { useEffect, useMemo, useState } from 'react'
import { Save, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from '@/components/cms/section-editors/CmsImageField'

type SeoPage = {
  title: string
  slug: string
  description?: string
  status?: string
  order?: number
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  featuredImage?: string
  ogTitle?: string
  ogDescription?: string
  canonical?: string
  robots?: string
}

export default function AdminSeoPage() {
  const [pages, setPages] = useState<SeoPage[]>([])
  const [activeSlug, setActiveSlug] = useState('')
  const [draft, setDraft] = useState<SeoPage | null>(null)
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState(false)

  const filteredPages = useMemo(() => {
    const search = query.toLowerCase().trim()
    if (!search) return pages
    return pages.filter(page =>
      `${page.title} ${page.slug}`.toLowerCase().includes(search)
    )
  }, [pages, query])

  const activePage = useMemo(
    () => pages.find(page => page.slug === activeSlug),
    [activeSlug, pages]
  )

  useEffect(() => {
    async function loadPages() {
      try {
        const res = await fetch('/api/admin/seo-pages')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Unable to load SEO pages')
        const loadedPages = data.pages || []
        setPages(loadedPages)
        setActiveSlug(loadedPages[0]?.slug || '')
        setDraft(loadedPages[0] || null)
      } catch (error: any) {
        toast.error(error.message || 'Unable to load SEO pages')
      }
    }

    loadPages()
  }, [])

  useEffect(() => {
    if (activePage) setDraft(activePage)
  }, [activePage])

  const updateDraft = (key: keyof SeoPage, value: string) => {
    if (!draft) return
    setDraft({ ...draft, [key]: value })
  }

  const savePage = async () => {
    if (!draft) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/seo-pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: draft }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to save SEO page')

      setPages(current =>
        current.map(page =>
          page.slug === draft.slug || page.slug === data.page.slug ? { ...page, ...data.page } : page
        )
      )
      setActiveSlug(data.page.slug || '')
      setDraft(data.page)
      toast.success('SEO settings saved')
    } catch (error: any) {
      toast.error(error.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">SEO Manager</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage dynamic meta tags, Open Graph images, canonicals and robots per page.
          </p>
        </div>
        <Button onClick={savePage} disabled={!draft || saving} className="bg-[#061331] text-white hover:bg-[#081638]">
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save SEO'}
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="rounded-md border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">Pages</CardTitle>
            <CardDescription>Select a page to edit SEO.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="pl-9" placeholder="Search pages..." value={query} onChange={event => setQuery(event.target.value)} />
            </div>
            <div className="space-y-2">
              {filteredPages.map(page => (
                <button
                  key={page.slug}
                  onClick={() => setActiveSlug(page.slug)}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                    activeSlug === page.slug
                      ? 'border-[#d7a23a] bg-[#d7a23a]/10 text-[#081638]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-[#d7a23a]/60'
                  }`}
                >
                  <span className="block">{page.title || 'Untitled'}</span>
                  <span className="mt-0.5 block text-[11px] font-medium text-slate-400">
                    /{page.slug}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-md border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-sm">Page SEO</CardTitle>
            <CardDescription>Recommended: title 50-60 chars, description 140-160 chars.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 p-5 md:grid-cols-2">
            {!draft ? (
              <p className="text-sm text-slate-500">Select a page to edit.</p>
            ) : (
              <>
                <Field label="Page Title">
                  <Input value={draft.title || ''} onChange={event => updateDraft('title', event.target.value)} />
                </Field>
                <Field label="Page Slug / Path">
                  <Input value={draft.slug || ''} onChange={event => updateDraft('slug', event.target.value.replace(/^\/+/, ''))} />
                </Field>
                <Field label={`Meta Title (${(draft.metaTitle || '').length})`}>
                  <Input value={draft.metaTitle || ''} onChange={event => updateDraft('metaTitle', event.target.value)} />
                </Field>
                <Field label="Robots">
                  <Input placeholder="index, follow" value={draft.robots || ''} onChange={event => updateDraft('robots', event.target.value)} />
                </Field>
                <Field label="Canonical URL">
                  <Input value={draft.canonical || ''} onChange={event => updateDraft('canonical', event.target.value)} />
                </Field>
                <Field label="Meta Keywords">
                  <Input value={draft.metaKeywords || ''} onChange={event => updateDraft('metaKeywords', event.target.value)} />
                </Field>
                <Field label="Status">
                  <Input value={draft.status || 'active'} onChange={event => updateDraft('status', event.target.value)} />
                </Field>
                <Field label={`Meta Description (${(draft.metaDescription || '').length})`}>
                  <Textarea rows={4} value={draft.metaDescription || ''} onChange={event => updateDraft('metaDescription', event.target.value)} />
                </Field>
                <Field label="OG Title">
                  <Input value={draft.ogTitle || ''} onChange={event => updateDraft('ogTitle', event.target.value)} />
                </Field>
                <Field label="OG Description">
                  <Textarea rows={4} value={draft.ogDescription || ''} onChange={event => updateDraft('ogDescription', event.target.value)} />
                </Field>
                <Field label="Internal Description / Notes">
                  <Textarea rows={4} value={draft.description || ''} onChange={event => updateDraft('description', event.target.value)} />
                </Field>
                <div className="md:col-span-2">
                  <CmsImageField
                    id="seo-og-image"
                    label="Open Graph Image"
                    value={draft.featuredImage || ''}
                    onChange={value => updateDraft('featuredImage', value)}
                    folder="nextlevel/seo"
                    placeholder="Paste OG image URL/path or upload"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
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
