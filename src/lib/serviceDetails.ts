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
    slug: 'university-selection-admissions',
    number: '01',
    title: 'University Selection & Admissions',
    shortDesc: 'Match with 150+ world-class partner institutions and secure admissions through our direct channels.',
    description:
      'Choosing the right university is the foundation of your international career. Our counselors review your academic background, budget, destination preference, and career goals to build a practical university shortlist and support your application from start to offer letter.',
    image: '/home2/univercity.png',
    stats: '150+ Partners',
    benefits: [
      'Personalized profile assessment and course matching',
      'Professional SOP editing and review services',
      'Fast-track application processing with partner universities',
      'Direct admissions follow-up and offer letter securement',
    ],
    process: [
      'Review academic history, budget, and career goals',
      'Build a shortlist of universities and programs',
      'Prepare application documents and statements',
      'Submit, track, and follow up until offer stage',
    ],
    outcomes: [
      'Clear university shortlist',
      'Application-ready document set',
      'Better admission fit and fewer delays',
    ],
  },
  {
    slug: 'visa-guidance-application-support',
    number: '02',
    title: 'Visa Guidance & Application Support',
    shortDesc: 'Navigate complex student visa requirements with professional compliance audits and a 98% success rate.',
    description:
      'Our visa support focuses on document accuracy, sponsor fund presentation, application consistency, and country-specific compliance. We help reduce avoidable mistakes before submission.',
    image: '/home2/visaappp.png',
    stats: '98% Success',
    benefits: [
      'Expert advice on sponsor funds and liquid assets presentation',
      'Custom checklists for UK, Canada, Australia, and Schengen visas',
      'Meticulous application auditing prior to final submission',
      'High approval rates driven by up-to-date compliance standards',
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
    number: '03',
    title: 'Scholarship Assistance',
    shortDesc: 'Identify merit-based grants and university-specific funding opportunities to significantly reduce your tuition burden.',
    description:
      'We help students identify realistic scholarship routes, prepare stronger statements, and understand how academic performance, course choice, and intake affect funding opportunities.',
    image: '/home2/scollership.png',
    stats: 'Up to 50% Off',
    benefits: [
      'Tailored searches for merit-based and need-based university scholarships',
      'Comprehensive editing for scholarship personal statements',
      'Advising on IELTS/TOEFL requirements and waiver pathways',
      'Maximizing tuition discounts and partial funding opportunities',
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
    slug: 'pre-departure-post-arrival-guidance',
    number: '04',
    title: 'Pre-Departure & Post-Arrival Guidance',
    shortDesc: 'Transition smoothly to your new life with support for accommodation booking, bank setups, and local orientation.',
    description:
      'We prepare students for practical life abroad, including accommodation planning, travel preparation, student work rules, insurance, packing, and early settlement support.',
    image: '/home2/pre-deparcher.png',
    stats: 'End-to-End Support',
    benefits: [
      'Detailed briefings on local regulations, student work rights, and lifestyle',
      'Assistance with verified student accommodation bookings',
      'Support in setting up international health coverage',
      'Connection to local student support groups upon arrival',
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
    slug: 'mock-interviews-confidence-coaching',
    number: '05',
    title: 'Mock Interviews & Confidence Coaching',
    shortDesc: 'Prepare for intense university admissions and visa officer credibility interviews with realistic simulations.',
    description:
      'Our mock interview service helps students practise credible, confident answers for admissions or visa interviews, with coaching on clarity, intent, body language, and pacing.',
    image: '/home2/mock-interview.png',
    stats: '1-on-1 Coaching',
    benefits: [
      'Realistic mock interviews matching embassy formats',
      'Coaching on answering credibility and financial questions',
      'Personalized review on body language, tone, and pacing',
      'Interactive sessions to eliminate interview anxiety',
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
    slug: 'student-counselling',
    number: '06',
    title: 'Student Counselling',
    shortDesc: 'Get one-on-one guidance to choose the right country, course, university, and intake based on your profile.',
    description:
      'Student counselling gives you a clear starting point. We evaluate your goals, academics, budget, and family expectations, then explain realistic study abroad pathways.',
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
      'Clear direction',
      'Better destination confidence',
      'Practical next steps',
    ],
  },
  {
    slug: 'documents-check',
    number: '07',
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
    number: '08',
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
    slug: 'financial-aid-support',
    number: '09',
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
    slug: 'accommodation-assistance',
    number: '10',
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
