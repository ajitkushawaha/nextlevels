import mongoose, { Schema, Document } from 'mongoose'

export interface ICourseFilterSettings extends Document {
  key: string
  countries: string[]
  fields: string[]
  degreeTypes: string[]
  universities: string[]
  updatedAt: Date
}

const CourseFilterSettingsSchema = new Schema<ICourseFilterSettings>(
  {
    key: { type: String, required: true, unique: true, default: 'default' },
    countries: { type: [String], default: [] },
    fields: { type: [String], default: [] },
    degreeTypes: { type: [String], default: [] },
    universities: { type: [String], default: [] },
  },
  { timestamps: true }
)

export default mongoose.models.CourseFilterSettings ||
  mongoose.model<ICourseFilterSettings>('CourseFilterSettings', CourseFilterSettingsSchema)
