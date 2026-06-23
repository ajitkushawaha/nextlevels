import mongoose, { Schema, Document } from 'mongoose'

export interface ISiteSettings extends Document {
  key: string
  header: Record<string, any>
  footer: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true, default: 'global' },
    header: { type: Schema.Types.Mixed, default: {} },
    footer: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)
