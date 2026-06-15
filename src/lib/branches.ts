export type BranchArea = {
  name: string
  title: string
  description: string
}

export type BranchStory = {
  name: string
  country: string
  university: string
  image: string
  quote: string
}

export type BranchTeamMember = {
  name: string
  designation: string
  image: string
}

export type BranchGalleryItem = {
  title: string
  image: string
}

export type BranchFaq = {
  question: string
  answer: string
}

export type Branch = {
  slug: string
  city: string
  province: string
  seoTitle: string
  metaDescription: string
  heroImage: string
  intro: string[]
  destinations: string[]
  areas: BranchArea[]
  stories: BranchStory[]
  team: BranchTeamMember[]
  gallery: BranchGalleryItem[]
  address: string
  phone: string
  email: string
  workingHours: string
  mapQuery: string
  faqs: BranchFaq[]
}

export const branches: Branch[] = [
  {
    slug: 'jaffna',
    city: 'Jaffna',
    province: 'Northern Province',
    seoTitle: 'Study Abroad Consultant in Jaffna | UK, Australia & Canada Admissions | Next Level Education',
    metaDescription:
      'Next Level Education Jaffna helps students from Jaffna, Kilinochchi, Mullaitivu, Vavuniya, and Mannar with university admissions, student visas, scholarships, and pre-departure support.',
    heroImage: '/about-team-counselling.png',
    intro: [
      'Welcome to Next Level Education Jaffna, one of the leading overseas education consultancies serving students across the Northern Province of Sri Lanka. Located in the heart of Jaffna, our branch provides professional guidance and support to students from Jaffna, Kilinochchi, Mullaitivu, Vavuniya, and Mannar who wish to pursue higher education opportunities abroad.',
      'We specialize in university admissions, student visa assistance, scholarship guidance, career counselling, accommodation support, and pre-departure services for students planning to study in the United Kingdom, Australia, Canada, Ireland, New Zealand, and other leading study destinations.',
      'Over the years, we have helped hundreds of students from across the Northern Province gain admission to globally recognized universities and colleges. Whether you are completing your A/Ls, pursuing higher studies, or looking to advance your career through international education, our team is here to guide you every step of the way.',
    ],
    destinations: ['United Kingdom', 'Australia', 'Canada', 'Ireland', 'New Zealand'],
    areas: [
      {
        name: 'Jaffna',
        title: 'Study Abroad Opportunities for Students in Jaffna',
        description:
          'As the educational hub of the Northern Province, Jaffna is home to thousands of ambitious students seeking international education opportunities. Our Jaffna branch provides personalized counselling, university selection guidance, application support, and visa assistance.',
      },
      {
        name: 'Kilinochchi',
        title: 'Study Abroad Guidance for Students in Kilinochchi',
        description:
          'Students from Kilinochchi can access expert advice on studying in the UK, Australia, Canada, Ireland, and New Zealand through our Jaffna branch. We assist with course selection, university applications, scholarships, and student visa processes.',
      },
      {
        name: 'Mullaitivu',
        title: 'Overseas Education Support for Students in Mullaitivu',
        description:
          'Next Level Education supports students from Mullaitivu who are looking to pursue higher education overseas. Our team provides guidance from initial counselling to visa approval, helping students confidently begin their international academic journey.',
      },
      {
        name: 'Vavuniya',
        title: 'International Education Services for Students in Vavuniya',
        description:
          'Students from Vavuniya benefit from our university partner network and professional counselling services. We help students identify suitable courses, prepare strong applications, and work toward successful student visa outcomes.',
      },
      {
        name: 'Mannar',
        title: 'Study Abroad Consultancy for Students in Mannar',
        description:
          'For students in Mannar seeking quality international education opportunities, Next Level Education offers support from selecting the right university to securing a student visa.',
      },
    ],
    stories: [
      {
        name: 'Ananya S.',
        country: 'Canada',
        university: 'University of Toronto',
        image: '/home2/happy-gi.png',
        quote:
          'The Jaffna team helped me understand each step clearly, from course selection to my visa file. Their support made the process much easier for my family.',
      },
      {
        name: 'Rahul M.',
        country: 'United Kingdom',
        university: 'University of Manchester',
        image: '/home2/sham.png',
        quote:
          'I received practical guidance for my application and documents. The counsellors followed up until I received my offer.',
      },
      {
        name: 'Priya K.',
        country: 'Australia',
        university: 'Monash University',
        image: '/home2/priya.png',
        quote:
          'From Jaffna, I could complete the full process with confidence. The team explained costs, scholarships, and visa requirements clearly.',
      },
    ],
    team: [
      { name: 'John', designation: 'Branch Manager', image: '/service/team1.png' },
      { name: 'John', designation: 'Education Counsellor', image: '/service/team2.png' },
      { name: 'John', designation: 'Visa & Document Advisor', image: '/service/team3.png' },
      { name: 'John', designation: 'Marketing Officer', image: '/service/team4.png' },
    ],
    gallery: [
      { title: 'Office counselling session', image: '/about-team-counselling.png' },
      { title: 'Student guidance discussion', image: '/home2/happy-team.png' },
      { title: 'Visa approval celebration', image: '/home2/happy-gi.png' },
      { title: 'University delegate visit', image: '/services-credentials.png' },
    ],
    address: 'Palali Road, Kondavil, Jaffna, Sri Lanka',
    phone: '+94 77 519 8195',
    email: 'info@nextlevel.edu.lk',
    workingHours: 'Monday to Saturday, 9:00 AM - 6:00 PM',
    mapQuery: 'Next Level Education Palali Road Kondavil Jaffna Sri Lanka',
    faqs: [
      {
        question: 'Which countries can I apply to from the Jaffna branch?',
        answer:
          'Students can apply for study opportunities in the UK, Australia, Canada, Ireland, New Zealand, and other leading destinations depending on their profile and goals.',
      },
      {
        question: 'Is counselling free?',
        answer:
          'Yes. Our counselling and student guidance services are free for students.',
      },
      {
        question: 'How long does a UK student visa take?',
        answer:
          'Processing timelines can vary depending on the season and visa file readiness. Our team helps you prepare documents early and explains the current expected timelines during counselling.',
      },
      {
        question: 'Can I apply without IELTS?',
        answer:
          'Some universities may offer IELTS waivers depending on academic background, English-medium study history, and destination requirements. Our counsellors will check suitable options for your profile.',
      },
      {
        question: 'What scholarships are available?',
        answer:
          'Scholarships vary by country, university, intake, academic performance, and course. We help students identify realistic funding and discount options before applying.',
      },
    ],
  },
  {
    slug: 'batticaloa',
    city: 'Batticaloa',
    province: 'Eastern Province',
    seoTitle: 'Study Abroad Consultant in Batticaloa | UK, Australia & Canada Admissions | Next Level Education',
    metaDescription:
      'Next Level Education Batticaloa supports students from Batticaloa, Kalmunai, Ampara, Trincomalee, and nearby Eastern Province areas with university admissions, student visas, scholarships, and pre-departure guidance.',
    heroImage: '/home2/happy-team.png',
    intro: [
      'Welcome to Next Level Education Batticaloa, a trusted overseas education consultancy supporting students across the Eastern Province of Sri Lanka. Our Batticaloa branch provides professional study abroad guidance for students planning international higher education.',
      'We help students with university admissions, course selection, student visa assistance, scholarship guidance, financial planning, accommodation support, and pre-departure preparation for leading destinations including the United Kingdom, Australia, Canada, Ireland, and New Zealand.',
      'Whether you are completing your A/Ls, planning undergraduate study, preparing for postgraduate education, or looking to build an international career pathway, our Batticaloa team is ready to guide you from first counselling to offer and visa preparation.',
    ],
    destinations: ['United Kingdom', 'Australia', 'Canada', 'Ireland', 'New Zealand'],
    areas: [
      {
        name: 'Batticaloa',
        title: 'Study Abroad Opportunities for Students in Batticaloa',
        description:
          'Students in Batticaloa can access personalized counselling, course selection support, university application guidance, and student visa preparation through our local branch team.',
      },
      {
        name: 'Kalmunai',
        title: 'Study Abroad Guidance for Students in Kalmunai',
        description:
          'For students from Kalmunai, our Batticaloa branch provides practical guidance on study destinations, admission requirements, scholarship options, and visa documentation.',
      },
      {
        name: 'Ampara',
        title: 'Overseas Education Support for Students in Ampara',
        description:
          'Students from Ampara can receive support with university shortlisting, application preparation, financial planning, and pre-departure readiness for overseas education.',
      },
      {
        name: 'Trincomalee',
        title: 'International Education Services for Students in Trincomalee',
        description:
          'Our team supports Trincomalee students with course matching, university admissions, scholarship guidance, and student visa file preparation for leading study destinations.',
      },
      {
        name: 'Eastern Province',
        title: 'Study Abroad Consultancy for Eastern Province Students',
        description:
          'Next Level Education Batticaloa helps students across the Eastern Province make informed study abroad decisions with transparent, student-focused guidance.',
      },
    ],
    stories: [
      {
        name: 'Ameera F.',
        country: 'United Kingdom',
        university: 'University of Birmingham',
        image: '/home2/ananya.png',
        quote:
          'The Batticaloa team helped me compare universities and prepare my documents step by step. I felt confident throughout the application process.',
      },
      {
        name: 'Kavin R.',
        country: 'Australia',
        university: 'Deakin University',
        image: '/home2/sham.png',
        quote:
          'I received clear advice about course options, costs, and visa requirements. The follow-up from the counsellors was very helpful.',
      },
      {
        name: 'Nithya S.',
        country: 'Canada',
        university: 'Seneca Polytechnic',
        image: '/home2/priya.png',
        quote:
          'Next Level Batticaloa made the study abroad process easier for my family. They explained every document and deadline clearly.',
      },
    ],
    team: [
      { name: 'John', designation: 'Branch Manager', image: '/service/team1.png' },
      { name: 'John', designation: 'Education Counsellor', image: '/service/team2.png' },
      { name: 'John', designation: 'Visa & Document Advisor', image: '/service/team3.png' },
      { name: 'John', designation: 'Marketing Officer', image: '/service/team4.png' },
    ],
    gallery: [
      { title: 'Batticaloa counselling session', image: '/home2/happy-team.png' },
      { title: 'Student application planning', image: '/about-team-counselling.png' },
      { title: 'Visa document support', image: '/home2/visaappp.png' },
      { title: 'University guidance meeting', image: '/services-credentials.png' },
    ],
    address: 'Batticaloa, Sri Lanka',
    phone: '+94 77 519 8195',
    email: 'info@nextlevel.edu.lk',
    workingHours: 'Monday to Saturday, 9:00 AM - 6:00 PM',
    mapQuery: 'Batticaloa Sri Lanka',
    faqs: [
      {
        question: 'Which countries can I apply to from the Batticaloa branch?',
        answer:
          'Students can apply for study opportunities in the UK, Australia, Canada, Ireland, New Zealand, and other destinations depending on their academic profile and goals.',
      },
      {
        question: 'Is counselling free at the Batticaloa branch?',
        answer:
          'Yes. Our student counselling and study abroad guidance services are free for students.',
      },
      {
        question: 'Can Batticaloa students apply without IELTS?',
        answer:
          'Some universities may consider IELTS waivers based on English-medium education, prior qualifications, and destination rules. Our counsellors will check suitable options for your profile.',
      },
      {
        question: 'Do you help with student visa documents?',
        answer:
          'Yes. We guide students with visa checklists, sponsor documents, financial evidence, forms, and file readiness before submission.',
      },
      {
        question: 'What scholarships are available for Eastern Province students?',
        answer:
          'Scholarship availability depends on country, university, intake, academic performance, and course choice. We help shortlist realistic scholarship and discount options.',
      },
    ],
  },
]

export function getBranch(slug: string) {
  return branches.find(branch => branch.slug === slug)
}
