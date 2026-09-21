/* ────────────────────────────────────────────────────────────────
   SITE FACTS — one source for the contact details and profile links
   the footer, the structured data and the service pages all quote.
   Change a value here and every surface picks it up.
──────────────────────────────────────────────────────────────── */

export const SITE_URL = 'https://pushwebb.com';

export const CONTACT_EMAIL = 'admin@pushwebb.com';

/* ── WhatsApp ────────────────────────────────────────────────────
   One number, quoted by the sticky button on every page, the contact
   column and the Organization structured data. `WHATSAPP_NUMBER` is the
   dial string (what a human reads); `WHATSAPP_DIGITS` is what wa.me needs. */
export const WHATSAPP_NUMBER = '+971 50 168 8505';
export const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, '');

/** A wa.me deep link, optionally carrying the first message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_DIGITS}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** What the sticky button opens the chat with, so an enquiry starts
    with context instead of an empty thread. */
export const WHATSAPP_GREETING =
  "Hi PUSHWebb — I'd like to talk about content and growth for my brand.";

/* ── EmailJS ─────────────────────────────────────────────────────
   The "Leave your number" card on /contact sends through EmailJS from
   the browser. All three IDs are public by design — EmailJS ships them
   in client code — so they live here rather than in env. What stops
   another site using them is the origin allowlist: set it to
   pushwebb.com under EmailJS → Account → Security.

   The env overrides exist so a preview deploy can point at a test
   template without a code change. */
export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_444vstu',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_0s3spit',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'zEDvdNo9B_zlkcpei',
};

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
