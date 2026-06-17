'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  ChevronRight,
  Plus,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import CmsImageField from './CmsImageField'
import ResponsivePreviewFrame, { PreviewViewportMode } from '../ResponsivePreviewFrame'

type CountryData = {
  _id: string
  name: string
  code: string
  flagImage: string
  description: string
  averageCostOfLiving?: string
  popularCities?: string[]
  intro?: string
  highlights?: string[]
  visa?: {
    name: string
    who: string
    whenToApply: string
    arrival: string
  }
  costs?: Array<{ program: string; fee: string }>
  scholarships?: Array<{ name: string; description: string }>
  intakes?: Array<{ name: string; duration: string }>
  topCourses?: string[]
  jobProspects?: string[]
  livingCosts?: Array<{ item: string; cost: string }>
  faqs?: Array<{ question: string; answer: string }>
}

type Props = {
  countryId: string
  onBack: () => void
}

export default function CountryPageEditor({ countryId, onBack }: Props) {
  const [data, setData] = useState<CountryData | null>(null)
  const [activeTab, setActiveTab] = useState<'hero' | 'why' | 'visa' | 'costs' | 'faqs'>('hero')
  const [isSaving, setIsSaving] = useState(false)
  const [viewportMode, setViewportMode] = useState<PreviewViewportMode>('laptop')

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`/api/admin/courses/countries/${countryId}`)
        const json = await res.json()
        if (res.ok && json.country) {
          setData(json.country)
        } else {
          toast.error(json.error || 'Failed to fetch country details')
        }
      } catch (err) {
        toast.error('Failed to fetch country details')
      }
    }
    fetchCountry()
  }, [countryId])

  const handleSave = async () => {
    if (!data) return
    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/courses/countries/${countryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success('Country page design saved successfully!')
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
        Loading Country Page Editor...
      </div>
    )
  }

  // Highlights handlers
  const updateHighlight = (index: number, val: string) => {
    const newHighlights = [...(data.highlights || [])]
    newHighlights[index] = val
    setData({ ...data, highlights: newHighlights })
  }
  const addHighlight = () => {
    setData({ ...data, highlights: [...(data.highlights || []), ''] })
  }
  const removeHighlight = (index: number) => {
    setData({ ...data, highlights: (data.highlights || []).filter((_, i) => i !== index) })
  }

  // Popular Cities handler
  const handlePopularCitiesChange = (val: string) => {
    setData({ ...data, popularCities: val.split(',').map(c => c.trim()).filter(Boolean) })
  }

  // Costs handlers
  const updateCost = (index: number, key: 'program' | 'fee', val: string) => {
    const newCosts = [...(data.costs || [])]
    newCosts[index] = { ...newCosts[index], [key]: val }
    setData({ ...data, costs: newCosts })
  }
  const addCost = () => {
    setData({ ...data, costs: [...(data.costs || []), { program: '', fee: '' }] })
  }
  const removeCost = (index: number) => {
    setData({ ...data, costs: (data.costs || []).filter((_, i) => i !== index) })
  }

  // Living Costs handlers
  const updateLivingCost = (index: number, key: 'item' | 'cost', val: string) => {
    const newLivingCosts = [...(data.livingCosts || [])]
    newLivingCosts[index] = { ...newLivingCosts[index], [key]: val }
    setData({ ...data, livingCosts: newLivingCosts })
  }
  const addLivingCost = () => {
    setData({ ...data, livingCosts: [...(data.livingCosts || []), { item: '', cost: '' }] })
  }
  const removeLivingCost = (index: number) => {
    setData({ ...data, livingCosts: (data.livingCosts || []).filter((_, i) => i !== index) })
  }

  // FAQs handlers
  const updateFaq = (index: number, key: 'question' | 'answer', val: string) => {
    const newFaqs = [...(data.faqs || [])]
    newFaqs[index] = { ...newFaqs[index], [key]: val }
    setData({ ...data, faqs: newFaqs })
  }
  const addFaq = () => {
    setData({ ...data, faqs: [...(data.faqs || []), { question: '', answer: '' }] })
  }
  const removeFaq = (index: number) => {
    setData({ ...data, faqs: (data.faqs || []).filter((_, i) => i !== index) })
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-slate-50 text-slate-800">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-base font-bold text-slate-900">Visual Country Editor: {data.name}</h1>
            <p className="text-xs text-slate-500">Design hero banner, study guide, living cost tables, and FAQs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#061331] text-white hover:bg-slate-800 font-bold">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Design'}
          </Button>
        </div>
      </div>

      {/* Editor Main Content Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Form Fields Editor */}
        <div className="w-1/2 flex flex-col border-r border-slate-200 bg-slate-100/50">
          {/* Tab Selection */}
          <div className="flex border-b border-slate-200 text-xs font-bold bg-white overflow-x-auto whitespace-nowrap scrollbar-thin">
            {([
              ['hero', 'Hero & Intro'],
              ['why', 'Why Choose & Cities'],
              ['visa', 'Student Visa Info'],
              ['costs', 'Tuition & Living Costs'],
              ['faqs', 'Frequently Asked FAQs'],
            ] as const).map(([tabId, label]) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`px-5 py-3 border-b-2 transition shrink-0 ${
                  activeTab === tabId ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'hero' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Hero & Country Settings</h3>
                <div className="space-y-1">
                  <Label>Country Name *</Label>
                  <Input
                    value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    placeholder="e.g. United Kingdom"
                    className="text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <Label>ISO Code *</Label>
                  <Input
                    value={data.code}
                    onChange={e => setData({ ...data, code: e.target.value })}
                    placeholder="e.g. UK or GB"
                    className="text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Flag Image *</Label>
                  <CmsImageField
                    id="flag-image"
                    label="Select Flag/Banner Image"
                    value={data.flagImage}
                    onChange={val => setData({ ...data, flagImage: val })}
                    folder="nextlevel/countries"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Description / SEO Meta Info</Label>
                  <Textarea
                    value={data.description}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    rows={2}
                    placeholder="E.g. Comprehensive guide to study in the United Kingdom..."
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Page Intro Text</Label>
                  <Textarea
                    value={data.intro}
                    onChange={e => setData({ ...data, intro: e.target.value })}
                    rows={4}
                    placeholder="E.g. Study in the UK for globally respected degrees..."
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Avg Cost of Living</Label>
                  <Input
                    value={data.averageCostOfLiving}
                    onChange={e => setData({ ...data, averageCostOfLiving: e.target.value })}
                    placeholder="e.g. £1,200/month"
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Popular Cities (comma separated)</Label>
                  <Input
                    value={data.popularCities?.join(', ') || ''}
                    onChange={e => handlePopularCitiesChange(e.target.value)}
                    placeholder="e.g. London, Manchester, Leeds"
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'why' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Why Study & Popular Cities</h3>
                <div className="space-y-1">
                  <Label>Popular Study Cities (comma-separated)</Label>
                  <Input
                    value={data.popularCities?.join(', ') || ''}
                    onChange={e => handlePopularCitiesChange(e.target.value)}
                    placeholder="E.g. London, Manchester, Edinburgh"
                    className="text-xs"
                  />
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-slate-800 font-bold">Highlights / Why Study Bullet Points</Label>
                    <Button type="button" size="sm" onClick={addHighlight} className="bg-slate-800 hover:bg-slate-700 text-xs text-white">
                      <Plus className="h-3 w-3 mr-1" /> Add Point
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(data.highlights || []).map((highlight, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={highlight}
                          onChange={e => updateHighlight(index, e.target.value)}
                          placeholder="E.g. 1-year master courses are common"
                          className="bg-white text-xs"
                        />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeHighlight(index)} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visa' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-2">Visa Requirement Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Visa Type / Name</Label>
                    <Input
                      value={data.visa?.name || ''}
                      onChange={e => setData({ ...data, visa: { ...(data.visa || { name: '', who: '', whenToApply: '', arrival: '' }), name: e.target.value } })}
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Who Can Apply</Label>
                    <Input
                      value={data.visa?.who || ''}
                      onChange={e => setData({ ...data, visa: { ...(data.visa || { name: '', who: '', whenToApply: '', arrival: '' }), who: e.target.value } })}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>When To Apply</Label>
                    <Input
                      value={data.visa?.whenToApply || ''}
                      onChange={e => setData({ ...data, visa: { ...(data.visa || { name: '', who: '', whenToApply: '', arrival: '' }), whenToApply: e.target.value } })}
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Arrival Guidance</Label>
                    <Input
                      value={data.visa?.arrival || ''}
                      onChange={e => setData({ ...data, visa: { ...(data.visa || { name: '', who: '', whenToApply: '', arrival: '' }), arrival: e.target.value } })}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'costs' && (
              <div className="space-y-6">
                {/* Tuition Fee Table */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800">Tuition Fee Planning Range</h3>
                    <Button type="button" size="sm" onClick={addCost} className="bg-slate-800 hover:bg-slate-700 text-xs text-white">
                      <Plus className="h-3 w-3 mr-1" /> Add Row
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(data.costs || []).map((cost, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={cost.program}
                          onChange={e => updateCost(index, 'program', e.target.value)}
                          placeholder="E.g. Postgraduate master degree"
                          className="bg-white text-xs w-1/2"
                        />
                        <Input
                          value={cost.fee}
                          onChange={e => updateCost(index, 'fee', e.target.value)}
                          placeholder="E.g. GBP 10,000 - 20,000"
                          className="bg-white text-xs w-1/2"
                        />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeCost(index)} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Living Costs Table */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800">Monthly Living Cost Items</h3>
                    <Button type="button" size="sm" onClick={addLivingCost} className="bg-slate-800 hover:bg-slate-700 text-xs text-white">
                      <Plus className="h-3 w-3 mr-1" /> Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(data.livingCosts || []).map((lc, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={lc.item}
                          onChange={e => updateLivingCost(index, 'item', e.target.value)}
                          placeholder="E.g. Accommodation"
                          className="bg-white text-xs w-1/2"
                        />
                        <Input
                          value={lc.cost}
                          onChange={e => updateLivingCost(index, 'cost', e.target.value)}
                          placeholder="E.g. GBP 400 - GBP 600"
                          className="bg-white text-xs w-1/2"
                        />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeLivingCost(index)} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800">Frequently Asked Questions</h3>
                  <Button type="button" size="sm" onClick={addFaq} className="bg-slate-800 hover:bg-slate-700 text-xs text-white">
                    <Plus className="h-3 w-3 mr-1" /> Add FAQ
                  </Button>
                </div>
                <div className="space-y-4">
                  {(data.faqs || []).map((faq, index) => (
                    <div key={index} className="border border-slate-100 bg-slate-50/50 p-4 rounded-md space-y-2 relative">
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-100 hover:text-red-600 h-7 w-7">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-1 pr-8">
                        <Label>Question</Label>
                        <Input
                          value={faq.question}
                          onChange={e => updateFaq(index, 'question', e.target.value)}
                          placeholder="Question"
                          className="bg-white text-xs font-semibold text-slate-700"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Answer</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={e => updateFaq(index, 'answer', e.target.value)}
                          placeholder="Answer content..."
                          className="bg-white text-xs"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Staging Preview Panel */}
        <div className="w-1/2 flex flex-col bg-slate-200/50 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Live Staging Preview</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setViewportMode('laptop')}
                className={`h-6 text-[10px] font-semibold transition ${
                  viewportMode === 'laptop' ? 'bg-[#061331] text-white hover:bg-[#061331]/95' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Desktop
              </Button>
              <Button
                size="sm"
                onClick={() => setViewportMode('mobile')}
                className={`h-6 text-[10px] font-semibold transition ${
                  viewportMode === 'mobile' ? 'bg-[#061331] text-white hover:bg-[#061331]/95' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Mobile
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg relative">
            <ResponsivePreviewFrame device={viewportMode}>
              {/* Public Country Detail Page Design Representation */}
              <div className="min-h-full bg-white text-[#081638] font-sans pb-12">
                {/* Hero section */}
                <section className="bg-[#E9EFF6] pt-12 pb-8 px-6">
                  <div className="mx-auto flex flex-col gap-4 max-w-5xl">
                    <nav className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                      <span>Home</span>
                      <ChevronRight className="h-3 w-3" />
                      <span>Study abroad</span>
                      <ChevronRight className="h-3 w-3" />
                      <span>{data.name}</span>
                    </nav>
                    <h1 className="text-2xl font-extrabold text-[#061331]">Study in {data.name}</h1>
                    <p className="text-xs text-slate-600 leading-5 max-w-xl">
                      Looking for overseas education information? Explore everything about studying in {data.name}, including visa, admission, costs, scholarships and top universities.
                    </p>
                  </div>
                </section>

                {/* Subnav links */}
                <div className="border-b border-slate-100 bg-white sticky top-0 px-6 py-2 flex gap-4 text-[10px] font-bold text-slate-400 shadow-sm z-10">
                  <span className="text-[#d7a23a]">Why study</span>
                  <span>Requirements</span>
                  <span>Cost</span>
                  <span>Scholarships</span>
                  <span>FAQs</span>
                </div>

                {/* Content Sections */}
                <div className="px-6 py-6 space-y-8 max-w-5xl mx-auto">
                  {/* Why Study */}
                  <section className="border-b border-slate-100 pb-6">
                    <h2 className="text-base font-extrabold text-[#081638]">Why study in {data.name}?</h2>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{data.intro}</p>
                    <ul className="mt-4 space-y-2">
                      {(data.highlights || []).map((highlight, index) => (
                        <li key={index} className="flex gap-2 items-start text-xs text-slate-600">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d7a23a] mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Visa requirements */}
                  <section className="border-b border-slate-100 pb-6">
                    <h2 className="text-base font-extrabold text-[#081638]">Student visa requirements for {data.name}</h2>
                    <div className="mt-3 border border-slate-150 rounded overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-[#081638] font-bold border-b border-slate-150">
                            <th className="px-3 py-2">Requirement</th>
                            <th className="px-3 py-2">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="px-3 py-2 font-semibold">Visa type</td>
                            <td className="px-3 py-2 text-slate-500">{data.visa?.name || 'N/A'}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="px-3 py-2 font-semibold">Who can apply</td>
                            <td className="px-3 py-2 text-slate-500">{data.visa?.who || 'N/A'}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="px-3 py-2 font-semibold">When to apply</td>
                            <td className="px-3 py-2 text-slate-500">{data.visa?.whenToApply || 'N/A'}</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-semibold">Arrival guidance</td>
                            <td className="px-3 py-2 text-slate-500">{data.visa?.arrival || 'N/A'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Costs */}
                  <section className="border-b border-slate-100 pb-6">
                    <h2 className="text-base font-extrabold text-[#081638]">Cost of studying in {data.name}</h2>
                    <p className="mt-2 text-xs text-slate-500">Indicative tuition ranges:</p>
                    <div className="mt-2 border border-slate-150 rounded overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 font-bold border-b border-slate-150">
                            <th className="px-3 py-2">Program</th>
                            <th className="px-3 py-2">Indicative fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(data.costs || []).map((cost, idx) => (
                            <tr key={idx} className="border-b border-slate-100 last:border-0 text-slate-600">
                              <td className="px-3 py-2">{cost.program}</td>
                              <td className="px-3 py-2">{cost.fee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-xs text-slate-500">Estimated monthly living costs:</p>
                    <div className="mt-2 border border-slate-150 rounded overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 font-bold border-b border-slate-150">
                            <th className="px-3 py-2">Item</th>
                            <th className="px-3 py-2">Monthly Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(data.livingCosts || []).map((lc, idx) => (
                            <tr key={idx} className="border-b border-slate-100 last:border-0 text-slate-600">
                              <td className="px-3 py-2">{lc.item}</td>
                              <td className="px-3 py-2">{lc.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* FAQs */}
                  <section>
                    <h2 className="text-base font-extrabold text-[#081638]">Ask Next Level</h2>
                    <p className="text-xs text-slate-400 mb-4">Key questions students ask before applying to {data.name}.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(data.faqs || []).map((faq, idx) => (
                        <div key={idx} className="border border-slate-100 rounded bg-[#F8FAFC] p-3 text-xs">
                          <h4 className="font-bold text-[#081638]">{faq.question}</h4>
                          <p className="mt-1 text-slate-500 leading-5">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </ResponsivePreviewFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
