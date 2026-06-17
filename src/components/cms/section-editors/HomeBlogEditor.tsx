'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
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

  const togglePin = (blog: any) => {
    const title = blog.title
    const image = blog.featuredImage || '/visa/blog1.png'
    const dateVal = blog.publishedAt || blog.createdAt
    const date = new Date(dateVal).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    const href = `/blog/${blog.slug}`

    let updatedPosts = [...(section.posts || [])]

    if (isPinned(title)) {
      updatedPosts = updatedPosts.filter(b => b.title !== title)
    } else {
      updatedPosts.push({ title, image, date, href })
    }

    onChange({
      ...section,
      posts: updatedPosts,
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
          <div className="grid gap-2">
            {allBlogs.map(blog => {
              const pinned = isPinned(blog.title)
              return (
                <div
                  key={blog.id || blog._id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    pinned
                      ? 'border-[#d7a23a]/40 bg-amber-500/5'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#081638]">{blog.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      📅 {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()} | Category: {blog.category || 'General'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={pinned ? 'default' : 'outline'}
                    onClick={() => togglePin(blog)}
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
