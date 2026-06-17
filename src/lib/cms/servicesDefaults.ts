import { serviceDetails } from '@/lib/serviceDetails'
import type { CmsPageContent } from './types'

export const defaultServicesPageContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'services-hero',
      type: 'servicesHero',
      enabled: true,
      breadcrumbLabel: 'Services',
      eyebrow: 'Next Level Consultancy',
      title: 'Our Professional Services',
      description:
        'Empowering your global academic aspirations through end-to-end guidance. From university matching to landing safely in your dream destination.',
      image: '/shero.png',
      imageAlt: 'Our Services Banner',
    },
    {
      id: 'services-list',
      type: 'servicesList',
      enabled: true,
      services: serviceDetails,
    },
    {
      id: 'services-credentials',
      type: 'servicesCredentials',
      enabled: true,
      eyebrow: 'OUR CREDENTIALS',
      title: 'Why Next Level Stands Out',
      description:
        'Providing unique, personalized guidance that eliminates study abroad stress entirely. We operate with high compliance rigor and a commitment to transparent, zero-fee support.',
      points: [
        {
          title: 'Global Admissions Representative',
          description:
            'Direct relationships with over 150+ highly ranked universities across Australia, Canada, UK, and New Zealand.',
        },
        {
          title: 'Credibility-First Visa Success',
          description:
            'Every portfolio undergoes rigorous auditing to ensure financial records and statements are bulletproof.',
        },
      ],
      image: '/services-credentials.png',
      imageAlt: 'Next Level student counselling advisor',
      imageEyebrow: 'Zero-fee guidance',
      imageTitle:
        'Profile review, admissions planning, and visa readiness in one place.',
      stats: [
        { value: '150+', label: 'Partner Colleges', variant: 'dark' },
        { value: '5+', label: 'Destinations', variant: 'light' },
        { value: '100%', label: 'Direct Channels', variant: 'light' },
        { value: '98%', label: 'Visa Approvals', variant: 'dark' },
        { value: 'LKR 0', label: 'Student Service Costs', variant: 'gold' },
      ],
    },
  ],
}
