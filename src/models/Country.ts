import mongoose, { Schema, Document } from 'mongoose'

export interface ICountry extends Document {
  name: string
  code: string
  flagImage: string
  heroImage?: string
  description: string
  averageCostOfLiving?: string
  popularCities?: string[]
  intro?: string
  highlights?: string[]
  visa?: {
    name: string
    who: string
    whenToApply: string
    arrival: string
  }
  costs?: Array<{
    program: string
    fee: string
  }>
  scholarships?: Array<{
    name: string
    description: string
  }>
  intakes?: Array<{
    name: string
    duration: string
  }>
  topCourses?: string[]
  jobProspects?: string[]
  livingCosts?: Array<{
    item: string
    cost: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  cmsData?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const CountrySchema = new Schema<ICountry>(
  {
    name: { type: String, required: true, unique: true, index: true },
    code: { type: String, required: true, unique: true, index: true }, // slug like 'uk', 'canada'
    flagImage: { type: String, required: true },
    heroImage: { type: String, default: '' },
    description: { type: String, default: '' },
    averageCostOfLiving: { type: String, default: '' },
    popularCities: { type: [String], default: [] },
    intro: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    visa: {
      name: { type: String, default: '' },
      who: { type: String, default: '' },
      whenToApply: { type: String, default: '' },
      arrival: { type: String, default: '' },
    },
    costs: [
      {
        program: { type: String },
        fee: { type: String },
      },
    ],
    scholarships: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
    intakes: [
      {
        name: { type: String },
        duration: { type: String },
      },
    ],
    topCourses: { type: [String], default: [] },
    jobProspects: { type: [String], default: [] },
    livingCosts: [
      {
        item: { type: String },
        cost: { type: String },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    cmsData: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

export default mongoose.models.Country || mongoose.model<ICountry>('Country', CountrySchema)
