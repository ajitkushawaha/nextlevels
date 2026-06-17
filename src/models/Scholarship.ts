import mongoose, { Schema, Document } from 'mongoose'

export interface IScholarship extends Document {
  title: string
  awardAmount: string
  eligibilityCriteria?: string
  description?: string
  countryId?: mongoose.Types.ObjectId
  universityId?: mongoose.Types.ObjectId
  programId?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ScholarshipSchema = new Schema<IScholarship>(
  {
    title: { type: String, required: true, index: true },
    awardAmount: { type: String, required: true },
    eligibilityCriteria: { type: String, default: '' },
    description: { type: String, default: '' },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country', index: true },
    universityId: { type: Schema.Types.ObjectId, ref: 'University', index: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', index: true },
  },
  { timestamps: true }
)

export default mongoose.models.Scholarship || mongoose.model<IScholarship>('Scholarship', ScholarshipSchema)
