import Country from '@/models/Country'
import University from '@/models/University'
import {
  defaultCourseFilterSettings,
  type CourseFilterSettings,
} from '@/lib/courseFilterSettings'

const preferredCountryOrder = [
  'United Kingdom',
  'Canada',
  'Australia',
  'New Zealand',
]

function uniqueList(items: string[]) {
  const seen = new Set<string>()

  return items.filter(item => {
    const value = item.trim()
    const key = value.toLowerCase()

    if (!value || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function sortCountries(countries: string[]) {
  const uniqueCountries = uniqueList(countries)
  const preferred = preferredCountryOrder.filter(country =>
    uniqueCountries.some(item => item.toLowerCase() === country.toLowerCase())
  )
  const preferredKeys = new Set(preferred.map(country => country.toLowerCase()))
  const remaining = uniqueCountries
    .filter(country => !preferredKeys.has(country.toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  return [...preferred, ...remaining]
}

export async function getDynamicCourseFilterSettings(
  settings?: Partial<CourseFilterSettings> | null
) {
  const [countries, universities] = await Promise.all([
    (Country as any).find({}).select('name').sort({ name: 1 }).lean(),
    (University as any).find({}).select('name').sort({ name: 1 }).lean(),
  ])

  const databaseCountries = countries
    .map((country: any) => country.name)
    .filter(Boolean)
  const databaseUniversities = universities
    .map((university: any) => university.name)
    .filter(Boolean)

  return {
    countries: sortCountries([
      ...(settings?.countries || []),
      ...databaseCountries,
      ...defaultCourseFilterSettings.countries,
    ]),
    fields: settings?.fields?.length
      ? settings.fields
      : defaultCourseFilterSettings.fields,
    degreeTypes: settings?.degreeTypes?.length
      ? settings.degreeTypes
      : defaultCourseFilterSettings.degreeTypes,
    universities: uniqueList([
      ...(settings?.universities || []),
      ...databaseUniversities,
      ...defaultCourseFilterSettings.universities,
    ]),
  }
}
