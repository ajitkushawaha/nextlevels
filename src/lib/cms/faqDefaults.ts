import type { CmsPageContent } from '@/lib/cms/types'

export const defaultFaqPageContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'faq-content',
      type: 'faqContent',
      enabled: true,
      badge: 'Got Questions?',
      title: 'Frequently Asked Questions',
      description:
        'Find answers to common questions about admissions, student visas, scholarships, and our consultancy services.',
      backgroundImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1200',
      categories: [
        {
          id: 'general',
          name: 'General Questions',
          items: [
            {
              question: 'Are your counseling and application sessions free of cost?',
              answer:
                'Yes, 100% of our educational counseling, university admissions advice, and student visa evaluation services are free of charge. Our operations are fully funded by our partner universities abroad.',
            },
            {
              question: 'What is the ideal timeline to start my application process?',
              answer:
                'We strongly recommend starting your application process at least 8 to 10 months prior to the intake month. This leaves sufficient time for tests, university offers, scholarships, and student visa processing.',
            },
            {
              question: 'Which study destinations do you specialize in?',
              answer:
                'We specialize in placing students in world-renowned universities across the United Kingdom, Canada, Australia, and New Zealand.',
            },
          ],
        },
        {
          id: 'admissions',
          name: 'Admissions Support',
          items: [
            {
              question: 'Can I apply for a bachelor degree with my O/L results?',
              answer:
                'Yes, students who have completed Ordinary Levels may gain entry through a Foundation Year program before progressing to a bachelor degree.',
            },
            {
              question: 'What documents are required to apply for university admission?',
              answer:
                'Usually you need academic transcripts, passport copy, statement of purpose, recommendation letters, CV, and English language results where required.',
            },
            {
              question: 'Is IELTS or PTE mandatory?',
              answer:
                'Many universities require English proficiency, but some may offer waivers based on your academic background and destination rules.',
            },
          ],
        },
        {
          id: 'visa-finance',
          name: 'Visa & Finance',
          items: [
            {
              question: 'Do I need to show proof of funds for my student visa?',
              answer:
                'Yes, immigration authorities usually require proof that you can cover tuition and living expenses. Exact requirements depend on your destination.',
            },
            {
              question: 'How do you assist with student visa applications?',
              answer:
                'Our team helps with financial proof, statement review, visa forms, appointment preparation, and mock interview support where applicable.',
            },
            {
              question: 'What scholarships are available?',
              answer:
                'Scholarships vary by country, university, intake, academic performance, and course. We help identify realistic funding options before applying.',
            },
          ],
        },
        {
          id: 'arrival',
          name: 'Arrival Support',
          items: [
            {
              question: 'Do you help students find accommodation abroad?',
              answer:
                'Yes, we guide students through on-campus and private accommodation options and connect them with useful student networks where possible.',
            },
            {
              question: 'Can I work part-time while studying?',
              answer:
                'In the UK, Canada, Australia, and New Zealand, international students may usually work part-time subject to current visa conditions.',
            },
            {
              question: 'What happens in a pre-departure briefing?',
              answer:
                'Pre-departure sessions cover packing, travel, immigration checks, university registration, emergency contacts, and settling in.',
            },
          ],
        },
      ],
    },
  ],
}
