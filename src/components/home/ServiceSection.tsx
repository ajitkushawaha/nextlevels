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
  const displayServices = [...services, ...services]

  return (
    <div className="relative w-full services-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
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
            slidesPerView: 3,
          },
        }}
        className="pb-16!"
      >
        {displayServices.map((service, idx) => {
          const metaIndex = idx % services.length
          const meta = serviceMeta[metaIndex] || { number: '01', icon: GraduationCap, stats: '100% Free' }
          const Icon = meta.icon

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
                    Service {meta.number}
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
                <div className="p-6 flex flex-col justify-between grow text-left">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2">
                      <span>✨</span>
                      <span>Next Level Consultancy</span>
                    </div>
                    <h3 className="text-lg font-black text-[#081638] group-hover:text-[#d7a23a] transition-colors duration-300 line-clamp-1 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-auto">
                    <div className="text-left">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Scope</span>
                      <span className="text-xs font-black text-[#081638]">{meta.stats}</span>
                    </div>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#081638] hover:bg-[#d7a23a] text-white hover:text-[#081638] text-[11px] font-black tracking-wide transition-all shadow-sm"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Left Button */}
      <button className="swiper-prev absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100">
        <ArrowLeft size={20} />
      </button>

      {/* Right Button */}
      <button className="swiper-next absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#07034F] text-white shadow-md transition hover:bg-[#1f1c84]">
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