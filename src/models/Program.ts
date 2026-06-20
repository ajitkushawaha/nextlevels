import mongoose, { Schema, Document } from 'mongoose'

export interface IProgram extends Document {
  title: string
  universityId: mongoose.Types.ObjectId
  degreeLevel: string
  discipline: string
  duration: string
  tuitionFee: number
  currency: string
  intakes: string[]
  ieltsScoreRequired?: number
  description?: string
  heroImage?: string
  requirements?: string
  structure?: string[]
  cmsData?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const ProgramSchema = new Schema<IProgram>(
  {
    title: { type: String, required: true, index: true },
    universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true, index: true },
    degreeLevel: { type: String, required: true, default: 'Bachelor' },
    discipline: { type: String, required: true, default: 'IT' },
    duration: { type: String, required: true },
    tuitionFee: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    intakes: { type: [String], default: [] },
    ieltsScoreRequired: { type: Number, default: 6.0 },
    description: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    requirements: { type: String, default: '' },
    structure: { type: [String], default: [] },
    cmsData: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

export default mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema)
