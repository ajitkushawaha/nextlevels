// Shared datasets for Courses, Scholarships, and Universities

export interface Course {
  id: string
  title: string
  heroImage?: string
  university: string
  location: string
  country: string
  flag: string
  field: string
  level: string
  duration: string
  tuitionFee: string
  intakes: string[]
  visaSuccess: string
  description: string
  degreeType: string
  requirements?: string
  structure?: string[]
}

export interface Scholarship {
  id: string
  title: string
  heroImage?: string
  award: string
  country: string
  eligibility: string
  deadline: string
  type: string
  overview?: string
  howToApply?: string
}

export interface University {
  name: string
  logo: string
  coverImage: string
  worldRank: string
  students: string
  established: string
  description: string
  country: string
  location: string
  flag: string
  website: string
  accreditation?: string
}

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'MSc Data Science & Artificial Intelligence',
    university: 'Coventry University',
    location: 'Coventry',
    country: 'United Kingdom',
    flag: '🇬🇧',
    field: 'Information Technology',
    level: 'Postgraduate',
    duration: '1 Year',
    tuitionFee: '£16,500 - £18,900 / year',
    intakes: ['January', 'May', 'September'],
    visaSuccess: 'Very High',
    description: 'Specialised postgraduate program covering deep learning, machine learning, neural networks, and modern data visualization techniques.',
    degreeType: 'MSc',
    requirements: 'A minimum of a 2:2 honours degree in a computer science, engineering, or mathematical discipline. Non-standard profiles with relevant work experience are also considered.',
    structure: [
      'Machine Learning Systems',
      'Artificial Intelligence Principles',
      'Advanced Data Science Pipelines',
      'Neural Networks & Deep Learning',
      'Big Data Analytics',
      'Postgraduate Dissertation Project'
    ]
  },
  {
    id: '2',
    title: 'Bachelor of Computer Science',
    university: 'University of New South Wales',
    location: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Information Technology',
    level: 'Undergraduate',
    duration: '3 Years',
    tuitionFee: 'A$45,000 - A$49,000 / year',
    intakes: ['February', 'June', 'September'],
    visaSuccess: 'High',
    description: 'World-renowned undergraduate degree providing a solid foundation in software engineering, algorithms, database systems, and cyber security.',
    degreeType: 'BSc',
    requirements: 'Successful completion of high school qualification equivalent to Australian Year 12 with strong grades in mathematics.',
    structure: [
      'Data Structures and Algorithms',
      'Computer Systems Architecture',
      'Software Engineering Fundamentals',
      'Database Systems & Implementation',
      'Discrete Mathematics',
      'Introduction to Cyber Security'
    ]
  },
  {
    id: '3',
    title: 'Master of Business Administration (MBA)',
    university: 'University of Toronto',
    location: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    field: 'Business & Management',
    level: 'Postgraduate',
    duration: '2 Years',
    tuitionFee: 'C$58,000 - C$62,000 / year',
    intakes: ['September'],
    visaSuccess: 'High',
    description: 'Premier executive MBA focusing on global leadership, venture creation, strategic consulting, finance, and corporate management.',
    degreeType: 'MBA',
    requirements: 'Undergraduate degree with a minimum GPA of 3.0/4.0, competitive GMAT/GRE scores, and at least 2 years of full-time professional work experience.',
    structure: [
      'Global Leadership & Strategy',
      'Corporate Finance & Valuation',
      'Marketing Management & Analytics',
      'Organizational Behavior & Design',
      'Venture Creation & Entrepreneurship',
      'Strategic Consulting Field Study'
    ]
  },
  {
    id: '4',
    title: 'BSc Nursing (Honours)',
    university: 'Humber College',
    location: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    field: 'Health & Medicine',
    level: 'Undergraduate',
    duration: '4 Years',
    tuitionFee: 'C$21,000 - C$24,000 / year',
    intakes: ['January', 'September'],
    visaSuccess: 'Very High',
    description: 'Hands-on clinical training, critical care diagnostics, patient care ethics, and research-led healthcare practices.',
    degreeType: 'BSc',
    requirements: 'Ontario Secondary School Diploma (OSSD) or equivalent, with specific senior-level credits in English, Mathematics, Biology, and Chemistry.',
    structure: [
      'Anatomy & Physiology I & II',
      'Fundamentals of Nursing Care',
      'Pharmacology & Therapeutics',
      'Health Assessment & Clinical Skills',
      'Community & Mental Health Nursing',
      'Advanced Clinical Practicum'
    ]
  },
  {
    id: '5',
    title: 'Master of Professional Engineering',
    university: 'University of Western Australia',
    location: 'Perth',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Engineering',
    level: 'Postgraduate',
    duration: '2 Years',
    tuitionFee: 'A$41,000 - A$44,000 / year',
    intakes: ['February', 'July'],
    visaSuccess: 'High',
    description: 'Accredited professional engineering degree specializing in civil, mechanical, environmental, or electrical engineering.',
    degreeType: 'MSc',
    requirements: 'An engineering science undergraduate degree or equivalent with a weighted average mark (WAM) of at least 60%.',
    structure: [
      'Advanced Engineering Mathematics',
      'Engineering Design Project I & II',
      'Professional Practice & Ethics',
      'Specialist Stream Unit A (Civil/Mechanical/Electrical)',
      'Specialist Stream Unit B (Systems & Automation)',
      'Master Research Thesis'
    ]
  },
  {
    id: '6',
    title: 'Bachelor of Software Engineering (Hons)',
    university: 'Auckland University of Technology',
    location: 'Auckland',
    country: 'New Zealand',
    flag: '🇳🇿',
    field: 'Information Technology',
    level: 'Undergraduate',
    duration: '4 Years',
    tuitionFee: 'NZ$38,000 - NZ$42,000 / year',
    intakes: ['March', 'July'],
    visaSuccess: 'Very High',
    description: 'Core project-based engineering program with a major focus on full stack web apps, mobile systems, Agile methodology, and DevOps.',
    degreeType: 'BSc',
    requirements: 'University Entrance (UE) or equivalent high school credential, showing proficiency in English and mathematics.',
    structure: [
      'Programming Principles',
      'Software Architecture & Patterns',
      'Agile Software Development Processes',
      'Cloud Architecture & DevOps',
      'Human-Computer Interaction (HCI)',
      'Industry Capstone Research Project'
    ]
  },
  {
    id: '7',
    title: 'MSc International Business & Management',
    university: 'Manchester Metropolitan University',
    location: 'Manchester',
    country: 'United Kingdom',
    flag: '🇬🇧',
    field: 'Business & Management',
    level: 'Postgraduate',
    duration: '1 Year',
    tuitionFee: '£17,000 - £19,500 / year',
    intakes: ['January', 'September'],
    visaSuccess: 'Very High',
    description: 'Advanced master\'s program analyzing global trade markets, multinational operations, digital trade, and supply chain logistics.',
    degreeType: 'MSc',
    requirements: 'A minimum of a 2:2 UK honours degree or international equivalent, ideally in business, economics, or social sciences.',
    structure: [
      'Global Business Environment',
      'Strategic Corporate Performance',
      'Multinational Enterprise Logistics',
      'Digital Economy & Emerging Markets',
      'Intercultural Management Skills',
      'Applied Business Project'
    ]
  },
  {
    id: '8',
    title: 'Bachelor of Business Analytics',
    university: 'Deakin University',
    location: 'Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Business & Management',
    level: 'Undergraduate',
    duration: '3 Years',
    tuitionFee: 'A$35,000 - A$38,000 / year',
    intakes: ['March', 'July', 'November'],
    visaSuccess: 'High',
    description: 'Integrating business decisions with data analytics, predictive modeling, data visualization, and statistics.',
    degreeType: 'BSc',
    requirements: 'Completion of secondary school education equivalent to Year 12 in Australia with a minimum entry rank or grade average.',
    structure: [
      'Introduction to Business Analytics',
      'Predictive Data Modeling',
      'Business intelligence Databases',
      'Data Visualization & Dashboards',
      'Statistical Reasoning & Analysis',
      'Professional Capstone Placement'
    ]
  },
  {
    id: '9',
    title: 'Master of Public Health (MPH)',
    university: 'University of Auckland',
    location: 'Auckland',
    country: 'New Zealand',
    flag: '🇳🇿',
    field: 'Health & Medicine',
    level: 'Postgraduate',
    duration: '1.5 Years',
    tuitionFee: 'NZ$43,000 - NZ$46,000 / year',
    intakes: ['February', 'July'],
    visaSuccess: 'Very High',
    description: 'Postgraduate public health research program investigating epidemiology, biostatistics, health systems policy, and global health action.',
    degreeType: 'MPH',
    requirements: 'A relevant bachelor\'s degree in medicine, nursing, health sciences, or social sciences with a high grade point average.',
    structure: [
      'Foundations of Public Health',
      'Principles of Epidemiology',
      'Biostatistics for Health Research',
      'Health Systems, Policy & Management',
      'Environmental Health & Climate Change',
      'Supervised Research Dissertation'
    ]
  },
  {
    id: '11',
    title: 'Diploma in Hospitality & Tourism Management',
    university: 'Capilano University',
    location: 'Vancouver',
    country: 'Canada',
    flag: '🇨🇦',
    field: 'Hospitality & Tourism',
    level: 'Diploma',
    duration: '2 Years',
    tuitionFee: 'C$16,000 - C$18,000 / year',
    intakes: ['January', 'May', 'September'],
    visaSuccess: 'High',
    description: 'Fast-track industry-focused program providing co-op training options in hotels, resorts, and tourism organizations.',
    degreeType: 'Diploma',
    requirements: 'High school graduation with a minimum overall grade average, and proof of English language proficiency.',
    structure: [
      'Introduction to Hospitality Operations',
      'Food & Beverage Cost Control',
      'Tourism Marketing & Sales Strategy',
      'Front Office & Guest Relations',
      'Industry Co-operative Placement I',
      'Industry Co-operative Placement II'
    ]
  },
  {
    id: '13',
    title: 'Bachelor of Laws (LLB Honours)',
    university: 'University of Law',
    location: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    field: 'Law',
    level: 'Undergraduate',
    duration: '3 Years',
    tuitionFee: '£14,500 - £16,900 / year',
    intakes: ['September'],
    visaSuccess: 'High',
    description: 'Comprehensive qualifying law degree covering contract law, criminal law, constitutional law, and legal systems research.',
    degreeType: 'LLB',
    requirements: 'AAA at A-Level (or international equivalent qualifications) and proof of English language capabilities (e.g. IELTS 6.5).',
    structure: [
      'Contract Law & Obligations',
      'Criminal Law & Practice',
      'Constitutional & Administrative Law',
      'Law of Tort & Liability',
      'Land Law & Equity',
      'Legal Systems & Research Methods'
    ]
  },
  {
    id: '14',
    title: 'Master of Laws (LLM Global Law)',
    university: 'University of Sydney',
    location: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    field: 'Law',
    level: 'Postgraduate',
    duration: '1 Year',
    tuitionFee: 'A$42,000 - A$45,000 / year',
    intakes: ['February', 'July'],
    visaSuccess: 'Very High',
    description: 'Advanced postgraduate law program investigating international trade law, global human rights, environmental law, and legal theory.',
    degreeType: 'LLM',
    requirements: 'A Bachelor of Laws degree or equivalent from a recognized institution, showing academic excellence.',
    structure: [
      'International Trade Law & Treaties',
      'Global Human Rights Jurisdiction',
      'International Environmental Law',
      'Jurisprudence & Legal Philosophy',
      'Global Dispute Resolution Methods',
      'Postgraduate Law Research Thesis'
    ]
  }
]

export const scholarshipsData: Scholarship[] = [
  {
    id: 's1',
    title: "Commonwealth Master's Scholarships",
    award: 'Full Tuition Fee, Monthly Stipend & Travel Allowance',
    country: 'United Kingdom',
    eligibility: 'For students from developing Commonwealth nations pursuing full-time Master\'s degrees at participating UK institutions.',
    deadline: 'October 2026',
    type: 'Government Funded',
    overview: 'Commonwealth Master\'s Scholarships are intended for talented and motivated individuals to gain the knowledge and skills required for sustainable development, and are aimed at those who could not otherwise afford to study in the UK.',
    howToApply: 'Apply directly via the Commonwealth Scholarship Commission online portal. Candidates must be nominated by a registered national nominating agency in their home country.'
  },
  {
    id: 's2',
    title: 'Chevening Scholarships',
    award: '100% Tuition Fee & Living Allowance',
    country: 'United Kingdom',
    eligibility: "Outstanding leaders pursuing one-year Master's degrees at any UK university.",
    deadline: 'November 2026',
    type: 'Government Funded',
    overview: 'Chevening is the UK government’s international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth & Development Office (FCDO) and partner organisations, it offers fully-funded scholarships to study in the UK.',
    howToApply: 'Submit your application online through the Chevening application system for your country. Applications open around August each year.'
  },
  {
    id: 's3',
    title: 'Ontario Graduate Scholarship (OGS)',
    award: 'C$15,000 / year',
    country: 'Canada',
    eligibility: 'Merit-based graduate students at Ontario public institutions (Master\'s or Doctoral level).',
    deadline: 'Varies by institution',
    type: 'Province Funded',
    overview: 'The Ontario Graduate Scholarship (OGS) program encourages excellence in graduate studies at the master’s and doctoral levels. It is a merit-based scholarship that is jointly funded by the Province of Ontario and the university you attend.',
    howToApply: 'Apply through the specific university you plan to attend in Ontario, as each institution has its own application procedures and deadlines.'
  },
  {
    id: 's4',
    title: 'Destination Australia Scholarship',
    award: 'A$15,000 / year',
    country: 'Australia',
    eligibility: 'Undergraduate and postgraduate students studying in regional campuses of registered Australian tertiary education institutions.',
    deadline: 'Varies by university',
    type: 'State Funded',
    overview: 'The Destination Australia program defines regional Australia as anywhere outside major cities. This scholarship aims to attract high-performing international and domestic students to regional universities and campuses.',
    howToApply: 'Apply directly through your choice of participating Australian university. The application dates align with the university intake calendar.'
  }
]

export const universitiesData: Record<string, University> = {
  'Coventry University': {
    name: 'Coventry University',
    logo: 'CU',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
    worldRank: '#551-600',
    students: '38,000+',
    established: '1843',
    description: 'Coventry University is a forward-looking, modern university with a proud tradition as a provider of high-quality education and a focus on applied research. It is known for its strong industry links, state-of-the-art facilities, and practical learning curriculum.',
    country: 'United Kingdom',
    location: 'Coventry, England',
    flag: '🇬🇧',
    website: 'https://www.coventry.ac.uk',
    accreditation: 'TEF Gold Outstanding Rated'
  },
  'University of New South Wales': {
    name: 'University of New South Wales',
    logo: 'UNSW',
    coverImage: 'https://images.unsplash.com/photo-1728206313441-281ef4ea5d62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdmVyc2l0eSUyMG9mJTIwbmV3JTIwc291dGglMjB3YWxlc3xlbnwwfHwwfHx8MA%3D%3D',
    worldRank: '#19',
    students: '64,000+',
    established: '1949',
    description: 'UNSW Sydney is a world-class teaching and research powerhouse, ranked 19th in the world. It is highly regarded for its engineering, business, law, and computer science degrees, producing career-ready graduates sought after by global employers.',
    country: 'Australia',
    location: 'Sydney, New South Wales',
    flag: '🇦🇺',
    website: 'https://www.unsw.edu.au',
    accreditation: 'Group of Eight Member (Go8)'
  },
  'University of Toronto': {
    name: 'University of Toronto',
    logo: 'UofT',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200',
    worldRank: '#21',
    students: '97,000+',
    established: '1827',
    description: 'The University of Toronto is Canada\'s top university, renowned for its academic excellence, cutting-edge research opportunities, and vibrant campus life. Founded in 1827, it boasts historic architecture, world-renowned professors, and a large global alumni network.',
    country: 'Canada',
    location: 'Toronto, Ontario',
    flag: '🇨🇦',
    website: 'https://www.utoronto.ca',
    accreditation: 'U15 Group of Canadian Research Universities'
  },
  'Humber College': {
    name: 'Humber College',
    logo: 'HUMB',
    coverImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1200',
    worldRank: 'Top Applied College',
    students: '33,000+',
    established: '1967',
    description: 'Humber College is one of Canada\'s largest and most respected polytechnic institutions, offering career-focused credentials including degrees, diplomas, and post-graduate certificates. Humber combines theoretical learning with hands-on practical clinical and technical labs.',
    country: 'Canada',
    location: 'Toronto, Ontario',
    flag: '🇨🇦',
    website: 'https://humber.ca',
    accreditation: 'Member of Polytechnics Canada'
  },
  'University of Western Australia': {
    name: 'University of Western Australia',
    logo: 'UWA',
    coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?q=80&w=1200',
    worldRank: '#72',
    students: '25,000+',
    established: '1911',
    description: 'The University of Western Australia (UWA) is one of Australia\'s leading research-intensive universities and a member of the prestigious Group of Eight. With a beautiful campus on the Swan River in Perth, UWA offers top-tier academic teaching and state-of-the-art facilities.',
    country: 'Australia',
    location: 'Perth, Western Australia',
    flag: '🇦🇺',
    website: 'https://www.uwa.edu.au',
    accreditation: 'AACSB & EQUIS Accredited Business School'
  },
  'Auckland University of Technology': {
    name: 'Auckland University of Technology',
    logo: 'AUT',
    coverImage: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=1200',
    worldRank: '#401-500',
    students: '29,000+',
    established: '2000',
    description: 'AUT is New Zealand\'s fastest-growing and modern university. It focuses on contemporary learning experiences, global research cooperation, and preparing graduates to succeed in an increasingly tech-driven business environment.',
    country: 'New Zealand',
    location: 'Auckland, North Island',
    flag: '🇳🇿',
    website: 'https://www.aut.ac.nz',
    accreditation: '5-Star QS Rated University'
  },
  'Manchester Metropolitan University': {
    name: 'Manchester Metropolitan University',
    logo: 'MMU',
    coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200',
    worldRank: '#590',
    students: '40,000+',
    established: '1970',
    description: 'Manchester Metropolitan University (MMU) is one of the largest universities in the UK, located in the culturally vibrant city of Manchester. It is highly recognized for its modern business school, sports science, and creative industries programs.',
    country: 'United Kingdom',
    location: 'Manchester, England',
    flag: '🇬🇧',
    website: 'https://www.mmu.ac.uk',
    accreditation: 'AACSB Accredited Business School'
  },
  'Deakin University': {
    name: 'Deakin University',
    logo: 'DEAK',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200',
    worldRank: '#233',
    students: '60,000+',
    established: '1974',
    description: 'Deakin University is a top-rated Australian university known for its outstanding online education, high student satisfaction rates, and strong focus on practical work experience and industry partnerships.',
    country: 'Australia',
    location: 'Melbourne, Victoria',
    flag: '🇦🇺',
    website: 'https://www.deakin.edu.au',
    accreditation: '5-Star QS Rated for Employability'
  },
  'University of Auckland': {
    name: 'University of Auckland',
    logo: 'UoA',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
    worldRank: '#68',
    students: '44,000+',
    established: '1883',
    description: 'The University of Auckland is New Zealand\'s leading research-led university. It is the country\'s largest university, offering a highly academic environment alongside gorgeous locations right in Auckland.',
    country: 'New Zealand',
    location: 'Auckland, North Island',
    flag: '🇳🇿',
    website: 'https://www.auckland.ac.nz',
    accreditation: 'Association of Pacific Rim Universities (APRU)'
  },
  'Capilano University': {
    name: 'Capilano University',
    logo: 'CAPU',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
    worldRank: 'Top Regional University',
    students: '9,000+',
    established: '1968',
    description: 'Capilano University is a public teaching-focused university in North Vancouver, Canada. Nestled in a beautiful forested environment, it is famous for its hospitality, animation, and business courses.',
    country: 'Canada',
    location: 'Vancouver, British Columbia',
    flag: '🇨🇦',
    website: 'https://www.capilanou.ca',
    accreditation: 'Northwest Commission on Colleges and Universities'
  },
  'University of Law': {
    name: 'University of Law',
    logo: 'ULaw',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200',
    worldRank: 'Ranked #1 for Student Satisfaction (UK)',
    students: '12,000+',
    established: '1876',
    description: 'The University of Law is one of the UK\'s longest-established specialist providers of legal education. It is renowned for its highly practical training courses and strong ties to top international law firms.',
    country: 'United Kingdom',
    location: 'London, England',
    flag: '🇬🇧',
    website: 'https://www.law.ac.uk',
    accreditation: 'Approved by the Solicitors Regulation Authority'
  },
  'University of Sydney': {
    name: 'University of Sydney',
    logo: 'USyd',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
    worldRank: '#19',
    students: '73,000+',
    established: '1850',
    description: 'The University of Sydney is Australia\'s first university. Regarded as one of the world\'s leading universities, its campus is frequently ranked among the most beautiful in the world.',
    country: 'Australia',
    location: 'Sydney, New South Wales',
    flag: '🇦🇺',
    website: 'https://www.sydney.edu.au',
    accreditation: 'Group of Eight Member (Go8)'
  }
}
