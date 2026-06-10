export const CMS_SECTION_TYPES = [
  'homeHero',
  'homeProgram',
  'homeDestinations',
  'homeWhyChooseUs',
  'homeServices',
  'homeUniversities',
  'homeStats',
  'homeTestimonials',
  'homeAmbassadors',
  'homeFaqs',
  'homeBlog',
  'homeStaticSections',
] as const

export type CmsSectionType = (typeof CMS_SECTION_TYPES)[number]

export type CmsPageStatus = 'draft' | 'published' | 'archived'

export type HomeHeroFeature = {
  icon: 'Headphones' | 'FileCheck2' | 'GraduationCap' | 'ShieldCheck'
  title: string
  text: string
}

export type HomeHeroSection = {
  id: string
  type: 'homeHero'
  enabled: boolean
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  highlightedTitle: string
  description: string
  image: {
    src: string
    alt: string
  }
  features: HomeHeroFeature[]
}

export type HomeProgramSection = {
  id: string
  type: 'homeProgram'
  enabled: boolean
  eyebrow: string
  title: string
  description: string
  benefits: string[]
  cta: {
    label: string
    href: string
  }
  images: Array<{
    src: string
    alt: string
  }>
  badge: {
    line1: string
    line2: string
  }
}

export type HomeDestinationCard = {
  name: string
  image: string
  alt?: string
}

export type HomeDestinationsSection = {
  id: string
  type: 'homeDestinations'
  enabled: boolean
  title: string
  description: string
  destinations: HomeDestinationCard[]
}

export type HomeWhyChooseUsIcon =
  | 'UsersRound'
  | 'BookOpenCheck'
  | 'Globe2'
  | 'Headphones'

export type HomeWhyChooseUsItem = {
  icon: HomeWhyChooseUsIcon
  title: string
  text: string
}

export type HomeWhyChooseUsSection = {
  id: string
  type: 'homeWhyChooseUs'
  enabled: boolean
  eyebrow: string
  title: string
  items: HomeWhyChooseUsItem[]
}

export type HomeStaticSections = {
  id: string
  type: 'homeStaticSections'
  enabled: boolean
}

export type HomeServicesSection = {
  id: string
  type: 'homeServices'
  enabled: boolean
  eyebrow: string
  title: string
  services: Array<{
    title: string
    description: string
    image: string
  }>
}

export type HomeUniversitiesSection = {
  id: string
  type: 'homeUniversities'
  enabled: boolean
  eyebrow: string
  title: string
  highlightedTitle: string
  description: string
  cta: {
    label: string
    href: string
  }
}

export type HomeStatsSection = {
  id: string
  type: 'homeStats'
  enabled: boolean
  stats: Array<{
    icon: 'UsersRound' | 'Building2' | 'Globe2' | 'Award'
    targetValue: number
    suffix: string
    label: string
  }>
}

export type HomeTestimonialsSection = {
  id: string
  type: 'homeTestimonials'
  enabled: boolean
  eyebrow: string
  title: string
  testimonials: Array<{
    name: string
    country: string
    image: string
    quote: string
  }>
}

export type HomeAmbassadorsSection = {
  id: string
  type: 'homeAmbassadors'
  enabled: boolean
  ambassadorTitle: string
  ambassadorDescription: string
  ambassadors: Array<{
    name: string
    program: string
    university: string
    image: string
    link: string
  }>
  storiesTitle: string
  storiesDescription: string
  videos: Array<{
    title: string
    studentName: string
    studentAvatar: string
    thumbnail: string
    textOverlay?: string
    isLocked?: boolean
  }>
}

export type HomeFaqsSection = {
  id: string
  type: 'homeFaqs'
  enabled: boolean
  eyebrow: string
  title: string
  description: string
  faqs: Array<{
    question: string
    answer: string
    color: string
  }>
}

export type HomeBlogSection = {
  id: string
  type: 'homeBlog'
  enabled: boolean
  eyebrow: string
  title: string
  cta: {
    label: string
    href: string
  }
  posts: Array<{
    title: string
    date: string
    image: string
    href: string
  }>
}

export type CmsSection =
  | HomeHeroSection
  | HomeProgramSection
  | HomeDestinationsSection
  | HomeWhyChooseUsSection
  | HomeServicesSection
  | HomeUniversitiesSection
  | HomeStatsSection
  | HomeTestimonialsSection
  | HomeAmbassadorsSection
  | HomeFaqsSection
  | HomeBlogSection
  | HomeStaticSections

export type CmsPageContent = {
  version: 1
  sections: CmsSection[]
}

export type CmsPageDocument = {
  slug: string
  title: string
  draftContent: CmsPageContent
  publishedContent?: CmsPageContent
  status: CmsPageStatus
  updatedAt?: string
  publishedAt?: string
}
