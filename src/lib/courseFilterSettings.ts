export const defaultCourseFilterSettings = {
  countries: ['United Kingdom', 'Canada', 'Australia', 'New Zealand'],
  fields: [
    'Information Technology',
    'Business & Management',
    'Health & Medicine',
    'Engineering',
    'Law',
    'Hospitality & Tourism',
    'Creative Arts & Design',
  ],
  degreeTypes: ['BSc', 'MSc', 'MBA', 'BEng', 'LLB', 'LLM', 'Diploma'],
  universities: [
    'Coventry University',
    'Manchester Metropolitan University',
    'University of Law',
    'University of Toronto',
    'Humber College',
    'Capilano University',
    'University of New South Wales',
    'University of Western Australia',
    'Deakin University',
    'University of Sydney',
    'Auckland University of Technology',
    'University of Auckland',
  ],
}

export type CourseFilterSettings = typeof defaultCourseFilterSettings

export function sanitizeFilterList(value: unknown) {
  if (!Array.isArray(value)) return []
  return value
    .map(item => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
}
