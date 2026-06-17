'use client'

import { useState, useEffect } from 'react'
import {
  Globe,
  School,
  GraduationCap,
  Award,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CmsImageField from '@/components/cms/section-editors/CmsImageField'
import { toast } from 'sonner'

export default function CourseFinderAdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'countries' | 'universities' | 'programs' | 'scholarships'>('countries')
  
  // Data lists
  const [countries, setCountries] = useState<any[]>([])
  const [universities, setUniversities] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [scholarships, setScholarships] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form Fields - Country
  const [countryForm, setCountryForm] = useState({
    name: '',
    code: '',
    flagImage: '',
    description: '',
    averageCostOfLiving: '',
    popularCities: '',
  })

  // Form Fields - University
  const [universityForm, setUniversityForm] = useState({
    name: '',
    logo: '',
    bannerImage: '',
    countryId: '',
    city: '',
    globalRanking: '',
    description: '',
    websiteUrl: '',
  })

  // Form Fields - Program
  const [programForm, setProgramForm] = useState({
    title: '',
    universityId: '',
    degreeLevel: 'Bachelor',
    discipline: 'IT',
    duration: '',
    tuitionFee: '',
    currency: 'USD',
    intakes: '',
    ieltsScoreRequired: '6.0',
    description: '',
  })

  // Form Fields - Scholarship
  const [scholarshipForm, setScholarshipForm] = useState({
    title: '',
    awardAmount: '',
    eligibilityCriteria: '',
    description: '',
    countryId: '',
    universityId: '',
    programId: '',
  })

  // Fetch all data
  const fetchData = async () => {
    setLoading(true)
    try {
      const [countriesRes, univRes, progRes, scholRes] = await Promise.all([
        fetch('/api/admin/courses/countries'),
        fetch('/api/admin/courses/universities'),
        fetch('/api/admin/courses/programs'),
        fetch('/api/admin/courses/scholarships'),
      ])

      const countriesData = await countriesRes.json()
      const univData = await univRes.json()
      const progData = await progRes.json()
      const scholData = await scholRes.json()

      setCountries(countriesData.countries || [])
      setUniversities(univData.universities || [])
      setPrograms(progData.programs || [])
      setScholarships(scholData.scholarships || [])
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Helper reset functions
  const resetCountryForm = () => {
    setCountryForm({ name: '', code: '', flagImage: '', description: '', averageCostOfLiving: '', popularCities: '' })
    setEditingId(null)
  }
  const resetUnivForm = () => {
    setUniversityForm({ name: '', logo: '', bannerImage: '', countryId: '', city: '', globalRanking: '', description: '', websiteUrl: '' })
    setEditingId(null)
  }
  const resetProgramForm = () => {
    setProgramForm({ title: '', universityId: '', degreeLevel: 'Bachelor', discipline: 'IT', duration: '', tuitionFee: '', currency: 'USD', intakes: '', ieltsScoreRequired: '6.0', description: '' })
    setEditingId(null)
  }
  const resetScholForm = () => {
    setScholarshipForm({ title: '', awardAmount: '', eligibilityCriteria: '', description: '', countryId: '', universityId: '', programId: '' })
    setEditingId(null)
  }

  const handleAddNewCountry = async () => {
    try {
      const tempId = Math.random().toString(36).substring(2, 7)
      const res = await fetch('/api/admin/courses/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `New Country ${tempId.toUpperCase()}`,
          code: `temp-${tempId}`,
          flagImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
          description: 'A newly added study destination guide.',
          averageCostOfLiving: '£1,200/month',
          popularCities: ['Capital City'],
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create default country')
      }

      const json = await res.json()
      toast.success('Default country page created! Opening Visual Designer...')
      router.push(`/admin/courses/editor?type=country&id=${json.country._id}`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to create country')
    }
  }

  const handleAddNewUniversity = async () => {
    try {
      if (countries.length === 0) {
        toast.error('Please add at least one Country before adding Universities.')
        return
      }
      const tempId = Math.random().toString(36).substring(2, 7)
      const res = await fetch('/api/admin/courses/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `New University ${tempId.toUpperCase()}`,
          logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
          countryId: countries[0]._id,
          city: 'Main City',
          globalRanking: 100,
          description: 'A leading institution offering top-tier academic programs and research.',
          websiteUrl: 'https://example.com',
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create university')
      }

      const json = await res.json()
      toast.success('Default university profile created! Opening Visual Designer...')
      router.push(`/admin/courses/editor?type=university&id=${json.university._id}`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to create university')
    }
  }

  const handleAddNewProgram = async () => {
    try {
      if (universities.length === 0) {
        toast.error('Please add at least one University before adding Programs.')
        return
      }
      const tempId = Math.random().toString(36).substring(2, 7)
      const res = await fetch('/api/admin/courses/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `New Course ${tempId.toUpperCase()}`,
          universityId: universities[0]._id,
          degreeLevel: 'Master',
          discipline: 'IT',
          duration: '1 Year',
          tuitionFee: 18000,
          currency: 'USD',
          intakes: ['September'],
          ieltsScoreRequired: 6.5,
          description: 'A comprehensive curriculum designed to prepare students for global career opportunities.',
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create program')
      }

      const json = await res.json()
      toast.success('Default program created! Opening Visual Designer...')
      router.push(`/admin/courses/editor?type=program&id=${json.program._id}`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to create program')
    }
  }

  const handleAddNewScholarship = async () => {
    try {
      const tempId = Math.random().toString(36).substring(2, 7)
      const res = await fetch('/api/admin/courses/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `New Scholarship ${tempId.toUpperCase()}`,
          awardAmount: '$5,000 / year',
          eligibilityCriteria: 'Minimum GPA 3.0 or equivalent IELTS 6.5+',
          description: 'A prestigious funding support award for meritorious international students.',
          countryId: countries.length > 0 ? countries[0]._id : undefined,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create scholarship')
      }

      const json = await res.json()
      toast.success('Default scholarship created! Opening Visual Designer...')
      router.push(`/admin/courses/editor?type=scholarship&id=${json.scholarship._id}`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to create scholarship')
    }
  }

  // Country Form Submission
  const handleCountrySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!countryForm.name || !countryForm.code || !countryForm.flagImage) {
      toast.error('Please fill in required fields (Name, Code, Flag Icon)')
      return
    }

    const payload = {
      ...countryForm,
      popularCities: countryForm.popularCities.split(',').map(c => c.trim()).filter(Boolean),
    }

    try {
      const url = editingId ? `/api/admin/courses/countries/${editingId}` : '/api/admin/courses/countries'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Request failed')
      }

      toast.success(editingId ? 'Country updated' : 'Country added')
      resetCountryForm()
      fetchData()
    } catch (err: any) {
      toast.error(err.message || 'Operation failed')
    }
  }

  // University Form Submission
  const handleUnivSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!universityForm.name || !universityForm.logo || !universityForm.countryId || !universityForm.city) {
      toast.error('Please fill in required fields (Name, Logo, Country, City)')
      return
    }

    const payload = {
      ...universityForm,
      globalRanking: universityForm.globalRanking ? Number(universityForm.globalRanking) : undefined,
    }

    try {
      const url = editingId ? `/api/admin/courses/universities/${editingId}` : '/api/admin/courses/universities'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Request failed')

      toast.success(editingId ? 'University updated' : 'University added')
      resetUnivForm()
      fetchData()
    } catch (err) {
      toast.error('Operation failed')
    }
  }

  // Program Form Submission
  const handleProgramSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!programForm.title || !programForm.universityId || !programForm.duration || !programForm.tuitionFee) {
      toast.error('Please fill in required fields (Title, University, Duration, Tuition Fee)')
      return
    }

    const payload = {
      ...programForm,
      tuitionFee: Number(programForm.tuitionFee),
      ieltsScoreRequired: Number(programForm.ieltsScoreRequired),
      intakes: programForm.intakes.split(',').map(i => i.trim()).filter(Boolean),
    }

    try {
      const url = editingId ? `/api/admin/courses/programs/${editingId}` : '/api/admin/courses/programs'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Request failed')

      toast.success(editingId ? 'Program updated' : 'Program added')
      resetProgramForm()
      fetchData()
    } catch (err) {
      toast.error('Operation failed')
    }
  }

  // Scholarship Form Submission
  const handleScholarshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!scholarshipForm.title || !scholarshipForm.awardAmount) {
      toast.error('Please fill in required fields (Title, Amount)')
      return
    }

    const payload = {
      ...scholarshipForm,
      countryId: scholarshipForm.countryId || undefined,
      universityId: scholarshipForm.universityId || undefined,
      programId: scholarshipForm.programId || undefined,
    }

    try {
      const url = editingId ? `/api/admin/courses/scholarships/${editingId}` : '/api/admin/courses/scholarships'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Request failed')

      toast.success(editingId ? 'Scholarship updated' : 'Scholarship added')
      resetScholForm()
      fetchData()
    } catch (err) {
      toast.error('Operation failed')
    }
  }

  // Deletions
  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const res = await fetch(`/api/admin/courses/${type}/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Delete failed')
      toast.success('Item deleted successfully')
      fetchData()
    } catch (err) {
      toast.error('Failed to delete item')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/admin/cms" className="hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-bold text-slate-700">Course Finder Manager</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Course Finder Manager
          </h1>
          <p className="text-sm text-slate-500">
            Configure country info, partner universities, courses, and active scholarships.
          </p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-slate-200/80 p-1.5 max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setActiveTab('countries'); resetCountryForm(); }}
          className={`h-9 px-4 gap-2 text-xs font-bold rounded-lg ${activeTab === 'countries' ? 'bg-[#061331] text-white hover:bg-[#061331] hover:text-white shadow-xs' : 'text-slate-600'}`}
        >
          <Globe className="h-4 w-4" /> Countries
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setActiveTab('universities'); resetUnivForm(); }}
          className={`h-9 px-4 gap-2 text-xs font-bold rounded-lg ${activeTab === 'universities' ? 'bg-[#061331] text-white hover:bg-[#061331] hover:text-white shadow-xs' : 'text-slate-600'}`}
        >
          <School className="h-4 w-4" /> Universities
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setActiveTab('programs'); resetProgramForm(); }}
          className={`h-9 px-4 gap-2 text-xs font-bold rounded-lg ${activeTab === 'programs' ? 'bg-[#061331] text-white hover:bg-[#061331] hover:text-white shadow-xs' : 'text-slate-600'}`}
        >
          <GraduationCap className="h-4 w-4" /> Programs
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setActiveTab('scholarships'); resetScholForm(); }}
          className={`h-9 px-4 gap-2 text-xs font-bold rounded-lg ${activeTab === 'scholarships' ? 'bg-[#061331] text-white hover:bg-[#061331] hover:text-white shadow-xs' : 'text-slate-600'}`}
        >
          <Award className="h-4 w-4" /> Scholarships
        </Button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* List Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-slate-200 bg-white shadow-xs">
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold capitalize text-slate-800">
                    Registered {activeTab}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    A total of {
                      activeTab === 'countries' ? countries.length :
                      activeTab === 'universities' ? universities.length :
                      activeTab === 'programs' ? programs.length : scholarships.length
                    } items registered.
                  </CardDescription>
                </div>
                {activeTab === 'countries' && (
                  <Button
                    onClick={handleAddNewCountry}
                    size="sm"
                    className="bg-[#061331] text-white hover:bg-slate-800 text-xs font-bold gap-1 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Country
                  </Button>
                )}
                {activeTab === 'universities' && (
                  <Button
                    onClick={handleAddNewUniversity}
                    size="sm"
                    className="bg-[#061331] text-white hover:bg-slate-800 text-xs font-bold gap-1 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add University
                  </Button>
                )}
                {activeTab === 'programs' && (
                  <Button
                    onClick={handleAddNewProgram}
                    size="sm"
                    className="bg-[#061331] text-white hover:bg-slate-800 text-xs font-bold gap-1 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Course
                  </Button>
                )}
                {activeTab === 'scholarships' && (
                  <Button
                    onClick={handleAddNewScholarship}
                    size="sm"
                    className="bg-[#061331] text-white hover:bg-slate-800 text-xs font-bold gap-1 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Scholarship
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {activeTab === 'countries' && countries.map(item => (
                  <div key={item._id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md border border-slate-200 bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url("${item.flagImage}")` }} />
                      <div>
                        <p className="font-bold text-slate-800">{item.name} ({item.code})</p>
                        <p className="text-xs text-slate-400">Cities: {item.popularCities?.join(', ') || 'None'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button asChild size="sm" variant="outline" className="h-8 text-[11px] border-[#061331] text-[#061331] hover:bg-[#061331]/5 font-semibold">
                        <Link href={`/admin/courses/editor?type=country&id=${item._id}`}>
                          Design Page
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete('countries', item._id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}

                {activeTab === 'universities' && universities.map(item => (
                  <div key={item._id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md border border-slate-200 bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url("${item.logo}")` }} />
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.city}, {item.countryId?.name || 'Unknown Country'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button asChild size="sm" variant="outline" className="h-8 text-[11px] border-[#061331] text-[#061331] hover:bg-[#061331]/5 font-semibold">
                        <Link href={`/admin/courses/editor?type=university&id=${item._id}`}>
                          Design Page
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete('universities', item._id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}

                {activeTab === 'programs' && programs.map(item => (
                  <div key={item._id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <div>
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-400">
                        {item.degreeLevel} in {item.discipline} | {item.universityId?.name || 'Unknown University'}
                      </p>
                      <p className="mt-1 text-[11px] font-bold text-[#d7a23a]">
                        Fee: {item.currency} {item.tuitionFee} / year | Duration: {item.duration}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0 items-center">
                      <Button asChild size="sm" variant="outline" className="h-8 text-[11px] border-[#061331] text-[#061331] hover:bg-[#061331]/5 font-semibold">
                        <Link href={`/admin/courses/editor?type=program&id=${item._id}`}>
                          Design Page
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete('programs', item._id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}

                {activeTab === 'scholarships' && scholarships.map(item => (
                  <div key={item._id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <div>
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-xs text-[#d7a23a] font-bold">Award: {item.awardAmount}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Applicable: {item.programId?.title ? `Program (${item.programId.title})` : item.universityId?.name ? `University (${item.universityId.name})` : item.countryId?.name ? `Country (${item.countryId.name})` : 'Global'}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0 items-center">
                      <Button asChild size="sm" variant="outline" className="h-8 text-[11px] border-[#061331] text-[#061331] hover:bg-[#061331]/5 font-semibold">
                        <Link href={`/admin/courses/editor?type=scholarship&id=${item._id}`}>
                          Design Page
                        </Link>
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete('scholarships', item._id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}

                {((activeTab === 'countries' && countries.length === 0) ||
                  (activeTab === 'universities' && universities.length === 0) ||
                  (activeTab === 'programs' && programs.length === 0) ||
                  (activeTab === 'scholarships' && scholarships.length === 0)) && (
                  <div className="py-8 text-center text-xs text-slate-400 font-medium">
                    No registered {activeTab} found. Create one.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form Editor Card */}
          <div>
            {activeTab === 'countries' && (
              <Card className="border-slate-200 bg-white shadow-sm border-dashed">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-[#061331]">Country Visual Guide</CardTitle>
                  <CardDescription className="text-xs">How country landing pages are structured</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs text-slate-600">
                  <p>Country landing pages are fully dynamic. Click the <strong>Design Page</strong> button next to any registered country to edit its live preview, sections, and details.</p>
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-2">
                    <p className="font-semibold text-slate-700">What you can customize:</p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Hero introduction & flag banner</li>
                      <li>Why study benefits & popular cities</li>
                      <li>Student Visa requirements & process</li>
                      <li>Intakes & living costs breakdown</li>
                      <li>Interactive Frequently Asked Questions</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handleAddNewCountry}
                    className="w-full bg-[#061331] text-white hover:bg-slate-800 font-bold gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New Country
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'universities' && (
              <Card className="border-slate-200 bg-white shadow-sm border-dashed">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-[#061331]">University Visual Guide</CardTitle>
                  <CardDescription className="text-xs">How university profiles are structured</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs text-slate-600">
                  <p>University profile pages display institution-specific rankings, location summaries, logo, cover images, and websites.</p>
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-2">
                    <p className="font-semibold text-slate-700">What you can customize:</p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px]">
                      <li>University Name & Location (City & Country)</li>
                      <li>Institution Logo & Page Cover Banner</li>
                      <li>Global Academic Rankings</li>
                      <li>Official website link & main description</li>
                      <li>Establishment date & active student count</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handleAddNewUniversity}
                    className="w-full bg-[#061331] text-white hover:bg-slate-800 font-bold gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New University
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'programs' && (
              <Card className="border-slate-200 bg-white shadow-sm border-dashed">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-[#061331]">Program Visual Guide</CardTitle>
                  <CardDescription className="text-xs">How course profiles are structured</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs text-slate-600">
                  <p>Academic courses and degree program pages display intakes, tuition fees, disciplines, degree level details, and entry prerequisites.</p>
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-2">
                    <p className="font-semibold text-slate-700">What you can customize:</p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Program title & discipline</li>
                      <li>Hosting university association</li>
                      <li>Annual tuition fee & base currency</li>
                      <li>Degree level & course duration</li>
                      <li>IELTS entry score prerequisites & intakes</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handleAddNewProgram}
                    className="w-full bg-[#061331] text-white hover:bg-slate-800 font-bold gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New Course
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'scholarships' && (
              <Card className="border-slate-200 bg-white shadow-sm border-dashed">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-[#061331]">Scholarship Visual Guide</CardTitle>
                  <CardDescription className="text-xs">How funding options are structured</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs text-slate-600">
                  <p>Scholarships detail grant coverage, eligibility criteria, and link to specific countries, universities, or academic programs.</p>
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-2">
                    <p className="font-semibold text-slate-700">What you can customize:</p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Scholarship Title & award coverage description</li>
                      <li>Target alignment (specific country, university, or course)</li>
                      <li>Detailed eligibility & academic score prerequisites</li>
                      <li>Main description & application instructions</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handleAddNewScholarship}
                    className="w-full bg-[#061331] text-white hover:bg-slate-800 font-bold gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add New Scholarship
                  </Button>
                </CardContent>
              </Card>
            )}
        </div>
        </div>
      )}
    </div>
  )
}
