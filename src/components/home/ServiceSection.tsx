'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, ArrowLeft, GraduationCap, FileCheck2, Award, Globe2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


interface Service {
  title: string
  description: string
  image: string
  href?: string
  number?: string
  stats?: string
}

interface ServicesCarouselProps {
  services: Service[]
}

const serviceMeta = [
  { number: '01', icon: GraduationCap, stats: '150+ Partners' },
  { number: '02', icon: FileCheck2, stats: '98% Success' },
  { number: '03', icon: Award, stats: 'Up to 50% Off' },
  { number: '04', icon: Globe2, stats: 'End-to-End' },
]

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const displayServices = services

  return (
    <div className="relative w-full services-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={1}
        slidesPerView={1}
        breakpointsBase="container"
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        watchOverflow={false}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="pb-16!"
      >
        {displayServices.map((service, idx) => {
          const metaIndex = idx % services.length
          const meta = serviceMeta[metaIndex] || { number: '01', icon: GraduationCap, stats: '100% Free' }
          const Icon = meta.icon
          const serviceNumber = service.number || meta.number
          const serviceStats = service.stats || meta.stats

          return (
            <SwiperSlide key={`${service.title}-${idx}`} className="h-auto! p-2">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,19,49,0.12)]">
                {/* Image Header with Badge and Icon */}
                <div className="relative h-48 w-full bg-slate-50/80 overflow-hidden flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-[#d7a23a] text-[#061331] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm z-10">
                    Service {serviceNumber}
                  </span>
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-black text-sm text-[#081638] uppercase">
                      <Icon className="h-5 w-5 text-[#d7a23a]" />
                    </div>
                    <div className="text-white drop-shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-200 leading-none">100% Free</p>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="flex grow flex-col justify-between p-5 text-left sm:p-6">
                  <div>
                   
                    <h3 className="text-lg font-black text-[#081638] group-hover:text-[#d7a23a] transition-colors duration-300 line-clamp-1 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="min-w-0 text-left">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Scope</span>
                      <span className="line-clamp-2 text-xs font-black leading-4 text-[#081638]">{serviceStats}</span>
                    </div>
                    <Link
                      href={service.href || '/services'}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#081638] px-3.5 py-2 text-[10px] font-black leading-none tracking-wide text-white shadow-sm transition-all hover:bg-[#d7a23a] hover:text-[#081638] sm:px-4 sm:text-[11px]"
                    >
                      <span className="whitespace-nowrap">Read More</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Left Button */}
      <button className="swiper-prev absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100 sm:flex">
        <ArrowLeft size={20} />
      </button>

      {/* Right Button */}
      <button className="swiper-next absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#07034F] text-white shadow-md transition hover:bg-[#1f1c84] sm:flex">
        <ArrowRight size={20} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .services-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .services-swiper .swiper-pagination-bullet {
          height: 6px !important;
          width: 16px !important;
          border-radius: 9999px !important;
          background-color: #d8dce5 !important;
          opacity: 1 !important;
          transition: width 0.3s ease !important;
          margin: 0 4px !important;
        }
        .services-swiper .swiper-pagination-bullet-active {
          width: 32px !important;
          background-color: #061331 !important;
        }

        .service-card-description {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
        }
      `}} />
    </div>
  )
}
