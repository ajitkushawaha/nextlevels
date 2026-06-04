'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FileText, Eye, Edit2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CMSPage {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  lastModified: string
  editorRoute: string
}

export default function CMSPageManager() {
  const router = useRouter()

  const [pages] = useState<CMSPage[]>([
    {
      id: 'home',
      title: 'Home Page',
      slug: '/',
      status: 'published',
      lastModified: '2026-06-03',
      editorRoute: '/admin/cms/home'
    },
    {
      id: 'about',
      title: 'About Page',
      slug: '/about-us',
      status: 'published',
      lastModified: '2026-05-28',
      editorRoute: '/admin/cms/about'
    },
    {
      id: 'contact',
      title: 'Contact Page',
      slug: '/contact-us',
      status: 'published',
      lastModified: '2026-06-01',
      editorRoute: '/admin/cms/contact'
    },
    {
      id: 'services',
      title: 'Services Landing',
      slug: '/services',
      status: 'published',
      lastModified: '2026-05-15',
      editorRoute: '/admin/services'
    },
    {
      id: 'courses',
      title: 'Course Finder Page',
      slug: '/courses',
      status: 'published',
      lastModified: '2026-05-20',
      editorRoute: '/admin/courses'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Public Layout Pages</h1>
          <p className="text-slate-500 text-sm mt-0.5">List of all active public layout interfaces on the website.</p>
        </div>
      </div>

      {/* List Mode Page */}
      <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-sm font-bold text-slate-800">All Public Pages</CardTitle>
            <CardDescription className="text-[11px] text-slate-400">Select any layout page below to open its dedicated content editor</CardDescription>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search layout pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-xs h-8 bg-slate-50 border-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4 pl-6">Page Title</th>
                  <th className="p-4">URL Route</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Modified</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pl-6 font-bold text-slate-800 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                      {page.title}
                    </td>
                    <td className="p-4 font-mono text-slate-500">{page.slug}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {page.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-400 font-medium">{page.lastModified}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => router.push(page.slug)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => router.push(page.editorRoute)}
                          className="h-8 w-8 p-0 text-slate-[#061331] hover:bg-slate-100 font-bold"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-[#061331]" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                      No pages matching search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
