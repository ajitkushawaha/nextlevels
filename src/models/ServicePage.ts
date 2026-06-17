import mongoose, { Schema, Document } from 'mongoose'
import type { ServiceDetail } from '@/lib/serviceDetails'

export type ServicePageStatus = 'draft' | 'published'

export interface IServicePage extends Document {
  slug: string
  title: string
  data: ServiceDetail
  status: ServicePageStatus
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ServicePageSchema = new Schema<IServicePage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.models.ServicePage ||
  mongoose.model<IServicePage>('ServicePage', ServicePageSchema)
