'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Palette, Link2, Eye, Award, Clock, Coins, BookOpen, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ResponsivePreviewFrame, { PreviewViewportMode } from '../ResponsivePreviewFrame'
import { toast } from 'sonner'

type ProgramData = {
  _id: string
  title: string
  universityId: any // populated or ID
  degreeLevel: string
  discipline: string
  duration: string
  tuitionFee: number
  currency: string
  intakes: string[]
  ieltsScoreRequired?: number
  description?: string
}

type Props = {
  programId: string
  onBack: () => void
}

export default function ProgramPageEditor({ programId, onBack }: Props) {
  const [data, setData] = useState<ProgramData | null>(null)
  const [universities, setUniversities] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'info' | 'details'>('info')
  const [isSaving, setIsSaving] = useState(false)
  const [viewportMode, setViewportMode] = useState<PreviewViewportMode>('laptop')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, univRes] = await Promise.all([
          fetch(`/api/admin/courses/programs/${programId}`),
          fetch('/api/admin/courses/universities')
        ])
        
        const progJson = await progRes.json()
        const univJson = await univRes.json()

        if (univJson.universities) {
          setUniversities(univJson.universities)
        }

        if (progRes.ok && progJson.program) {
          setData(progJson.program)
        } else {
          toast.error('Failed to load course details')
        }
      } catch (err) {
        toast.error('Failed to load course data')
      }
    }
    fetchData()
  }, [programId])

  const handleSave = async () => {
    if (!data) return
    setIsSaving(true)
    try {
      const payload = {
        ...data,
        universityId: typeof data.universityId === 'object' ? data.universityId._id : data.universityId
      }

      const res = await fetch(`/api/admin/courses/programs/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success('Course details updated successfully!')
      } else {
        toast.error(json.error || 'Failed to save changes')
      }
    } catch (err) {
      toast.error('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  const handleIntakesChange = (val: string) => {
    if (!data) return
    setData({
      ...data,
      intakes: val.split(',').map(i => i.trim()).filter(Boolean)
    })
  }

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center text-sm font-semibold text-slate-500 bg-slate-50">
        Loading Course Editor...
      </div>
    )
  }

  const selectedUnivId = typeof data.universityId === 'object' ? data.universityId?._id : data.universityId
  const activeUniv = universities.find(u => u._id === selectedUnivId)

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-base font-bold text-slate-900">Course / Program Designer</h1>
            <p className="text-xs text-slate-500">Configure entry requirements, degree levels, fees, duration, and intakes</p>
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
              className={`px-5 py-3 border-b-2 transition shrink-0 ${
                activeTab === 'info' ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Course Identity & Univ
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-5 py-3 border-b-2 transition shrink-0 ${
                activeTab === 'details' ? 'border-[#061331] text-[#061331] bg-slate-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Fees, Intakes & Prerequisites
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'info' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Course Basic Settings</h3>
                
                <div className="space-y-1">
                  <Label>Program / Course Title *</Label>
                  <Input
                    value={data.title}
                    onChange={e => setData({ ...data, title: e.target.value })}
                    placeholder="e.g. MSc Data Science"
                    className="text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <Label>University Partner *</Label>
                  <select
                    value={selectedUnivId || ''}
                    onChange={e => setData({ ...data, universityId: e.target.value })}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                  >
                    <option value="">Select University</option>
                    {universities.map(u => (
                      <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Degree Level</Label>
                    <select
                      value={data.degreeLevel}
                      onChange={e => setData({ ...data, degreeLevel: e.target.value })}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                    >
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label>Discipline</Label>
                    <select
                      value={data.discipline}
                      onChange={e => setData({ ...data, discipline: e.target.value })}
                      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#061331]"
                    >
                      <option value="IT">IT / Computer Science</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business">Business</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Arts">Arts</option>
                      <option value="Sciences">Sciences</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Course Outline / Summary</Label>
                  <Textarea
                    value={data.description || ''}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    rows={5}
                    placeholder="Provide a comprehensive summary of core modules, duration detail, career outputs..."
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Fees, Intakes & Prerequisites</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Annual Tuition Fee *</Label>
                    <Input
                      type="number"
                      value={data.tuitionFee}
                      onChange={e => setData({ ...data, tuitionFee: Number(e.target.value) })}
                      placeholder="e.g. 15000"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Base Currency *</Label>
                    <Input
                      value={data.currency}
                      onChange={e => setData({ ...data, currency: e.target.value })}
                      placeholder="e.g. USD or GBP"
                      className="text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Course Duration *</Label>
                    <Input
                      value={data.duration}
                      onChange={e => setData({ ...data, duration: e.target.value })}
                      placeholder="e.g. 1 Year or 3 Years"
                      className="text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>IELTS Entry Score</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={data.ieltsScoreRequired || ''}
                      onChange={e => setData({ ...data, ieltsScoreRequired: e.target.value ? Number(e.target.value) : undefined })}
                      placeholder="e.g. 6.5"
                      className="text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Available Intakes (comma separated)</Label>
                  <Input
                    value={data.intakes?.join(', ') || ''}
                    onChange={e => handleIntakesChange(e.target.value)}
                    placeholder="e.g. September, January, May"
                    className="text-xs"
                  />
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
              <div className="min-h-full bg-white text-[#061331] font-sans pb-12">
                {/* Hero banner */}
                <section className="bg-[#E9EFF6] pt-12 pb-8 px-6 text-left">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#061331] text-white text-[9px] font-black uppercase tracking-wider">
                      {data.degreeLevel}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[9px] font-black uppercase tracking-wider">
                      {data.discipline}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#061331] leading-tight">{data.title}</h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500">
                    <span>🏛️ {activeUniv?.name || 'Partner Institution'}</span>
                    <span>•</span>
                    <span>📍 {activeUniv?.city || 'Campus Location'}</span>
                  </div>
                </section>

                {/* Sub info banner */}
                <div className="p-6 grid grid-cols-2 gap-4 bg-[#fbfbfb] border-y border-slate-100 text-left">
                  <div className="flex items-center gap-2.5">
                    <Coins className="h-5 w-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Estimated Fee</p>
                      <p className="text-xs font-black text-slate-800">{data.currency} {data.tuitionFee?.toLocaleString()}/year</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-5 w-5 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Duration</p>
                      <p className="text-xs font-black text-slate-800">{data.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award className="h-5 w-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">IELTS Entry</p>
                      <p className="text-xs font-black text-slate-800">{data.ieltsScoreRequired || '6.0'}+ Overall</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Layers className="h-5 w-5 text-purple-500 shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Available Intakes</p>
                      <p className="text-xs font-black text-slate-800">{data.intakes?.join(', ') || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Course Curriculum Overview</h3>
                  <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{data.description || 'Outline description is currently empty. Edit course settings to populate profile details.'}</p>
                </div>
              </div>
            </ResponsivePreviewFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
