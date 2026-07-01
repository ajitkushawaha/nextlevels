import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Program from '@/models/Program'
import Scholarship from '@/models/Scholarship'
import University from '@/models/University'

export async function GET() {
  try {
    await connectDB()
    const [programs, scholarships, universities] = await Promise.all([
      (Program as any).find({}).populate({ path: 'universityId', populate: { path: 'countryId' } }).sort({ title: 1 }).lean(),
      (Scholarship as any).find({}).populate('countryId').sort({ title: 1 }).lean(),
      (University as any).find({}).populate('countryId').sort({ name: 1 }).lean(),
    ])

    const courseItems = programs.map((program: any) => ({
        id: program.cmsData?.slug || program._id.toString(),
        title: program.title,
        heroImage: program.heroImage || '',
        university: program.universityId?.name || 'University not assigned',
        universitySlug: program.universityId?.cmsData?.slug || '',
        location: program.universityId?.city || '',
        country: program.universityId?.countryId?.name || '',
        flag: program.universityId?.countryId?.flagImage || '',
        field: program.discipline || '',
        level: program.degreeLevel || '',
        duration: program.duration || '',
        tuitionFee: `${program.currency || ''} ${program.tuitionFee || ''}`.trim(),
        intakes: program.intakes || [],
        visaSuccess: '',
        description: program.description || '',
        degreeType: program.degreeLevel || '',
        requirements: program.requirements || '',
        structure: program.structure || [],
      }))

    const scholarshipItems = scholarships.map((scholarship: any) => ({
      id: scholarship.cmsData?.slug || scholarship._id.toString(),
      title: scholarship.title,
      heroImage: scholarship.heroImage || '',
      award: scholarship.awardAmount || '',
      country: scholarship.countryId?.name || 'Global',
      eligibility: scholarship.eligibilityCriteria || '',
      deadline: scholarship.deadline || '',
      type: scholarship.type || '',
      overview: scholarship.description || '',
      howToApply: scholarship.howToApply || '',
    }))

    const universityItems = Object.fromEntries(
      universities.map((university: any) => [
        university.name,
        {
          name: university.name,
          slug: university.cmsData?.slug || '',
          logo: university.logo || '',
          coverImage: university.bannerImage || '',
          worldRank: university.globalRanking ? `#${university.globalRanking}` : '',
          students: university.cmsData?.students || '',
          established: university.cmsData?.established || '',
          description: university.description || '',
          country: university.countryId?.name || '',
          location: university.city || '',
          flag: university.countryId?.flagImage || '',
          website: university.websiteUrl || '',
          accreditation: university.cmsData?.accreditation || '',
        },
      ])
    )

    return NextResponse.json({ courses: courseItems, scholarships: scholarshipItems, universities: universityItems })
  } catch (error) {
    console.error('Public course catalog GET failed:', error)
    return NextResponse.json({ courses: [], scholarships: [], universities: {} }, { status: 500 })
  }
}
