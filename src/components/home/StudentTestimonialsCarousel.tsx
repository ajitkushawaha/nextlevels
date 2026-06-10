'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight, ArrowLeft, Star, Lock, CirclePlay } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
    </div>
  )
}
