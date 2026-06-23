'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  Filter,
} from 'lucide-react'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  author: string
  status: 'published' | 'draft'
  category: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [categories, setCategories] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Fetch blogs and categories from API
  useEffect(() => {
    fetchBlogsList()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/blog-config', {
        cache: 'no-store',
      })
      const data = await response.json()
      if (data.success && data.data?.categories) {
        setCategories(data.data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  const fetchBlogsList = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/blog/create')
      if (response.ok) {
        const data = await response.json()
        setBlogs(data || [])
      } else {
        console.error(
          'Failed to fetch blogs:',
          response.status,
          response.statusText
        )
        // You could set an error state here to show to the user
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      // You could set an error state here to show to the user
    } finally {
      setLoading(false)
    }
  }
  // Filter blogs based on search and status
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    const matchesCategory =
      categoryFilter === 'all' || blog.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = async (blogId: string, blogTitle: string) => {
    setDeletingId(blogId)

    try {
      const response = await fetch(`/api/admin/blog/${blogId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== blogId))
        toast.success(`"${blogTitle}" deleted successfully!`)
        fetchBlogsList()
      } else {
        throw new Error('Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Error deleting blog. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800"></div>
          <p className="text-slate-600 text-sm font-medium">Loading blog list...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Blog Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Create, edit, publish, and manage your blog posts catalog.</p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="bg-[#061331] hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition">
            <Plus className="w-4 h-4" />
            Create New Blog
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Filters and Search */}
        <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-9 text-xs h-9 bg-slate-50 border-slate-200"
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full md:w-48 text-xs h-9 bg-slate-50 border-slate-200">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-800 border-slate-200">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem
                        key={category._id || category.slug}
                        value={category.name}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48 text-xs h-9 bg-slate-50 border-slate-200">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-800 border-slate-200">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {filteredBlogs.length} of {blogs.length} blogs
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 mb-6">
                {blogs.length === 0
                  ? 'Get started by creating your first blog post.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
              {blogs.length === 0 && (
                <Link href="/admin/blog/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Blog
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredBlogs.map(blog => (
              <Card
                key={blog._id}
                className="border border-slate-200/80 shadow-xs bg-white rounded-2xl overflow-hidden hover:shadow-md transition duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2.5">
                        <h3 className="text-sm font-bold text-slate-800 hover:text-blue-600 transition">
                          <Link href={`/admin/blog/edit/${blog._id}`}>
                            {blog.title}
                          </Link>
                        </h3>
                        <Badge className={`text-[10px] ${getStatusColor(blog.status)}`}>
                          {blog.status}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-500 mb-3.5 line-clamp-2 leading-relaxed font-medium">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center gap-6 text-[10px] text-slate-400 font-medium">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {blog.publishedAt
                            ? formatDate(blog.publishedAt)
                            : formatDate(blog.createdAt)}
                        </div>
                        <div className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">Category: {blog.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {blog.status === 'published' ? (
                        <Link href={`/blog/${blog.slug}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span tabIndex={0}>
                                <Button variant="outline" size="sm" disabled>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Publish the blog to view it</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <Link href={`/admin/blog/edit/${blog._id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            disabled={deletingId === blog._id}
                          >
                            {deletingId === blog._id ? (
                              <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Blog Post
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{blog.title}"?
                              This action cannot be undone and will permanently
                              remove the blog post from the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog._id, blog.title)}
                              className="bg-red-600 hover:bg-red-700"
                              disabled={deletingId === blog._id}
                            >
                              {deletingId === blog._id ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Deleting...
                                </div>
                              ) : (
                                'Delete Blog'
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
