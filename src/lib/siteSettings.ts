export type SiteLink = {
  label: string
  href: string
  enabled?: boolean
  dropdownItems?: SiteLink[]
}

export type SiteSettings = {
  key: 'global'
  seo: {
    siteName: string
    defaultMetaTitle: string
    defaultMetaDescription: string
    defaultMetaKeywords: string
    defaultOgImage: string
    baseUrl: string
    defaultRobots: string
    googleAnalyticsId: string
    googleTagManagerId: string
  }
  header: {
    logo: string
    logoAlt: string
    navItems: SiteLink[]
    courseFinderLabel: string
    courseFinderHref: string
    callLabel: string
    callPhone: string
    callHref: string
  }
  footer: {
    logo: string
    logoAlt: string
    ctaTitle: string
    ctaDescription: string
    ctaButtonText: string
    ctaButtonHref: string
    description: string
    quickLinks: SiteLink[]
    studyLinks: SiteLink[]
    branchLinks: SiteLink[]
    phone: string
    email: string
    address: string
    socialLinks: SiteLink[]
    copyright: string
    legalLinks: SiteLink[]
  }
}

export const defaultSiteSettings: SiteSettings = {
  key: 'global',
  seo: {
    siteName: 'Next Level Education Consultancy',
    defaultMetaTitle: 'Next Level Education Consultancy | Study Abroad Expert',
    defaultMetaDescription:
      'Leading overseas education consultancy providing free student visa consultation, university admission guidance, and comprehensive support to study in the UK, Canada, Australia, and New Zealand.',
    defaultMetaKeywords: 'education consultancy, study abroad, student visa, Next Level Education',
    defaultOgImage: '/logo.png',
    baseUrl: 'https://nextleveleducation.com',
    defaultRobots: 'index, follow',
    googleAnalyticsId: '',
    googleTagManagerId: '',
  },
  header: {
    logo: '/logo.png',
    logoAlt: 'Next Level Education',
    navItems: [
      { label: 'Home', href: '/', enabled: true },
      { label: 'Services', href: '/services', enabled: true },
      { label: 'About Us', href: '/about-us', enabled: true },
      {
        label: 'Study Abroad',
        href: '/#',
        enabled: true,
        dropdownItems: [
          { label: 'United Kingdom', href: '/study-abroad/study-in-uk', enabled: true },
          { label: 'Canada', href: '/study-abroad/study-in-canada', enabled: true },
          { label: 'Australia', href: '/study-abroad/study-in-australia', enabled: true },
          { label: 'New Zealand', href: '/study-abroad/study-in-new-zealand', enabled: true },
        ],
      },
      { label: 'Testimonial', href: '/testimonial', enabled: true },
      { label: 'Blog', href: '/blog', enabled: true },
      { label: 'Contact Us', href: '/contact-us', enabled: true },
    ],
    courseFinderLabel: 'Course Finder',
    courseFinderHref: '/courses',
    callLabel: 'Call Anytime',
    callPhone: '+94775198195',
    callHref: 'tel:+94775198195',
  },
  footer: {
    logo: '/logo.png',
    logoAlt: 'Next Level Education',
    ctaTitle: 'Ready to Start Your Journey?',
    ctaDescription: 'Book a free consultation with our experts today.',
    ctaButtonText: 'Book a Free Consultation',
    ctaButtonHref: '/contact-us',
    description: 'Your trusted partner for global education. We help you achieve your dreams and build a better future.',
    quickLinks: [
      { label: 'Home', href: '/', enabled: true },
      { label: 'About Us', href: '/about-us', enabled: true },
      { label: 'Blog', href: '/blog', enabled: true },
      { label: 'Contact Us', href: '/contact-us', enabled: true },
    ],
    studyLinks: [
      { label: 'United Kingdom', href: '/study-abroad/uk', enabled: true },
      { label: 'Canada', href: '/study-abroad/canada', enabled: true },
      { label: 'Australia', href: '/study-abroad/australia', enabled: true },
      { label: 'New Zealand', href: '/study-abroad/new-zealand', enabled: true },
    ],
    branchLinks: [
      { label: 'Jaffna', href: '/branches/jaffna', enabled: true },
      { label: 'Batticaloa', href: '/branches/batticaloa', enabled: true },
      { label: 'Colombo', href: '/branches/colombo', enabled: true },
      { label: 'Vavuniya', href: '/branches/vavuniya', enabled: true },
    ],
    phone: '+94775198195',
    email: 'info@nextlevel.edu.lk',
    address: 'Palali Road, Kondavil, Jaffna, Sri Lanka',
    socialLinks: [
      { label: 'Facebook', href: '#', enabled: true },
      { label: 'Instagram', href: '#', enabled: true },
      { label: 'LinkedIn', href: '#', enabled: true },
      { label: 'YouTube', href: '#', enabled: true },
    ],
    copyright: '© 2026 Next Level Education. All Rights Reserved.',
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy-policy', enabled: true },
      { label: 'Terms & Conditions', href: '/terms', enabled: true },
    ],
  },
}

export function mergeSiteSettings(settings?: Partial<SiteSettings> | null): SiteSettings {
  return {
    key: 'global',
    seo: {
      ...defaultSiteSettings.seo,
      ...(settings?.seo || {}),
    },
    header: {
      ...defaultSiteSettings.header,
      ...(settings?.header || {}),
    },
    footer: {
      ...defaultSiteSettings.footer,
      ...(settings?.footer || {}),
    },
  }
}
