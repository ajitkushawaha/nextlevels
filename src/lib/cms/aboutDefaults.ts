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
      id: 'about-ceo-message',
      type: 'aboutCeoMessage',
      enabled: true,
      eyebrow: 'Message from the CEO',
      title: 'Welcome to Next Level Education.',
      message:
        'At Next Level Education, we believe that education has the power to transform lives, open doors to global opportunities, and create a brighter future for individuals and families. Our mission is simple: to guide students through every step of their international education journey with honesty, professionalism, and dedication.\n\nAs a student-focused organization, we understand that choosing to study abroad is one of the most important decisions you will make. Whether your dream is to study in the United Kingdom, Australia, Canada, New Zealand, or another leading destination, our team is committed to providing expert guidance, personalized support, and reliable solutions to help you achieve your goals.\n\nOver the years, we have had the privilege of assisting hundreds of students in turning their aspirations into reality. Every success story inspires us to continue raising the standard of educational consultancy services and delivering exceptional support to our students and their families.\n\nAt Next Level Education, we do not simply process applications - we build futures, create opportunities, and empower the next generation of global leaders.\n\nThank you for placing your trust in us. We look forward to being part of your success story and helping you take the next step toward your dreams.',
      quote: 'We do not simply process applications - we build futures, create opportunities, and empower the next generation of global leaders.',
      name: 'Kirishanth Satkunaseelan',
      role: 'Founder & CEO, Next Level Education (PVT) LTD',
      image: '/about-ceo-kirishanth.png',
      imageAlt: 'Kirishanth Satkunaseelan, Founder and CEO of Next Level Education',
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
