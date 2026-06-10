'use client'

import React, { useState } from 'react'
import { SessionProvider, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FileText, 
  Settings, 
  LogOut, 
  Globe, 
  Menu, 
  X, 
  User,
  ShieldAlert,
  Layers,
  Briefcase,
  GraduationCap,
  Home,
  ChevronDown,
  LayoutDashboard,
  MessageSquare,
  FileCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const [isCollapsed, setIsCollapsed] = useState(false)

  // Render loading state
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#f9fafb]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800"></div>
          <p className="text-slate-600 text-sm font-medium">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md text-center bg-[#061331] border border-white/10 p-8 rounded-2xl shadow-xl">
          <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400 mb-6">You must be logged in as an administrator to access this area.</p>
          <Link href={`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`}>
            <Button className="w-full bg-[#d7a23a] text-[#061331] hover:bg-[#c59130] font-semibold">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col md:flex-row text-slate-800 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-base">Next Level</span>
          <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200">Admin</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="text-slate-700 hover:text-slate-900 focus:outline-none"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-all duration-300 ease-in-out
        md:sticky md:top-0 md:h-screen md:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'md:w-16' : 'md:w-64'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Switcher Area */}
          <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-950 text-sm tracking-tight">NextLevel Education</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Drafts</span>
              </div>
            )}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="text-slate-400 hover:text-slate-700 focus:outline-none mx-auto md:mx-0 p-1 rounded-md hover:bg-slate-100 transition"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links Group */}
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-5">
            {/* General Section */}
            <div>
              {!isCollapsed && <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">General</p>}
              <nav className="space-y-0.5">
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                    pathname === '/admin' 
                      ? 'bg-slate-100 text-slate-950 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title="Dashboard"
                >
                  <LayoutDashboard className="h-4 w-4 text-slate-400 shrink-0" />
                  {!isCollapsed && <span>Dashboard</span>}
                </Link>
              </nav>
            </div>

            {/* Content Management Section */}
            <div>
              {!isCollapsed && <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Content Management</p>}
              <nav className="space-y-0.5">
                {[
                  { label: 'CMS Dashboard', href: '/admin/cms', icon: FileCode },
                  { label: 'Services', href: '/admin/services', icon: Briefcase },
                  { label: 'Courses', href: '/admin/courses', icon: GraduationCap },
                ].map((item) => {
                  const Icon = item.icon
                  const isActive =
                    item.href === '/admin/cms'
                      ? pathname.startsWith('/admin/cms')
                      : pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                        isActive 
                          ? 'bg-slate-100 text-slate-950 font-semibold' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      title={item.label}
                    >
                      <Icon className="h-4 w-4 text-slate-400 shrink-0" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Blog Management Section */}
            <div>
              {!isCollapsed && <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Blog Management</p>}
              <nav className="space-y-0.5">
                <Link
                  href="/admin/blog"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                    pathname.startsWith('/admin/blog') 
                      ? 'bg-slate-100 text-slate-950 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title="Blogs list / edit"
                >
                  <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                  {!isCollapsed && <span>Blogs list / edit</span>}
                </Link>
              </nav>
            </div>

            {/* Inquiry Management Section */}
            <div>
              {!isCollapsed && <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Inquiry Management</p>}
              <nav className="space-y-0.5">
                <Link
                  href="/admin/inquiries"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                    pathname.startsWith('/admin/inquiries') 
                      ? 'bg-slate-100 text-slate-950 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title="User Inquiries"
                >
                  <MessageSquare className="h-4 w-4 text-slate-400 shrink-0" />
                  {!isCollapsed && <span>User Inquiries</span>}
                </Link>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
            {session?.user && (
              <div className="flex items-center gap-2.5 px-1 justify-center md:justify-start">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 shrink-0">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name || ''} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4 text-slate-500" />
                  )}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-semibold truncate text-slate-900 leading-none mb-0.5">{session.user.name}</p>
                    <p className="text-[10px] text-slate-400 leading-none capitalize">{session.user.role || 'Admin'}</p>
                  </div>
                )}
              </div>
            )}

            <div className="pt-1 flex flex-col gap-1">
              <Link 
                href="/"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition ${isCollapsed ? 'justify-center' : ''}`}
                title="Live Site"
              >
                <Globe className="h-3.5 w-3.5 shrink-0" />
                {!isCollapsed && <span>Live Site</span>}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition text-left ${isCollapsed ? 'justify-center' : ''}`}
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="h-full min-h-[calc(100vh-56px)] md:min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
