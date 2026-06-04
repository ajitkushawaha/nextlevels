import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Blog from '@/models/Blog'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    await connectDB()

    // 1. Seed Admin User
    let adminStatus = 'Admin already exists'
    const existingAdmin = await (User as any).findOne({ role: 'admin' })
    let seededAdminEmail = existingAdmin?.email || ''

    if (!existingAdmin) {
      const defaultEmail = 'admin@nextlevel.com'
      const defaultPassword = 'Admin@123456'
      const hashedPassword = await bcrypt.hash(defaultPassword, 10)

      const admin = await (User as any).create({
        name: 'Administrator',
        email: defaultEmail,
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
        status: { isActive: true },
      })
      seededAdminEmail = admin.email
      adminStatus = 'Admin user seeded successfully'
    }

    // 2. Seed Mock Blog Posts
    let blogStatus = 'Blogs already exist'
    const blogCount = await (Blog as any).countDocuments({})
    const seededBlogs = []

    if (blogCount === 0) {
      const blogsToSeed = [
        {
          title: 'Ultimate Guide to Canada Student Visa Process (2026)',
          slug: 'ultimate-guide-to-canada-student-visa-process-2026',
          excerpt: 'Learn step-by-step how to apply for your Canada Study Permit, SDS requirements, and documents needed.',
          content: '<p>Applying for a Canada study permit can be complex, but with the right guidance, it is entirely manageable. The Student Direct Stream (SDS) offers a speedier route for students from selected countries. Make sure you have your Letter of Acceptance (LOA), proof of financial support (GIC of $20,635 CAD), and language proficiency scores (IELTS academic 6.0 overall or equivalent) before applying.</p>',
          featuredImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800',
          featuredImageAlt: 'Canadian flag and passport',
          author: 'Education Specialist',
          status: 'published',
          category: 'Canada',
          tags: ['Canada', 'Study Visa', 'SDS', 'Study Abroad'],
          metaTitle: 'Canada Student Visa Process 2026 Guide | Next Level',
          metaDescription: 'Complete step-by-step Canada study permit application guide covering SDS, document checklists, financial requirements, and processing timelines.',
          metaKeywords: 'canada study permit, canada student visa, study in canada, sds canada'
        },
        {
          title: 'UK Student Visa: Requirements & Application Steps',
          slug: 'uk-student-visa-requirements-application-steps',
          excerpt: 'A complete checklist of documents, visa fees, and processing times for international students applying to study in the UK.',
          content: '<p>Ready to start your higher education journey in the UK? The Student Visa (formerly Tier 4) is your main route. To qualify, you must have a Confirmation of Acceptance for Studies (CAS) from a licensed student sponsor, score at least 70 points in the points-based system, and demonstrate sufficient financial maintenance (e.g. £1,334 per month for courses in London).</p>',
          featuredImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
          featuredImageAlt: 'London Big Ben tower',
          author: 'Consultancy Advisor',
          status: 'published',
          category: 'United Kingdom',
          tags: ['UK', 'Student Visa', 'CAS', 'Higher Education'],
          metaTitle: 'UK Student Visa Requirements & Steps 2026 | Next Level',
          metaDescription: 'A complete checklist of documents, visa fees, point systems, and processing times for international students applying for UK student visa.',
          metaKeywords: 'uk student visa, study in uk, cas number, uk visa fees'
        },
        {
          title: 'How to Prepare for the IELTS Exam in 4 Weeks',
          slug: 'how-to-prepare-for-the-ielts-exam-in-4-weeks',
          excerpt: 'Get expert tips, mock test guides, and practice schedules to score 7.5+ bands in your IELTS academic test.',
          content: '<p>IELTS is the gateway to your dreams of studying overseas. Achieving a high band score requires structured effort. In week 1, familiarize yourself with the exam format. In week 2, focus on writing and reading formats. In week 3, practice listening guides. In week 4, sit for full-length mock exams and analyze your mistakes.</p>',
          featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
          featuredImageAlt: 'Student writing on paper',
          author: 'IELTS Tutor',
          status: 'draft',
          category: 'Coaching',
          tags: ['IELTS', 'Test Prep', 'Study Guides', 'English Proficiency'],
          metaTitle: 'Prepare for IELTS Exam in 4 Weeks (7.5+ Bands) | Next Level',
          metaDescription: 'Get expert preparation checklists, weekly study planners, and practice guides to score 7.5+ bands in the IELTS Academic exam.',
          metaKeywords: 'ielts test preparation, score 7.5 ielts, online ielts coaching'
        }
      ]

      for (const b of blogsToSeed) {
        const createdBlog = await (Blog as any).create(b)
        seededBlogs.push({
          id: createdBlog._id,
          title: createdBlog.title,
          slug: createdBlog.slug,
          status: createdBlog.status
        })
      }
      blogStatus = `Seeded ${seededBlogs.length} mock blog posts successfully`
    }

    return NextResponse.json(
      {
        adminStatus,
        seededAdminEmail,
        blogStatus,
        blogsCount: seededBlogs.length || blogCount,
        seededBlogs: seededBlogs
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error seeding data:', error)
    return NextResponse.json(
      { error: 'Failed to seed administrator/blog data', details: error.message },
      { status: 500 }
    )
  }
}
