import mongoose, { Schema, Document } from 'mongoose'

export interface IScholarship extends Document {
  title: string
  awardAmount: string
  deadline?: string
  type?: string
  eligibilityCriteria?: string
  description?: string
  heroImage?: string
  howToApply?: string
  countryId?: mongoose.Types.ObjectId
  universityId?: mongoose.Types.ObjectId
  programId?: mongoose.Types.ObjectId
  cmsData?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const ScholarshipSchema = new Schema<IScholarship>(
  {
    title: { type: String, required: true, index: true },
    awardAmount: { type: String, required: true },
    deadline: { type: String, default: '' },
    type: { type: String, default: 'Merit based' },
    eligibilityCriteria: { type: String, default: '' },
    description: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    howToApply: { type: String, default: '' },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country', index: true },
    universityId: { type: Schema.Types.ObjectId, ref: 'University', index: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', index: true },
    cmsData: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

export default mongoose.models.Scholarship || mongoose.model<IScholarship>('Scholarship', ScholarshipSchema)
