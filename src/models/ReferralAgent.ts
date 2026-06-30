import mongoose, { Schema, Document } from 'mongoose'

export interface IReferralAgent extends Document {
  name: string
  code: string
  publicToken?: string
  iframeUrl: string
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
    publicToken: { type: String, index: true, sparse: true },
    iframeUrl: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    notes: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const ExistingReferralAgent = mongoose.models.ReferralAgent

// Keep the cached development model in sync when this schema gains fields.
if (ExistingReferralAgent && !ExistingReferralAgent.schema.path('iframeUrl')) {
  ExistingReferralAgent.schema.add({
    iframeUrl: { type: String, required: true, trim: true },
  })
}

export default ExistingReferralAgent || mongoose.model<IReferralAgent>('ReferralAgent', ReferralAgentSchema)
