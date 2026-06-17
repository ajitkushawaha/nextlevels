import { z } from 'zod'

const serviceDetailCardSchema = z.object({
  title: z.string().trim().min(1).max(220),
  description: z.string().trim().min(1).max(1000).optional(),
  image: z.string().trim().min(1).max(500).optional(),
  iconName: z.string().trim().max(80).optional(),
})

export const serviceDetailSchema = z.object({
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

export const servicePageStatusSchema = z.enum(['draft', 'published'])

export function parseServiceDetail(input: unknown) {
  return serviceDetailSchema.parse(input)
}
