import type { CmsPageContent } from '@/lib/cms/types'

export const defaultPrivacyPolicyContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'privacy-policy-content',
      type: 'legalContent',
      enabled: true,
      eyebrow: 'Privacy Policy',
      title: 'Privacy Policy',
      updatedLabel: 'Last updated: June 23, 2026',
      intro:
        'This Privacy Policy explains how Next Level Education collects, uses, and protects personal information shared by students, parents, and website visitors.',
      sections: [
        {
          title: 'Information We Collect',
          content:
            'We may collect your name, email address, phone number, academic background, preferred study destination, course interests, intake preferences, and any message or document information you choose to share with us.',
        },
        {
          title: 'How We Use Your Information',
          content:
            'We use your information to respond to enquiries, provide counselling, assess study options, assist with university applications, support visa guidance, and improve our services.',
        },
        {
          title: 'Sharing Information',
          content:
            'When required for your enquiry or application, we may share relevant details with partner universities, colleges, admissions teams, or service providers involved in the study abroad process. We do not sell personal information.',
        },
        {
          title: 'Data Security',
          content:
            'We take reasonable steps to protect your information from unauthorized access, misuse, loss, or disclosure. However, no online transmission or storage system is completely risk-free.',
        },
        {
          title: 'Your Choices',
          content:
            'You may request updates, corrections, or deletion of your personal information by contacting our team. Some records may be retained where required for legal, operational, or application-related purposes.',
        },
        {
          title: 'Contact Us',
          content:
            'For privacy-related questions, contact Next Level Education at info@nextlevel.edu.lk or call +94775198195.',
        },
      ],
    },
  ],
}

export const defaultTermsContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'terms-content',
      type: 'legalContent',
      enabled: true,
      eyebrow: 'Terms & Conditions',
      title: 'Terms & Conditions',
      updatedLabel: 'Last updated: June 23, 2026',
      intro:
        'These Terms & Conditions explain the basic rules for using the Next Level Education website and services.',
      sections: [
        {
          title: 'Use of Our Website',
          content:
            'By using this website, you agree to use it lawfully and responsibly. You must not attempt to misuse, disrupt, copy, or damage the website, its content, or its systems.',
        },
        {
          title: 'Educational Guidance',
          content:
            'Information provided by Next Level Education is for general guidance. University entry requirements, fees, scholarships, visa rules, and application timelines may change and must be confirmed before submission.',
        },
        {
          title: 'Student Responsibility',
          content:
            'Students are responsible for providing accurate, complete, and genuine information and documents. Any false or misleading information may affect admissions, visa outcomes, or service eligibility.',
        },
        {
          title: 'Free Counselling and Application Support',
          content:
            'Our counselling and application guidance may be offered free of charge to students where supported by partner institutions. Third-party costs, government fees, test fees, tuition deposits, courier costs, or other external charges remain the student responsibility.',
        },
        {
          title: 'No Guaranteed Outcome',
          content:
            'We work to provide professional support, but admission decisions, scholarship decisions, and visa outcomes are made by external institutions or authorities. We cannot guarantee approval.',
        },
        {
          title: 'Contact Us',
          content:
            'For questions about these Terms & Conditions, contact Next Level Education at info@nextlevel.edu.lk or call +94775198195.',
        },
      ],
    },
  ],
}
