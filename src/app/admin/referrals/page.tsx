'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Link2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Link from 'next/link'

type ReferralAgent = {
  _id: string
  name: string
  code: string
  iframeUrl: string
  email?: string
  phone?: string
  notes?: string
  isActive: boolean
  totalLeads: number
}

const emptyForm = {
  name: '',
  code: '',
  iframeUrl: '',
  email: '',
  phone: '',
  notes: '',
}

const ITEMS_PER_PAGE = 10

export default function ReferralAgentsPage() {
  const [agents, setAgents] = useState<ReferralAgent[]>([])
  const [form, setForm] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<ReferralAgent | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

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
      setCurrentPage(1)
    } catch (error: any) {
      toast.error(error.message || 'Unable to load referral agents')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAgents()
  }, [])

  const openCreateDialog = () => {
    setEditingAgent(null)
    setForm(emptyForm)
    setIsDialogOpen(true)
  }

  const openEditDialog = (agent: ReferralAgent) => {
    setEditingAgent(agent)
    setForm({
      name: agent.name,
      code: agent.code.toLowerCase(),
      iframeUrl: agent.iframeUrl || '',
      email: agent.email || '',
      phone: agent.phone || '',
      notes: agent.notes || '',
    })
    setIsDialogOpen(true)
  }

  const saveAgent = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.code.trim() || !form.iframeUrl.trim()) {
      toast.error('Agent name, URL slug, and iframe URL are required')
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch(
        editingAgent ? `/api/admin/referral-agents/${editingAgent.code}` : '/api/admin/referral-agents',
        {
        method: editingAgent ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to create referral agent')
      toast.success(editingAgent ? 'Referral agent updated' : 'Referral agent created')
      setForm(emptyForm)
      setIsDialogOpen(false)
      await loadAgents()
    } catch (error: any) {
      toast.error(error.message || 'Unable to create referral agent')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteAgent = async (agent: ReferralAgent) => {
    if (!window.confirm(`Delete ${agent.name}? Their referral URL will stop working.`)) return
    try {
      const response = await fetch(`/api/admin/referral-agents/${agent.code}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to delete referral agent')
      toast.success('Referral agent deleted')
      await loadAgents()
    } catch (error: any) {
      toast.error(error.message || 'Unable to delete referral agent')
    }
  }

  const copyText = async (value: string, message: string) => {
    await navigator.clipboard.writeText(value)
    toast.success(message)
  }

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(agents.length / ITEMS_PER_PAGE))
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return agents.slice(start, start + ITEMS_PER_PAGE)
  }, [agents, currentPage])

  const startIndex = agents.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, agents.length)

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Referral Agent Tracking</h1>
          <p className="mt-1 text-sm text-slate-500">
            Generate agent links and track registrations submitted through each referral.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={openCreateDialog} className="gap-2 bg-[#d7a23a] font-bold text-slate-950 hover:bg-[#d7a23a]/90">
            <Plus className="h-4 w-4" />
            Create Agent Link
          </Button>
          <Button onClick={loadAgents} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Agents" value={agents.length} />
        <StatCard label="Total Referral Leads" value={totalLeads} />
        <StatCard label="Active Agents" value={agents.filter(agent => agent.isActive).length} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Agent Name</th>
                <th className="px-6 py-3.5">Form Link</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5 text-center">Total Leads</th>

                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm font-semibold text-slate-400">
                    Loading agents...
                  </td>
                </tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm font-semibold text-slate-400">
                    No agents created yet.
                  </td>
                </tr>
              ) : (
                paginatedAgents.map(agent => (
                  <tr key={agent._id} className="hover:bg-slate-50/70 align-middle">
                    <td className="px-6 py-4">
                      <p className="font-black text-[#061331]">{agent.name}</p>
                      {agent.notes && <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{agent.notes}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyText(`${origin}/referral/${agent.code.toLowerCase()}`, 'Form link copied')}
                        className="gap-1.5 text-xs border-slate-200 hover:bg-slate-50 text-slate-700 font-bold"
                      >
                        <Link2 className="h-3.5 w-3.5 text-[#d7a23a]" />
                        Copy Link
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{agent.email || '-'}</td>
                    <td className="px-6 py-4 text-slate-600">{agent.phone || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#061331]">
                        {agent.totalLeads || 0}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(agent)} aria-label={`Edit ${agent.name}`}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteAgent(agent)} className="text-red-600 hover:bg-red-50 hover:text-red-700" aria-label={`Delete ${agent.name}`}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <Link
                          href={`/admin/referrals/${agent.code}`}
                          className="inline-flex items-center justify-center rounded-lg bg-[#061331] px-4 py-2 text-xs font-bold text-white hover:bg-[#061331]/90 transition-colors"
                        >
                          Dashboard
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {!isLoading && agents.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-500">
              Showing <span className="text-slate-800">{startIndex}</span> to{' '}
              <span className="text-slate-800">{endIndex}</span> of{' '}
              <span className="text-slate-800">{agents.length}</span> agents
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white p-6 sm:max-w-[520px] sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-[#061331]">
              {editingAgent ? 'Edit Agent' : 'Create Agent Link'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {editingAgent ? 'Update the agent details, referral slug, or embedded form.' : 'Fill in the details below to generate a new referral agent tracking link.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveAgent} className="mt-4 space-y-4">
            <Field label="Agent Name">
              <Input
                value={form.name}
                onChange={event => setForm(prev => ({ ...prev, name: event.target.value }))}
                placeholder="John Doe"
              />
            </Field>
            <Field label="URL Slug">
              <Input
                value={form.code}
                onChange={event => setForm(prev => ({
                  ...prev,
                  code: event.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+/, ''),
                }))}
                placeholder="priyanka"
              />
              <p className="text-xs text-slate-400">Public URL: /referral/{form.code || 'your-slug'}</p>
            </Field>
            <Field label="Iframe URL or Embed Code">
              <Textarea
                rows={4}
                value={form.iframeUrl}
                onChange={event => setForm(prev => ({ ...prev, iframeUrl: event.target.value }))}
                placeholder={'<iframe width="610" height="1050" src="https://crm.example.com/enquiry-form/..."></iframe>'}
              />
              <p className="text-xs text-slate-400">Paste the complete iframe code or only its src URL.</p>
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
                placeholder="john@example.com"
              />
            </Field>
            <Field label="Phone">
              <Input
                value={form.phone}
                onChange={event => setForm(prev => ({ ...prev, phone: event.target.value }))}
                placeholder="+1 234 567 890"
              />
            </Field>
            <Field label="Notes">
              <Textarea
                rows={3}
                value={form.notes}
                onChange={event => setForm(prev => ({ ...prev, notes: event.target.value }))}
                placeholder="Optional notes about the agent..."
              />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-[#061331] text-white hover:bg-[#061331]/95">
                {isSaving ? 'Saving...' : editingAgent ? 'Save Changes' : 'Create Agent'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
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
