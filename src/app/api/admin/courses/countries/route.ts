import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authConfig'
import connectDB from '@/lib/db'
import Country from '@/models/Country'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return Boolean(session && (session.user as any)?.role === 'admin')
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    await connectDB()
    const countries = await (Country as any).find({}).sort({ name: 1 })
    return NextResponse.json({ countries })
  } catch (error) {
    console.error('Admin countries GET failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, code, flagImage, description, averageCostOfLiving, popularCities } = body

    if (!name || !code || !flagImage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()

    // Populate country with layout defaults matching the UK template
    const defaultCountryData = {
      name,
      code: code.toLowerCase(),
      flagImage,
      description: description || '',
      averageCostOfLiving: averageCostOfLiving || '',
      popularCities: popularCities || [],
      intro: `Study in ${name} for globally respected degrees, strong research quality, and excellent career opportunities.`,
      highlights: [
        `Globally respected undergraduate and postgraduate degrees.`,
        `Flexible pathways and high standard of learning.`,
        `Permission to work part-time during term and full-time during holidays.`,
        `Post-study work visa opportunities for eligible graduates.`
      ],
      visa: {
        name: 'Student visa',
        who: 'Students accepted by a licensed education provider.',
        whenToApply: 'Usually 3-6 months before your course starts.',
        arrival: 'Arrival timing aligns with your course start date.'
      },
      costs: [
        { program: 'Undergraduate bachelor degree', fee: 'USD 15,000 - 25,000 per year' },
        { program: 'Postgraduate master degree', fee: 'USD 18,000 - 28,000 per year' }
      ],
      scholarships: [
        { name: 'University entrance awards', description: 'Partial tuition fee waivers based on academic merit.' },
        { name: 'Government scholarships', description: 'Prestigious fully or partially funded opportunities.' }
      ],
      intakes: [
        { name: 'Fall intake', duration: 'September to October' },
        { name: 'Spring intake', duration: 'January to February' }
      ],
      topCourses: ['Business management', 'Information technology', 'Engineering'],
      jobProspects: ['Technology and telecom', 'Financial services', 'Healthcare'],
      livingCosts: [
        { item: 'Accommodation', cost: 'USD 500 - 1,000 monthly' },
        { item: 'Food and groceries', cost: 'USD 200 - 400 monthly' },
        { item: 'Transport', cost: 'USD 50 - 150 monthly' }
      ],
      faqs: [
        { question: 'Is a student visa required?', answer: `Yes, most international students require a valid student visa to study full-time in ${name}.` },
        { question: 'Can I work part-time while studying?', answer: 'Yes, international students are generally permitted to work up to 20 hours per week during studies.' }
      ]
    }

    const created = await Country.create(defaultCountryData)
    return NextResponse.json({ country: created }, { status: 201 })
  } catch (error: any) {
    console.error('Admin countries POST failed:', error)
    if (error?.code === 11000) {
      return NextResponse.json({ error: 'A country with this name or code already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
