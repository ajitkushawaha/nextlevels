'use client'

import { useEffect, useMemo, useState } from 'react'
import { Save, RefreshCw, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from '@/components/cms/section-editors/CmsImageField'

type BranchEditorData = {
  slug: string
  city: string
  province: string
  seoTitle: string
  metaDescription: string
  heroImage: string
  intro: string[]
  destinations: string[]
  address: string
  phone: string
  email: string
  workingHours: string
  mapQuery: string
  areas: Array<{
    name: string
    title: string
    description: string
  }>
  stories: Array<{
    name: string
    country: string
    university: string
    image: string
    quote: string
  }>
  team: Array<{
    name: string
    designation: string
    image: string
  }>
  gallery: Array<{
    title: string
    image: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

type ArrayField = 'areas' | 'stories' | 'team' | 'gallery' | 'faqs'

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<BranchEditorData[]>([])
  const [activeSlug, setActiveSlug] = useState('')
  const [draft, setDraft] = useState<BranchEditorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const activeBranch = useMemo(
    () => branches.find(branch => branch.slug === activeSlug),
    [activeSlug, branches]
  )

  useEffect(() => {
    let mounted = true

    async function loadBranches() {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/branches')
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Unable to load branches')
        if (!mounted) return
        const data = json.branches || []
        setBranches(data)
        setActiveSlug(data[0]?.slug || '')
        setDraft(data[0] || null)
      } catch (error: any) {
        toast.error(error.message || 'Unable to load branches')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadBranches()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (activeBranch) setDraft(activeBranch)
  }, [activeBranch])

  const updateField = (field: keyof BranchEditorData, value: string) => {
    if (!draft) return
    if (
      field === 'intro' ||
      field === 'destinations' ||
      field === 'areas' ||
      field === 'stories' ||
      field === 'team' ||
      field === 'gallery' ||
      field === 'faqs'
    ) return
    setDraft({ ...draft, [field]: value })
  }

  const updateArrayItem = (
    field: ArrayField,
    index: number,
    key: string,
    value: string
  ) => {
    if (!draft) return
    const items = [...((draft[field] || []) as any[])]
    items[index] = { ...(items[index] || {}), [key]: value }
    setDraft({ ...draft, [field]: items })
  }

  const addArrayItem = (field: ArrayField, item: any) => {
    if (!draft) return
    setDraft({ ...draft, [field]: [...((draft[field] || []) as any[]), item] })
  }

  const removeArrayItem = (field: ArrayField, index: number) => {
    if (!draft) return
    setDraft({ ...draft, [field]: ((draft[field] || []) as any[]).filter((_, itemIndex) => itemIndex !== index) })
  }

  const saveBranch = async () => {
    if (!draft) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/branches', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch: draft }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unable to save branch')

      setBranches(current =>
        current.map(branch => (branch.slug === draft.slug ? { ...branch, ...draft } : branch))
      )
      toast.success('Branch content saved')
    } catch (error: any) {
      toast.error(error.message || 'Unable to save branch')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Branch CMS</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage branch page hero, contact details, address and map content.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="rounded-md border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">Branches</CardTitle>
            <CardDescription>Select a branch to edit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <p className="text-sm text-slate-500">Loading branches...</p>
            ) : (
              branches.map(branch => (
                <button
                  key={branch.slug}
                  onClick={() => setActiveSlug(branch.slug)}
                  className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                    activeSlug === branch.slug
                      ? 'border-[#d7a23a] bg-[#d7a23a]/10 text-[#081638]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-[#d7a23a]/60'
                  }`}
                >
                  <MapPin className="h-4 w-4 text-[#d7a23a]" />
                  {branch.city}
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-md border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-sm">Branch Details</CardTitle>
            <CardDescription>Changes update the database branch record.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 p-5 md:grid-cols-2">
            {!draft ? (
              <p className="text-sm text-slate-500">Select a branch to edit.</p>
            ) : (
              <>
                <Field label="City" value={draft.city} onChange={value => updateField('city', value)} />
                <Field label="Province" value={draft.province} onChange={value => updateField('province', value)} />
                <Field label="Phone" value={draft.phone} onChange={value => updateField('phone', value)} />
                <Field label="Email" value={draft.email} onChange={value => updateField('email', value)} />
                <Field label="Working Hours" value={draft.workingHours} onChange={value => updateField('workingHours', value)} />
                <div className="md:col-span-2">
                  <CmsImageField
                    id="branch-hero-image"
                    label="Hero Image"
                    value={draft.heroImage || ''}
                    onChange={value => updateField('heroImage', value)}
                    folder="nextlevel/branches"
                    placeholder="Paste an image URL/path or upload a branch hero image"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Address</Label>
                  <Textarea value={draft.address} onChange={event => updateField('address', event.target.value)} rows={3} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Map Query</Label>
                  <Input value={draft.mapQuery} onChange={event => updateField('mapQuery', event.target.value)} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>SEO Title</Label>
                  <Input value={draft.seoTitle} onChange={event => updateField('seoTitle', event.target.value)} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Meta Description</Label>
                  <Textarea value={draft.metaDescription} onChange={event => updateField('metaDescription', event.target.value)} rows={3} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Intro Paragraphs</Label>
                  <Textarea
                    value={draft.intro.join('\n\n')}
                    onChange={event =>
                      setDraft({
                        ...draft,
                        intro: event.target.value.split(/\n\s*\n/).map(item => item.trim()).filter(Boolean),
                      })
                    }
                    rows={8}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Destinations</Label>
                  <Input
                    value={draft.destinations.join(', ')}
                    onChange={event =>
                      setDraft({
                        ...draft,
                        destinations: event.target.value.split(',').map(item => item.trim()).filter(Boolean),
                      })
                    }
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label>Service Areas</Label>
                      <p className="mt-1 text-xs text-slate-500">Manage local guidance cards on the branch page.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('areas', { name: '', title: '', description: '' })}
                    >
                      Add Area
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(draft.areas || []).map((area, index) => (
                      <div key={`${area.name}-${index}`} className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 md:grid-cols-2">
                        <Field label="Area Name" value={area.name} onChange={value => updateArrayItem('areas', index, 'name', value)} />
                        <Field label="Title" value={area.title} onChange={value => updateArrayItem('areas', index, 'title', value)} />
                        <div className="space-y-1.5 md:col-span-2">
                          <Label>Description</Label>
                          <Textarea value={area.description} onChange={event => updateArrayItem('areas', index, 'description', event.target.value)} rows={3} />
                        </div>
                        <div className="md:col-span-2">
                          <Button type="button" variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => removeArrayItem('areas', index)}>
                            Remove Area
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label>Student Stories</Label>
                      <p className="mt-1 text-xs text-slate-500">Manage branch success story cards.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('stories', { name: '', country: '', university: '', image: '/home2/happy-gi.png', quote: '' })}
                    >
                      Add Story
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(draft.stories || []).map((story, index) => (
                      <div key={`${story.name}-${index}`} className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 md:grid-cols-3">
                        <Field label="Student Name" value={story.name} onChange={value => updateArrayItem('stories', index, 'name', value)} />
                        <Field label="Country" value={story.country} onChange={value => updateArrayItem('stories', index, 'country', value)} />
                        <Field label="University" value={story.university} onChange={value => updateArrayItem('stories', index, 'university', value)} />
                        <div className="md:col-span-3">
                          <CmsImageField
                            id={`story-image-${index}`}
                            label="Story Image"
                            value={story.image || ''}
                            onChange={value => updateArrayItem('stories', index, 'image', value)}
                            folder="nextlevel/branches/stories"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-3">
                          <Label>Quote</Label>
                          <Textarea value={story.quote} onChange={event => updateArrayItem('stories', index, 'quote', event.target.value)} rows={3} />
                        </div>
                        <div className="md:col-span-3">
                          <Button type="button" variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => removeArrayItem('stories', index)}>
                            Remove Story
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label>Branch Team</Label>
                      <p className="mt-1 text-xs text-slate-500">Manage staff shown on the public branch page.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('team', { name: '', designation: '', image: '/service/team1.png' })}
                    >
                      Add Member
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(draft.team || []).map((member, index) => (
                      <div key={`${member.name}-${index}`} className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
                        <Field
                          label="Name"
                          value={member.name}
                          onChange={value => updateArrayItem('team', index, 'name', value)}
                        />
                        <Field
                          label="Role"
                          value={member.designation}
                          onChange={value => updateArrayItem('team', index, 'designation', value)}
                        />
                        <CmsImageField
                          id={`team-image-${index}`}
                          label="Image"
                          value={member.image || ''}
                          onChange={value => updateArrayItem('team', index, 'image', value)}
                          folder="nextlevel/branches/team"
                        />
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full border-rose-200 text-rose-600 hover:bg-rose-50"
                            onClick={() => removeArrayItem('team', index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label>Gallery</Label>
                      <p className="mt-1 text-xs text-slate-500">Manage branch gallery images.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('gallery', { title: '', image: '/about-team-counselling.png' })}
                    >
                      Add Image
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(draft.gallery || []).map((item, index) => (
                      <div key={`${item.title}-${index}`} className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_2fr_auto]">
                        <Field label="Title" value={item.title} onChange={value => updateArrayItem('gallery', index, 'title', value)} />
                        <CmsImageField
                          id={`gallery-image-${index}`}
                          label="Image"
                          value={item.image || ''}
                          onChange={value => updateArrayItem('gallery', index, 'image', value)}
                          folder="nextlevel/branches/gallery"
                        />
                        <div className="flex items-end">
                          <Button type="button" variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => removeArrayItem('gallery', index)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label>FAQs</Label>
                      <p className="mt-1 text-xs text-slate-500">Manage branch FAQ accordion content.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('faqs', { question: '', answer: '' })}
                    >
                      Add FAQ
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(draft.faqs || []).map((faq, index) => (
                      <div key={`${faq.question}-${index}`} className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                        <Field label="Question" value={faq.question} onChange={value => updateArrayItem('faqs', index, 'question', value)} />
                        <div className="space-y-1.5">
                          <Label>Answer</Label>
                          <Textarea value={faq.answer} onChange={event => updateArrayItem('faqs', index, 'answer', event.target.value)} rows={3} />
                        </div>
                        <div>
                          <Button type="button" variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => removeArrayItem('faqs', index)}>
                            Remove FAQ
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 md:col-span-2">
                  <Button onClick={saveBranch} disabled={saving} className="bg-[#081638] text-white hover:bg-[#0d2256]">
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Branch'}
                  </Button>
                  <Button variant="outline" onClick={() => activeBranch && setDraft(activeBranch)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value || ''} onChange={event => onChange(event.target.value)} />
    </div>
  )
}
