'use client'

import { useEffect, useState } from 'react'
import { Star, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { HomeBlogSection } from '@/lib/cms/types'

interface HomeBlogEditorProps {
  section: HomeBlogSection
  onChange: (section: HomeBlogSection) => void
}

export default function HomeBlogEditor({
  section,
  onChange,
}: HomeBlogEditorProps) {
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([])
  const pinnedCount = section.posts?.length || 0
  const remainingSlots = Math.max(0, 4 - pinnedCount)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/admin/blog/create')
        if (res.ok) {
          const data = await res.json()
          setAllBlogs(data)
        }
      } catch (err) {
        console.error('Failed to load blogs for picker:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const isPinned = (blogTitle: string) => {
    return (section.posts || []).some(b => b.title === blogTitle)
  }

  const buildPinnedBlog = (blog: any) => {
    const title = blog.title
    const image = blog.featuredImage || '/visa/blog1.png'
    const dateVal = blog.publishedAt || blog.createdAt
    const date = new Date(dateVal).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    const href = `/blog/${blog.slug}`

    return { title, image, date, href }
  }

  const toggleSelectedBlog = (blogTitle: string) => {
    setSelectedBlogs(prev =>
      prev.includes(blogTitle)
        ? prev.filter(title => title !== blogTitle)
        : prev.length >= remainingSlots
          ? prev
          : [...prev, blogTitle]
    )
  }

  const pinSelectedBlogs = () => {
    const nextPinned = allBlogs
      .filter(blog => selectedBlogs.includes(blog.title))
      .filter(blog => !isPinned(blog.title))
      .slice(0, remainingSlots)
      .map(buildPinnedBlog)

    if (nextPinned.length === 0) return

    onChange({
      ...section,
      posts: [...(section.posts || []), ...nextPinned],
    })

    setSelectedBlogs([])
  }

  const removePinnedBlog = (blogTitle: string) => {
    onChange({
      ...section,
      posts: (section.posts || []).filter(blog => blog.title !== blogTitle),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="blog-eyebrow">Eyebrow</Label>
        <Input
          id="blog-eyebrow"
          value={section.eyebrow}
          onChange={e => onChange({ ...section, eyebrow: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="blog-title">Title</Label>
        <Input
          id="blog-title"
          value={section.title}
          onChange={e => onChange({ ...section, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="blog-cta-label">CTA Label</Label>
          <Input
            id="blog-cta-label"
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
          <Label htmlFor="blog-cta-href">CTA Link</Label>
          <Input
            id="blog-cta-href"
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
        <Label>Select Blog Posts to Pin on Homepage</Label>
        {loading ? (
          <p className="text-xs text-slate-400">Loading blogs from database...</p>
        ) : allBlogs.length === 0 ? (
          <p className="text-xs text-amber-500 font-semibold">No blogs found in database.</p>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select up to 4 blog posts
                </p>
                <Button
                  type="button"
                  size="sm"
                  onClick={pinSelectedBlogs}
                  disabled={selectedBlogs.length === 0}
                  className="h-8 gap-1.5 bg-[#061331] px-3 text-[10px] font-black uppercase text-white hover:bg-[#061331]/95"
                >
                  <Star className="h-3.5 w-3.5 text-[#d7a23a]" />
                  Pin Selected
                </Button>
              </div>
              <div className="max-h-64 overflow-y-auto p-2">
                {allBlogs.map(blog => {
                  const pinned = isPinned(blog.title)
                  const checked = selectedBlogs.includes(blog.title)
                  const limitReached = !checked && selectedBlogs.length >= remainingSlots

                  return (
                    <label
                      key={blog.id || blog._id || blog.title}
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
                        onChange={() => toggleSelectedBlog(blog.title)}
                        className="h-4 w-4 rounded border-slate-300 text-[#061331] accent-[#061331]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold">
                          {blog.title}
                        </span>
                        <span className="block truncate text-[10px] text-slate-400">
                          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()} · {blog.category || 'General'}
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
                {pinnedCount}/4 pinned · {selectedBlogs.length} selected
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedBlogs([])}
                disabled={selectedBlogs.length === 0}
                className="h-8 text-[10px] font-bold uppercase"
              >
                Clear Selection
              </Button>
            </div>

            {(section.posts || []).length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-400">
                No blog posts pinned yet.
              </p>
            ) : (
              <div className="grid gap-2">
                {(section.posts || []).map(blog => (
                <div
                  key={blog.title}
                  className="flex items-center justify-between rounded-xl border border-[#d7a23a]/40 bg-amber-500/5 p-3.5"
                >
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#081638]">{blog.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      📅 {blog.date}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removePinnedBlog(blog.title)}
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
