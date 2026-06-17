'use client'

import Link from 'next/link'
import { ArrowRight, Eye, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  cmsDashboardStats,
  cmsPageRegistry,
  getCmsSectionIcon,
} from '@/lib/cms/sectionRegistry'

export default function CMSDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return cmsPageRegistry

    return cmsPageRegistry
      .map(page => ({
        ...page,
        sections: page.sections.filter(
          section =>
            section.title.toLowerCase().includes(query) ||
            section.description.toLowerCase().includes(query) ||
            page.title.toLowerCase().includes(query)
        ),
      }))
      .filter(page => page.sections.length > 0)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            CMS Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Select a website page section to open its editor and live preview.
          </p>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Search pages or sections..."
            className="h-10 bg-white pl-9"
          />
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cmsDashboardStats.map(stat => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">
                    {stat.value}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {filteredPages.map(page => {
          const PageIcon = page.icon

          return (
            <section
              key={page.key}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${page.iconClassName}`}
                  >
                    <PageIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      {page.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {page.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 hover:bg-slate-100">
                    {page.sections.length}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={page.publicPath}>
                      <Eye className="h-4 w-4" />
                      View Page
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {page.sections.map(section => {
                  const SectionIcon = getCmsSectionIcon(section.id)

                  return (
                    <Link
                      key={section.id}
                      href={section.customHref || `/admin/cms/${page.key}/${section.id}`}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white">
                          <SectionIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-bold text-slate-700 sm:text-base">
                              {section.title}
                            </p>
                            <Badge
                              variant="outline"
                              className={
                                section.status === 'ready'
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                  : 'border-amber-200 bg-amber-50 text-amber-700'
                              }
                            >
                              {section.status === 'ready' ? 'Ready' : 'Next'}
                            </Badge>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-slate-400">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
