import mongoose, { Schema, Document } from 'mongoose'

export interface IBranch extends Document {
  slug: string
  city: string
  province: string
  seoTitle: string
  metaDescription: string
  heroImage: string
  intro: string[]
  destinations: string[]
  areas: Array<{
    name: string
    title: string
    description: string
  }>
  stories: Array<{
    name: string
    country: string
    university: string
    image: string
    quote: string
  }>
  team: Array<{
    name: string
    designation: string
    image: string
  }>
  gallery: Array<{
    title: string
    image: string
  }>
  address: string
  phone: string
  email: string
  workingHours: string
  mapQuery: string
  mapUrl?: string
  faqs: Array<{
    question: string
    answer: string
  }>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BranchSchema = new Schema<IBranch>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    seoTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    heroImage: { type: String, required: true },
    intro: [{ type: String }],
    destinations: [{ type: String }],
    areas: [{
      name: String,
      title: String,
      description: String,
    }],
    stories: [{
      name: String,
      country: String,
      university: String,
      image: String,
      quote: String,
    }],
    team: [{
      name: String,
      designation: String,
      image: String,
    }],
    gallery: [{
      title: String,
      image: String,
    }],
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    workingHours: { type: String, required: true },
    mapQuery: { type: String, required: true },
    mapUrl: { type: String, default: '' },
    faqs: [{
      question: String,
      answer: String,
    }],
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
)

export default mongoose.models.Branch ||
  mongoose.model<IBranch>('Branch', BranchSchema)
