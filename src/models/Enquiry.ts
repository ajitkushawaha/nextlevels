import mongoose, { Schema, Document } from 'mongoose'

export interface IEnquiry extends Document {
  fullName: string
  email: string
  phone: string
  educationLevel: string
  fieldOfStudy?: string
  preferredCountry: string
  intakeYear: string
  intakeMonth?: string
  message?: string
  sourcePage?: string
  sourcePath?: string
  sourceType?: string
  sourceCountry?: string
  sourceProgram?: string
  sourceUniversity?: string
  sourceScholarship?: string
  sourceBranch?: string
  referralAgentId?: mongoose.Types.ObjectId
  referralAgentCode?: string
  referralAgentName?: string
  status: 'new' | 'contacted' | 'resolved'
  createdAt: Date
  updatedAt: Date
}

const EnquirySchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    educationLevel: { type: String, required: true },
    fieldOfStudy: { type: String },
    preferredCountry: { type: String, required: true },
    intakeYear: { type: String, required: true },
    intakeMonth: { type: String },
    message: { type: String },
    sourcePage: { type: String, default: '' },
    sourcePath: { type: String, default: '' },
    sourceType: { type: String, default: '' },
    sourceCountry: { type: String, default: '' },
    sourceProgram: { type: String, default: '' },
    sourceUniversity: { type: String, default: '' },
    sourceScholarship: { type: String, default: '' },
    sourceBranch: { type: String, default: '' },
    referralAgentId: { type: Schema.Types.ObjectId, ref: 'ReferralAgent' },
    referralAgentCode: { type: String, default: '', index: true },
    referralAgentName: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema)
