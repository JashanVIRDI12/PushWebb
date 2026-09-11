import { CASE_STUDIES } from '@/lib/case-studies';
import { SERVICE_CHANNELS, serviceHref, type ServiceChannel } from '@/lib/services';
import { CONTACT_EMAIL, DUBAI_ADDRESS, FOUNDER, PHONES, SITE_URL, SOCIAL } from '@/lib/site';

/* ────────────────────────────────────────────────────────────────
   JSON-LD builders. Only facts the site already states go in here.

   Deliberately NOT included until they are confirmed:
     • LinkedIn       — the profile URL is still a placeholder
     • telephone      — numbers are hidden for now (see PHONES)
   Add them to `organizationJsonLd` once they exist.
──────────────────────────────────────────────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`;

const SERVICE_CATEGORIES = [
  'YouTube management',
  'Short-form content',
  'Video production',
  'Post production',
  'Social media management',
  'Performance creative',
  'AI content production',
  'Podcast production',
  'Content clipping',
];

/** schema.org wants E.164-ish numbers: "+91 9560543261" → "+91-9560543261". */
const toSchemaPhone = (label: string) => label.replace(/\s+/, '-');

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'PUSHWebb',
    url: SITE_URL,
    logo: `${SITE_URL}/pushwebb-assets/logos/brand-mark-favicon.png`,
    image: `${SITE_URL}/og.png`,
    slogan: 'Content. Creative. Performance. AI.',
    founder: {
      '@type': 'Person',
      name: FOUNDER.name,
      jobTitle: FOUNDER.role,
    },
    description:
      'PUSHWebb is a content, creative, performance and AI agency serving brands, creators and organisations from India and Dubai. PUSHWebb provides YouTube management, short form content, video production, post production, social media management, performance creative and AI content production.',
    email: CONTACT_EMAIL,
    // Email is the published contact; phone points appear only while
    // PHONES in lib/site has entries.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT_EMAIL,
        availableLanguage: ['English'],
      },
      ...PHONES.map((phone) => ({
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: toSchemaPhone(phone.label),
      })),
    ],
    // Operating base first; the India operation is listed alongside it.
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${DUBAI_ADDRESS.line1}, ${DUBAI_ADDRESS.line2}`,
      addressLocality: DUBAI_ADDRESS.city,
      addressCountry: DUBAI_ADDRESS.countryCode,
    },
    location: [
      {
        '@type': 'Place',
        name: 'PUSHWebb Dubai',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${DUBAI_ADDRESS.line1}, ${DUBAI_ADDRESS.line2}`,
          addressLocality: DUBAI_ADDRESS.city,
          addressCountry: DUBAI_ADDRESS.countryCode,
        },
      },
      {
        '@type': 'Place',
        name: 'PUSHWebb India',
        address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      },
    ],
    areaServed: 'Worldwide',
    knowsAbout: SERVICE_CATEGORIES,
    sameAs: Object.values(SOCIAL).filter((url): url is string => Boolean(url)),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PUSHWebb services',
      itemListElement: SERVICE_CHANNELS.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.hook,
          url: `${SITE_URL}${serviceHref(service.id)}`,
        },
      })),
    },
  };
}

/** A service page: the Service itself, provided by the organization, and
 *  the breadcrumb trail back to the hub. */
export function serviceJsonLd(service: ServiceChannel) {
  const url = `${SITE_URL}${serviceHref(service.id)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.description.join(' '),
        url,
        image: `${SITE_URL}${service.image}`,
        provider: { '@type': 'Organization', '@id': ORG_ID, name: 'PUSHWebb', url: SITE_URL },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.name} — what we cover`,
          itemListElement: service.cover.map((item) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: url },
        ],
      },
    ],
  };
}

export function caseStudiesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PUSHWebb case studies',
    itemListElement: CASE_STUDIES.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: `${study.client} — ${study.managed}`,
        url: `${SITE_URL}/work#${study.slug}`,
        abstract: study.challenge,
        about: study.managed,
        creator: { '@type': 'Organization', '@id': ORG_ID, name: 'PUSHWebb' },
        ...(study.quote
          ? {
              review: {
                '@type': 'Review',
                reviewBody: study.quote.text,
                author: { '@type': 'Person', name: study.quote.name },
              },
            }
          : {}),
      },
    })),
  };
}
