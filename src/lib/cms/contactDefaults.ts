import type { CmsPageContent } from '@/lib/cms/types'

export const defaultContactPageContent: CmsPageContent = {
  version: 1,
  sections: [
    {
      id: 'contact-hero',
      type: 'contactHero',
      enabled: true,
      eyebrow: 'Get In Touch',
      title: 'Contact Us',
      description: 'Email, call, or complete the form to learn how Next Level Education can guide your study abroad journey.',
      backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
    },
    {
      id: 'contact-cards',
      type: 'contactCards',
      enabled: true,
      cards: [
        {
          title: 'Student Support',
          description: 'Our support team is available to help with university applications and visa questions.',
          linkText: 'info@nextlevel.edu.lk',
          linkHref: 'mailto:info@nextlevel.edu.lk',
          isLink: true,
        },
        {
          title: 'Feedback & Suggestions',
          description: 'We value your input to continuously refine and improve our counseling services.',
          linkText: '+94 77 519 8195',
          linkHref: 'tel:+94775198195',
          isLink: true,
        },
        {
          title: 'Institutional Inquiries',
          description: 'For university partnerships or administrative queries, contact us directly.',
          linkText: 'Mon - Sat: 9AM - 5PM',
          linkHref: '#',
          isLink: false,
        },
      ],
    },
    {
      id: 'contact-form',
      type: 'contactForm',
      enabled: true,
      heading: 'Get FREE Counselling Today!',
      description:
        'Enter your details and our expert will reach out to you to discuss your plans. By the way, all our services are free!',
      qualificationLabel: 'Highest qualification',
      qualificationPlaceholder: 'Select your highest qualification',
      qualificationOptions: [
        'O/L',
        'A/L',
        'Diploma',
        'Higher Diploma',
        "Bachelor's Degree",
        "Master's Degree",
        'Other',
      ],
      termsLabel: 'I agree to the Terms of use and privacy policy',
      submitLabel: 'FREE Counselling',
      image: '/hero5.png',
      imageAlt: 'Expert counseling session representation',
    },
    {
      id: 'contact-map-office',
      type: 'contactMapOffice',
      enabled: true,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15737.61!2d80.025!3d9.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe54c!2sKondavil%2C+Jaffna%2C+Sri+Lanka!5e0!3m2!1sen!2slk!4v1700000000',
      eyebrow: 'Our Location',
      title: 'Connecting Near and Far',
      branches: [
        {
          name: 'Jaffna Head Office',
          addressLine1: 'Palali Road, Kondavil,',
          addressLine2: 'Jaffna, Sri Lanka',
        },
        {
          name: 'Batticaloa Branch',
          addressLine1: 'Main Street,',
          addressLine2: 'Batticaloa, Sri Lanka',
        },
        {
          name: 'Colombo Branch',
          addressLine1: 'Colombo,',
          addressLine2: 'Sri Lanka',
        },
        {
          name: 'Vavuniya Branch',
          addressLine1: 'Vavuniya,',
          addressLine2: 'Sri Lanka',
        },
      ],
    },
  ],
}
