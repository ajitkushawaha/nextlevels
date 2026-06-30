'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowLeft, ChevronLeft, ChevronRight, Link2, RefreshCw, UserRoundCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ReferralAgent = {
  _id: string
  name: string
  code: string
  iframeUrl: string
  email?: string
  phone?: string
  notes?: string
  isActive: boolean
}

type Enquiry = {
  _id: string
  fullName: string
  email: string
  phone: string
  educationLevel: string
  preferredCountry: string
  sourcePage?: string
  status: string
  createdAt: string
}

const ITEMS_PER_PAGE = 10

export default function AgentDashboardPage() {
  const params = useParams()
  const code = params?.code as string

  const [agent, setAgent] = useState<ReferralAgent | null>(null)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const referralLink = agent ? `${origin}/register/${agent.code.toLowerCase()}` : ''

  const loadAgentDetails = async () => {
    if (!code) return
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/referral-agents/${code}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to load agent dashboard')
      setAgent(data.agent)
      setEnquiries(data.enquiries || [])
      setCurrentPage(1)
    } catch (error: any) {
      toast.error(error.message || 'Unable to load agent details')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAgentDetails()
  }, [code])

  const copyText = async (value: string, message: string) => {
    await navigator.clipboard.writeText(value)
    toast.success(message)
  }

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(enquiries.length / ITEMS_PER_PAGE))
  const paginatedEnquiries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return enquiries.slice(start, start + ITEMS_PER_PAGE)
  }, [enquiries, currentPage])

  const startIndex = enquiries.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, enquiries.length)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-[#d7a23a]" />
          <p className="mt-2 text-sm font-semibold text-slate-500">Loading Agent Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="text-center">
          <h2 className="text-xl font-black text-[#061331]">Agent not found</h2>
          <p className="mt-1 text-sm text-slate-500">The agent with code "{code}" does not exist.</p>
          <Link href="/admin/referrals" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#061331] px-4 py-2 text-xs font-bold text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Referral Agents
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/admin/referrals" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors mb-2">
            <ArrowLeft className="h-3 w-3" /> Back to Referral Agents
          </Link>
          <div className="flex items-center gap-3">
            <UserRoundCheck className="h-6 w-6 text-[#d7a23a]" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">{agent.name}'s Dashboard</h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Track links, status, and students registered through this agent.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadAgentDetails} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Agent Profile</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Agent Code</p>
              <p className="font-bold text-[#061331] mt-0.5">{agent.code}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Email</p>
              <p className="font-bold text-[#061331] mt-0.5">{agent.email || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Phone</p>
              <p className="font-bold text-[#061331] mt-0.5">{agent.phone || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Status</p>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1 ${
                agent.isActive 
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' 
                  : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10'
              }`}>
                {agent.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            {agent.notes && (
              <div className="sm:col-span-2">
                <p className="text-xs font-black uppercase text-slate-400">Notes</p>
                <p className="text-slate-600 mt-1">{agent.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">Referral Performance</h2>
            <p className="text-[11px] text-slate-400 mb-4">Total registrations using this agent's code/link</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#061331]">{enquiries.length}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">Total collected leads</p>
          </div>
        </div>
      </div>

      {/* Referral Link Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">Referral Link</h2>
            <p className="text-sm font-bold text-[#061331] mt-1 break-all bg-amber-50/50 border border-amber-200/50 rounded-lg p-3">
              {referralLink}
            </p>
          </div>
          <div className="flex gap-2 sm:self-end">
            <Button onClick={() => copyText(referralLink, 'Form link copied')} className="gap-2 bg-[#061331] text-white hover:bg-[#061331]/95">
              <Link2 className="h-4 w-4" />
              Copy Link
            </Button>
          </div>
        </div>
      </div>

      {/* Leads/Registrations Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-6">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-sm font-black text-[#061331]">Student Registrations ({enquiries.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5">Qualification</th>
                <th className="px-6 py-3.5">Country</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm font-semibold text-slate-400">
                    No registrations from this agent yet.
                  </td>
                </tr>
              ) : (
                paginatedEnquiries.map(enquiry => (
                  <tr key={enquiry._id} className="align-middle hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <p className="font-black text-[#061331]">{enquiry.fullName}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{enquiry.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{enquiry.phone}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{enquiry.educationLevel || 'Not specified'}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{enquiry.preferredCountry}</td>
                    <td className="px-6 py-4 font-semibold text-slate-500">
                      {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#d7a23a]/12 px-2.5 py-1 text-xs font-black capitalize text-[#9a6a12]">
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {enquiries.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-500">
              Showing <span className="text-slate-800">{startIndex}</span> to{' '}
              <span className="text-slate-800">{endIndex}</span> of{' '}
              <span className="text-slate-800">{enquiries.length}</span> registrations
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 text-xs font-black ${
                    currentPage === page
                      ? 'bg-[#061331] text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
