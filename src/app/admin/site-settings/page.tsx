'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PanelBottom, PanelTop, Plus, Save, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CmsImageField from '@/components/cms/section-editors/CmsImageField'
import { defaultSiteSettings, type SiteLink, type SiteSettings } from '@/lib/siteSettings'

type HeaderKey = keyof SiteSettings['header']
type FooterKey = keyof SiteSettings['footer']
type SeoKey = keyof SiteSettings['seo']
type LinkGroupKey = 'quickLinks' | 'studyLinks' | 'branchLinks' | 'socialLinks' | 'legalLinks'
type SettingsPanel = 'seo' | 'header' | 'footer'

const emptyLink: SiteLink = { label: '', href: '', enabled: true }

const settingsPanels: Array<{
  key: SettingsPanel
  title: string
  description: string
  icon: typeof Search
}> = [
  {
    key: 'seo',
    title: 'SEO & Analytics',
    description: 'Meta defaults and tracking IDs',
    icon: Search,
  },
  {
    key: 'header',
    title: 'Header',
    description: 'Logo, menu and top actions',
    icon: PanelTop,
  },
  {
    key: 'footer',
    title: 'Footer',
    description: 'Footer logo, CTA and links',
    icon: PanelBottom,
  },
]

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [activePanel, setActivePanel] = useState<SettingsPanel>('seo')

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/site-settings')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Unable to load settings')
        setSettings(data.settings)
      } catch (error: any) {
        toast.error(error.message || 'Unable to load site settings')
      }
    }

    loadSettings()
  }, [])

  const updateHeader = (key: HeaderKey, value: any) => {
    setSettings(prev => ({
      ...prev,
      header: { ...prev.header, [key]: value },
    }))
  }

  const updateSeo = (key: SeoKey, value: any) => {
    setSettings(prev => ({
      ...prev,
      seo: { ...prev.seo, [key]: value },
    }))
  }

  const updateFooter = (key: FooterKey, value: any) => {
    setSettings(prev => ({
      ...prev,
      footer: { ...prev.footer, [key]: value },
    }))
  }

  const updateHeaderLink = (index: number, key: keyof SiteLink, value: any) => {
    updateHeader(
      'navItems',
      settings.header.navItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    )
  }

  const addHeaderLink = () => updateHeader('navItems', [...settings.header.navItems, emptyLink])
  const removeHeaderLink = (index: number) =>
    updateHeader('navItems', settings.header.navItems.filter((_, itemIndex) => itemIndex !== index))

  const updateDropdownLink = (
    parentIndex: number,
    childIndex: number,
    key: keyof SiteLink,
    value: any
  ) => {
    updateHeader(
      'navItems',
      settings.header.navItems.map((item, itemIndex) => {
        if (itemIndex !== parentIndex) return item
        const dropdownItems = item.dropdownItems || []
        return {
          ...item,
          dropdownItems: dropdownItems.map((child, index) =>
            index === childIndex ? { ...child, [key]: value } : child
          ),
        }
      })
    )
  }

  const addDropdownLink = (parentIndex: number) => {
    updateHeader(
      'navItems',
      settings.header.navItems.map((item, itemIndex) =>
        itemIndex === parentIndex
          ? { ...item, dropdownItems: [...(item.dropdownItems || []), emptyLink] }
          : item
      )
    )
  }

  const removeDropdownLink = (parentIndex: number, childIndex: number) => {
    updateHeader(
      'navItems',
      settings.header.navItems.map((item, itemIndex) =>
        itemIndex === parentIndex
          ? {
              ...item,
              dropdownItems: (item.dropdownItems || []).filter((_, index) => index !== childIndex),
            }
          : item
      )
    )
  }

  const updateFooterLink = (
    groupKey: LinkGroupKey,
    index: number,
    key: keyof SiteLink,
    value: any
  ) => {
    updateFooter(
      groupKey,
      settings.footer[groupKey].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    )
  }

  const addFooterLink = (groupKey: LinkGroupKey) =>
    updateFooter(groupKey, [...settings.footer[groupKey], emptyLink])

  const removeFooterLink = (groupKey: LinkGroupKey, index: number) =>
    updateFooter(groupKey, settings.footer[groupKey].filter((_, itemIndex) => itemIndex !== index))

  const saveSettings = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Unable to save settings')

      setSettings(data.settings)
      toast.success('Header and footer settings saved')
    } catch (error: any) {
      toast.error(error.message || 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Global Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the public header and footer from one place.
          </p>
        </div>
        <Button onClick={saveSettings} disabled={isSaving} className="bg-[#061331] text-white hover:bg-[#081638]">
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="min-w-0">
          {activePanel === 'seo' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-[#061331]">SEO & Analytics</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage site-wide fallback meta tags and Google tracking IDs.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Site Name">
                  <Input value={settings.seo.siteName} onChange={event => updateSeo('siteName', event.target.value)} />
                </Field>
                <Field label="Base URL">
                  <Input value={settings.seo.baseUrl} onChange={event => updateSeo('baseUrl', event.target.value)} />
                </Field>
                <Field label="Default Meta Title">
                  <Input value={settings.seo.defaultMetaTitle} onChange={event => updateSeo('defaultMetaTitle', event.target.value)} />
                </Field>
                <Field label="Default Robots">
                  <Input value={settings.seo.defaultRobots} onChange={event => updateSeo('defaultRobots', event.target.value)} />
                </Field>
                <CmsImageField
                  id="default-og-image"
                  label="Default OG Image"
                  value={settings.seo.defaultOgImage}
                  onChange={value => updateSeo('defaultOgImage', value)}
                  folder="nextlevel/site-settings"
                  placeholder="Upload or paste an OG image URL"
                />
                <CmsImageField
                  id="site-favicon"
                  label="Favicon"
                  value={settings.seo.faviconUrl}
                  onChange={value => updateSeo('faviconUrl', value)}
                  folder="nextlevel/site-settings"
                  placeholder="Upload or paste a square favicon URL"
                />
                <Field label="Default Keywords">
                  <Input value={settings.seo.defaultMetaKeywords} onChange={event => updateSeo('defaultMetaKeywords', event.target.value)} />
                </Field>
                <Field label="Google Analytics ID">
                  <Input placeholder="G-XXXXXXXXXX" value={settings.seo.googleAnalyticsId} onChange={event => updateSeo('googleAnalyticsId', event.target.value)} />
                </Field>
                <Field label="Google Tag Manager ID">
                  <Input placeholder="GTM-XXXXXXX" value={settings.seo.googleTagManagerId} onChange={event => updateSeo('googleTagManagerId', event.target.value)} />
                </Field>
                <Field label="Default Meta Description">
                  <Textarea rows={3} value={settings.seo.defaultMetaDescription} onChange={event => updateSeo('defaultMetaDescription', event.target.value)} />
                </Field>
              </div>
            </section>
          )}

          {activePanel === 'header' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-[#061331]">Header</h2>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Logo">
                <Input value={settings.header.logo} onChange={event => updateHeader('logo', event.target.value)} />
              </Field>
              <Field label="Logo Alt">
                <Input value={settings.header.logoAlt} onChange={event => updateHeader('logoAlt', event.target.value)} />
              </Field>
              <Field label="Course Finder Label">
                <Input value={settings.header.courseFinderLabel} onChange={event => updateHeader('courseFinderLabel', event.target.value)} />
              </Field>
              <Field label="Course Finder Link">
                <Input value={settings.header.courseFinderHref} onChange={event => updateHeader('courseFinderHref', event.target.value)} />
              </Field>
              <Field label="Call Label">
                <Input value={settings.header.callLabel} onChange={event => updateHeader('callLabel', event.target.value)} />
              </Field>
              <Field label="Call Phone">
                <Input value={settings.header.callPhone} onChange={event => updateHeader('callPhone', event.target.value)} />
              </Field>
              <Field label="Call Link">
                <Input value={settings.header.callHref} onChange={event => updateHeader('callHref', event.target.value)} />
              </Field>
            </div>

            <LinkGroupHeader title="Header Navigation" onAdd={addHeaderLink} />
            <div className="space-y-3">
              {settings.header.navItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <LinkRow
                    item={item}
                    onChange={(key, value) => updateHeaderLink(index, key, value)}
                    onRemove={() => removeHeaderLink(index)}
                  />
                  <div className="mt-3 border-l-2 border-[#d7a23a]/30 pl-3">
                    <LinkGroupHeader
                      title="Dropdown Links"
                      compact
                      onAdd={() => addDropdownLink(index)}
                    />
                    <div className="mt-2 space-y-2">
                      {(item.dropdownItems || []).map((child, childIndex) => (
                        <LinkRow
                          key={`${child.label}-${childIndex}`}
                          item={child}
                          compact
                          onChange={(key, value) => updateDropdownLink(index, childIndex, key, value)}
                          onRemove={() => removeDropdownLink(index, childIndex)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            </section>
          )}

          {activePanel === 'footer' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-[#061331]">Footer</h2>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <CmsImageField
                id="footer-logo"
                label="Footer Logo"
                value={settings.footer.logo}
                onChange={value => updateFooter('logo', value)}
                folder="nextlevel/site-settings"
                placeholder="Upload or paste a footer logo URL"
              />
              <Field label="Footer Logo Alt">
                <Input value={settings.footer.logoAlt} onChange={event => updateFooter('logoAlt', event.target.value)} />
              </Field>
              <Field label="CTA Title">
                <Input value={settings.footer.ctaTitle} onChange={event => updateFooter('ctaTitle', event.target.value)} />
              </Field>
              <Field label="CTA Button Text">
                <Input value={settings.footer.ctaButtonText} onChange={event => updateFooter('ctaButtonText', event.target.value)} />
              </Field>
              <Field label="CTA Button Link">
                <Input value={settings.footer.ctaButtonHref} onChange={event => updateFooter('ctaButtonHref', event.target.value)} />
              </Field>
              <Field label="Phone">
                <Input value={settings.footer.phone} onChange={event => updateFooter('phone', event.target.value)} />
              </Field>
              <Field label="Email">
                <Input value={settings.footer.email} onChange={event => updateFooter('email', event.target.value)} />
              </Field>
              <Field label="Copyright">
                <Input value={settings.footer.copyright} onChange={event => updateFooter('copyright', event.target.value)} />
              </Field>
            </div>
            <Field label="CTA Description">
              <Textarea rows={2} value={settings.footer.ctaDescription} onChange={event => updateFooter('ctaDescription', event.target.value)} />
            </Field>
            <Field label="Footer Description">
              <Textarea rows={2} value={settings.footer.description} onChange={event => updateFooter('description', event.target.value)} />
            </Field>
            <Field label="Address">
              <Textarea rows={2} value={settings.footer.address} onChange={event => updateFooter('address', event.target.value)} />
            </Field>

            <FooterLinkGroup title="Quick Links" groupKey="quickLinks" settings={settings} onChange={updateFooterLink} onAdd={addFooterLink} onRemove={removeFooterLink} />
            <FooterLinkGroup title="Study Links" groupKey="studyLinks" settings={settings} onChange={updateFooterLink} onAdd={addFooterLink} onRemove={removeFooterLink} />
            <FooterLinkGroup title="Branch Links" groupKey="branchLinks" settings={settings} onChange={updateFooterLink} onAdd={addFooterLink} onRemove={removeFooterLink} />
            <FooterLinkGroup title="Social Links" groupKey="socialLinks" settings={settings} onChange={updateFooterLink} onAdd={addFooterLink} onRemove={removeFooterLink} />
            <FooterLinkGroup title="Legal Links" groupKey="legalLinks" settings={settings} onChange={updateFooterLink} onAdd={addFooterLink} onRemove={removeFooterLink} />
          </div>
            </section>
          )}
        </div>

        <aside className="order-first lg:order-last lg:sticky lg:top-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="px-2 pb-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
              Settings Menu
            </p>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {settingsPanels.map(panel => {
                const Icon = panel.icon
                const isActive = activePanel === panel.key
                return (
                  <button
                    key={panel.key}
                    type="button"
                    onClick={() => setActivePanel(panel.key)}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                      isActive
                        ? 'border-[#d7a23a]/60 bg-[#061331] text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-[#061331] hover:border-[#d7a23a]/50 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                        isActive ? 'bg-[#d7a23a] text-[#061331]' : 'bg-white text-[#d7a23a]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black">{panel.title}</span>
                      <span className={`mt-0.5 block text-xs ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                        {panel.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
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

function LinkGroupHeader({
  title,
  onAdd,
  compact = false,
}: {
  title: string
  onAdd: () => void
  compact?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className={compact ? 'text-[11px] font-black uppercase tracking-wider text-slate-400' : 'text-sm font-black text-[#061331]'}>
        {title}
      </h3>
      <Button type="button" size="sm" variant="outline" onClick={onAdd} className="h-8 gap-1 text-[11px]">
        <Plus className="h-3.5 w-3.5" />
        Add
      </Button>
    </div>
  )
}

function LinkRow({
  item,
  onChange,
  onRemove,
  compact = false,
}: {
  item: SiteLink
  onChange: (key: keyof SiteLink, value: any) => void
  onRemove: () => void
  compact?: boolean
}) {
  return (
    <div className={`grid gap-2 ${compact ? 'rounded-lg bg-white p-2' : ''} sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end`}>
      <Field label="Label">
        <Input value={item.label} onChange={event => onChange('label', event.target.value)} />
      </Field>
      <Field label="Link">
        <Input value={item.href} onChange={event => onChange('href', event.target.value)} />
      </Field>
      <label className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600">
        <input
          type="checkbox"
          checked={item.enabled !== false}
          onChange={event => onChange('enabled', event.target.checked)}
          className="accent-[#061331]"
        />
        Enabled
      </label>
      <Button type="button" variant="outline" size="icon" onClick={onRemove} className="h-10 w-10 text-red-600 hover:bg-red-50 hover:text-red-700">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

function FooterLinkGroup({
  title,
  groupKey,
  settings,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string
  groupKey: LinkGroupKey
  settings: SiteSettings
  onChange: (groupKey: LinkGroupKey, index: number, key: keyof SiteLink, value: any) => void
  onAdd: (groupKey: LinkGroupKey) => void
  onRemove: (groupKey: LinkGroupKey, index: number) => void
}) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <LinkGroupHeader title={title} onAdd={() => onAdd(groupKey)} />
      {settings.footer[groupKey].map((item, index) => (
        <LinkRow
          key={`${groupKey}-${item.label}-${index}`}
          item={item}
          onChange={(key, value) => onChange(groupKey, index, key, value)}
          onRemove={() => onRemove(groupKey, index)}
        />
      ))}
    </div>
  )
}
