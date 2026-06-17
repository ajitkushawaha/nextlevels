'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { HomeUniversitiesSection } from '@/lib/cms/types'

interface HomeUniversitiesEditorProps {
  section: HomeUniversitiesSection
  onChange: (section: HomeUniversitiesSection) => void
}

export default function HomeUniversitiesEditor({
  section,
  onChange,
}: HomeUniversitiesEditorProps) {
  const [allUniversities, setAllUniversities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const res = await fetch('/api/admin/courses/universities')
        if (res.ok) {
          const data = await res.json()
          setAllUniversities(data.universities || [])
        }
      } catch (err) {
        console.error('Failed to load universities for picker:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUniversities()
  }, [])

  const isPinned = (univName: string) => {
    return (section.universities || []).some(u => u.name === univName)
  }

  const togglePin = (univ: any) => {
    const name = univ.name
    const logo = univ.logo || '🏛️'
    const coverImage = univ.bannerImage || '/home2/univercity.png'
    const worldRank = univ.globalRanking || 'N/A'
    const established = univ.cmsData?.established || 'N/A'
    const flag = univ.countryId?.flag || '🏛️'
    const location = univ.city || ''
    const country = univ.countryId?.name || 'International'
    const description = univ.description || ''

    let updatedUniversities = [...(section.universities || [])]

    if (isPinned(name)) {
      updatedUniversities = updatedUniversities.filter(u => u.name !== name)
    } else {
      updatedUniversities.push({
        name,
        logo,
        coverImage,
        worldRank,
        established,
        flag,
        location,
        country,
        description,
      })
    }

    onChange({
      ...section,
      universities: updatedUniversities,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="univ-eyebrow">Eyebrow</Label>
        <Input
          id="univ-eyebrow"
          value={section.eyebrow}
          onChange={e => onChange({ ...section, eyebrow: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="univ-title">Title Prefix</Label>
        <Input
          id="univ-title"
          value={section.title}
          onChange={e => onChange({ ...section, title: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="univ-highlight">Highlighted Title</Label>
        <Input
          id="univ-highlight"
          value={section.highlightedTitle}
          onChange={e => onChange({ ...section, highlightedTitle: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="univ-description">Description</Label>
        <Textarea
          id="univ-description"
          rows={3}
          value={section.description}
          onChange={e => onChange({ ...section, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="univ-cta-label">CTA Label</Label>
          <Input
            id="univ-cta-label"
            value={section.cta.label}
            onChange={e =>
              onChange({
                ...section,
                cta: { ...section.cta, label: e.target.value },
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="univ-cta-href">CTA Link</Label>
          <Input
            id="univ-cta-href"
            value={section.cta.href}
            onChange={e =>
              onChange({
                ...section,
                cta: { ...section.cta, href: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Select Partner Universities to Pin on Homepage</Label>
        {loading ? (
          <p className="text-xs text-slate-400">Loading universities from database...</p>
        ) : allUniversities.length === 0 ? (
          <p className="text-xs text-amber-500 font-semibold">No universities found in database.</p>
        ) : (
          <div className="grid gap-2">
            {allUniversities.map(univ => {
              const pinned = isPinned(univ.name)
              return (
                <div
                  key={univ.id || univ._id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    pinned
                      ? 'border-[#d7a23a]/40 bg-amber-500/5'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#081638]">{univ.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      📍 {univ.city}, {univ.countryId?.name || 'International'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={pinned ? 'default' : 'outline'}
                    onClick={() => togglePin(univ)}
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
