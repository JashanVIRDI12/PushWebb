/* ────────────────────────────────────────────────────────────────
   SITE FACTS — one source for the contact details and profile links
   the footer, the structured data and the service pages all quote.
   Change a value here and every surface picks it up.
──────────────────────────────────────────────────────────────── */

export const SITE_URL = 'https://pushwebb.com';

export const CONTACT_EMAIL = 'admin@pushwebb.com';

/** Published on the About page and in the Organization structured data. */
export const FOUNDER = { name: 'Mrigank Sharma', role: 'Founder & CEO' };

/** The Dubai office, as printed in the PUSHWebb capability deck. */
export const DUBAI_ADDRESS = {
  line1: 'Office 702, Al Jawhara Building',
  line2: 'Near ADCB Bank, Mankhool',
  city: 'Dubai',
  country: 'UAE',
  countryCode: 'AE',
};

/** One line, for the footer and any inline mention. */
export const DUBAI_ADDRESS_LINE = `${DUBAI_ADDRESS.line1}, ${DUBAI_ADDRESS.line2}, ${DUBAI_ADDRESS.city}, ${DUBAI_ADDRESS.country}`;

/** `null` until a real profile URL exists — never publish a placeholder. */
export const SOCIAL: Record<'instagram' | 'linkedin' | 'youtube', string | null> = {
  instagram: 'https://www.instagram.com/pushwebb/',
  linkedin: null,
  youtube: 'https://www.youtube.com/@mriganksharma6487',
};

/** The primary conversion action. Same words on every surface. */
export const CTA_LABEL = 'Book a Strategy Call';
export const CTA_HREF = '/contact';

/** The booking calendar on /contact, which replaced the enquiry form.
 *  Inlined at build time, so the override has to be NEXT_PUBLIC_. */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/admin-pushwebb/30min';

/** Why PUSHWebb — shared by the home page and the Dubai page. */
export const WHY_POINTS = [
  {
    title: 'Strategy + Execution Under One Roof',
    copy: 'The team deciding what to create works directly with the team responsible for making and distributing it.',
  },
  {
    title: 'Built for High Volume',
    copy: 'Structured workflows make it possible to increase output without losing consistency or visibility.',
  },
  {
    title: 'Human Quality Control',
    copy: 'Content moves through review, approval and quality checks before final delivery.',
  },
  {
    title: 'Performance Feeds Strategy',
    copy: 'Content and campaign performance continuously informs what we create next.',
  },
];

/** The founder-credibility figures the About page leads with. Same brand
 *  book source as OPERATING_PROOF, ordered the way the About brief asks. */
export const SCALE_PROOF = [
  { value: '7+', label: 'Years of experience' },
  { value: '5B+', label: 'Views generated' },
  { value: '1,500+', label: 'Videos per month' },
  { value: '16+', label: 'Specialists' },
];

/** Operating proof quoted across the site (brand book figures). */
export const OPERATING_PROOF = [
  { value: '1,500+', count: 1500, suffix: '+', label: 'Videos delivered every month' },
  { value: '16+', count: 16, suffix: '+', label: 'Content & growth specialists' },
  { value: '10+', count: 10, suffix: '+', label: 'YouTube channels managed' },
  { value: '7+', count: 7, suffix: '+', label: 'Years in content' },
];
