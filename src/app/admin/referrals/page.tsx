'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Copy, Link2, Plus, RefreshCw, UserRoundCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type ReferralAgent = {
  _id: string
  name: string
  code: string
  publicToken?: string
  email?: string
  phone?: string
  notes?: string
  isActive: boolean
  totalLeads: number
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

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  notes: '',
}

export default function ReferralAgentsPage() {
  const [agents, setAgents] = useState<ReferralAgent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<ReferralAgent | null>(null)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [form, setForm] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const selectedLink = selectedAgent ? `${origin}/referral/${selectedAgent.publicToken || selectedAgent.code}` : ''

  const totalLeads = useMemo(
    () => agents.reduce((sum, agent) => sum + (agent.totalLeads || 0), 0),
    [agents]
  )

  const loadAgents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/referral-agents')
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to load referral agents')
      setAgents(data.agents || [])
    } catch (error: any) {
      toast.error(error.message || 'Unable to load referral agents')
    } finally {
      setIsLoading(false)
    }
  }

  const loadAgentDetails = async (agent: ReferralAgent) => {
    setSelectedAgent(agent)
    try {
      const response = await fetch(`/api/admin/referral-agents/${agent.code}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to load agent leads')
      setSelectedAgent({ ...data.agent, totalLeads: data.enquiries?.length || 0 })
      setEnquiries(data.enquiries || [])
    } catch (error: any) {
      toast.error(error.message || 'Unable to load agent leads')
    }
  }

  useEffect(() => {
    loadAgents()
  }, [])

  const createAgent = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim()) {
      toast.error('Agent name is required')
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/referral-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to create referral agent')
      toast.success('Referral agent created')
      setForm(emptyForm)
      await loadAgents()
    } catch (error: any) {
      toast.error(error.message || 'Unable to create referral agent')
    } finally {
      setIsSaving(false)
    }
  }

  const copyText = async (value: string, message: string) => {
    await navigator.clipboard.writeText(value)
    toast.success(message)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Referral Agent Tracking</h1>
          <p className="mt-1 text-sm text-slate-500">
            Generate agent links and track registrations submitted through each referral.
          </p>
        </div>
        <Button onClick={loadAgents} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Agents" value={agents.length} />
        <StatCard label="Total Referral Leads" value={totalLeads} />
        <StatCard label="Active Agents" value={agents.filter(agent => agent.isActive).length} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-6">
          <form onSubmit={createAgent} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-black text-[#061331]">Create Agent Link</h2>
            <div className="mt-4 space-y-3">
              <Field label="Agent Name">
                <Input value={form.name} onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))} />
              </Field>
              <Field label="Email">
                <Input value={form.email} onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))} />
              </Field>
              <Field label="Phone">
                <Input value={form.phone} onChange={event => setForm(prev => ({ ...prev, phone: event.target.value }))} />
              </Field>
              <Field label="Notes">
                <Textarea rows={3} value={form.notes} onChange={event => setForm(prev => ({ ...prev, notes: event.target.value }))} />
              </Field>
              <Button disabled={isSaving} className="w-full bg-[#061331] text-white hover:bg-[#061331]/95">
                <Plus className="h-4 w-4" />
                {isSaving ? 'Creating...' : 'Create Agent'}
              </Button>
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="px-1 text-sm font-black text-[#061331]">Agents</h2>
            <div className="mt-3 space-y-2">
              {isLoading ? (
                <p className="p-4 text-center text-xs font-semibold text-slate-400">Loading agents...</p>
              ) : agents.length === 0 ? (
                <p className="p-4 text-center text-xs font-semibold text-slate-400">No agents created yet.</p>
              ) : (
                agents.map(agent => (
                  <button
                    key={agent._id}
                    type="button"
                    onClick={() => loadAgentDetails(agent)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      selectedAgent?.code === agent.code
                        ? 'border-[#d7a23a]/70 bg-[#fffbeb]'
                        : 'border-slate-100 bg-slate-50 hover:border-[#d7a23a]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-[#061331]">{agent.name}</p>
                        <p className="mt-1 text-[11px] font-bold text-slate-400">{agent.code}</p>
                      </div>
                      <span className="rounded-full bg-[#061331] px-2.5 py-1 text-[11px] font-black text-white">
                        {agent.totalLeads || 0}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {selectedAgent ? (
            <>
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <UserRoundCheck className="h-5 w-5 text-[#d7a23a]" />
                    <h2 className="text-xl font-black text-[#061331]">{selectedAgent.name}</h2>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Total collected through this agent: <span className="font-black text-[#061331]">{enquiries.length}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" onClick={() => copyText(selectedAgent.code, 'Agent code copied')} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </Button>
                  <Button onClick={() => copyText(selectedLink, 'Referral link copied')} className="gap-2 bg-[#061331] text-white hover:bg-[#061331]/95">
                    <Link2 className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[#d7a23a]/25 bg-[#fffbeb] p-4">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Referral Link</p>
                <p className="mt-1 break-all text-sm font-bold text-[#061331]">{selectedLink}</p>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Qualification</th>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-sm font-semibold text-slate-400">
                            No registrations from this agent yet.
                          </td>
                        </tr>
                      ) : (
                        enquiries.map(enquiry => (
                          <tr key={enquiry._id} className="align-top hover:bg-slate-50/70">
                            <td className="px-4 py-3">
                              <p className="font-black text-[#061331]">{enquiry.fullName}</p>
                              <p className="mt-0.5 text-xs text-slate-500">{enquiry.email}</p>
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-600">{enquiry.phone}</td>
                            <td className="px-4 py-3 font-semibold text-slate-600">{enquiry.educationLevel || 'Not specified'}</td>
                            <td className="px-4 py-3 font-semibold text-slate-600">{enquiry.preferredCountry}</td>
                            <td className="px-4 py-3 font-semibold text-slate-500">
                              {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-4 py-3">
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
              </div>
            </>
          ) : (
            <div className="flex min-h-96 items-center justify-center text-center">
              <div>
                <UserRoundCheck className="mx-auto h-12 w-12 text-slate-300" />
                <h2 className="mt-4 text-lg font-black text-[#061331]">Select an agent</h2>
                <p className="mt-1 text-sm text-slate-500">Click an agent card to view total collections and lead details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#061331]">{value}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</Label>
      {children}
    </div>
  )
}
