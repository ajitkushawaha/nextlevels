import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowRight,
  MapPin,
  PenLine,
  Plane,
  PhoneCall,
  Rocket,
  Sparkles,
  UserRound,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import Footer from '@/components/layout/footer'
import { getPublishedServiceDetail, getPublishedServiceSlugs } from '@/lib/servicePages'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const slugs = await getPublishedServiceSlugs()

  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const service = await getPublishedServiceDetail(slug)

  if (!service) return { title: 'Service Not Found' }

  return {
    title: `${service.title} | Next Level Education`,
    description: service.shortDesc,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params
  const service = await getPublishedServiceDetail(slug)

  if (!service) notFound()

  const coverIcons = [UserRound, PenLine, Rocket, PhoneCall]
  const coverDescriptions = [
    'We evaluate your academic background, interests, and goals to match you with the right courses and universities.',
    'Our experts refine your documents for clarity, impact, and a strong reflection of your goals.',
    'We streamline your applications through our partner network to reduce waiting time and speed up the process.',
    'We follow up directly with universities and support you until you receive your offer letter.',
  ]
  const processDescriptions = [
    'We understand your profile, aspirations, and budget to create a strong foundation.',
    'We research and recommend the best-fit universities and programs for you.',
    'We help you create compelling documents that highlight your strengths and goals.',
    'We submit applications, track progress, and follow up until you get the offer.',
  ]
  const expectedOutcomes = [
    ...service.outcomes,
    'Save time and reduce stress',
  ].slice(0, 4)
  const outcomeDescriptions = [
    'A focused list of right-fit options that match your profile.',
    'Well-prepared, polished, and university-ready application documents.',
    'Improved chances with the right strategy and fewer setbacks.',
    'A smooth, guided process that saves time and brings peace of mind.',
  ]

  const getCardDetails = (
    item: any,
    index: number,
    sectionType: 'cover' | 'process' | 'outcome'
  ) => {
    if (typeof item === 'string') {
      let defaultDesc = ''
      if (sectionType === 'cover') defaultDesc = coverDescriptions[index] || ''
      else if (sectionType === 'process') defaultDesc = processDescriptions[index] || ''
      else if (sectionType === 'outcome') defaultDesc = outcomeDescriptions[index] || ''

      return {
        title: item,
        description: defaultDesc,
        image: `/service/${sectionType}-${index + 1}.png`,
        iconName: undefined,
      }
    }

    return {
      title: item?.title || '',
      description: item?.description || '',
      image: item?.image || `/service/${sectionType}-${index + 1}.png`,
      iconName: item?.iconName,
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#12174F]">
      <main>
        <section className="relative overflow-hidden  flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
          <Image
            src={service.image}
            alt={`${service.title} banner`}
            fill
            priority
            className="object-cover object-center absolute inset-0 z-0"
            sizes="100vw"
          />

          <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-187.5">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                  <li>
                    <Link href="/" className="hover:text-[#FBC02D] transition-colors">
                      Home
                    </Link>
                    <span className="ml-1.5 text-white/60">/</span>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-[#FBC02D] transition-colors">
                      Services
                    </Link>
                    <span className="ml-1.5 text-white/60">/</span>
                  </li>
                  <li className="pointer-events-none text-white font-semibold">
                    <span>{service.title}</span>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="mt-auto space-y-3 pt-6 text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#12174F] border border-[#FBC02D]/40 text-[#FBC02D] text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Service {service.number} · {service.stats}
                </span>
              </div>

              <h1
                className="max-w-3xl text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {service.title}
              </h1>

              <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact-us"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#FBC02D] px-5 py-2 text-xs font-bold text-[#12174F] transition hover:bg-white"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/25 px-5 py-2 text-xs font-bold text-white transition hover:bg-white hover:text-[#12174F]"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FBC02D]">
                What We Cover
              </p>
              <h2
                className="mt-2 text-3xl font-black leading-tight text-[#12174F] sm:text-4xl lg:text-[42px]"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                Clear guidance from first question to next step.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#424242]">
                This service is designed to reduce confusion, document gaps, and avoidable delays while keeping the process practical for students and families.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {service.benefits.slice(0, 4).map((item, index) => {
                const card = getCardDetails(item, index, 'cover')
                const Icon =
                  (card.iconName &&
                    (LucideIcons[card.iconName as keyof typeof LucideIcons] as React.ComponentType<any>)) ||
                  coverIcons[index] ||
                  LucideIcons.HelpCircle

                return (
                  <article
                    key={index}
                    className="overflow-hidden rounded-[22px] border border-slate-200 bg-white text-center shadow-[0_16px_42px_rgba(18,23,79,0.08)]"
                  >
                    <div
                      className="h-48 bg-white bg-no-repeat bg-cover bg-center"
                      role="img"
                      aria-label={`${service.title} coverage ${index + 1}`}
                      style={{
                        backgroundImage: `url('${card.image}')`,
                      }}
                    />
                    <div className="px-6 pb-7">
                      <span className="mx-auto -mt-6 flex h-13 w-13 items-center justify-center rounded-full bg-[#F8F7FA] text-[#1A237E] shadow-sm">
                        <Icon className="h-6 w-6" strokeWidth={2.6} />
                      </span>
                      <h3 className="mt-4 text-lg font-black leading-6 text-[#12174F]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#424242]">
                        {card.description}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#12174F] py-12 sm:py-14">
          <div className="absolute inset-0 opacity-35 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.18)_48%,transparent_100%),radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.16)_0_10%,transparent_11%),radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.12)_0_8%,transparent_9%)]" />
          <MapPin className="absolute left-8 top-32 hidden h-11 w-11 text-white/70 md:block" />
          <MapPin className="absolute right-12 bottom-28 hidden h-10 w-10 text-[#FBC02D] md:block" />
          <Plane className="absolute right-16 top-28 hidden h-12 w-12 rotate-12 text-white/70 md:block" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto mb-9 max-w-4xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FBC02D]">
                Our Process
              </p>
              <h2
                className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                How this service works
              </h2>
              <span className="mx-auto mt-3 block h-1.5 w-12 rounded-full bg-[#FBC02D]" />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-[9%] right-[9%] top-19.5 hidden border-t-2 border-dashed border-white/55 xl:block" />

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {service.process.slice(0, 4).map((item, index) => {
                  const card = getCardDetails(item, index, 'process')
                  return (
                    <article key={index} className="relative text-center">
                      <div className="relative mx-auto h-42 w-42 rounded-full border-[9px] border-white bg-white shadow-[0_16px_34px_rgba(18,23,79,0.13)]">
                        <span className="absolute -left-2 top-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FBC02D] text-sm font-black text-[#12174F] shadow-md">
                          {index + 1}
                        </span>
                        <div
                          className="absolute inset-2 rounded-full bg-[#F8F7FA] bg-no-repeat bg-cover bg-center"
                          role="img"
                          aria-label={`${service.title} process ${index + 1}`}
                          style={{
                            backgroundImage: `url('${card.image}')`,
                          }}
                        />
                      </div>

                      <h3 className="mx-auto mt-4 max-w-58 text-xl font-black leading-7 text-white">
                        {card.title}
                      </h3>
                      <p className="mx-auto mt-3 max-w-62 text-sm leading-6 text-white/75">
                        {card.description}
                      </p>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F8F7FA] py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FBC02D]">
                Expected Outcomes
              </p>
              <h2
                className="mt-2 text-3xl font-black leading-tight text-[#12174F] sm:text-4xl"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                We focus on clarity, readiness, and practical decisions instead of generic advice.
              </h2>
              <span className="mx-auto mt-3 block h-1.5 w-12 rounded-full bg-[#FBC02D]" />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {expectedOutcomes.map((item, index) => {
                const card = getCardDetails(item, index, 'outcome')
                return (
                  <article
                    key={index}
                    className="relative text-center xl:border-r xl:border-[#E0E0E0] xl:last:border-r-0"
                  >
                    <div
                      className="mx-auto h-36 w-36 rounded-full bg-no-repeat bg-cover bg-center"
                      role="img"
                      aria-label={`${service.title} outcome ${index + 1}`}
                      style={{
                        backgroundImage: `url('${card.image}')`,
                      }}
                    />
                    <h3 className="mx-auto mt-4 max-w-58 text-xl font-black leading-7 text-[#12174F]">
                      {card.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-62 text-sm leading-6 text-[#424242]">
                      {card.description}
                    </p>
                  </article>
                )
              })}
            </div>

            <div className="mt-9 rounded-[18px] bg-[#12174F] px-6 py-5 text-white shadow-[0_20px_45px_rgba(18,23,79,0.16)] sm:px-8 lg:flex lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/70 text-white sm:flex">
                  <Sparkles className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="text-xl font-black">
                    Your dream university is closer than you think.
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    Let&apos;s take the next step together.
                  </p>
                </div>
              </div>
              <Link
                href="/contact-us"
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#FBC02D] px-8 py-3 text-sm font-black text-[#12174F] shadow-lg transition hover:bg-white lg:mt-0"
              >
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
