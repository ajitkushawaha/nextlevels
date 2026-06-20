import type { CmsPageContent } from './types'
import { serviceDetails } from '@/lib/serviceDetails'

export const defaultHomePageContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'home-hero',
      type: 'homeHero',
      enabled: true,
      titleLine1: 'Free Student Visa',
      titleLine2: 'Consultation to',
      highlightedTitle: 'Study Abroad',
      description:
        'By taking our expert guidance for your global education journey, you can build your profile and save time. Starting right now.',
      image: {
        src: '/image.png',
        alt: 'Student with Suitcase',
      },
      features: [
        {
          icon: 'Headphones',
          title: 'Free Visa Consultation',
          text: '1-on-1 guidance from visa experts.',
        },
        {
          icon: 'FileCheck2',
          title: 'End-to-End Support',
          text: 'From application to arrival, we are with you.',
        },
        {
          icon: 'GraduationCap',
          title: '1000+ Students Placed',
          text: 'Trusted by students worldwide.',
        },
        {
          icon: 'ShieldCheck',
          title: 'High Success Rate',
          text: 'We maximize your chances of success.',
        },
      ],
    },
    {
      id: 'home-program',
      type: 'homeProgram',
      enabled: true,
      eyebrow: 'WHO WE ARE',
      title: 'Find the Right Program in Top Universities',
      description:
        'We help you choose the right course and university that matches your goals and future aspirations.',
      benefits: [
        'Wide range of programs and universities',
        'Personalized career counseling',
        'Scholarship & application assistance',
        'Test preparation support',
      ],
      cta: {
        label: 'Explore Programs',
        href: '/courses',
      },
      images: [
        {
          src: '/home2/happy-ma.png',
          alt: 'Students discussing study abroad options',
        },
        {
          src: '/home2/happy-team.png',
          alt: 'Students with passports',
        },
        {
          src: '/home2/happy-gi.png',
          alt: 'Visa application documents',
        },
      ],
      badge: {
        line1: 'Your Future',
        line2: 'Starts Here',
      },
    },
    {
      id: 'home-scholarship-offer',
      type: 'homeScholarshipOffer',
      enabled: true,
      badgeText: 'Limited Offer',
      intakeLabel: 'September 2026 Intake',
      countdownTarget: '2026-09-01T00:00:00+05:30',
      titlePrefix: 'Apply Now & Receive a',
      scholarshipAmount: '£3,000',
      titleSuffix: 'Scholarship',
      description:
        'Apply through Next Level Education to the University of East London for the September 2026 intake and get £3,000 off your first-year tuition.',
      highlightedAgency: 'Next Level Education',
      highlightedUniversity: 'University of East London',
      highlightedOffer: '£3,000 off',
      ctaLabel: 'Claim My Scholarship',
      ctaHref: '/contact-us',
      note: 'Free · No commitment',
      featureChips: [
        { icon: 'Award', text: '£3,000 scholarship' },
        { icon: 'ShieldCheck', text: 'University of East London' },
        { icon: 'GraduationCap', text: 'September 2026 intake' },
      ],
      benefitsTitle: 'What you get',
      benefits: [
        '£3,000 off first-year tuition',
        'Priority application processing',
        'Dedicated visa counselor',
        'University of East London only',
      ],
      urgencyText: 'Limited spots - apply early!',
    },
    {
      id: 'home-destinations',
      type: 'homeDestinations',
      enabled: true,
      title: 'Your dream study destination awaits',
      description:
        'Start your inspiring academic journey in these vibrant and welcoming study destinations!',
      destinations: [
        {
          name: 'United Kingdom',
          image: '/destinations_uk.png',
          alt: 'United Kingdom study destination',
        },
        {
          name: 'Canada',
          image: '/destinations_canada.png',
          alt: 'Canada study destination',
        },
        {
          name: 'Australia',
          image: '/destinations_australia.png',
          alt: 'Australia study destination',
        },
        {
          name: 'New Zealand',
          image: '/destinations_nz.png',
          alt: 'New Zealand study destination',
        },
      ],
    },
    {
      id: 'home-why-choose-us',
      type: 'homeWhyChooseUs',
      enabled: true,
      eyebrow: 'Why Choose Next Level Education',
      title: 'We Make Your Study Abroad Journey Easy',
      items: [
        {
          icon: 'UsersRound',
          title: 'Expert Advisors',
          text: 'Get guidance from experienced counsellors who care about your future.',
        },
        {
          icon: 'BookOpenCheck',
          title: 'Clear Process',
          text: 'Simple, transparent and hassle-free process from start to finish.',
        },
        {
          icon: 'Globe2',
          title: 'Global Opportunities',
          text: 'Access to top universities across the UK, Canada, Australia and New Zealand.',
        },
        {
          icon: 'Headphones',
          title: 'Personalized Support',
          text: 'Tailored support at every step to ensure your success.',
        },
      ],
    },
    {
      id: 'home-services',
      type: 'homeServices',
      enabled: true,
      eyebrow: 'Our Services',
      title: 'How We Can Help You Succeed',
      services: serviceDetails.map(service => ({
        title: service.title,
        description: service.shortDesc,
        image: service.image,
      })),
    },
    {
      id: 'home-universities',
      type: 'homeUniversities',
      enabled: true,
      eyebrow: 'Top Institutions',
      title: 'Featured',
      highlightedTitle: 'Partner Universities',
      description:
        'Explore our elite partner institutions from around the globe. Get direct admissions assistance, visa processing support, and scholarship options.',
      cta: {
        label: 'Browse All Universities & Courses',
        href: '/courses',
      },
    },
    {
      id: 'home-stats',
      type: 'homeStats',
      enabled: true,
      stats: [
        { icon: 'UsersRound', targetValue: 1000, suffix: '+', label: 'Students Placed' },
        { icon: 'Building2', targetValue: 150, suffix: '+', label: 'Partner Universities' },
        { icon: 'Globe2', targetValue: 20, suffix: '+', label: 'Countries Covered' },
        { icon: 'Award', targetValue: 98, suffix: '%', label: 'Visa Success Rate' },
      ],
    },
    {
      id: 'home-testimonials',
      type: 'homeTestimonials',
      enabled: true,
      eyebrow: 'Testimonials',
      title: 'What Our Students Say',
      testimonials: [
        {
          name: 'Ananya S.',
          country: 'Canada',
          image: '/home2/happy-gi.png',
          quote:
            'Next Level Education made my dream of studying in Canada a reality. Their support was excellent throughout the process.',
        },
        {
          name: 'Rahul M.',
          country: 'UK',
          image: '/home2/sham.png',
          quote:
            'The team guided me at every step. From university selection to visa approval, everything was so smooth.',
        },
        {
          name: 'Priya K.',
          country: 'Australia',
          image: '/home2/priya.png',
          quote:
            'Highly recommend Next Level Education to anyone who wants to study overseas. Truly professional and supportive.',
        },
        {
          name: 'Sham K.',
          country: 'Australia',
          image: '/home2/ananya.png',
          quote:
            'Next Level Education made my dream of studying in Canada a reality. Their support was excellent throughout the process. Truly professional and supportive.',
        },
      ],
    },
    {
      id: 'home-ambassadors',
      type: 'homeAmbassadors',
      enabled: true,
      ambassadorTitle: 'Chat to a student ambassador',
      ambassadorDescription: 'Speak to Next Level ambassadors today!',
      ambassadors: [
        {
          name: 'Aastha Paudel',
          program: 'Information Technology',
          university: 'University of Colombo',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
          link: '/chat?name=Aastha%20Paudel',
        },
        {
          name: 'Geraldine Penarete',
          program: 'Geology',
          university: 'University of Peradeniya',
          image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
          link: '/chat?name=Geraldine%20Penarete',
        },
        {
          name: 'Yumi Wan',
          program: 'Physiotherapy',
          university: 'University of Sydney',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          link: '/chat?name=Yumi%20Wan',
        },
        {
          name: 'Tiara D Souza',
          program: 'Occupational Therapy',
          university: 'Monash University',
          image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
          link: '/chat?name=Tiara%20D%20Souza',
        },
        {
          name: 'Yumi Wans',
          program: 'Physiotherapy',
          university: 'University of Melbourne',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          link: '/chat?name=Yumi%20Wans',
        },
      ],
    },
    {
      id: 'home-success-stories',
      type: 'homeSuccessStories',
      enabled: true,
      title: 'Success Stories',
      description: 'Hear from past students!',
      videos: [
        {
          mediaType: 'youtube',
          youtubeUrl: 'https://youtu.be/Smdd1XOO2gA?si=TYnL2AFD14ZVNz6S',
          studentName: 'Jean Manreal',
          studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80',
          isLocked: false,
        },
        {
          mediaType: 'image',
          studentName: 'Nayla Hafeeza Putri',
          studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
          isLocked: false,
        },
        {
          mediaType: 'image',
          studentName: 'Kun Deng',
          studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&auto=format&fit=crop&q=80',
          isLocked: true,
        },
        {
          mediaType: 'image',
          studentName: 'Tioluwalase Arowolo',
          studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
          isLocked: true,
        },
      ],
    },
    {
      id: 'home-faqs',
      type: 'homeFaqs',
      enabled: true,
      eyebrow: 'Frequently Asked Questions',
      title: 'Everything You Need to Know',
      description:
        'Find quick answers about visas, scholarships, destinations and study abroad planning.',
      faqs: [
        {
          question: 'How do I apply for a UK Student Visa?',
          answer: 'You need admission, CAS letter, passport, financial proof and medical insurance.',
          color: '#3b82f6',
        },
        {
          question: 'What IELTS score is required?',
          answer: 'Most universities require an overall band score of 6.0 to 7.0.',
          color: '#84cc16',
        },
        {
          question: 'How can I get a scholarship abroad?',
          answer: 'Apply early, maintain good academic records and check university scholarships.',
          color: '#a855f7',
        },
        {
          question: 'What are the average study expenses?',
          answer: 'It depends on the country and course. Plan for tuition, living and other costs.',
          color: '#f59e0b',
        },
        {
          question: 'Which country is best for international students?',
          answer: 'United Kingdom, Canada, Australia and New Zealand are popular choices for quality education.',
          color: '#06b6d4',
        },
      ],
    },
    {
      id: 'home-blog',
      type: 'homeBlog',
      enabled: true,
      eyebrow: 'Latest From Our Blog',
      title: 'Tips & Updates for Students',
      cta: {
        label: 'View All Blogs',
        href: '/blog',
      },
      posts: [
        {
          title: 'Top 10 Universities in Canada for International Students',
          date: 'May 15, 2024',
          image: '/visa/blog1.png',
          href: '/blog',
        },
        {
          title: 'UK Student Visa: Latest Updates and Requirements',
          date: 'May 10, 2024',
          image: '/visa/blog2.png',
          href: '/blog',
        },
        {
          title: 'How to Get Scholarships to Study Abroad',
          date: 'May 05, 2024',
          image: '/visa/blog3.png',
          href: '/blog',
        },
        {
          title: 'Study in Australia: Courses, Fees and Opportunities',
          date: 'Apr 28, 2024',
          image: '/visa/blog4.png',
          href: '/blog',
        },
      ],
    },
    {
      id: 'home-static-sections',
      type: 'homeStaticSections',
      enabled: true,
    },
  ],
}
