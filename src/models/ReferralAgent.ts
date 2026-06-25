import mongoose, { Schema, Document } from 'mongoose'

export interface IReferralAgent extends Document {
  name: string
  code: string
  publicToken: string
  email?: string
  phone?: string
  notes?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ReferralAgentSchema = new Schema<IReferralAgent>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    publicToken: { type: String, required: true, unique: true, index: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    notes: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.ReferralAgent ||
  mongoose.model<IReferralAgent>('ReferralAgent', ReferralAgentSchema)
