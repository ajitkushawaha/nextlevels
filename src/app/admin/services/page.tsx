'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Edit3,
  Eye,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Monitor,
  Smartphone,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { serviceDetails, slugFromServiceTitle, type ServiceDetail } from '@/lib/serviceDetails'
import ServiceDetailFormEditor from '@/components/cms/section-editors/ServiceDetailFormEditor'
import ServiceDetailPreview from '@/components/services/ServiceDetailPreview'
import ResponsivePreviewFrame, {
  previewDevices,
  type PreviewViewportMode,
} from '@/components/cms/ResponsivePreviewFrame'

type AdminServicePage = {
  id: string
  slug: string
  title: string
  data: ServiceDetail
  status: 'draft' | 'published'
  updatedAt?: string
  publishedAt?: string
}

const newServiceTemplate: ServiceDetail = {
  slug: 'new-service',
  number: '13',
  title: 'New Service',
  shortDesc: 'Add a short summary for this service.',
  description: 'Add the full service description here.',
  image: '/home2/happy-team.png',
  stats: 'Free Guidance',
  benefits: [
    'Add benefit one',
    'Add benefit two',
    'Add benefit three',
    'Add benefit four',
  ],
  process: [
    'Review student profile',
    'Prepare the right plan',
    'Submit and follow up',
    'Guide next steps',
  ],
  outcomes: [
    'Clear next steps',
    'Better readiness',
    'Reduced confusion',
  ],
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong'
}

export default function ServicesManager() {
  const [services, setServices] = useState<AdminServicePage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState<string>('')
  const [editorData, setEditorData] = useState<ServiceDetail | null>(null)
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [viewportMode, setViewportMode] = useState<PreviewViewportMode>('laptop')

  const selectedService = useMemo(
    () => services.find(service => service.id === selectedId),
    [selectedId, services]
  )

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return services

    return services.filter(service => {
      const data = service.data
      return (
        data.title.toLowerCase().includes(query) ||
        data.shortDesc.toLowerCase().includes(query) ||
        data.slug.toLowerCase().includes(query)
      )
    })
  }, [searchTerm, services])

  const loadServices = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/services')
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error || 'Could not load services')
      }

      const nextServices = result.services || []
      setServices(nextServices)

      if (nextServices.length > 0) {
        const nextSelected =
          nextServices.find((service: AdminServicePage) => service.id === selectedId) ||
          nextServices[0]
        selectService(nextSelected)
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const selectService = (service: AdminServicePage) => {
    setSelectedId(service.id)
    setStatus(service.status)
    setEditorData(service.data)
  }

  const saveService = async () => {
    if (!selectedService || !editorData) return

    setIsSaving(true)

    try {
      const response = await fetch(`/api/admin/services/${selectedService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: editorData, status }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error || 'Could not save service')
      }

      toast.success('Service saved')
      await loadServices()
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }

  const createService = async () => {
    setIsCreating(true)

    try {
      const nextNumber = String(services.length + 1).padStart(2, '0')
      const data = {
        ...newServiceTemplate,
        number: nextNumber,
        slug: `new-service-${Date.now()}`,
      }

      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, status: 'draft' }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error || 'Could not create service')
      }

      toast.success('New service created')
      await loadServices()
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsCreating(false)
    }
  }

  const deleteService = async (service: AdminServicePage) => {
    if (!window.confirm(`Delete "${service.data.title}"?`)) return

    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: 'DELETE',
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error || 'Could not delete service')
      }

      toast.success('Service deleted')
      setSelectedId('')
      setEditorData(null)
      await loadServices()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  useEffect(() => {
    loadServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Service Details CMS
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, edit, publish, and manage service detail pages from the backend.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={loadServices}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            type="button"
            onClick={createService}
            disabled={isCreating}
            className="bg-[#061331] text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            {isCreating ? 'Creating...' : 'Add Service'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Left column: List of Services */}
        <div className="xl:col-span-3">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 p-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Services List
              </CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="Search services..."
                  className="h-10 bg-white pl-9 text-xs"
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[calc(100vh-16rem)] space-y-2 overflow-y-auto p-3">
              {isLoading ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-500">
                  Loading services...
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-500">
                  No services found.
                </div>
              ) : (
                filteredServices.map(service => (
                  <button
                    type="button"
                    key={service.id}
                    onClick={() => selectService(service)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      selectedId === service.id
                        ? 'border-[#d7a23a] bg-[#fff9ed]'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-slate-900">
                          {service.data.number}. {service.data.title}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          /services/{service.data.slug}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[9px] px-1.5 py-0 ${
                          service.status === 'published'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-amber-200 bg-amber-50 text-amber-700'
                        }`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Center column: Form Editor */}
        <div className="xl:col-span-5 space-y-6">
          {selectedService && editorData ? (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-[#d7a23a]" />
                      <Badge variant="outline" className="text-[10px]">Service Details Editor</Badge>
                    </div>
                    <CardTitle className="text-base font-black text-slate-950">
                      Edit details page
                    </CardTitle>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                      <Link href={`/services/${editorData.slug}`} target="_blank">
                        <Eye className="h-3.5 w-3.5" />
                        View Page
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs text-red-600 hover:text-red-700"
                      onClick={() => deleteService(selectedService)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={saveService}
                      disabled={isSaving}
                      className="h-8 text-xs bg-[#061331] text-white hover:bg-slate-800"
                    >
                      <Save className="h-3.5 w-3.5" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                {/* Main Settings */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Service Number</Label>
                      <Input
                        value={editorData.number}
                        onChange={e => setEditorData({ ...editorData, number: e.target.value })}
                        placeholder="01"
                        className="text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Publishing Status</Label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <Button
                          type="button"
                          variant={status === 'draft' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setStatus('draft')}
                          className={`h-8 text-xs ${status === 'draft' ? 'bg-amber-600 text-white hover:bg-amber-700' : ''}`}
                        >
                          Draft
                        </Button>
                        <Button
                          type="button"
                          variant={status === 'published' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setStatus('published')}
                          className={`h-8 text-xs ${status === 'published' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : ''}`}
                        >
                          Publish
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <ServiceDetailFormEditor
                  data={editorData}
                  onChange={nextData => setEditorData(nextData)}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-8 text-center">
                <Edit3 className="mx-auto h-10 w-10 text-slate-300" />
                <h2 className="mt-4 text-base font-black text-slate-900">
                  Select a service
                </h2>
                <p className="mt-2 text-xs text-slate-500">
                  Choose a service from the left to edit its detail page content.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Live Preview Frame */}
        <div className="xl:col-span-4">
          {selectedService && editorData ? (
            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm xl:sticky xl:top-6">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-4">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Live Preview
                  </CardTitle>
                  <CardDescription className="text-[10px]">
                    Updates instantly as you type.
                  </CardDescription>
                </div>
                <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                  {Object.entries(previewDevices).map(([mode, device]) => {
                    const Icon = device.icon

                    return (
                      <Button
                        key={mode}
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewportMode(mode as PreviewViewportMode)}
                        className={`h-7 gap-1 px-2 text-[10px] ${
                          viewportMode === mode ? 'bg-white shadow-xs' : ''
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="hidden sm:inline">{device.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardHeader>
              <CardContent className="bg-slate-100 p-0">
                <ResponsivePreviewFrame device={viewportMode}>
                  <ServiceDetailPreview service={editorData} />
                </ResponsivePreviewFrame>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
