'use client'

import { useEffect, useState } from 'react'
import { Star, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { HomeUniversitiesSection } from '@/lib/cms/types'
import { universitiesData } from '@/lib/mockData'

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
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([])
  const pinnedCount = section.universities?.length || 0
  const remainingSlots = Math.max(0, 4 - pinnedCount)

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const res = await fetch('/api/admin/courses/universities')
        if (res.ok) {
          const data = await res.json()
          const dbUniversities = data.universities || []
          setAllUniversities(
            dbUniversities.length > 0
              ? dbUniversities
              : Object.values(universitiesData)
          )
        } else {
          setAllUniversities(Object.values(universitiesData))
        }
      } catch (err) {
        console.error('Failed to load universities for picker:', err)
        setAllUniversities(Object.values(universitiesData))
      } finally {
        setLoading(false)
      }
    }
    fetchUniversities()
  }, [])

  const isPinned = (univName: string) => {
    return (section.universities || []).some(u => u.name === univName)
  }

  const buildPinnedUniversity = (univ: any) => {
    const name = univ.name
    const logo = univ.logo || '🏛️'
    const coverImage = univ.coverImage || univ.bannerImage || '/home2/univercity.png'
    const worldRank = univ.worldRank || univ.globalRanking || 'N/A'
    const established = univ.established || univ.cmsData?.established || 'N/A'
    const flag = univ.flag || univ.countryId?.flag || '🏛️'
    const location = univ.location || univ.city || ''
    const country = univ.country || univ.countryId?.name || 'International'
    const description = univ.description || ''
    const students = univ.students || univ.cmsData?.students || 'N/A'

    return {
      name,
      logo,
      coverImage,
      worldRank,
      established,
      flag,
      location,
      country,
      description,
      students,
    }
  }

  const toggleSelectedUniversity = (univName: string) => {
    setSelectedUniversities(prev =>
      prev.includes(univName)
        ? prev.filter(name => name !== univName)
        : prev.length >= remainingSlots
          ? prev
        : [...prev, univName]
    )
  }

  const pinSelectedUniversities = () => {
    const nextPinned = allUniversities
      .filter(university => selectedUniversities.includes(university.name))
      .filter(university => !isPinned(university.name))
      .slice(0, remainingSlots)
      .map(buildPinnedUniversity)

    if (nextPinned.length === 0) return

    onChange({
      ...section,
      universities: [
        ...(section.universities || []),
        ...nextPinned,
      ],
    })

    setSelectedUniversities([])
  }

  const removePinnedUniversity = (univName: string) => {
    onChange({
      ...section,
      universities: (section.universities || []).filter(univ => univ.name !== univName),
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
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select up to 4 universities
                </p>
                <Button
                  type="button"
                  size="sm"
                  onClick={pinSelectedUniversities}
                  disabled={selectedUniversities.length === 0}
                  className="h-8 gap-1.5 bg-[#061331] px-3 text-[10px] font-black uppercase text-white hover:bg-[#061331]/95"
                >
                  <Star className="h-3.5 w-3.5 text-[#d7a23a]" />
                  Pin Selected
                </Button>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                {allUniversities.map(univ => {
                  const pinned = isPinned(univ.name)
                  const checked = selectedUniversities.includes(univ.name)
                  const limitReached = !checked && selectedUniversities.length >= remainingSlots

                  return (
                    <label
                      key={univ.id || univ._id || univ.name}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition ${
                        pinned || limitReached
                          ? 'cursor-not-allowed bg-slate-50 text-slate-400'
                          : checked
                            ? 'bg-amber-50 text-[#081638]'
                            : 'hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={pinned || limitReached}
                        onChange={() => toggleSelectedUniversity(univ.name)}
                        className="h-4 w-4 rounded border-slate-300 text-[#061331] accent-[#061331]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold">
                          {univ.name}
                        </span>
                        <span className="block truncate text-[10px] text-slate-400">
                          {univ.location || univ.city}, {univ.country || univ.countryId?.name || 'International'}
                          {pinned ? ' - pinned' : ''}
                          {limitReached ? ' - limit reached' : ''}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold text-slate-400">
                {pinnedCount}/4 pinned · {selectedUniversities.length} selected
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedUniversities([])}
                disabled={selectedUniversities.length === 0}
                className="h-8 text-[10px] font-bold uppercase"
              >
                Clear Selection
              </Button>
            </div>

            {(section.universities || []).length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-400">
                No universities pinned yet.
              </p>
            ) : (
              <div className="grid gap-2">
                {(section.universities || []).map(univ => (
                <div
                  key={univ.name}
                  className="flex items-center justify-between rounded-xl border border-[#d7a23a]/40 bg-amber-500/5 p-3.5"
                >
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#081638]">{univ.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      📍 {univ.location}, {univ.country}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removePinnedUniversity(univ.name)}
                    className="h-8 gap-1.5 border-slate-300 px-3 text-[10px] font-black uppercase text-slate-600 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </Button>
                </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
