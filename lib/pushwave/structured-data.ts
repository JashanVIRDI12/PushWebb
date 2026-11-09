import { SITE_URL } from '@/lib/site';
import { BRAND, FAQ, HERO, PACKAGES, PRODUCTION } from './content';

/* JSON-LD for /pushwave. Every name, price and answer is quoted from the
   approved copy in ./content; nothing is added here. */

const PAGE_URL = `${SITE_URL}/pushwave`;
const ORG_ID = `${SITE_URL}/#organization`;

/** "₹12,90,000" → 1290000 */
function rupees(price: string) {
  return Number(price.replace(/[^\d]/g, ''));
}

export function pushwaveFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function pushwaveServiceJsonLd() {
  const packages = PACKAGES.flatMap((track) =>
    track.packages.map((pkg) => ({
      '@type': 'Offer',
      name: `${BRAND.name} ${pkg.name}`,
      description: `${pkg.scale}. ${pkg.cpm}.`,
      price: rupees(pkg.price),
      priceCurrency: 'INR',
      url: `${PAGE_URL}#packages`,
    })),
  );
  const production = PRODUCTION.packs.map((pack) => ({
    '@type': 'Offer',
    name: `${BRAND.name} ${pack.name}`,
    description: `${pack.title}. ${pack.perClip}.`,
    price: rupees(pack.price),
    priceCurrency: 'INR',
    url: `${PAGE_URL}#production`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: BRAND.byline,
    serviceType: BRAND.descriptor,
    description: HERO.body[1],
    slogan: BRAND.tagline.join(' '),
    url: PAGE_URL,
    provider: { '@id': ORG_ID, '@type': 'Organization', name: BRAND.parent, url: SITE_URL },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${BRAND.name} campaigns and production`,
      itemListElement: [...packages, ...production],
    },
  };
}
