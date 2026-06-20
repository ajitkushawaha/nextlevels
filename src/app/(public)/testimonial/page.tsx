import Image from 'next/image'
import Link from 'next/link'
import NextLevelHomepage from '@/components/home/NextLevelHomepage'
import { defaultHomePageContent } from '@/lib/cms/homeDefaults'
import { getPublishedCmsContent } from '@/lib/cms/pages'
import {
  fetchSEOData,
  generateMetadata as generateSEOMetadata,
} from '@/components/seo/ServerSEO'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const seoData = await fetchSEOData('/testimonial')
  const isDefaultSeo = seoData.metaTitle === 'Next Level Education Consultancy | Study Abroad Expert'

  return generateSEOMetadata(
    isDefaultSeo
      ? {
          metaTitle: 'Testimonials | Next Level Education',
          metaDescription:
            'Hear from Next Level Education students, chat with student ambassadors, and explore real study abroad success stories.',
          metaKeywords: ['student testimonials', 'student ambassadors', 'study abroad success stories'],
          ogTitle: 'Testimonials | Next Level Education',
          ogDescription:
            'Hear from Next Level Education students, chat with student ambassadors, and explore real study abroad success stories.',
          ogImage: '/home2/happy-team.png',
          canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nextleveleducation.com'}/testimonial`,
          robots: 'index, follow',
        }
      : seoData
  )
}

export default async function TestimonialPage() {
  const content = (await getPublishedCmsContent('/')) || defaultHomePageContent

  return (
    <div className="min-h-screen bg-white text-[#061331]">
      <section className="relative overflow-hidden min-h-85 sm:h-90 lg:h-100 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
        <Image
          src="/home2/happy-team.png"
          alt="Next Level Education student testimonials"
          fill
          priority
          className="absolute inset-0 z-0 object-cover object-center"
          sizes="100vw"
        />

        <div className="relative z-20 flex h-full w-full max-w-7xl flex-col justify-between mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-187.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#d7a23a]">
                    Home
                  </Link>
                  <span className="ml-1.5 text-white/60">/</span>
                </li>
                <li className="pointer-events-none font-semibold text-white">
                  <span>Testimonials</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="mt-auto space-y-3 pt-6">
            <span className="inline-flex items-center rounded-full border border-[#d7a23a]/40 bg-[#081638] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#d7a23a] shadow-sm">
              Student Voices
            </span>
            <h1
              className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[48px]"
              style={{ fontFamily: 'Farro, sans-serif' }}
            >
              Testimonials
            </h1>
            <p className="max-w-xl text-xs font-medium leading-relaxed text-white/80 sm:text-sm">
              See what our students say, connect with student ambassadors, and watch real study abroad success stories.
            </p>
          </div>
        </div>
      </section>

      <NextLevelHomepage
        content={content}
        renderHero={false}
        renderProgram={false}
        renderScholarshipOffer={false}
        renderDestinations={false}
        renderWhyChooseUs={false}
        renderServices={false}
        renderUniversities={false}
        renderStats={false}
        renderTestimonials
        renderAmbassadors
        renderFaqs={false}
        renderBlog={false}
        renderStaticSections={false}
        showAmbassadorViewAll={false}
        showSuccessStoriesViewAll={false}
        ambassadorSectionBottomGap
      />
    </div>
  )
}
