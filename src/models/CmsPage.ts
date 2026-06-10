import mongoose, { Schema, Document } from 'mongoose'
import type { CmsPageContent, CmsPageStatus } from '@/lib/cms/types'

export interface ICmsPage extends Document {
  slug: string
  title: string
  draftContent: CmsPageContent
  publishedContent?: CmsPageContent
  status: CmsPageStatus
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const CmsPageSchema = new Schema<ICmsPage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    draftContent: { type: Schema.Types.Mixed, required: true },
    publishedContent: { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.models.CmsPage ||
  mongoose.model<ICmsPage>('CmsPage', CmsPageSchema)
