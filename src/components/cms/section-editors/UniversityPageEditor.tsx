'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Palette, Link2, Eye, Building, Star, Calendar, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from './CmsImageField'
import SeoFields from './SeoFields'
import ResponsivePreviewFrame, { PreviewViewportMode } from '../ResponsivePreviewFrame'
import { toast } from 'sonner'
import { slugify } from '@/lib/slug'

type UnivData = {
  _id: string
  name: string
  logo: string
  bannerImage?: string
  countryId: any // populated or ID
  city: string
  globalRanking?: number
  description?: string
  websiteUrl?: string
  cmsData?: Record<string, any>
}

type Props = {
  universityId: string
  onBack: () => void
}

function normalizeExternalUrl(value?: string) {
  const trimmed = value?.trim()
  if (!trimmed) return ''

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const url = new URL(candidate)
    return url.hostname.includes('.') ? url.toString() : ''
  } catch {
    return ''
  }
}

export default function UniversityPageEditor({ universityId, onBack }: Props) {
  const [data, setData] = useState<UnivData | null>(null)
  const [countries, setCountries] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'info' | 'details' | 'seo'>('info')
  const [isSaving, setIsSaving] = useState(false)
  const [viewportMode, setViewportMode] = useState<PreviewViewportMode>('laptop')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [univRes, countriesRes] = await Promise.all([
          fetch(`/api/admin/courses/universities/${universityId}`),
          fetch('/api/admin/courses/countries')
        ])

        const univJson = await univRes.json()
        const countriesJson = await countriesRes.json()

        if (countriesJson.countries) {
          setCountries(countriesJson.countries)
        }

        if (univRes.ok && univJson.university) {
          setData(univJson.university)
        } else {
          toast.error('Failed to load university details')
        }
      } catch (err) {
        toast.error('Failed to load university data')
      }
    }
    fetchData()
  }, [universityId])

  const handleSave = async () => {
    if (!data) return

    const countryId = data.countryId && typeof data.countryId === 'object'
      ? data.countryId._id
      : data.countryId

    if (!data.name.trim() || !data.logo.trim() || !countryId || !data.city.trim()) {
      toast.error('University name, logo, country, and city are required')
      return
    }

    const websiteUrl = normalizeExternalUrl(data.websiteUrl)
    if (data.websiteUrl?.trim() && !websiteUrl) {
      toast.error('Enter a valid university website URL, for example https://www.asu.edu')
      return
    }

    setIsSaving(true)
    try {
      // Clean up countryId to just save the string ID
      const payload = {
        name: data.name,
        logo: data.logo,
        bannerImage: data.bannerImage || '',
        countryId,
        city: data.city,
        globalRanking: data.globalRanking,
        description: data.description || '',
        websiteUrl,
        cmsData: data.cmsData || {},
      }

      const res = await fetch(`/api/admin/courses/universities/${universityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => null)
      if (res.ok) {
        setData(current => current ? { ...current, ...json.university } : current)
        toast.success('University profile updated successfully!')
      } else {
        toast.error(json?.error || `Failed to save changes (${res.status})`)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCmsDataChange = (key: string, val: any) => {
    if (!data) return
    setData({
      ...data,
      cmsData: {
        ...(data.cmsData || {}),
        [key]: val
      }
    })
  }

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center text-sm font-semibold text-slate-500 bg-slate-50">
        Loading University Editor...
      </div>
    )
  }

  // Get active country
  const selectedCountryId = data.countryId && typeof data.countryId === 'object'
    ? data.countryId._id
    : data.countryId
  const activeCountry = countries.find(c => c._id === selectedCountryId)
  const previewWebsiteUrl = normalizeExternalUrl(data.websiteUrl)

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-base font-bold text-slate-900">University Profile Designer</h1>
            <p className="text-xs text-slate-500">Customize logos, ranking badges, hero cover, and academic statistics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#061331] text-white hover:bg-slate-800 font-bold">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Design'}
          </Button>
        </div>
      </div>

      {/* Main split-screen panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column form */}
        <div className="w-1/2 flex flex-col border-r border-slate-200 bg-slate-100/50">
          <div className="flex border-b border-slate-200 text-xs font-bold bg-white overflow-x-auto whitespace-nowrap scrollbar-thin">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-5 py-3 border-b-2 transition shrink-0 ${activeTab === 'info' ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              General Info & Branding
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-5 py-3 border-b-2 transition shrink-0 ${activeTab === 'details' ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              Description & Statistics
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-5 py-3 border-b-2 transition shrink-0 ${activeTab === 'seo' ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              SEO
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'info' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">University Basic Information</h3>

                <div className="space-y-1">
                  <Label>University Name *</Label>
                  <Input
                    value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    placeholder="e.g. University of Oxford"
                    className="text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Country *</Label>
                    <select
                      value={selectedCountryId || ''}
                      onChange={e => setData({ ...data, countryId: e.target.value })}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                    >
                      <option value="">Select Country</option>
                      {countries.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>City *</Label>
                    <Input
                      value={data.city}
                      onChange={e => setData({ ...data, city: e.target.value })}
                      placeholder="e.g. Oxford"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>University Logo *</Label>
                  <CmsImageField
                    id="univ-logo"
                    label="Upload or Link Logo"
                    value={data.logo}
                    onChange={val => setData({ ...data, logo: val })}
                    folder="nextlevel/universities"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Cover Cover/Banner Image</Label>
                  <CmsImageField
                    id="univ-banner"
                    label="Upload or Link Cover Banner"
                    value={data.bannerImage || ''}
                    onChange={val => setData({ ...data, bannerImage: val })}
                    folder="nextlevel/universities"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Official Website URL</Label>
                  <Input
                    type="url"
                    value={data.websiteUrl || ''}
                    onChange={e => setData({ ...data, websiteUrl: e.target.value })}
                    placeholder="e.g. https://ox.ac.uk"
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Stats & Academic Description</h3>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label>Global Rank</Label>
                    <Input
                      type="number"
                      value={data.globalRanking || ''}
                      onChange={e => setData({ ...data, globalRanking: e.target.value ? Number(e.target.value) : undefined })}
                      placeholder="e.g. 10"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Established</Label>
                    <Input
                      value={data.cmsData?.established || ''}
                      onChange={e => handleCmsDataChange('established', e.target.value)}
                      placeholder="e.g. 1096"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Student Body</Label>
                    <Input
                      value={data.cmsData?.students || ''}
                      onChange={e => handleCmsDataChange('students', e.target.value)}
                      placeholder="e.g. 24,000+"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Main Profile Description</Label>
                  <Textarea
                    value={data.description || ''}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    rows={6}
                    placeholder="Provide a comprehensive summary of university campuses, academic excellence, faculties..."
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <SeoFields
                value={data.cmsData?.seo}
                onChange={value => handleCmsDataChange('seo', value)}
                folder="nextlevel/universities/seo"
                slug={data.cmsData?.slug || slugify(data.name)}
                basePath="/universities"
                onSlugChange={slug => handleCmsDataChange('slug', slug)}
              />
            )}
          </div>
        </div>

        {/* Right column live preview */}
        <div className="w-1/2 flex flex-col bg-slate-200/50 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Live Staging Preview</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setViewportMode('laptop')}
                className={`h-6 text-[10px] font-semibold transition ${viewportMode === 'laptop' ? 'bg-[#061331] text-white hover:bg-[#061331]/95' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Desktop
              </Button>
              <Button
                size="sm"
                onClick={() => setViewportMode('mobile')}
                className={`h-6 text-[10px] font-semibold transition ${viewportMode === 'mobile' ? 'bg-[#061331] text-white hover:bg-[#061331]/95' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Mobile
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg relative">
            <ResponsivePreviewFrame device={viewportMode}>
              <div className="min-h-full bg-white text-[#061331] font-sans pb-12">
                {/* Hero banner */}
                <section
                  className="relative h-64 bg-cover bg-center flex items-end p-6 before:absolute before:inset-0 before:bg-linear-to-t before:from-black/80 before:to-black/35"
                  style={{ backgroundImage: `url("${data.bannerImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200'}")` }}
                >
                  <div className="relative z-10 w-full text-white">
                    <span className="inline-block px-2 py-0.5 mb-2 text-[9px] font-bold text-amber-400 border border-amber-400/40 rounded bg-slate-900/80 uppercase tracking-widest">
                      🏛️ Partner University
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black">{data.name}</h1>
                    <p className="text-[10px] text-white/90 font-semibold mt-1">
                      📍 {data.city}, {activeCountry?.name || 'International'}
                    </p>
                  </div>
                </section>

                {/* Sub row with logo */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-[#fbfbfb]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded border border-slate-200 bg-white bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${data.logo}")` }} />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Official Code</p>
                      <p className="text-xs font-bold text-slate-800">{data.name.substring(0, 3).toUpperCase()}</p>
                    </div>
                  </div>
                  {previewWebsiteUrl && (
                    <a href={previewWebsiteUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold bg-[#061331] text-white hover:bg-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Link2 className="h-3 w-3" /> Visit Website
                    </a>
                  )}
                </div>

                {/* Quick stats */}
                <div className="p-6 grid grid-cols-3 gap-2 bg-[#f4f7f6] border-b border-slate-100 text-center">
                  <div className="bg-white p-2 rounded border border-slate-200/50 shadow-2xs">
                    <Star className="h-4 w-4 mx-auto mb-1 text-amber-500" />
                    <p className="text-[9px] text-slate-400 font-bold uppercase">World Rank</p>
                    <p className="text-xs font-black text-slate-800">#{data.globalRanking || 'Unlisted'}</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200/50 shadow-2xs">
                    <Calendar className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Established</p>
                    <p className="text-xs font-black text-slate-800">{data.cmsData?.established || 'N/A'}</p>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200/50 shadow-2xs">
                    <Users className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Students</p>
                    <p className="text-xs font-black text-slate-800">{data.cmsData?.students || '10,000+'}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">About the University</h3>
                  <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{data.description || 'Welcome description is currently empty. Edit settings to populate profile details.'}</p>
                </div>
              </div>
            </ResponsivePreviewFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
