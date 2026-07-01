export const defaultCourseFilterSettings = {
  countries: [] as string[],
  fields: [] as string[],
  degreeTypes: [] as string[],
  universities: [] as string[],
}

export type CourseFilterSettings = typeof defaultCourseFilterSettings

export function sanitizeFilterList(value: unknown) {
  if (!Array.isArray(value)) return []
  return value
    .map(item => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
}
