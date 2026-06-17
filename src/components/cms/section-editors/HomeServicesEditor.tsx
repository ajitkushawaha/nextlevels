'use client'

import { useEffect, useState } from 'react'
import { Pin, PinOff, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { HomeServicesSection } from '@/lib/cms/types'

interface HomeServicesEditorProps {
  section: HomeServicesSection
  onChange: (section: HomeServicesSection) => void
}

export default function HomeServicesEditor({
  section,
  onChange,
}: HomeServicesEditorProps) {
  const [allServices, setAllServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/admin/services')
        if (res.ok) {
          const data = await res.json()
          setAllServices(data.services || [])
        }
      } catch (err) {
        console.error('Failed to load services for picker:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const isPinned = (serviceTitle: string) => {
    return (section.services || []).some(s => s.title === serviceTitle)
  }

  const togglePin = (service: any) => {
    const title = service.title
    const description = service.data?.shortDesc || service.data?.description || ''
    const image = service.data?.image || '/image.png'

    let updatedServices = [...(section.services || [])]

    if (isPinned(title)) {
      updatedServices = updatedServices.filter(s => s.title !== title)
    } else {
      updatedServices.push({ title, description, image })
    }

    onChange({
      ...section,
      services: updatedServices,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="services-eyebrow">Eyebrow</Label>
        <Input
          id="services-eyebrow"
          value={section.eyebrow}
          onChange={e => onChange({ ...section, eyebrow: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="services-title">Title</Label>
        <Input
          id="services-title"
          value={section.title}
          onChange={e => onChange({ ...section, title: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label>Select Services to Pin on Homepage</Label>
        {loading ? (
          <p className="text-xs text-slate-400">Loading services from database...</p>
        ) : allServices.length === 0 ? (
          <p className="text-xs text-amber-500 font-semibold">No services found in database.</p>
        ) : (
          <div className="grid gap-2">
            {allServices.map(srv => {
              const pinned = isPinned(srv.title)
              return (
                <div
                  key={srv.id || srv._id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    pinned
                      ? 'border-[#d7a23a]/40 bg-amber-500/5'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#081638]">{srv.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 max-w-sm truncate">
                      {srv.data?.shortDesc || srv.data?.description || 'No description available'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={pinned ? 'default' : 'outline'}
                    onClick={() => togglePin(srv)}
                    className={`h-8 px-3 gap-1.5 text-[10px] font-black uppercase transition-all ${
                      pinned
                        ? 'bg-[#061331] hover:bg-[#061331]/95 text-white'
                        : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    {pinned ? (
                      <>
                        <Star className="h-3.5 w-3.5 fill-[#d7a23a] text-[#d7a23a]" />
                        Pinned
                      </>
                    ) : (
                      <>
                        <Star className="h-3.5 w-3.5 text-slate-400" />
                        Pin Item
                      </>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
