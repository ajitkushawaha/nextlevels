'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, Plus, Trash2, Edit2, GraduationCap, MapPin, DollarSign, Calendar, Badge } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface Course {
  id: string
  name: string
  university: string
  degree: string
  duration: string
  country: string
  tuitionFees: string
}

export default function CoursesManager() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'crs_1',
      name: 'MSc in Computer Science',
      university: 'University of Toronto',
      degree: 'Postgraduate',
      duration: '2 Years',
      country: 'Canada',
      tuitionFees: '$38,000 / Year'
    },
    {
      id: 'crs_2',
      name: 'MBA (Global Business)',
      university: 'London Business School',
      degree: 'Postgraduate',
      duration: '1.5 Years',
      country: 'UK',
      tuitionFees: '£42,000 / Year'
    },
    {
      id: 'crs_3',
      name: 'Bachelor of Engineering (Software)',
      university: 'University of Melbourne',
      degree: 'Undergraduate',
      duration: '4 Years',
      country: 'Australia',
      tuitionFees: '$45,000 / Year'
    },
    {
      id: 'crs_4',
      name: 'MS in Data Science',
      university: 'Stanford University',
      degree: 'Postgraduate',
      duration: '2 Years',
      country: 'USA',
      tuitionFees: '$55,000 / Year'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // New Course fields
  const [newName, setNewName] = useState('')
  const [newUni, setNewUni] = useState('')
  const [newDegree, setNewDegree] = useState('')
  const [newDur, setNewDur] = useState('')
  const [newCountry, setNewCountry] = useState('')
  const [newFees, setNewFees] = useState('')

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id))
    toast.success('Course removed successfully (Mock)')
  }

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newUni || !newCountry) {
      toast.error('Course Name, University, and Country are required')
      return
    }

    const crs: Course = {
      id: `crs_${Date.now()}`,
      name: newName,
      university: newUni,
      degree: newDegree || 'Postgraduate',
      duration: newDur || '2 Years',
      country: newCountry,
      tuitionFees: newFees || '$30,000 / Year'
    }

    setCourses([...courses, crs])
    toast.success('New course added (Mock)')
    setIsAddOpen(false)
    setNewName('')
    setNewUni('')
    setNewDegree('')
    setNewDur('')
    setNewCountry('')
    setNewFees('')
  }

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCourse) return

    setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c))
    toast.success('Course parameters saved (Mock)')
    setEditingCourse(null)
  }

  const filteredCourses = courses.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.university.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = countryFilter === 'all' || c.country.toLowerCase() === countryFilter.toLowerCase()
    
    return matchesSearch && matchesCountry
  })

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Course Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage study abroad course catalog and country specific options.</p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#061331] hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="h-4 w-4" /> Add Course
        </Button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search courses or universities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs h-9 bg-slate-50 border-slate-200"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'Canada', 'UK', 'Australia', 'USA'].map((c) => (
            <Button
              key={c}
              variant={countryFilter === c ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCountryFilter(c)}
              className="text-[11px] h-8 capitalize font-medium"
            >
              {c === 'all' ? 'All Countries' : c}
            </Button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((crs) => (
          <Card key={crs.id} className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden hover:shadow-md transition">
            <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100 text-blue-600 shrink-0">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800">{crs.name}</CardTitle>
                  <CardDescription className="text-[10px] text-slate-400 mt-0.5">{crs.university}</CardDescription>
                </div>
              </div>
              <Badge className="bg-slate-100 text-slate-700 border border-slate-200">
                {crs.degree}
              </Badge>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {crs.country}</div>
                <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {crs.duration}</div>
                <div className="flex items-center gap-0.5"><DollarSign className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {crs.tuitionFees}</div>
              </div>
              
              <hr className="border-slate-100" />
              
              <div className="flex justify-end gap-1.5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingCourse(crs)}
                  className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(crs.id)}
                  className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Course Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-slate-200">
          <DialogHeader className="border-b border-slate-100 pb-3">
            <DialogTitle className="text-base font-bold text-slate-900">Add New Course</DialogTitle>
            <DialogDescription className="text-[10px] text-slate-400">Configure new curriculum/program option details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCourse} className="space-y-4 py-4 text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="crs-name">Course Name</Label>
              <Input 
                id="crs-name" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Master of Business Administration"
                required
                className="bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="crs-uni">University Name</Label>
              <Input 
                id="crs-uni" 
                value={newUni} 
                onChange={(e) => setNewUni(e.target.value)}
                placeholder="e.g. McGill University"
                required
                className="bg-slate-50 border-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="crs-degree">Degree Level</Label>
                <Input 
                  id="crs-degree" 
                  value={newDegree} 
                  onChange={(e) => setNewDegree(e.target.value)}
                  placeholder="e.g. Postgraduate"
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="crs-dur">Duration</Label>
                <Input 
                  id="crs-dur" 
                  value={newDur} 
                  onChange={(e) => setNewDur(e.target.value)}
                  placeholder="e.g. 2 Years"
                  className="bg-slate-50 border-slate-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="crs-country">Country</Label>
                <Input 
                  id="crs-country" 
                  value={newCountry} 
                  onChange={(e) => setNewCountry(e.target.value)}
                  placeholder="e.g. Canada"
                  required
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="crs-fees">Tuition Fees</Label>
                <Input 
                  id="crs-fees" 
                  value={newFees} 
                  onChange={(e) => setNewFees(e.target.value)}
                  placeholder="e.g. $35,000 / Year"
                  className="bg-slate-50 border-slate-200"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#061331] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg h-9">
                Add Course
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      {editingCourse && (
        <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
          <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-slate-200">
            <DialogHeader className="border-b border-slate-100 pb-3">
              <DialogTitle className="text-base font-bold text-slate-900">Edit Course — {editingCourse.name}</DialogTitle>
              <DialogDescription className="text-[10px] text-slate-400">Modify course parameters and specifications</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSave} className="space-y-4 py-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="edit-crs-name">Course Name</Label>
                <Input 
                  id="edit-crs-name" 
                  value={editingCourse.name} 
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  required
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-crs-uni">University Name</Label>
                <Input 
                  id="edit-crs-uni" 
                  value={editingCourse.university} 
                  onChange={(e) => setEditingCourse({ ...editingCourse, university: e.target.value })}
                  required
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-crs-degree">Degree Level</Label>
                  <Input 
                    id="edit-crs-degree" 
                    value={editingCourse.degree} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, degree: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-crs-dur">Duration</Label>
                  <Input 
                    id="edit-crs-dur" 
                    value={editingCourse.duration} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-crs-country">Country</Label>
                  <Input 
                    id="edit-crs-country" 
                    value={editingCourse.country} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, country: e.target.value })}
                    required
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-crs-fees">Tuition Fees</Label>
                  <Input 
                    id="edit-crs-fees" 
                    value={editingCourse.tuitionFees} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, tuitionFees: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditingCourse(null)} className="text-xs h-9">
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
