'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  country: string
  image: string
  quote: string
}

interface StudentTestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function StudentTestimonialsCarousel({
  testimonials,
}: StudentTestimonialsCarouselProps) {
  const displayTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="relative w-full student-testimonials-swiper mt-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={28}
        slidesPerView={1}
        loop={true}
        watchOverflow={false}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-next-student',
          prevEl: '.swiper-prev-student',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="!pb-16"
      >
        {displayTestimonials.map((testimonial, idx) => (
          <SwiperSlide key={`${testimonial.name}-${idx}`} className="!h-auto">
            <article className="flex h-full flex-col rounded-lg border border-[#ece8df] bg-white p-7 shadow-[0_12px_34px_rgba(8,22,56,0.06)]">
              <div className="flex gap-1 text-[#d7a23a]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-5 flex-1 text-sm leading-7 text-[#273149]">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#081638]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#59616f]">{testimonial.country}</p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Button */}
      <button className="swiper-prev-student absolute -left-4 md:-left-6 top-[40%] z-[50] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100 text-[#07034F]">
        <ArrowLeft size={20} />
      </button>

      {/* Right Button */}
      <button className="swiper-next-student absolute -right-4 md:-right-6 top-[40%] z-[50] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#07034F] text-white shadow-md transition hover:bg-[#1f1c84]">
        <ArrowRight size={20} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .student-testimonials-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .student-testimonials-swiper .swiper-pagination-bullet {
          height: 6px !important;
          width: 16px !important;
          border-radius: 9999px !important;
          background-color: #d8dce5 !important;
          opacity: 1 !important;
          transition: width 0.3s ease !important;
          margin: 0 4px !important;
        }
        .student-testimonials-swiper .swiper-pagination-bullet-active {
          width: 32px !important;
          background-color: #061331 !important;
        }
      `}} />
    </div>
  )
}
