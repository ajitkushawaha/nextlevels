export type ServiceDetail = {
  slug: string
  number: string
  title: string
  shortDesc: string
  description: string
  image: string
  stats: string
  benefits: string[]
  process: string[]
  outcomes: string[]
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'student-counselling',
    number: '01',
    title: 'Student Counselling',
    shortDesc: 'Get one-on-one guidance to choose the right country, course, university, and intake based on your profile.',
    description:
      'Student counselling gives every student a clear starting point. We review goals, academics, budget, family expectations, and preferred destinations, then explain realistic study abroad pathways.',
    image: '/home2/happy-team.png',
    stats: 'Free Guidance',
    benefits: [
      'Profile evaluation and destination guidance',
      'Course and pathway clarity before applying',
      'Budget-aware planning for students and parents',
      'Clear document and timeline roadmap',
    ],
    process: [
      'Understand your goals and current profile',
      'Explain matching country and course options',
      'Map key requirements and costs',
      'Create a first-step application plan',
    ],
    outcomes: [
      'Clear study direction',
      'Better destination confidence',
      'Practical next steps',
    ],
  },
  {
    slug: 'documents-check',
    number: '02',
    title: 'Documents Check',
    shortDesc: 'Avoid delays with a careful review of academic, financial, identity, and application documents.',
    description:
      'We check documents before submission to help students catch missing, inconsistent, or unclear information across academic, identity, sponsor, and application records.',
    image: '/home2/visaappp.png',
    stats: 'Compliance Review',
    benefits: [
      'Academic document checklist review',
      'Financial and sponsor document checks',
      'Application form consistency review',
      'Gap and correction guidance before submission',
    ],
    process: [
      'Collect current document set',
      'Compare against admission or visa checklist',
      'Identify gaps and mismatches',
      'Guide corrections before submission',
    ],
    outcomes: [
      'Cleaner documents',
      'Fewer submission delays',
      'More confidence before applying',
    ],
  },
  {
    slug: 'course-selection',
    number: '03',
    title: 'Course Selection',
    shortDesc: 'Compare study fields, entry requirements, career outcomes, and university options before you decide.',
    description:
      'We help you choose courses that make sense academically, financially, and professionally, comparing entry requirements, career direction, location, and progression routes.',
    image: '/home2/univercity.png',
    stats: 'Smart Matching',
    benefits: [
      'Course matching by academic background',
      'Career outcome and pathway comparison',
      'Entry requirement and English test guidance',
      'University shortlist preparation',
    ],
    process: [
      'Review academic background and interests',
      'Compare course levels and entry requirements',
      'Check career relevance and destination fit',
      'Prepare a shortlist for applications',
    ],
    outcomes: [
      'Relevant course shortlist',
      'Clear entry requirement view',
      'Better long-term fit',
    ],
  },
  {
    slug: 'university-admissions',
    number: '04',
    title: 'University Admissions',
    shortDesc: 'Prepare and submit strong applications through our partner university channels.',
    description:
      'Our admissions team prepares university applications, reviews supporting materials, communicates with institutions, and keeps each offer process moving from submission to decision.',
    image: '/home2/univercity.png',
    stats: '150+ Partners',
    benefits: [
      'Application preparation and submission',
      'Partner university communication',
      'Offer follow-up and status tracking',
      'Document readiness before lodging',
    ],
    process: [
      'Confirm university and course choices',
      'Prepare application forms and documents',
      'Submit through the right channel',
      'Track progress until offer stage',
    ],
    outcomes: [
      'Application-ready file',
      'Clear offer timeline',
      'Better admissions follow-up',
    ],
  },
  {
    slug: 'visa-assistance',
    number: '05',
    title: 'Visa Assistance',
    shortDesc: 'Prepare a cleaner student visa file with compliance-focused document and application guidance.',
    description:
      'Our visa support focuses on document accuracy, sponsor fund presentation, application consistency, and country-specific compliance to reduce avoidable submission mistakes.',
    image: '/home2/visaappp.png',
    stats: '98% Success',
    benefits: [
      'Destination-specific visa checklist guidance',
      'Sponsor fund and financial document review',
      'Application form consistency checks',
      'Final file audit before submission',
    ],
    process: [
      'Confirm destination-specific visa checklist',
      'Review academic, financial, and identity documents',
      'Prepare submission timeline and supporting notes',
      'Audit final application before lodging',
    ],
    outcomes: [
      'Cleaner visa file',
      'Improved financial document readiness',
      'Lower risk of incomplete submission',
    ],
  },
  {
    slug: 'scholarship-assistance',
    number: '06',
    title: 'Scholarship Assistance',
    shortDesc: 'Identify merit-based grants and university-specific funding opportunities to reduce tuition pressure.',
    description:
      'We help students identify realistic scholarship routes, prepare stronger statements, and understand how academic performance, course choice, and intake affect funding opportunities.',
    image: '/home2/scollership.png',
    stats: 'Funding Options',
    benefits: [
      'Scholarship eligibility review',
      'University award shortlisting',
      'Scholarship statement editing',
      'Deadline and requirement guidance',
    ],
    process: [
      'Assess scholarship eligibility',
      'Shortlist university and destination awards',
      'Prepare essays and supporting statements',
      'Track scholarship deadlines with applications',
    ],
    outcomes: [
      'Scholarship shortlist',
      'Better funding positioning',
      'Reduced avoidable missed deadlines',
    ],
  },
  {
    slug: 'financial-aid-support',
    number: '07',
    title: 'Financial Aid Support',
    shortDesc: 'Plan tuition, living costs, sponsor documents, payment schedules, and eligible funding options.',
    description:
      'We help families understand realistic study costs, prepare sponsor documents, identify scholarship or discount options, and plan tuition payment timelines.',
    image: '/home2/scollership.png',
    stats: 'Budget Planning',
    benefits: [
      'Tuition and living cost planning',
      'Sponsor document guidance',
      'Scholarship and discount mapping',
      'Payment timeline planning',
    ],
    process: [
      'Estimate tuition and living cost ranges',
      'Review sponsor and funding position',
      'Identify funding and discount options',
      'Plan payment and document timing',
    ],
    outcomes: [
      'Better budget visibility',
      'Funding document clarity',
      'Reduced last-minute finance stress',
    ],
  },
  {
    slug: 'interview-preparation',
    number: '08',
    title: 'Interview Preparation',
    shortDesc: 'Prepare for university admissions and visa credibility interviews with realistic coaching.',
    description:
      'Interview preparation helps students practise credible, confident answers for admissions or visa interviews, with coaching on clarity, intent, body language, and pacing.',
    image: '/home2/mock-interview.png',
    stats: '1-on-1 Coaching',
    benefits: [
      'Realistic mock interview practice',
      'Credibility question preparation',
      'Feedback on tone, body language, and pacing',
      'Confidence-building answer structure',
    ],
    process: [
      'Review interview purpose and likely topics',
      'Run realistic mock interview sessions',
      'Give feedback on answers and delivery',
      'Repeat practice for weak areas',
    ],
    outcomes: [
      'More confident answers',
      'Improved interview structure',
      'Reduced interview anxiety',
    ],
  },
  {
    slug: 'accommodation-assistance',
    number: '09',
    title: 'Accommodation Assistance',
    shortDesc: 'Find safe housing options near campus and plan your arrival with more confidence.',
    description:
      'We guide students through practical accommodation choices, including university housing, verified private options, location checks, commute planning, and arrival preparation.',
    image: '/home2/pre-deparcher.png',
    stats: 'Arrival Ready',
    benefits: [
      'Campus and private housing guidance',
      'Location and commute comparison',
      'Arrival checklist support',
      'Basic settling-in guidance',
    ],
    process: [
      'Understand campus and city preferences',
      'Compare housing options and commute',
      'Prepare booking and arrival checklist',
      'Guide first-week practical setup',
    ],
    outcomes: [
      'Safer accommodation planning',
      'Smoother arrival',
      'Less settlement confusion',
    ],
  },
  {
    slug: 'pre-departure-orientation',
    number: '10',
    title: 'Pre-Departure Orientation',
    shortDesc: 'Prepare for travel, student life, banking, insurance, work rules, and first-week settlement.',
    description:
      'Pre-departure orientation prepares students for practical life abroad, including travel preparation, student work rules, insurance, packing, banking, and early settlement support.',
    image: '/home2/pre-deparcher.png',
    stats: 'Travel Ready',
    benefits: [
      'Travel and packing preparation',
      'Student work rights overview',
      'Insurance, banking, and SIM guidance',
      'First-week settlement checklist',
    ],
    process: [
      'Run pre-departure briefing',
      'Prepare arrival and accommodation checklist',
      'Guide insurance, banking, and travel essentials',
      'Support early settlement questions',
    ],
    outcomes: [
      'Clear arrival plan',
      'Reduced first-week stress',
      'Better practical readiness',
    ],
  },
  {
    slug: 'psw-visa-guidance',
    number: '11',
    title: 'PSW Visa Guidance',
    shortDesc: 'Understand post-study work options, eligibility basics, and how your course choice affects future pathways.',
    description:
      'Post-study work routes differ by country, course level, and policy changes. We explain the broad requirements and help you consider future pathways while choosing your course.',
    image: '/home2/happy-ma.png',
    stats: 'Future Pathways',
    benefits: [
      'Post-study pathway overview',
      'Course and level relevance guidance',
      'Work rights awareness',
      'Document readiness planning',
    ],
    process: [
      'Explain destination-specific post-study pathways',
      'Review course level relevance',
      'Discuss work-rights expectations',
      'Plan documents to monitor over time',
    ],
    outcomes: [
      'Clearer future pathway view',
      'Better course decision context',
      'Awareness of policy-sensitive factors',
    ],
  },
  {
    slug: 'ambassador-program',
    number: '12',
    title: 'Ambassador Program',
    shortDesc: 'Connect with student ambassadors and hear real study abroad experiences before making decisions.',
    description:
      'The ambassador program helps students learn from real journeys, ask practical questions, understand campus life, and build confidence before committing to a destination.',
    image: '/home2/happy-gi.png',
    stats: 'Student Stories',
    benefits: [
      'Student experience conversations',
      'Campus life and city insights',
      'Peer guidance before departure',
      'Confidence-building real stories',
    ],
    process: [
      'Match relevant student stories',
      'Share campus and city insights',
      'Answer practical student-life questions',
      'Build confidence before departure',
    ],
    outcomes: [
      'Real student perspective',
      'More confidence before applying',
      'Practical campus-life insight',
    ],
  },
]

export function getServiceDetail(slug: string) {
  return serviceDetails.find(service => service.slug === slug)
}

export function slugFromServiceTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
