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
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema)
