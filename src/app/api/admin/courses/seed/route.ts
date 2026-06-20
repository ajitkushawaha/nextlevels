import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Country from '@/models/Country'
import University from '@/models/University'
import Program from '@/models/Program'
import Scholarship from '@/models/Scholarship'
import { studyDestinations } from '@/lib/studyDestinations'
import { universitiesData, coursesData, scholarshipsData } from '@/lib/mockData'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function POST() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // 1. Clear existing collections
    await (Country as any).deleteMany({})
    await (University as any).deleteMany({})
    await (Program as any).deleteMany({})
    await (Scholarship as any).deleteMany({})

    // 2. Seed Countries
    const createdCountries = []
    for (const destination of studyDestinations) {
      const countryDoc = await (Country as any).create({
        name: destination.country,
        code: destination.slug.toLowerCase(),
        flagImage: destination.heroImage, // Use heroImage as flagImage if no flagImage on dest
        heroImage: destination.heroImage,
        description: destination.intro || '',
        averageCostOfLiving: destination.livingCosts?.[0]?.cost || '',
        popularCities: [destination.shortName],
        intro: destination.intro,
        highlights: destination.highlights,
        visa: destination.visa,
        costs: destination.costs,
        scholarships: destination.scholarships,
        intakes: destination.intakes,
        topCourses: destination.topCourses,
        jobProspects: destination.jobProspects,
        livingCosts: destination.livingCosts,
        faqs: destination.faqs,
      })
      createdCountries.push(countryDoc)
    }

    // Map country names to mongoose IDs
    const countryNameToId: Record<string, string> = {}
    createdCountries.forEach(c => {
      countryNameToId[c.name] = c._id.toString()
    })

    // 3. Seed Universities
    const createdUniversities = []
    const univDataList = Object.values(universitiesData)
    for (const univ of univDataList) {
      // Find matching country
      let countryId = countryNameToId[univ.country]
      if (!countryId) {
        // If not matched, try to look up or create a minimal country
        let countryDoc = await (Country as any).findOne({ name: univ.country })
        if (!countryDoc) {
          countryDoc = await (Country as any).create({
            name: univ.country,
            code: univ.country.toLowerCase().replace(/\s+/g, '-'),
            flagImage: '/countries/default.png',
            description: `Study in ${univ.country}`,
          })
        }
        countryId = countryDoc._id.toString()
        countryNameToId[univ.country] = countryId
      }

      const univDoc = await (University as any).create({
        name: univ.name,
        logo: univ.logo,
        bannerImage: univ.coverImage,
        countryId,
        city: univ.location.split(',')[0].trim(),
        globalRanking: parseInt(univ.worldRank.replace(/\D/g, '')) || undefined,
        description: univ.description,
        websiteUrl: univ.website,
      })
      createdUniversities.push(univDoc)
    }

    // Map university names to mongoose IDs
    const univNameToId: Record<string, string> = {}
    createdUniversities.forEach(u => {
      univNameToId[u.name] = u._id.toString()
    })

    // 4. Seed Programs
    const createdPrograms = []
    for (const prog of coursesData) {
      let universityId = univNameToId[prog.university]
      if (!universityId) {
        // Create matching mock university
        const univDoc = await (University as any).create({
          name: prog.university,
          logo: prog.university.slice(0, 4).toUpperCase(),
          bannerImage: '',
          countryId: countryNameToId[prog.country] || createdCountries[0]._id,
          city: prog.location,
        })
        universityId = univDoc._id.toString()
        univNameToId[prog.university] = universityId
      }

      // Convert tuition fee string to number (e.g. "£16,500 - £18,900 / year" -> 16500)
      const cleanFee = parseInt(prog.tuitionFee.replace(/[^\d]/g, '').slice(0, 5)) || 15000

      const progDoc = await (Program as any).create({
        title: prog.title,
        universityId,
        degreeLevel: prog.level,
        discipline: prog.field,
        duration: prog.duration,
        tuitionFee: cleanFee,
        currency: prog.tuitionFee.includes('£') ? 'GBP' : prog.tuitionFee.includes('A$') ? 'AUD' : prog.tuitionFee.includes('C$') ? 'CAD' : 'USD',
        intakes: prog.intakes,
        ieltsScoreRequired: parseFloat(prog.visaSuccess) || 6.5,
        description: prog.description,
        heroImage: '',
        requirements: prog.requirements || '',
        structure: prog.structure || [],
      })
      createdPrograms.push(progDoc)
    }

    // Map program names to mongoose IDs
    const progNameToId: Record<string, string> = {}
    createdPrograms.forEach(p => {
      progNameToId[p.title] = p._id.toString()
    })

    // 5. Seed Scholarships
    for (const schol of scholarshipsData) {
      await (Scholarship as any).create({
        title: schol.title,
        awardAmount: schol.award,
        deadline: schol.deadline,
        type: schol.type,
        eligibilityCriteria: schol.eligibility,
        description: schol.overview || schol.howToApply || '',
        heroImage: '',
        howToApply: schol.howToApply || '',
        countryId: countryNameToId[schol.country],
      })
    }

    return NextResponse.json({
      message: 'Course Finder database successfully seeded!',
      counts: {
        countries: createdCountries.length,
        universities: createdUniversities.length,
        programs: createdPrograms.length,
        scholarships: scholarshipsData.length,
      }
    })
  } catch (error: any) {
    console.error('Admin seeding POST failed:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
