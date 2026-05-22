'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, ArrowLeft } from 'lucide-react'
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

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const displayServices = [...services, ...services]

  return (
    <div className="relative w-full">
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
            slidesPerView: 4,
          },
        }}
        className="!pb-14"
      >
        {displayServices.map((service, idx) => (
          <SwiperSlide key={`${service.title}-${idx}`} className="!h-auto p-1">
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[#ece8df] bg-white shadow-sm transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 hover:shadow-md hover:border-[#d7a23a]/50">

              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="flex flex-1 flex-col px-4 py-6">
                <h3 className="line-clamp-2 text-lg font-bold text-[#081638]">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 line-clamp-4 text-sm text-[#59616f]">
                  {service.description}
                </p>

                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#061331] transition hover:text-[#d7a23a]"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Button */}
      <button className="swiper-prev absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100">
        <ArrowLeft size={20} />
      </button>

      {/* Right Button */}
      <button className="swiper-next absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#07034F] text-white shadow-md transition hover:bg-[#1f1c84]">
        <ArrowRight size={20} />
      </button>
    </div>
  )
}