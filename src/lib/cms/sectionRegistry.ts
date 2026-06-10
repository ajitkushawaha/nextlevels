import {
  Briefcase,
  FileQuestion,
  GraduationCap,
  Home,
  Layers,
  Mail,
  MapPinned,
  MessageCircle,
  Newspaper,
  School,
  Sparkles,
  Star,
  Trophy,
  UsersRound,
} from 'lucide-react'

export type CmsPageKey = 'home' | 'services' | 'about' | 'contact'

export type CmsSectionStatus = 'ready' | 'planned'

export type CmsSectionRegistryItem = {
  id: string
  title: string
  description: string
  status: CmsSectionStatus
}

export type CmsPageRegistryItem = {
  key: CmsPageKey
  title: string
  description: string
  publicPath: string
  icon: typeof Home
  iconClassName: string
  sections: CmsSectionRegistryItem[]
}

export const cmsPageRegistry: CmsPageRegistryItem[] = [
  {
    key: 'home',
    title: 'Home Content',
    description: 'Manage homepage sections and content',
    publicPath: '/',
    icon: Home,
    iconClassName: 'bg-orange-50 text-orange-600',
    sections: [
      {
        id: 'home-hero',
        title: 'Manage Hero',
        description: 'Hero title, copy, image and feature cards',
        status: 'ready',
      },
      {
        id: 'home-program',
        title: 'Manage Program / Who We Are',
        description: 'Intro copy, image collage and benefits',
        status: 'ready',
      },
      {
        id: 'home-destinations',
        title: 'Manage Study Destinations',
        description: 'Destination cards and section intro',
        status: 'ready',
      },
      {
        id: 'home-why-choose-us',
        title: 'Manage Why Choose Us',
        description: 'Reason cards and section heading',
        status: 'ready',
      },
      {
        id: 'home-services',
        title: 'Manage Services',
        description: 'Service carousel cards',
        status: 'ready',
      },
      {
        id: 'home-universities',
        title: 'Manage Partner Universities',
        description: 'Featured university cards and CTA',
        status: 'ready',
      },
      {
        id: 'home-stats',
        title: 'Manage Stats',
        description: 'Counter values and labels',
        status: 'ready',
      },
      {
        id: 'home-testimonials',
        title: 'Manage Testimonials',
        description: 'Student testimonial carousel',
        status: 'ready',
      },
      {
        id: 'home-ambassadors',
        title: 'Manage Student Ambassadors',
        description: 'Ambassador cards and chat links',
        status: 'ready',
      },
      {
        id: 'home-faqs',
        title: 'Manage FAQs',
        description: 'Latest FAQ cards',
        status: 'ready',
      },
      {
        id: 'home-blog',
        title: 'Manage Latest Blog',
        description: 'Latest blog cards and CTA',
        status: 'ready',
      },
    ],
  },
  {
    key: 'services',
    title: 'Services Page Content',
    description: 'Manage service landing page content',
    publicPath: '/services',
    icon: Briefcase,
    iconClassName: 'bg-indigo-50 text-indigo-600',
    sections: [
      {
        id: 'services-hero',
        title: 'Manage Hero',
        description: 'Services banner and intro copy',
        status: 'planned',
      },
      {
        id: 'services-tabs',
        title: 'Manage Services Tabs',
        description: 'Interactive service cards and tabs',
        status: 'planned',
      },
      {
        id: 'services-process',
        title: 'Manage Service Process',
        description: 'Support process / guidance section',
        status: 'planned',
      },
    ],
  },
  {
    key: 'about',
    title: 'About Page Content',
    description: 'Manage about page sections and public content',
    publicPath: '/about-us',
    icon: Layers,
    iconClassName: 'bg-blue-50 text-blue-600',
    sections: [
      {
        id: 'about-hero',
        title: 'Manage Hero',
        description: 'About page banner content',
        status: 'planned',
      },
      {
        id: 'about-story',
        title: 'Manage Story',
        description: 'Story copy, stats and image',
        status: 'planned',
      },
      {
        id: 'about-vision-mission',
        title: 'Manage Vision & Mission',
        description: 'Vision and mission cards',
        status: 'planned',
      },
      {
        id: 'about-pillars',
        title: 'Manage Core Pillars',
        description: 'Pillar cards and section heading',
        status: 'planned',
      },
      {
        id: 'about-cta',
        title: 'Manage CTA Banner',
        description: 'Study abroad CTA banner',
        status: 'planned',
      },
    ],
  },
  {
    key: 'contact',
    title: 'Contact Page Content',
    description: 'Manage contact page content and office details',
    publicPath: '/contact-us',
    icon: Mail,
    iconClassName: 'bg-emerald-50 text-emerald-600',
    sections: [
      {
        id: 'contact-hero',
        title: 'Manage Hero',
        description: 'Contact page banner content',
        status: 'planned',
      },
      {
        id: 'contact-cards',
        title: 'Manage Quick Contact Cards',
        description: 'Support, feedback and institution cards',
        status: 'planned',
      },
      {
        id: 'contact-form',
        title: 'Manage Free Counselling Form',
        description: 'Form-side content and image',
        status: 'planned',
      },
      {
        id: 'contact-map-office',
        title: 'Manage Map & Office Details',
        description: 'Map iframe and branch addresses',
        status: 'planned',
      },
    ],
  },
]

export const cmsDashboardStats = [
  { label: 'Pages', value: cmsPageRegistry.length, icon: School },
  {
    label: 'Sections',
    value: cmsPageRegistry.reduce((total, page) => total + page.sections.length, 0),
    icon: Sparkles,
  },
  {
    label: 'Ready Editors',
    value: cmsPageRegistry.reduce(
      (total, page) =>
        total + page.sections.filter(section => section.status === 'ready').length,
      0
    ),
    icon: Trophy,
  },
  { label: 'Preview Modes', value: 2, icon: UsersRound },
]

export function getCmsPage(key: string) {
  return cmsPageRegistry.find(page => page.key === key)
}

export function getCmsSection(pageKey: string, sectionId: string) {
  return getCmsPage(pageKey)?.sections.find(section => section.id === sectionId)
}

export const cmsSectionIconMap: Record<string, typeof Home> = {
  hero: Home,
  services: Briefcase,
  faq: FileQuestion,
  faqs: FileQuestion,
  testimonials: Star,
  blog: Newspaper,
  contact: Mail,
  map: MapPinned,
  ambassadors: MessageCircle,
  universities: GraduationCap,
}

export function getCmsSectionIcon(sectionId: string) {
  const matchingKey = Object.keys(cmsSectionIconMap).find(key =>
    sectionId.includes(key)
  )

  return matchingKey ? cmsSectionIconMap[matchingKey] : Layers
}
