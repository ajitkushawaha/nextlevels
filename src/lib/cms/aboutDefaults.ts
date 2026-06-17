import type { CmsPageContent } from '@/lib/cms/types'

export const defaultAboutPageContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'about-hero',
      type: 'aboutHero',
      enabled: true,
      title: 'About Next Level',
      description: 'We believe that global education transforms lives, which is why we provide counseling and application support completely 100% free of charge.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
    },
    {
      id: 'about-story',
      type: 'aboutStory',
      enabled: true,
      title: 'Our Story & Vision',
      content: 'Founded with a vision to simplify international student placement, Next Level Education (Pvt) Ltd is a premier study abroad agency headquartered in Jaffna, Sri Lanka. We believe that global education transforms lives, which is why we provide our counseling and application support completely 100% free of charge for all students.',
      stats: [
        { label: 'VISA SUCCESS', value: '98%', variant: 'light' },
        { label: 'STUDENTS PLACED', value: '1000+', variant: 'light' },
      ],
    },
    {
      id: 'about-vision-mission',
      type: 'aboutVisionMission',
      enabled: true,
      visionTitle: 'Our Vision',
      visionText: 'To be a trusted leader in education consultancy, empowering students to achieve their academic goals and transform their futures through personalized guidance for studying abroad.',
      missionTitle: 'Our Mission',
      missionText: 'Building international pathways since 2020 by providing ethical, transparent, and comprehensive support that removes financial barriers to global education excellence.',
    },
    {
      id: 'about-team',
      type: 'aboutTeam',
      enabled: true,
      title: 'The people guiding every student journey.',
      description: '',
      members: [
        {
          name: 'John',
          role: 'Education Counsellors',
          image: '/service/team1.png',
        },
        {
          name: 'John',
          role: 'Admissions Coordinators',
          image: '/service/team2.png',
        },
        {
          name: 'John',
          role: 'Visa & Document Advisors',
          image: '/service/team3.png',
        },
        {
          name: 'John',
          role: 'Student Success Support',
          image: '/service/team4.png',
        },
      ],
    },
    {
      id: 'about-pillars',
      type: 'aboutPillars',
      enabled: true,
      title: 'Our Core Pillars',
      pillars: [
        {
          title: 'Student-First Approach',
          description: 'Every student is unique. We tailor our academic and visa guidance to match your specific backgrounds and goals.',
          icon: 'UserCheck',
        },
        {
          title: '100% Free Services',
          description: 'We never charge students for counseling, applications, or visa support. Our operations are fully funded by partner universities.',
          icon: 'Heart',
        },
        {
          title: 'Ethical & Transparent',
          description: 'We maintain strict compliance and integrity in our applications, ensuring authentic documentation and high credibility.',
          icon: 'Shield',
        },
      ],
    },
    {
      id: 'about-cta',
      type: 'aboutCta',
      enabled: true,
      titleLine1: 'Ready to Start Your',
      titleLine2Highlighted: 'Study Abroad',
      description: 'Join thousands of successful students who have achieved their dreams with Next Level Education. Your future starts with a single conversation.',
      buttonText: 'Book a Free Consultation',
      buttonHref: '/contact-us',
      globeImage: '/study-abrode-cta-globe.png',
    },
  ],
}