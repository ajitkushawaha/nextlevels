'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Search, Plus, Trash2, Edit3, Briefcase, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface Service {
  id: string
  title: string
  excerpt: string
  description: string
  status: 'active' | 'inactive'
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 'srv_1',
      title: 'Visa Application Support',
      excerpt: 'Comprehensive visa guidance and documentation services.',
      description: 'Our expert visa counselors help you compile and submit all required embassy documents for UK, Canada, Australia, and USA. We also conduct mock interviews.',
      status: 'active'
    },
    {
      id: 'srv_2',
      title: 'IELTS Coaching Center',
      excerpt: 'Online and offline training programs for IELTS exams.',
      description: 'Prepare with certified IELTS tutors. Weekly practice tests, customized study planners, mock exams, and resources to help secure 7.5 bands and above.',
      status: 'active'
    },
    {
      id: 'srv_3',
      title: 'University Admission Guidance',
      excerpt: 'End-to-end guidance from university shortlisting to enrollments.',
      description: 'Get matched with hundreds of courses matching your academic background. We guide you on writing SOPs, resumes, and securing letters of recommendation.',
      status: 'active'
    },
    {
      id: 'srv_4',
      title: 'Pre-Departure Briefings',
      excerpt: 'Orientations to help you settle in top study destinations.',
      description: 'Orientations on housing, student accounts, part-time work compliance, and custom checklists for international destinations.',
      status: 'inactive'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Fields for new service
  const [newTitle, setNewTitle] = useState('')
  const [newExcerpt, setNewExcerpt] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const handleToggleStatus = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ))
    toast.success('Service status updated successfully (Mock)')
  }

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id))
    toast.success('Service removed successfully (Mock)')
  }

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newExcerpt) {
      toast.error('Title and short excerpt are required')
      return
    }

    const srv: Service = {
      id: `srv_${Date.now()}`,
      title: newTitle,
      excerpt: newExcerpt,
      description: newDesc,
      status: 'active'
    }

    setServices([...services, srv])
    toast.success('New service added (Mock)')
    setIsAddOpen(false)
    setNewTitle('')
    setNewExcerpt('')
    setNewDesc('')
  }

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return

    setServices(services.map(s => s.id === editingService.id ? editingService : s))
    toast.success('Service details saved (Mock)')
    setEditingService(null)
  }

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Service Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Configure and list consultancy service cards shown on the website.</p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#061331] hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      {/* Search Filter Controls */}
      <div className="relative max-w-sm w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search services..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 text-xs h-9 bg-white border-slate-200"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((srv) => (
          <Card key={srv.id} className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-600 shrink-0">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800">{srv.title}</CardTitle>
                  <CardDescription className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">{srv.excerpt}</CardDescription>
                </div>
              </div>
              <Badge className={srv.status === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}>
                {srv.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{srv.description || 'No detailed description configured.'}</p>
              
              <hr className="border-slate-100" />
              
              <div className="flex justify-between items-center text-xs">
                <button 
                  onClick={() => handleToggleStatus(srv.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition"
                >
                  {srv.status === 'active' ? (
                    <>
                      <ToggleRight className="h-5 w-5 text-green-600 shrink-0" />
                      Active status
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-5 w-5 text-slate-400 shrink-0" />
                      Inactive status
                    </>
                  )}
                </button>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setEditingService(srv)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(srv.id)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-slate-200">
          <DialogHeader className="border-b border-slate-100 pb-3">
            <DialogTitle className="text-base font-bold text-slate-900">Add New Service</DialogTitle>
            <DialogDescription className="text-[10px] text-slate-400">Configure new consulting service module details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddService} className="space-y-4 py-4 text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="srv-title">Service Title</Label>
              <Input 
                id="srv-title" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. TOEFL Preparation Classes"
                required
                className="bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="srv-excerpt">Short Excerpt</Label>
              <Input 
                id="srv-excerpt" 
                value={newExcerpt} 
                onChange={(e) => setNewExcerpt(e.target.value)}
                placeholder="e.g. Customized coaching sessions to clear TOEFL"
                required
                className="bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="srv-desc">Detailed Description</Label>
              <Textarea 
                id="srv-desc" 
                value={newDesc} 
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Detailed breakdown of the service elements..."
                rows={3}
                className="bg-slate-50 border-slate-200"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#061331] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg h-9">
                Add Service
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      {editingService && (
        <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
          <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-slate-200">
            <DialogHeader className="border-b border-slate-100 pb-3">
              <DialogTitle className="text-base font-bold text-slate-900">Edit Service — {editingService.title}</DialogTitle>
              <DialogDescription className="text-[10px] text-slate-400">Modify service parameters and specifications</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSave} className="space-y-4 py-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="edit-title">Service Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingService.title} 
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-excerpt">Short Excerpt</Label>
                <Input 
                  id="edit-excerpt" 
                  value={editingService.excerpt} 
                  onChange={(e) => setEditingService({ ...editingService, excerpt: e.target.value })}
                  required
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-desc">Detailed Description</Label>
                <Textarea 
                  id="edit-desc" 
                  value={editingService.description} 
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={4}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditingService(null)} className="text-xs h-9">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#061331] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg h-9">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
