'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Palette, Globe, Landmark, BookOpen, FileCheck, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ResponsivePreviewFrame, { PreviewViewportMode } from '../ResponsivePreviewFrame'
import { toast } from 'sonner'

type ScholarshipData = {
  _id: string
  title: string
  awardAmount: string
  eligibilityCriteria?: string
  description?: string
  countryId?: any
  universityId?: any
  programId?: any
}

type Props = {
  scholarshipId: string
  onBack: () => void
}

export default function ScholarshipPageEditor({ scholarshipId, onBack }: Props) {
  const [data, setData] = useState<ScholarshipData | null>(null)
  const [countries, setCountries] = useState<any[]>([])
  const [universities, setUniversities] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'info' | 'scope'>('info')
  const [isSaving, setIsSaving] = useState(false)
  const [viewportMode, setViewportMode] = useState<PreviewViewportMode>('laptop')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scholRes, countriesRes, univRes, progRes] = await Promise.all([
          fetch(`/api/admin/courses/scholarships/${scholarshipId}`),
          fetch('/api/admin/courses/countries'),
          fetch('/api/admin/courses/universities'),
          fetch('/api/admin/courses/programs')
        ])

        const scholJson = await scholRes.json()
        const countriesJson = await countriesRes.json()
        const univJson = await univRes.json()
        const progJson = await progRes.json()

        if (countriesJson.countries) setCountries(countriesJson.countries)
        if (univJson.universities) setUniversities(univJson.universities)
        if (progJson.programs) setPrograms(progJson.programs)

        if (scholRes.ok && scholJson.scholarship) {
          setData(scholJson.scholarship)
        } else {
          toast.error('Failed to load scholarship details')
        }
      } catch (err) {
        toast.error('Failed to load scholarship data')
      }
    }
    fetchData()
  }, [scholarshipId])

  const handleSave = async () => {
    if (!data) return
    setIsSaving(true)
    try {
      const payload = {
        ...data,
        countryId: typeof data.countryId === 'object' ? data.countryId?._id || undefined : data.countryId || undefined,
        universityId: typeof data.universityId === 'object' ? data.universityId?._id || undefined : data.universityId || undefined,
        programId: typeof data.programId === 'object' ? data.programId?._id || undefined : data.programId || undefined
      }

      const res = await fetch(`/api/admin/courses/scholarships/${scholarshipId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success('Scholarship details updated successfully!')
      } else {
        toast.error(json.error || 'Failed to save changes')
      }
    } catch (err) {
      toast.error('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center text-sm font-semibold text-slate-500 bg-slate-50">
        Loading Scholarship Editor...
      </div>
    )
  }

  const selectedCountryId = typeof data.countryId === 'object' ? data.countryId?._id : data.countryId
  const activeCountry = countries.find(c => c._id === selectedCountryId)

  const selectedUnivId = typeof data.universityId === 'object' ? data.universityId?._id : data.universityId
  const activeUniv = universities.find(u => u._id === selectedUnivId)

  const selectedProgId = typeof data.programId === 'object' ? data.programId?._id : data.programId
  const activeProg = programs.find(p => p._id === selectedProgId)

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-base font-bold text-slate-900">Scholarship Visual Designer</h1>
            <p className="text-xs text-slate-500">Configure award value, criteria, guidelines, and targeted institutions</p>
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
              General Info & Details
            </button>
            <button
              onClick={() => setActiveTab('scope')}
              className={`px-5 py-3 border-b-2 transition shrink-0 ${activeTab === 'scope' ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              Applicability & Targeting
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'info' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Scholarship Information</h3>

                <div className="space-y-1">
                  <Label>Scholarship Title *</Label>
                  <Input
                    value={data.title}
                    onChange={e => setData({ ...data, title: e.target.value })}
                    placeholder="e.g. International Excellence Award"
                    className="text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Award Amount / Grant Value *</Label>
                  <Input
                    value={data.awardAmount}
                    onChange={e => setData({ ...data, awardAmount: e.target.value })}
                    placeholder="e.g. $5,000/year or 100% Tuition Fee waiver"
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Eligibility Criteria</Label>
                  <Textarea
                    value={data.eligibilityCriteria || ''}
                    onChange={e => setData({ ...data, eligibilityCriteria: e.target.value })}
                    rows={3}
                    placeholder="e.g. Minimum GPA 3.5 or IELTS 7.0 equivalent..."
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Overview Description</Label>
                  <Textarea
                    value={data.description || ''}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    rows={5}
                    placeholder="Provide a comprehensive summary of grant details, flight and accommodation allowance..."
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'scope' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Target Associations</h3>
                <p className="text-[10px] text-slate-400">Limit the scholarship scope to a country, university, or program.</p>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Target Country</Label>
                    <select
                      value={selectedCountryId || ''}
                      onChange={e => setData({ ...data, countryId: e.target.value || undefined })}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                    >
                      <option value="">Global (All Countries)</option>
                      {countries.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <Label>Target University</Label>
                    <select
                      value={selectedUnivId || ''}
                      onChange={e => setData({ ...data, universityId: e.target.value || undefined })}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                    >
                      <option value="">All Universities</option>
                      {universities.map(u => (
                        <option key={u._id} value={u._id}>{u.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <Label>Target Course / Program</Label>
                    <select
                      value={selectedProgId || ''}
                      onChange={e => setData({ ...data, programId: e.target.value || undefined })}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                    >
                      <option value="">All Courses / Programs</option>
                      {programs.map(p => (
                        <option key={p._id} value={p._id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
                  className="relative h-56 bg-cover bg-center flex items-end p-6 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/85 before:to-black/35"
                  style={{ backgroundImage: `url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200")` }}
                >
                  <div className="relative z-10 w-full text-white text-left">
                    <div className="flex gap-1.5 mb-2">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-400/40 rounded bg-slate-900/80 uppercase tracking-widest">
                        🏆 Merit Based
                      </span>
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold text-white/90 rounded bg-white/10 uppercase tracking-widest">
                        📍 {activeCountry?.name || 'Global'}
                      </span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-black">{data.title}</h1>
                    <p className="text-[11px] text-emerald-400 font-extrabold mt-1">
                      Award Value: <span className="text-white font-medium">{data.awardAmount}</span>
                    </p>
                  </div>
                </section>

                {/* Body Content */}
                <div className="p-6 space-y-6 text-left">
                  {/* Overview Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs space-y-2">
                    <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-amber-500" /> Scholarship Overview
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600">{data.description || 'Provide a brief summary overview of this scholarship award.'}</p>
                  </div>

                  {/* Eligibility Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs space-y-2">
                    <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                      <FileCheck className="h-4 w-4 text-emerald-500" /> Eligibility Criteria
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{data.eligibilityCriteria || 'No criteria details listed.'}</p>
                  </div>

                  {/* Applicability target summary */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Coverage</h4>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Target Country:</span>
                        <span className="font-bold text-slate-700">{activeCountry?.name || 'All Countries (Global)'}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Target University:</span>
                        <span className="font-bold text-slate-700">{activeUniv?.name || 'All Universities'}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Target Course:</span>
                        <span className="font-bold text-slate-700">{activeProg?.title || 'All Courses'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ResponsivePreviewFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
