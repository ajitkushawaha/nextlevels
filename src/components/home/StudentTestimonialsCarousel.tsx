'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, ArrowLeft, Star, X } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  name: string
  country: string
  image: string
  quote: string
}

interface StudentTestimonialsCarouselProps {
  testimonials: Testimonial[]
}

const ambassadors = [
  {
    name: 'Aastha Paudel',
    program: 'Information Tech...',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
  {
    name: 'Geraldine Penarete Vaquiro',
    program: 'Geology',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
  {
    name: 'Yumi Wan',
    program: 'Physiotherapy ...',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
  {
    name: 'Tiara D Souza',
    program: 'Occupational T...',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    link: '/contact-us',
  },
]

const studentLifeVideos = [
  {
    title: 'What does a typical student day look like at CQU?',
    studentName: 'Jean Manreal',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80',
    textOverlay: 'Day in a life of an International MBM Student in AUS 🇵🇭 🇳🇿 (School Day Edition)',
    isLocked: false,
  },
  {
    title: 'Fav spot in campus',
    studentName: 'Nayla Hafeeza Putri',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
    isLocked: false,
  },
  {
    title: 'What kind of food options are there on campus?',
    studentName: 'Kun Deng',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&auto=format&fit=crop&q=80',
    isLocked: true,
  },
  {
    title: 'How are different cultures and events celebrated on campus?',
    studentName: 'Tioluwalase Arowolo',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
    isLocked: true,
  },
]

export default function StudentTestimonialsCarousel({
  testimonials,
}: StudentTestimonialsCarouselProps) {
  const displayTestimonials = [...testimonials, ...testimonials]
  const [activeReview, setActiveReview] = useState<Testimonial | null>(null)

  useEffect(() => {
    if (!activeReview) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [activeReview])

  return (
    <div className="w-full  mt-10">
      <div className='relative student-testimonials-swiper'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          breakpointsBase="container"
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
              slidesPerView: 4,
            },
          }}
          className="pb-16!"
        >
          {displayTestimonials.map((testimonial, idx) => (
            <SwiperSlide key={`${testimonial.name}-${idx}`} className="h-auto!">
              <article className="flex h-full flex-col rounded-3xl border border-[#ece8df] bg-white p-7 shadow-[0_12px_34px_rgba(8,22,56,0.06)]">
                <div className="flex gap-1 text-[#d7a23a]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[#273149] line-clamp-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                {testimonial.quote.length > 150 ? (
                  <button
                    type="button"
                    onClick={() => setActiveReview(testimonial)}
                    className="mt-3 w-fit text-xs font-black uppercase tracking-wider text-[#d7a23a] transition hover:text-[#061331]"
                  >
                    Read More
                  </button>
                ) : (
                  <span className="mt-3 h-4" aria-hidden="true" />
                )}
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
        <button className="swiper-prev-student absolute -left-4 md:-left-6 top-[40%] z-10 hidden md:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100 text-[#07034F]">
          <ArrowLeft size={20} />
        </button>

        {/* Right Button */}
        <button className="swiper-next-student absolute -right-4 md:-right-6 top-[40%] z-10 hidden md:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#07034F] text-white shadow-md transition hover:bg-[#1f1c84]">
          <ArrowRight size={20} />
        </button>

        <style dangerouslySetInnerHTML={{
          __html: `
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

      {activeReview ? (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-[#061331]/70 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
          onClick={() => setActiveReview(null)}
        >
          <div
            className="relative flex max-h-[82svh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl sm:max-h-[86vh] sm:rounded-3xl"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveReview(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#061331] shadow-sm transition hover:bg-[#061331] hover:text-white"
              aria-label="Close review"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="shrink-0 border-b border-slate-100 px-5 pb-4 pt-5 pr-16 sm:px-8 sm:pt-7">
              <div className="flex gap-1 text-[#d7a23a]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-3 text-sm font-black text-[#081638] sm:text-base">
                {activeReview.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#59616f]">
                {activeReview.country}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 [-webkit-overflow-scrolling:touch] sm:px-8 sm:py-6">
              <p className="whitespace-pre-line text-sm leading-7 text-[#273149] sm:text-base sm:leading-8">
                &quot;{activeReview.quote}&quot;
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-4 border-t border-slate-100 bg-white px-5 py-4 sm:px-8 sm:py-5">
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={activeReview.image}
                  alt={activeReview.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-sm font-black text-[#081638]">{activeReview.name}</p>
                <p className="text-xs font-semibold text-[#59616f]">{activeReview.country}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
