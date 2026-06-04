'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  X,
  Filter
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Inquiry {
  id: string
  name: string
  email: string
  mobile: string
  subject: string
  message: string
  status: 'Pending' | 'Contacted' | 'Resolved'
  date: string
}

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 'inq_1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      mobile: '+91 98765 43210',
      subject: 'Student Visa Canada Inquiry',
      message: 'Hello, I want to know the visa process for applying to McGill University for Fall 2026 intake. What documents are required?',
      status: 'Pending',
      date: '2026-06-04'
    },
    {
      id: 'inq_2',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      mobile: '+91 87654 32109',
      subject: 'IELTS Coaching Details',
      message: 'Can you share the timings and batch details for online IELTS coaching sessions? I am looking to score 7.5 bands.',
      status: 'Contacted',
      date: '2026-06-02'
    },
    {
      id: 'inq_3',
      name: 'Michael Miller',
      email: 'michael.m@example.com',
      mobile: '+1 415 555 2671',
      subject: 'UK University Admissions',
      message: 'Looking for advice on postgraduate courses in Software Engineering in UK universities. Do you cover admission support?',
      status: 'Resolved',
      date: '2026-05-30'
    },
    {
      id: 'inq_4',
      name: 'Amina Al-Fayed',
      email: 'amina.fayed@example.com',
      mobile: '+971 50 123 4567',
      subject: 'Scholarship guidance Australia',
      message: 'Are there any fully funded scholarship opportunities for master courses in Sydney or Melbourne for international students?',
      status: 'Pending',
      date: '2026-06-03'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Contacted' | 'Resolved') => {
    setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq))
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus })
    }
    toast.success(`Inquiry marked as ${newStatus}`)
  }

  const handleDelete = (id: string) => {
    setInquiries(inquiries.filter(inq => inq.id !== id))
    toast.success('Inquiry deleted successfully (Mock)')
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null)
    }
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Resolved</Badge>
      case 'Contacted':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 flex items-center gap-1"><Clock className="h-3 w-3" /> Contacted</Badge>
      default:
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 flex items-center gap-1"><HelpCircle className="h-3 w-3" /> Pending</Badge>
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inquiry Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and respond to student inquiries and visa consultations requests.</p>
        </div>
      </div>

      {/* Filter controls row */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by name, email, or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs h-9 bg-slate-50 border-slate-200"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {['all', 'Pending', 'Contacted', 'Resolved'].map((filter) => (
            <Button
              key={filter}
              variant={statusFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(filter)}
              className="text-[11px] h-8 capitalize font-medium"
            >
              {filter === 'all' ? 'All Inquiries' : filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4 pl-6">Student Details</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-slate-800">{inq.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3 shrink-0" /> {inq.email}</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3 shrink-0" /> {inq.mobile}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700 max-w-[200px] truncate">{inq.subject}</td>
                    <td className="p-4">{getStatusBadge(inq.status)}</td>
                    <td className="p-4 text-slate-400 font-medium">{inq.date}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedInquiry(inq)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(inq.id)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                      No inquiries match your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Inquiry Detail Dialog */}
      {selectedInquiry && (
        <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
          <DialogContent className="max-w-lg bg-white p-6 rounded-2xl border border-slate-200">
            <DialogHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="text-base font-bold text-slate-900">Inquiry Details</DialogTitle>
                <DialogDescription className="text-[10px] text-slate-400">Received on {selectedInquiry.date}</DialogDescription>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Name</span>
                  <p className="font-bold text-slate-800">{selectedInquiry.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                  <div>{getStatusBadge(selectedInquiry.status)}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Email</span>
                  <p className="font-semibold text-slate-600">{selectedInquiry.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Mobile</span>
                  <p className="font-semibold text-slate-600">{selectedInquiry.mobile}</p>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Subject</span>
                <p className="font-bold text-slate-800 text-sm">{selectedInquiry.subject}</p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400">Query Message</span>
                <p className="text-slate-700 leading-relaxed mt-1 font-medium whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              <hr className="border-slate-100" />

              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-1.5">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'Contacted')}
                    className="text-[10px] h-7"
                  >
                    Mark Contacted
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'Resolved')}
                    className="text-[10px] h-7 bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Mark Resolved
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 text-[10px] h-7"
                >
                  Delete Inquiry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
