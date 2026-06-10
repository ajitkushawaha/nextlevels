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
  destinations: z.array(homeDestinationCardSchema).min(1).max(8),
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
  })).min(1).max(8),
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
  })).min(1).max(8),
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
  storiesTitle: z.string().trim().min(1).max(160),
  storiesDescription: z.string().trim().min(1).max(260),
  videos: z.array(z.object({
    title: z.string().trim().min(1).max(180),
    studentName: z.string().trim().min(1).max(100),
    studentAvatar: z.string().trim().min(1).max(500),
    thumbnail: z.string().trim().min(1).max(500),
    textOverlay: z.string().trim().max(260).optional(),
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

export const cmsSectionSchema = z.discriminatedUnion('type', [
  homeHeroSectionSchema,
  homeProgramSectionSchema,
  homeDestinationsSectionSchema,
  homeWhyChooseUsSectionSchema,
  homeServicesSectionSchema,
  homeUniversitiesSectionSchema,
  homeStatsSectionSchema,
  homeTestimonialsSectionSchema,
  homeAmbassadorsSectionSchema,
  homeFaqsSectionSchema,
  homeBlogSectionSchema,
  homeStaticSectionsSchema,
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
