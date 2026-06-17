export type StudyDestination = {
  slug: string
  country: string
  shortName: string
  flag: string
  heroImage: string
  intro: string
  highlights: string[]
  visa: {
    name: string
    who: string
    whenToApply: string
    arrival: string
  }
  costs: Array<{
    program: string
    fee: string
  }>
  scholarships: Array<{
    name: string
    description: string
  }>
  intakes: Array<{
    name: string
    duration: string
  }>
  topCourses: string[]
  jobProspects: string[]
  livingCosts: Array<{
    item: string
    cost: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const studyDestinations: StudyDestination[] = [
  {
    slug: 'uk',
    country: 'United Kingdom',
    shortName: 'UK',
    flag: '🇬🇧',
    heroImage: '/countries/uk.png',
    intro:
      'Study in the UK for globally respected degrees, shorter course durations, strong research quality, and access to historic student cities.',
    highlights: [
      'Three-year undergraduate and one-year taught master degrees are common.',
      'Strong options across business, law, engineering, medicine, arts, and computing.',
      'International students can usually work part-time during term and full-time during holidays.',
      'Graduate route options can help eligible students gain post-study work experience.',
    ],
    visa: {
      name: 'Student visa',
      who: 'Students aged 16 or over with an offer from a licensed UK education provider.',
      whenToApply: 'Usually up to 6 months before your course starts.',
      arrival:
        'Arrival timing depends on course length, usually up to 1 month before courses longer than 6 months.',
    },
    costs: [
      { program: 'Undergraduate bachelor degree', fee: 'GBP 10,000 - GBP 20,000 per year' },
      { program: 'Postgraduate master degree', fee: 'GBP 10,000 - GBP 20,000 per year' },
      { program: 'Doctoral degree', fee: 'GBP 15,000 - GBP 24,000 per year' },
    ],
    scholarships: [
      {
        name: 'Chevening Scholarship',
        description: 'A prestigious UK government award for students with leadership potential.',
      },
      {
        name: 'Commonwealth Scholarship',
        description: 'Supports eligible Commonwealth students pursuing postgraduate study.',
      },
      {
        name: 'GREAT Scholarship',
        description: 'University-linked awards available across selected UK institutions and subjects.',
      },
    ],
    intakes: [
      { name: 'Autumn/Fall intake', duration: 'September to December' },
      { name: 'Spring intake', duration: 'January to April' },
      { name: 'Summer intake', duration: 'April to June' },
    ],
    topCourses: [
      'Business management',
      'Engineering and technology',
      'Medicine',
      'Law',
      'Social sciences',
      'Media and communication',
    ],
    jobProspects: [
      'Technology and telecom',
      'Financial services',
      'Law',
      'Pharmaceuticals and biotech',
      'Consulting and professional services',
      'Public sector and education',
    ],
    livingCosts: [
      { item: 'Bills and utilities', cost: 'GBP 40 - GBP 80 monthly' },
      { item: 'Food and housekeeping', cost: 'GBP 160 - GBP 250 monthly' },
      { item: 'Mobile phone', cost: 'GBP 15 - GBP 50 monthly' },
      { item: 'Local travel', cost: 'GBP 30 - GBP 80 monthly' },
    ],
    faqs: [
      {
        question: 'Is CAS required for a UK student visa?',
        answer:
          'Yes. Your university issues a Confirmation of Acceptance for Studies after you meet its offer and deposit requirements.',
      },
      {
        question: 'Can I work while studying in the UK?',
        answer:
          'Most eligible international students can work part-time during term and full-time during official holidays.',
      },
      {
        question: 'What is the Graduate Route (PSW) in the UK?',
        answer:
          'The Graduate Route allows international students to stay and work in the UK for 2 years (3 years for PhD graduates) after completing their studies.',
      },
      {
        question: 'How long are undergraduate and postgraduate courses in the UK?',
        answer:
          'Typically, bachelor\'s degrees are 3 years and master\'s degrees are 1 year. This is shorter than in many other countries, saving tuition and living expenses.',
      },
    ],
  },
  {
    slug: 'canada',
    country: 'Canada',
    shortName: 'Canada',
    flag: '🇨🇦',
    heroImage: '/countries/canada.png',
    intro:
      'Canada is known for practical education, welcoming communities, co-op pathways, and globally recognised universities and colleges.',
    highlights: [
      'Popular for diplomas, undergraduate degrees, postgraduate certificates, and research programs.',
      'Co-op and internship pathways connect study with practical Canadian work exposure.',
      'Multicultural cities make it easier for students to settle and build networks.',
      'Eligical graduates may explore post-graduation work pathways.',
    ],
    visa: {
      name: 'Study permit',
      who: 'Students accepted by a designated learning institution in Canada.',
      whenToApply: 'Apply as early as possible after receiving your offer and financial documents.',
      arrival:
        'Arrival should align with the study permit conditions and institution start date.',
    },
    costs: [
      { program: 'College diploma', fee: 'CAD 14,000 - CAD 22,000 per year' },
      { program: 'Undergraduate degree', fee: 'CAD 20,000 - CAD 35,000 per year' },
      { program: 'Postgraduate program', fee: 'CAD 18,000 - CAD 32,000 per year' },
    ],
    scholarships: [
      {
        name: 'University entrance awards',
        description: 'Merit-based awards offered by individual universities and colleges.',
      },
      {
        name: 'Graduate research funding',
        description: 'Assistantships and research scholarships for eligible master and PhD students.',
      },
      {
        name: 'Provincial scholarships',
        description: 'Selected provincial awards based on institution, profile, and study level.',
      },
    ],
    intakes: [
      { name: 'Fall intake', duration: 'September' },
      { name: 'Winter intake', duration: 'January' },
      { name: 'Spring/Summer intake', duration: 'May to July' },
    ],
    topCourses: [
      'Computer science',
      'Business analytics',
      'Healthcare administration',
      'Engineering technology',
      'Hospitality management',
      'Cybersecurity',
    ],
    jobProspects: [
      'Information technology',
      'Healthcare',
      'Finance',
      'Construction and engineering',
      'Education',
      'Logistics and supply chain',
    ],
    livingCosts: [
      { item: 'Accommodation', cost: 'CAD 700 - CAD 1,500 monthly' },
      { item: 'Food', cost: 'CAD 300 - CAD 600 monthly' },
      { item: 'Transport', cost: 'CAD 80 - CAD 180 monthly' },
      { item: 'Phone and internet', cost: 'CAD 60 - CAD 120 monthly' },
    ],
    faqs: [
      {
        question: 'Do I need a study permit for Canada?',
        answer:
          'Most international programs longer than six months require a valid Canadian study permit.',
      },
      {
        question: 'Is Canada good for practical courses?',
        answer:
          'Yes. Canadian colleges and universities are known for co-op, applied learning, and industry-focused programs.',
      },
      {
        question: 'What is PGWPP in Canada?',
        answer:
          'The Post-Graduation Work Permit Program (PGWPP) allows eligible graduates to obtain an open work permit to gain valuable Canadian work experience.',
      },
      {
        question: 'Can I bring my family while studying in Canada?',
        answer:
          'Yes, eligible students can bring their spouse (who may apply for an open work permit) and minor children to study at public schools.',
      },
    ],
  },
  {
    slug: 'australia',
    country: 'Australia',
    shortName: 'Australia',
    flag: '🇦🇺',
    heroImage: '/countries/aus.png',
    intro:
      'Australia offers high-quality education, strong student support, vibrant cities, and excellent options across universities and TAFE-style pathways.',
    highlights: [
      'Globally ranked universities with strong research and employability outcomes.',
      'Flexible pathways from diplomas to bachelor and master programs.',
      'International students can gain local experience through permitted work rights.',
      'Warm climate, diverse cities, and established Sri Lankan student communities.',
    ],
    visa: {
      name: 'Student visa subclass 500',
      who: 'Students enrolled in a CRICOS-registered Australian course.',
      whenToApply: 'Apply after receiving enrolment confirmation and preparing funds, health cover, and documents.',
      arrival: 'Arrival should follow visa conditions and the institution orientation schedule.',
    },
    costs: [
      { program: 'Diploma and pathway program', fee: 'AUD 12,000 - AUD 22,000 per year' },
      { program: 'Undergraduate degree', fee: 'AUD 25,000 - AUD 45,000 per year' },
      { program: 'Postgraduate degree', fee: 'AUD 28,000 - AUD 50,000 per year' },
    ],
    scholarships: [
      {
        name: 'Destination Australia',
        description: 'Supports selected students studying in regional Australian campuses.',
      },
      {
        name: 'University merit scholarships',
        description: 'Partial tuition awards based on academic performance and course level.',
      },
      {
        name: 'Research training support',
        description: 'Funding routes for eligible postgraduate research applicants.',
      },
    ],
    intakes: [
      { name: 'Semester 1', duration: 'February to March' },
      { name: 'Semester 2', duration: 'July to August' },
      { name: 'Trimester options', duration: 'Varies by institution' },
    ],
    topCourses: [
      'Nursing',
      'Information technology',
      'Business and management',
      'Engineering',
      'Accounting',
      'Social work',
    ],
    jobProspects: [
      'Healthcare',
      'Technology',
      'Engineering',
      'Education',
      'Professional services',
      'Tourism and hospitality',
    ],
    livingCosts: [
      { item: 'Accommodation', cost: 'AUD 800 - AUD 1,800 monthly' },
      { item: 'Food', cost: 'AUD 350 - AUD 700 monthly' },
      { item: 'Transport', cost: 'AUD 100 - AUD 250 monthly' },
      { item: 'Utilities and phone', cost: 'AUD 150 - AUD 300 monthly' },
    ],
    faqs: [
      {
        question: 'What visa do I need for Australia?',
        answer:
          'Most international students need the Student visa subclass 500 for full-time study in Australia.',
      },
      {
        question: 'Are scholarships available in Australia?',
        answer:
          'Yes. Awards vary by university, region, study level, and academic profile.',
      },
      {
        question: 'What is the subclass 485 Temporary Graduate visa?',
        answer:
          'It is a post-study work visa allowing international graduates to live and work in Australia temporarily.',
      },
      {
        question: 'Is OSHC mandatory for study in Australia?',
        answer:
          'Yes, purchasing Overseas Student Health Cover (OSHC) is a mandatory requirement for the duration of your student visa.',
      },
    ],
  },
  {
    slug: 'new-zealand',
    country: 'New Zealand',
    shortName: 'New Zealand',
    flag: '🇳🇿',
    heroImage: '/countries/Nz.png',
    intro:
      'New Zealand combines globally respected qualifications with smaller class environments, safe cities, and practical learning pathways.',
    highlights: [
      'Strong education quality with universities, institutes of technology, and pathway providers.',
      'Popular for business, IT, health, hospitality, engineering, and environmental studies.',
      'Supportive student communities and peaceful cities.',
      'Work-integrated and applied programs are available across many institutions.',
    ],
    visa: {
      name: 'Fee Paying Student Visa',
      who: 'Students accepted into an approved full-time course in New Zealand.',
      whenToApply: 'Apply once your offer, financial evidence, and supporting documents are ready.',
      arrival: 'Travel timing depends on visa conditions and the course start date.',
    },
    costs: [
      { program: 'Diploma and pathway program', fee: 'NZD 16,000 - NZD 25,000 per year' },
      { program: 'Undergraduate degree', fee: 'NZD 22,000 - NZD 35,000 per year' },
      { program: 'Postgraduate degree', fee: 'NZD 26,000 - NZD 40,000 per year' },
    ],
    scholarships: [
      {
        name: 'University excellence awards',
        description: 'Merit-based tuition support from individual New Zealand institutions.',
      },
      {
        name: 'Research scholarships',
        description: 'Funding opportunities for eligible master and doctoral research students.',
      },
      {
        name: 'Subject-specific awards',
        description: 'Scholarships linked to priority fields and institution campaigns.',
      },
    ],
    intakes: [
      { name: 'Semester 1', duration: 'February to March' },
      { name: 'Semester 2', duration: 'July' },
      { name: 'Rolling pathway intakes', duration: 'Varies by provider' },
    ],
    topCourses: [
      'Information technology',
      'Business',
      'Hospitality and tourism',
      'Engineering',
      'Health sciences',
      'Environmental science',
    ],
    jobProspects: [
      'Technology',
      'Healthcare',
      'Construction',
      'Agriculture and food technology',
      'Tourism',
      'Professional services',
    ],
    livingCosts: [
      { item: 'Accommodation', cost: 'NZD 700 - NZD 1,500 monthly' },
      { item: 'Food', cost: 'NZD 300 - NZD 600 monthly' },
      { item: 'Transport', cost: 'NZD 80 - NZD 180 monthly' },
      { item: 'Phone and internet', cost: 'NZD 60 - NZD 120 monthly' },
    ],
    faqs: [
      {
        question: 'Is New Zealand safe for international students?',
        answer:
          'New Zealand is widely regarded as a safe, welcoming destination with strong student support systems.',
      },
      {
        question: 'Can I choose pathway programs in New Zealand?',
        answer:
          'Yes. Many institutions offer diploma, foundation, and pathway routes into degree programs.',
      },
      {
        question: 'Can I work on a student visa in New Zealand?',
        answer:
          'Most student visas allow you to work up to 20 hours per week during term and full-time during holidays.',
      },
      {
        question: 'What is the post-study work visa in New Zealand?',
        answer:
          'Eligible graduates of degree-level courses or higher can get a post-study work visa for up to 3 years.',
      },
    ],
  },
]

export function getStudyDestination(slug: string) {
  return studyDestinations.find(destination => destination.slug === slug)
}
