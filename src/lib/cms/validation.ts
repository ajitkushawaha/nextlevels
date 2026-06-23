import { z } from 'zod'
import { CMS_SECTION_TYPES } from './types'

const homeHeroFeatureSchema = z.object({
  icon: z.enum(['Headphones', 'FileCheck2', 'GraduationCap', 'ShieldCheck']),
  title: z.string().trim().min(1).max(120),
  text: z.string().trim().min(1).max(240),
})

const homeHeroSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeHero'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().max(80).optional(),
  titleLine1: z.string().trim().min(1).max(120),
  titleLine2: z.string().trim().min(1).max(120),
  highlightedTitle: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(420),
  image: z.object({
    src: z.string().trim().min(1).max(500),
    alt: z.string().trim().min(1).max(160),
  }),
  features: z.array(homeHeroFeatureSchema).min(1).max(8),
})

const homeProgramImageSchema = z.object({
  src: z.string().trim().min(1).max(500),
  alt: z.string().trim().min(1).max(160),
})

const homeProgramSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeProgram'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(420),
  benefits: z.array(z.string().trim().min(1).max(140)).min(1).max(8),
  cta: z.object({
    label: z.string().trim().min(1).max(80),
    href: z.string().trim().min(1).max(240),
  }),
  images: z.array(homeProgramImageSchema).length(3),
  badge: z.object({
    line1: z.string().trim().min(1).max(60),
    line2: z.string().trim().min(1).max(60),
  }),
})

const homeScholarshipOfferSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeScholarshipOffer'),
  enabled: z.boolean(),
  badgeText: z.string().trim().min(1).max(80),
  intakeLabel: z.string().trim().min(1).max(100),
  countdownTarget: z.string().trim().min(1).max(80),
  titlePrefix: z.string().trim().min(1).max(120),
  scholarshipAmount: z.string().trim().min(1).max(40),
  titleSuffix: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(600),
  highlightedAgency: z.string().trim().min(1).max(120),
  highlightedUniversity: z.string().trim().min(1).max(180),
  highlightedOffer: z.string().trim().min(1).max(80),
  ctaLabel: z.string().trim().min(1).max(80),
  ctaHref: z.string().trim().min(1).max(240),
  note: z.string().trim().max(100),
  featureChips: z.array(z.object({
    icon: z.enum(['Award', 'ShieldCheck', 'GraduationCap']),
    text: z.string().trim().min(1).max(120),
  })).min(1).max(6),
  benefitsTitle: z.string().trim().min(1).max(100),
  benefits: z.array(z.string().trim().min(1).max(160)).min(1).max(8),
  urgencyText: z.string().trim().min(1).max(120),
})

const homeDestinationCardSchema = z.object({
  name: z.string().trim().min(1).max(80),
  image: z.string().trim().min(1).max(500),
  alt: z.string().trim().max(160).optional(),
})

const homeDestinationsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeDestinations'),
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(320),
  destinations: z.array(homeDestinationCardSchema).min(1).max(4),
})

const homeWhyChooseUsItemSchema = z.object({
  icon: z.enum(['UsersRound', 'BookOpenCheck', 'Globe2', 'Headphones']),
  title: z.string().trim().min(1).max(100),
  text: z.string().trim().min(1).max(240),
})

const homeWhyChooseUsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeWhyChooseUs'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(160),
  items: z.array(homeWhyChooseUsItemSchema).min(1).max(8),
})

const homeServicesSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeServices'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(160),
  services: z.array(z.object({
    title: z.string().trim().min(1).max(180),
    description: z.string().trim().min(1).max(900),
    image: z.string().trim().min(1).max(500),
  })).min(1).max(12),
})

const homeUniversitiesSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeUniversities'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(120),
  highlightedTitle: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(420),
  cta: z.object({
    label: z.string().trim().min(1).max(100),
    href: z.string().trim().min(1).max(240),
  }),
  universities: z.array(z.object({
    name: z.string().trim().min(1).max(180),
    logo: z.string().trim().min(1).max(80),
    coverImage: z.string().trim().min(1).max(500),
    worldRank: z.union([z.string().trim().min(1).max(80), z.number()]).optional(),
    established: z.union([z.string().trim().min(1).max(80), z.number()]).optional(),
    flag: z.string().trim().min(1).max(40),
    location: z.string().trim().max(160),
    country: z.string().trim().min(1).max(120),
    description: z.string().trim().max(900),
    students: z.string().trim().max(80).optional(),
  })).min(0).max(4).optional(),
})

const homeStatsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeStats'),
  enabled: z.boolean(),
  stats: z.array(z.object({
    icon: z.enum(['UsersRound', 'Building2', 'Globe2', 'Award']),
    targetValue: z.coerce.number().int().min(0).max(1000000),
    suffix: z.string().trim().max(12),
    label: z.string().trim().min(1).max(100),
  })).min(1).max(4),
})

const homeTestimonialsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeTestimonials'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(160),
  testimonials: z.array(z.object({
    name: z.string().trim().min(1).max(100),
    country: z.string().trim().min(1).max(100),
    image: z.string().trim().min(1).max(500),
    quote: z.string().trim().min(1).max(700),
  })).min(1).max(10),
})

const homeAmbassadorsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeAmbassadors'),
  enabled: z.boolean(),
  ambassadorTitle: z.string().trim().min(1).max(160),
  ambassadorDescription: z.string().trim().min(1).max(260),
  ambassadors: z.array(z.object({
    name: z.string().trim().min(1).max(100),
    program: z.string().trim().min(1).max(120),
    university: z.string().trim().min(1).max(160),
    image: z.string().trim().min(1).max(500),
    link: z.string().trim().min(1).max(240),
  })).min(1).max(10),
})

const homeSuccessStoriesSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeSuccessStories'),
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(260),
  videos: z.array(z.object({
    mediaType: z.enum(['youtube', 'image']).default('image'),
    youtubeUrl: z.string().trim().max(500).optional(),
    studentName: z.string().trim().min(1).max(100),
    studentAvatar: z.string().trim().min(1).max(500),
    thumbnail: z.string().trim().max(500).optional(),
    isLocked: z.boolean().optional(),
  })).min(1).max(8),
})

const homeFaqsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeFaqs'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(320),
  faqs: z.array(z.object({
    question: z.string().trim().min(1).max(180),
    answer: z.string().trim().min(1).max(500),
    color: z.string().trim().min(1).max(40),
  })).min(1).max(12),
})

const homeBlogSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeBlog'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(160),
  cta: z.object({
    label: z.string().trim().min(1).max(100),
    href: z.string().trim().min(1).max(240),
  }),
  posts: z.array(z.object({
    title: z.string().trim().min(1).max(180),
    date: z.string().trim().min(1).max(80),
    image: z.string().trim().min(1).max(500),
    href: z.string().trim().min(1).max(240),
  })).min(1).max(8),
})

const homeStaticSectionsSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('homeStaticSections'),
  enabled: z.boolean(),
})

const serviceDetailCardSchema = z.object({
  title: z.string().trim().min(1).max(220),
  description: z.string().trim().min(1).max(1000).optional(),
  image: z.string().trim().min(1).max(500).optional(),
  iconName: z.string().trim().max(80).optional(),
})

const serviceDetailSchema = z.object({
  slug: z.string().trim().min(1).max(140),
  number: z.string().trim().min(1).max(12),
  title: z.string().trim().min(1).max(180),
  shortDesc: z.string().trim().min(1).max(420),
  description: z.string().trim().min(1).max(1600),
  image: z.string().trim().min(1).max(500),
  stats: z.string().trim().min(1).max(120),
  benefits: z.array(z.union([z.string(), serviceDetailCardSchema])).min(1).max(16),
  process: z.array(z.union([z.string(), serviceDetailCardSchema])).min(1).max(16),
  outcomes: z.array(z.union([z.string(), serviceDetailCardSchema])).min(1).max(16),
})

const servicesHeroSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('servicesHero'),
  enabled: z.boolean(),
  breadcrumbLabel: z.string().trim().min(1).max(80),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(500),
  image: z.string().trim().min(1).max(500),
  imageAlt: z.string().trim().min(1).max(160),
})

const servicesListSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('servicesList'),
  enabled: z.boolean(),
  services: z.array(serviceDetailSchema).min(1).max(16),
})

const servicesCredentialsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('servicesCredentials'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(600),
  points: z.array(z.object({
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().min(1).max(500),
  })).min(1).max(6),
  image: z.string().trim().min(1).max(500),
  imageAlt: z.string().trim().min(1).max(160),
  imageEyebrow: z.string().trim().min(1).max(100),
  imageTitle: z.string().trim().min(1).max(220),
  stats: z.array(z.object({
    value: z.string().trim().min(1).max(40),
    label: z.string().trim().min(1).max(100),
    variant: z.enum(['dark', 'light', 'gold']),
  })).min(1).max(8),
})

const aboutHeroSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutHero'),
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(500),
  image: z.string().trim().min(1).max(500),
})

const aboutCeoMessageSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutCeoMessage'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(180),
  message: z.string().trim().min(1).max(4000),
  quote: z.string().trim().max(220).optional(),
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  image: z.string().trim().min(1).max(500),
  imageAlt: z.string().trim().min(1).max(180),
})

const aboutStorySectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutStory'),
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(180),
  content: z.string().trim().min(1).max(2000),
  stats: z.array(z.object({
    label: z.string().trim().min(1).max(100),
    value: z.string().trim().min(1).max(40),
    variant: z.enum(['dark', 'light', 'gold']),
  })).min(1).max(8),
})

const aboutTeamSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutTeam'),
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(500),
  members: z.array(z.object({
    name: z.string().trim().min(1).max(100),
    role: z.string().trim().min(1).max(100),
    image: z.string().trim().min(1).max(500),
  })).min(1).max(20),
})

const aboutVisionMissionSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutVisionMission'),
  enabled: z.boolean(),
  visionTitle: z.string().trim().min(1).max(180),
  visionText: z.string().trim().min(1).max(1200),
  missionTitle: z.string().trim().min(1).max(180),
  missionText: z.string().trim().min(1).max(1200),
})

const aboutPillarsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutPillars'),
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(180),
  pillars: z.array(z.object({
    title: z.string().trim().min(1).max(120),
    description: z.string().trim().min(1).max(600),
    icon: z.string().trim().min(1).max(80),
  })).min(1).max(10),
})

const aboutCtaSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('aboutCta'),
  enabled: z.boolean(),
  titleLine1: z.string().trim().min(1).max(180),
  titleLine2Highlighted: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(800),
  buttonText: z.string().trim().min(1).max(100),
  buttonHref: z.string().trim().min(1).max(240),
  globeImage: z.string().trim().min(1).max(500),
})

const contactHeroSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('contactHero'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(600),
  backgroundImage: z.string().trim().min(1).max(500),
})

const contactCardsSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('contactCards'),
  enabled: z.boolean(),
  cards: z.array(z.object({
    title: z.string().trim().min(1).max(120),
    description: z.string().trim().min(1).max(500),
    linkText: z.string().trim().min(1).max(120),
    linkHref: z.string().trim().min(1).max(240),
    isLink: z.boolean(),
  })).min(1).max(6),
})

const contactFormSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('contactForm'),
  enabled: z.boolean(),
  heading: z.string().trim().min(1).max(120).optional(),
  description: z.string().trim().min(1).max(500).optional(),
  qualificationLabel: z.string().trim().min(1).max(80).optional(),
  qualificationPlaceholder: z.string().trim().min(1).max(120).optional(),
  qualificationOptions: z.array(z.string().trim().min(1).max(80)).min(1).max(12).optional(),
  termsLabel: z.string().trim().min(1).max(180).optional(),
  submitLabel: z.string().trim().min(1).max(80).optional(),
  image: z.string().trim().min(1).max(500).optional(),
  imageAlt: z.string().trim().min(1).max(160).optional(),
})

const contactMapOfficeSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('contactMapOffice'),
  enabled: z.boolean(),
  mapUrl: z.string().trim().min(1).max(1000),
  eyebrow: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(180),
  branches: z.array(z.object({
    name: z.string().trim().min(1).max(120),
    addressLine1: z.string().trim().min(1).max(240),
    addressLine2: z.string().trim().min(1).max(240),
  })).min(1).max(6),
})

const legalContentSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('legalContent'),
  enabled: z.boolean(),
  eyebrow: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(180),
  updatedLabel: z.string().trim().min(1).max(120),
  intro: z.string().trim().min(1).max(800),
  sections: z.array(z.object({
    title: z.string().trim().min(1).max(180),
    content: z.string().trim().min(1).max(2000),
  })).min(1).max(20),
})

const faqContentSectionSchema = z.object({
  id: z.string().trim().min(1),
  type: z.literal('faqContent'),
  enabled: z.boolean(),
  badge: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(500),
  backgroundImage: z.string().trim().min(1).max(500),
  categories: z.array(z.object({
    id: z.string().trim().min(1).max(80),
    name: z.string().trim().min(1).max(120),
    items: z.array(z.object({
      question: z.string().trim().min(1).max(240),
      answer: z.string().trim().min(1).max(1200),
    })).min(1).max(20),
  })).min(1).max(12),
})

export const cmsSectionSchema = z.discriminatedUnion('type', [
  homeHeroSectionSchema,
  homeProgramSectionSchema,
  homeScholarshipOfferSectionSchema,
  homeDestinationsSectionSchema,
  homeWhyChooseUsSectionSchema,
  homeServicesSectionSchema,
  homeUniversitiesSectionSchema,
  homeStatsSectionSchema,
  homeTestimonialsSectionSchema,
  homeAmbassadorsSectionSchema,
  homeSuccessStoriesSectionSchema,
  homeFaqsSectionSchema,
  homeBlogSectionSchema,
  homeStaticSectionsSchema,
  servicesHeroSectionSchema,
  servicesListSectionSchema,
  servicesCredentialsSectionSchema,
  aboutHeroSectionSchema,
  aboutCeoMessageSectionSchema,
  aboutStorySectionSchema,
  aboutTeamSectionSchema,
  aboutVisionMissionSectionSchema,
  aboutPillarsSectionSchema,
  aboutCtaSectionSchema,
  contactHeroSectionSchema,
  contactCardsSectionSchema,
  contactFormSectionSchema,
  contactMapOfficeSectionSchema,
  legalContentSectionSchema,
  faqContentSectionSchema,
])

export const cmsPageContentSchema = z.object({
  version: z.literal(1),
  sections: z.array(cmsSectionSchema).min(1).superRefine((sections, ctx) => {
    const ids = new Set<string>()

    sections.forEach((section, index) => {
      if (!CMS_SECTION_TYPES.includes(section.type)) {
        ctx.addIssue({
          code: 'custom',
          message: `Invalid section type: ${section.type}`,
          path: [index, 'type'],
        })
      }

      if (ids.has(section.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate section id: ${section.id}`,
          path: [index, 'id'],
        })
      }

      ids.add(section.id)
    })
  }),
})

export function parseCmsPageContent(input: unknown) {
  return cmsPageContentSchema.parse(input)
}

export function safeParseCmsPageContent(input: unknown) {
  return cmsPageContentSchema.safeParse(input)
}
