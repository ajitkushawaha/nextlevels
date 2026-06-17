import mongoose, { Schema, Document } from 'mongoose'

export interface IUniversity extends Document {
  name: string
  logo: string
  bannerImage?: string
  countryId: mongoose.Types.ObjectId
  city: string
  globalRanking?: number
  description?: string
  websiteUrl?: string
  cmsData?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
    bannerImage: { type: String, default: '' },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country', required: true, index: true },
    city: { type: String, required: true },
    globalRanking: { type: Number },
    description: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    cmsData: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

export default mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema)
