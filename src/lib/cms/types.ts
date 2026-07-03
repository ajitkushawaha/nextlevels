export const CMS_SECTION_TYPES = [
  'homeHero',
  'homeProgram',
  'homeScholarshipOffer',
  'homeDestinations',
  'homeWhyChooseUs',
  'homeServices',
  'homeUniversities',
  'homeStats',
  'homeTestimonials',
  'homeAmbassadors',
  'homeSuccessStories',
  'homeFaqs',
  'homeBlog',
  'homeStaticSections',
  'servicesHero',
  'servicesList',
  'servicesCredentials',
  'aboutHero',
  'aboutCeoMessage',
  'aboutStory',
  'aboutTeam',
  'aboutVisionMission',
  'aboutPillars',
  'aboutCta',
  'contactHero',
  'contactCards',
  'contactForm',
  'contactMapOffice',
  'legalContent',
  'faqContent',
] as const

export type CmsSectionType = (typeof CMS_SECTION_TYPES)[number]

export type CmsPageStatus = 'draft' | 'published' | 'archived'

export type LegalContentSection = {
  id: string
  type: 'legalContent'
  enabled: boolean
  eyebrow: string
  title: string
  updatedLabel: string
  intro: string
  sections: Array<{
    title: string
    content: string
  }>
}

export type FaqContentSection = {
  id: string
  type: 'faqContent'
  enabled: boolean
  badge: string
  title: string
  description: string
  backgroundImage: string
  categories: Array<{
    id: string
    name: string
    items: Array<{
      question: string
      answer: string
    }>
  }>
}

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

export type HomeScholarshipOffer = {
  badgeText: string
  intakeLabel: string
  countdownTarget: string
  titlePrefix: string
  scholarshipAmount: string
  titleSuffix: string
  description: string
  highlightedAgency: string
  highlightedUniversity: string
  highlightedOffer: string
  ctaLabel: string
  ctaHref: string
  note: string
  featureChips: Array<{
    icon: 'Award' | 'ShieldCheck' | 'GraduationCap'
    text: string
  }>
  benefitsTitle: string
  benefits: string[]
  urgencyText: string
}

export type HomeScholarshipOfferSection = HomeScholarshipOffer & {
  id: string
  type: 'homeScholarshipOffer'
  enabled: boolean
  offers?: HomeScholarshipOffer[]
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

export type ServicesHeroSection = {
  id: string
  type: 'servicesHero'
  enabled: boolean
  breadcrumbLabel: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export type ServicesListSection = {
  id: string
  type: 'servicesList'
  enabled: boolean
  services: Array<{
    slug: string
    number: string
    title: string
    shortDesc: string
    description: string
    image: string
    stats: string
    benefits: Array<string | { title: string; description?: string; image?: string; iconName?: string }>
    process: Array<string | { title: string; description?: string; image?: string; iconName?: string }>
    outcomes: Array<string | { title: string; description?: string; image?: string; iconName?: string }>
  }>
}

export type ServicesCredentialsSection = {
  id: string
  type: 'servicesCredentials'
  enabled: boolean
  eyebrow: string
  title: string
  description: string
  points: Array<{
    title: string
    description: string
  }>
  image: string
  imageAlt: string
  imageEyebrow: string
  imageTitle: string
  stats: Array<{
    value: string
    label: string
    variant: 'dark' | 'light' | 'gold'
  }>
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
  universities?: Array<{
    id?: string
    name: string
    logo: string
    coverImage: string
    worldRank?: string | number
    established?: string | number
    flag: string
    location: string
    country: string
    description: string
    students?: string
  }>
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
    intro?: string
  }>
}

export type HomeSuccessStoriesSection = {
  id: string
  type: 'homeSuccessStories'
  enabled: boolean
  title: string
  description: string
  videos: Array<{
    mediaType: 'youtube' | 'image'
    youtubeUrl?: string
    studentName: string
    studentAvatar: string
    thumbnail?: string
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

export type AboutHeroSection = {
  id: string
  type: 'aboutHero'
  enabled: boolean
  title: string
  description: string
  image: string
}

export type AboutCeoMessageSection = {
  id: string
  type: 'aboutCeoMessage'
  enabled: boolean
  eyebrow: string
  title: string
  message: string
  quote?: string
  name: string
  role: string
  image: string
  imageAlt: string
}

export type AboutStorySection = {
  id: string
  type: 'aboutStory'
  enabled: boolean
  title: string
  content: string
  stats: Array<{
    label: string
    value: string
    variant: 'dark' | 'light' | 'gold'
  }>
}

export type AboutTeamSection = {
  id: string
  type: 'aboutTeam'
  enabled: boolean
  title: string
  description: string
  members: Array<{
    name: string
    role: string
    image: string
  }>
}

export type AboutVisionMissionSection = {
  id: string
  type: 'aboutVisionMission'
  enabled: boolean
  visionTitle: string
  visionText: string
  missionTitle: string
  missionText: string
}

export type AboutPillarsSection = {
  id: string
  type: 'aboutPillars'
  enabled: boolean
  title: string
  pillars: Array<{
    title: string
    description: string
    icon: string
  }>
}

export type AboutCtaSection = {
  id: string
  type: 'aboutCta'
  enabled: boolean
  titleLine1: string
  titleLine2Highlighted: string
  description: string
  buttonText: string
  buttonHref: string
  globeImage?: string
  formHeading?: string
  formDescription?: string
  formSubmitLabel?: string
}

export type ContactHeroSection = {
  id: string
  type: 'contactHero'
  enabled: boolean
  eyebrow: string
  title: string
  description: string
  backgroundImage: string
}

export type ContactCardsSection = {
  id: string
  type: 'contactCards'
  enabled: boolean
  cards: Array<{
    title: string
    description: string
    linkText: string
    linkHref: string
    isLink: boolean
  }>
}

export type ContactFormSection = {
  id: string
  type: 'contactForm'
  enabled: boolean
  heading?: string
  description?: string
  qualificationLabel?: string
  qualificationPlaceholder?: string
  qualificationOptions?: string[]
  termsLabel?: string
  submitLabel?: string
  image?: string
  imageAlt?: string
}

export type ContactMapOfficeSection = {
  id: string
  type: 'contactMapOffice'
  enabled: boolean
  mapUrl: string
  eyebrow: string
  title: string
  branches: Array<{
    name: string
    addressLine1: string
    addressLine2: string
    mapQuery?: string
    mapUrl?: string
  }>
}

export type CmsSection =
  | HomeHeroSection
  | HomeProgramSection
  | HomeScholarshipOfferSection
  | HomeDestinationsSection
  | HomeWhyChooseUsSection
  | HomeServicesSection
  | HomeUniversitiesSection
  | HomeStatsSection
  | HomeTestimonialsSection
  | HomeAmbassadorsSection
  | HomeSuccessStoriesSection
  | HomeFaqsSection
  | HomeBlogSection
  | HomeStaticSections
  | ServicesHeroSection
  | ServicesListSection
  | ServicesCredentialsSection
  | AboutHeroSection
  | AboutCeoMessageSection
  | AboutStorySection
  | AboutTeamSection
  | AboutVisionMissionSection
  | AboutPillarsSection
  | AboutCtaSection
  | ContactHeroSection
  | ContactCardsSection
  | ContactFormSection
  | ContactMapOfficeSection
  | LegalContentSection
  | FaqContentSection

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
