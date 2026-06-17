import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import type { CmsPageContent, CmsSection } from '@/lib/cms/types'
import { defaultServicesPageContent } from '@/lib/cms/servicesDefaults'
import ServicesInteractiveHub from './ServicesInteractiveHub'

function getSection<T extends CmsSection['type']>(
  content: CmsPageContent,
  type: T,
  fallbackIndex: number
) {
  return (
    content.sections.find(section => section.type === type) ||
    defaultServicesPageContent.sections[fallbackIndex]
  ) as Extract<CmsSection, { type: T }>
}

export default function ServicesPageContent({
  content = defaultServicesPageContent,
  includeFooter = true,
  sectionId,
}: {
  content?: CmsPageContent
  includeFooter?: boolean
  sectionId?: string
}) {
  const hero = getSection<'servicesHero'>(content, 'servicesHero', 0)
  const servicesList = getSection<'servicesList'>(content, 'servicesList', 1)
  const credentials = getSection<'servicesCredentials'>(
    content,
    'servicesCredentials',
    2
  )

  const showHero = hero.enabled && (!sectionId || sectionId === hero.id)
  const showMain =
    (!sectionId || sectionId === servicesList.id || sectionId === credentials.id) &&
    (servicesList.enabled || credentials.enabled)

  return (
    <div className="min-h-screen bg-white text-[#061331] flex flex-col justify-between">
      {showHero && (
        <section className="relative overflow-hidden min-h-85 sm:h-90 lg:h-100 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-27.5 pb-6 sm:pb-8 lg:py-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-linear-to-b before:from-black/50 before:via-black/70 before:to-black/90 lg:before:bg-linear-to-r lg:before:from-black/85 lg:before:to-black/30">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            className="object-cover object-top absolute inset-0 z-0"
            sizes="100vw"
          />

          <div className="relative z-20 flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-187.5">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs lg:text-sm text-white/90">
                  <li>
                    <Link href="/" className="hover:text-[#d7a23a] transition-colors">
                      Home
                    </Link>
                    <span className="ml-1.5 text-white/60">/</span>
                  </li>
                  <li className="pointer-events-none text-white font-semibold">
                    <span>{hero.breadcrumbLabel}</span>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="mt-auto space-y-3 pt-6">
              <div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#081638] border border-[#d7a23a]/40 text-[#d7a23a] text-[10px] font-black uppercase tracking-wider shadow-sm">
                  {hero.eyebrow}
                </span>
              </div>

              <h1
                className="text-2xl sm:text-4xl lg:text-[48px] font-bold text-white tracking-tight leading-[1.15]"
                style={{ fontFamily: 'Farro, sans-serif' }}
              >
                {hero.title}
              </h1>

              <p className="text-white/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
                {hero.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {showMain && (
        <main className="w-full grow bg-[#fbf8fc] py-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ServicesInteractiveHub
              services={servicesList.enabled ? servicesList.services : []}
              credentials={credentials.enabled ? credentials : undefined}
              showServices={!sectionId || sectionId === servicesList.id}
              showCredentials={!sectionId || sectionId === credentials.id}
            />
          </div>
        </main>
      )}

      {includeFooter && <Footer />}
    </div>
  )
}
