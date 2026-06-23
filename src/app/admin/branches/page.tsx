'use client'

import { useEffect, useMemo, useState } from 'react'
import { Save, RefreshCw, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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
}

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
    if (field === 'intro' || field === 'destinations') return
    setDraft({ ...draft, [field]: value })
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
                <Field label="Hero Image" value={draft.heroImage} onChange={value => updateField('heroImage', value)} />
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
