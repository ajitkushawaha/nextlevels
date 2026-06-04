'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  FileCode, 
  FileText, 
  MessageSquare, 
  GraduationCap, 
  Briefcase,
  TrendingUp,
  Clock,
  ArrowUpRight,
  
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Pages',
      value: '6',
      description: 'Active public layout views',
      icon: FileCode,
      color: 'from-blue-500 to-indigo-500 text-blue-600 bg-blue-50',
      href: '/admin/cms'
    },
    {
      title: 'Total Blogs',
      value: '12',
      description: 'Published and draft articles',
      icon: FileText,
      color: 'from-emerald-500 to-teal-500 text-emerald-600 bg-emerald-50',
      href: '/admin/blog'
    },
    {
      title: 'Total Inquiries',
      value: '48',
      description: 'Student visa & course queries',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500 text-purple-600 bg-purple-50',
      href: '/admin/inquiries'
    },
    {
      title: 'Total Courses',
      value: '15',
      description: 'Study programs worldwide',
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-500 text-amber-600 bg-amber-50',
      href: '/admin/courses'
    },
    {
      title: 'Total Services',
      value: '8',
      description: 'Consultancy service blocks',
      icon: Briefcase,
      color: 'from-cyan-500 to-sky-500 text-cyan-600 bg-cyan-50',
      href: '/admin/services'
    }
  ]

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-0.5">Quick summaries and metrics of Next Level operations.</p>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Link key={idx} href={stat.href} className="block group">
              <Card className="border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between cursor-pointer">
                {/* Visual hover top-gradient line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-linear-to-r group-hover:from-[#061331] group-hover:to-[#d7a23a] transition-all duration-300"></div>
                
                <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                  <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                      <TrendingUp className="h-3 w-3 mr-0.5" /> +8%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium flex items-center justify-between">
                    {stat.description}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-400" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Main Grid for recent logs and reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent logs */}
        <Card className="border border-slate-200/80 shadow-xs bg-white rounded-2xl overflow-hidden lg:col-span-2">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5">
            <CardTitle className="text-sm font-bold text-slate-800">Recent Activity</CardTitle>
            <CardDescription className="text-[11px] text-slate-400">Live configuration updates and user submissions</CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {[
              { type: 'inquiry', text: 'New student visa inquiry received from Rahul Sharma', time: '10 mins ago', status: 'Pending' },
              { type: 'blog', text: 'Blog "How to Apply for UK Study Visa 2026" updated by Admin', time: '2 hours ago', status: 'Published' },
              { type: 'course', text: 'Course "MSc Computer Science at University of Canada" added', time: '1 day ago', status: 'Active' },
              { type: 'inquiry', text: 'Enquiry from Priya Patel marked as Contacted', time: '2 days ago', status: 'Contacted' }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${activity.type === 'inquiry' ? 'bg-purple-500' : activity.type === 'blog' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <span className="text-slate-700 font-medium">{activity.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Clock className="h-3 w-3" /> {activity.time}</span>
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-slate-200">{activity.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Small settings shortcut card */}
        <Card className="border border-slate-200/80 shadow-xs bg-white rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5">
            <CardTitle className="text-sm font-bold text-slate-800">Quick Actions</CardTitle>
            <CardDescription className="text-[11px] text-slate-400">Shortcuts to manage system configurations</CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            <Link href="/admin/blog/create" className="block">
              <Button size="sm" className="w-full bg-[#061331] text-white hover:bg-slate-800 text-xs font-semibold rounded-lg h-9">
                Create New Blog Post
              </Button>
            </Link>
            <Link href="/admin/cms" className="block">
              <Button size="sm" variant="outline" className="w-full text-slate-700 bg-white border-slate-200 text-xs font-semibold rounded-lg h-9">
                Edit Homepage Header
              </Button>
            </Link>
            <Link href="/admin/inquiries" className="block">
              <Button size="sm" variant="outline" className="w-full text-slate-700 bg-white border-slate-200 text-xs font-semibold rounded-lg h-9">
                Review Pending Inquiries
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
