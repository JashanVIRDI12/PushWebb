/* ────────────────────────────────────────────────────────────────
   PUSHWAVE by PUSHWebb — approved site copy.

   This file is the single source for every word, price and claim on
   /pushwave. The copy is quoted verbatim from the approved brief; the
   only change is that bracketed button labels ([BUILD MY CAMPAIGN])
   are set in title case. Do not edit prices, figures or disclaimers
   here without sign-off.
──────────────────────────────────────────────────────────────── */

import type { BuilderPrefill } from './estimate';

export type Cta = { label: string; href: string; prefill?: BuilderPrefill };

export const BRAND = {
  name: 'PUSHWAVE',
  parent: 'PUSHWebb',
  byline: 'PUSHWAVE by PUSHWebb',
  descriptor: 'Performance-Based Clipping & Content Distribution',
  tagline: ['Create Once.', 'Distribute Smarter.', 'Measure What Matters.'],
};

export const NAV_LINKS = [
  { label: 'Engine', href: '#engine' },
  { label: 'Offers', href: '#offers' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Builder', href: '#builder' },
  { label: 'FAQ', href: '#faq' },
];

export const NAV_CTA: Cta = { label: 'Build My Campaign', href: '#builder' };

/* ── 01 Hero ─────────────────────────────────────────────────── */
export const HERO = {
  headline: 'Great Content Shouldn’t Go Unnoticed.',
  subhead: ['One piece of content.', 'Hundreds of clips.', 'Millions of opportunities to be seen.'],
  body: [
    'You’ve already invested in creating great content. Now let it travel further.',
    'PUSHWAVE transforms your existing podcasts, interviews, entertainment content and brand videos into scalable short-form distribution campaigns, with measurable performance and flexible view-based pricing.',
  ],
  tiers: ['10 Million', '50 Million', '100 Million+'],
  tiersSuffix: 'View Campaigns',
  startingAt: 'Starting at ₹12,90,000 for a 10M-view Reach campaign.',
  primary: { label: 'Build My Campaign', href: '#builder' } satisfies Cta,
  secondary: { label: 'Watch the 2-Minute Breakdown', href: '#vsl' } satisfies Cta,
  stats: [
    { value: '10M–100M+', label: 'Campaign View Targets' },
    { value: '36–48 Hours', label: 'First Standard Production Batch' },
    { value: '100–300+', label: 'Optional Professionally Edited Clips' },
    { value: '3 Platforms', label: 'Instagram, YouTube and eligible TikTok markets' },
    { value: 'Verified Views', label: 'Defined Performance-Based Billing' },
  ],
  disclaimer:
    'View targets, supported platforms and contractual performance commitments depend on campaign approval, publisher availability and agreed terms.',
  visualDescription:
    'An animated grid of vertical clips expanding into multiple publisher accounts, with a campaign performance dashboard showing illustrative clip and view metrics.',
};

/* ── 02 Founder VSL ──────────────────────────────────────────── */
export const VSL = {
  headline: 'What If Your Best Content Could Reach Millions More People?',
  subhead: 'Watch how the PUSHWAVE Clipping Engine works.',
  embedPlaceholder: '[EMBED FOUNDER VIDEO]',
  videoTitleLabel: 'Video title',
  videoTitle: 'How We Turn Existing Content Into Large-Scale Distribution Campaigns',
  durationLabel: 'Video duration',
  duration: 'Approximately 2 minutes',
  scriptTitle: 'VSL Script',
  script: [
    'Think about the amount of work that goes into creating one great piece of content. You research, shoot, edit and publish it.',
    'But here’s the problem. Most brands give that content just one real opportunity to perform. They upload it on their social media accounts and hope the algorithm pushes it.',
    'But what if your content didn’t have to depend on a single upload?',
    'That’s where PUSHWAVE comes in. We take your existing podcasts, interviews, videos and brand content, turn them into short-form creative variations, and manage their distribution through participating creator accounts.',
    'Instead of producing content from scratch every time, we help you unlock more value from the footage you’ve already created.',
    'Here’s how it works. First, you share your existing content. We identify the campaign objectives, the audience you want to reach and the creative directions we want to explore.',
    'Our production team can deliver the first approved batch of standard edits within 36 to 48 hours.',
    'Then we activate the distribution campaign. Participating creators publish approved short-form content, while we coordinate submissions, verify eligible views and track the performance of the campaign.',
    'And here’s what makes the model interesting. Instead of only paying for a fixed number of video edits, you can build a distribution campaign around a defined view target.',
    'Whether you’re exploring 10 million views, 50 million views or 100 million and beyond, we structure the campaign around your content, audience and budget.',
    'We offer two models. PUSHWAVE Reach for broad-audience distribution. And PUSHWAVE Authority for expert-led content that requires more selective publishing and stronger editorial control.',
    'You can also add 100, 200 or 300 professionally edited clips for your own content channels.',
    'You get a managed production and distribution workflow, transparent campaign reporting and clear commercial terms.',
    'If you’re creating valuable content but want to do more with it, click below. Share your content and your goals, and we’ll build a customised PUSHWAVE campaign plan.',
  ],
  cta: { label: 'Get My Custom Clipping Strategy', href: '#builder' } satisfies Cta,
  note: 'No obligation. Every proposal is built after reviewing the content and campaign requirements.',
};

/* ── 03 Problem ──────────────────────────────────────────────── */
export const PROBLEM = {
  label: 'The Problem',
  headline: 'One Upload Is Not a Distribution Strategy.',
  setup: [
    'You can spend days recording a podcast. Weeks planning a campaign. Thousands of dollars producing the perfect video.',
    'But after publishing, your content is often left to compete for attention from a single account.',
  ],
  ones: ['One upload.', 'One audience.', 'One opportunity for discovery.'],
  aftermath: 'And when that moment passes, most brands move on to creating the next piece of content.',
  turnHeadline: 'But Your Existing Content Could Contain Hundreds of Opportunities.',
  turn: [
    'One podcast can contain powerful opinions, memorable stories, useful advice and entertaining moments.',
    'One interview can inspire multiple short-form narratives.',
    'One launch video can create several different audience conversations.',
  ],
  resolution: [
    'The opportunity isn’t always to create more content. It’s to distribute the content you already have more intelligently.',
    'PUSHWAVE is built to do exactly that.',
  ],
  cta: { label: 'Explore the Clipping Engine', href: '#engine' } satisfies Cta,
};

/* ── 04 Engine ───────────────────────────────────────────────── */
export const ENGINE = {
  label: 'How the PUSHWAVE Engine Works',
  headline: 'From Existing Footage to Scalable Short-Form Distribution.',
  steps: [
    {
      number: '01',
      title: 'Share Your Content',
      copy: 'Send us your approved podcasts, interviews, livestreams, trailers, educational videos or existing footage. We review the content, establish usage rights and understand your campaign goals.',
    },
    {
      number: '02',
      title: 'Build Your Strategy',
      copy: 'We define the audience, content angles, creative guidelines, publishing rules and campaign targets. You select a campaign type, view target and optional production requirements.',
    },
    {
      number: '03',
      title: 'Create the First Clips',
      copy: 'For campaigns with professional master-clip production, our editing team prepares the first agreed batch of up to 25 standard-format clips within 36–48 hours after creative and source approval. For publisher-generated campaigns, participating creators develop clips according to the approved campaign brief.',
    },
    {
      number: '04',
      title: 'Activate Distribution',
      copy: 'We coordinate approved publishing partners and content submissions. Participating accounts publish eligible content according to the campaign’s platform and brand-safety requirements.',
    },
    {
      number: '05',
      title: 'Verify the Views',
      copy: 'We measure eligible views on approved posts according to the agreed platform metrics, verification methodology and measurement window.',
    },
    {
      number: '06',
      title: 'Optimise and Scale',
      copy: 'We review which creative angles are performing, refine campaign guidance and coordinate further distribution.',
    },
  ],
  closing: 'Production, distribution and reporting work together in one managed system.',
  cta: { label: 'Build My Clipping Campaign', href: '#builder' } satisfies Cta,
};

/* ── 05 Numbers ──────────────────────────────────────────────── */
export const NUMBERS = {
  label: 'The Numbers That Matter',
  headline: 'Built Around Scale. Measured by Performance.',
  stats: [
    { value: '10M–100M+', label: 'Available Campaign View Targets' },
    { value: '100–300+', label: 'Optional Professional Master Clips' },
    { value: '36–48 Hours', label: 'First Approved Standard Production Batch' },
    { value: '3 Major Platforms', label: 'Instagram Reels, YouTube Shorts and TikTok Where Supported' },
    { value: 'Custom CPM Pricing', label: 'Rates Based on Campaign Size and Content Category' },
    { value: 'Verified Delivery', label: 'Approved Post Links, Qualifying Views and Campaign Spending' },
  ],
  platforms: ['Instagram Reels', 'YouTube Shorts', 'TikTok Where Supported'],
  whyTitle: 'Why These Numbers Matter',
  why: [
    'High-volume clipping expands the number of ways audiences can discover your content.',
    'But more posts do not automatically mean more views. That’s why PUSHWAVE measures both the production activity and the eligible-view delivery of every managed campaign.',
  ],
  cta: { label: 'See Our Campaign Options', href: '#offers' } satisfies Cta,
};

/* ── 06 Two strategic offers ─────────────────────────────────── */
export type Offer = {
  id: 'reach' | 'authority';
  tag: string;
  name: string;
  headline: string;
  audience: string;
  description: string;
  perfectForTitle: string;
  perfectFor: string;
  includedTitle: string;
  included: string[];
  optionsTitle: string;
  options: { label: string; price: string }[];
  cpmNote: string;
  upgradesTitle: string;
  upgrades: string;
  cta: Cta;
};

export const OFFERS = {
  label: 'Two Strategic Offers',
  headline: 'Choose What Your Content Needs Most.',
  offers: [
    {
      id: 'reach',
      tag: 'Offer 01',
      name: 'PUSHWAVE Reach',
      headline: 'Make Your Content Harder to Miss.',
      audience: 'For content with broad audience appeal.',
      description:
        'PUSHWAVE Reach is designed for brands, entertainment properties and creators who want to distribute existing content across multiple approved publishing accounts.',
      perfectForTitle: 'Perfect For',
      perfectFor:
        'Music releases, film launches, entertainment content, gaming, sports, events, consumer brands and mainstream creator campaigns.',
      includedTitle: 'What’s Included',
      included: [
        'Campaign onboarding and strategy',
        'Creative and publishing guidelines',
        'Approved source-material management',
        'Publisher recruitment and coordination',
        'Creator-produced short-form clips',
        'Submission moderation',
        'Multi-account distribution management',
        'Eligible-view verification',
        'Weekly campaign performance reporting',
        'Campaign budget monitoring',
        'Creative performance recommendations',
        'Dedicated campaign contact',
      ],
      optionsTitle: 'Campaign Options',
      options: [
        { label: '10 Million Views', price: '₹12,90,000' },
        { label: '50 Million Views', price: '₹59,50,000' },
        { label: '100 Million Views', price: '₹1,09,00,000' },
      ],
      cpmNote: 'Starting from ₹109 per 1,000 verified views at 100M scale.',
      upgradesTitle: 'Available Upgrades',
      upgrades:
        'Professional master clips, additional languages, stricter audience geography requirements, premium publisher selection and custom reporting.',
      cta: { label: 'Choose PUSHWAVE Reach', href: '#builder', prefill: { model: 'reach' } },
    },
    {
      id: 'authority',
      tag: 'Offer 02',
      name: 'PUSHWAVE Authority',
      headline: 'Be Seen for What You Know.',
      audience: 'For content that builds expertise, trust and recognition.',
      description:
        'PUSHWAVE Authority is designed for brands and creators whose content requires a more selective distribution strategy. Instead of focusing solely on mass-market exposure, Authority prioritises relevant subjects, appropriate publishers and stronger editorial control.',
      perfectForTitle: 'Perfect For',
      perfectFor:
        'Founders, business leaders, podcast hosts, educators, consultants, finance creators, technology brands and B2B companies.',
      includedTitle: 'Everything in Reach, Plus',
      included: [
        'Category-specific campaign strategy',
        'Topic and audience suitability planning',
        'Niche publisher sourcing',
        'Enhanced editorial review',
        'Brand and factual-sensitivity checks',
        'Dedicated creative strategy',
        'Advanced content-angle recommendations',
        'Weekly content-performance insights',
        'Senior account oversight',
        'More selective content approval criteria',
      ],
      optionsTitle: 'Campaign Options',
      options: [
        { label: '10 Million Views', price: '₹21,90,000' },
        { label: '50 Million Views', price: '₹99,50,000' },
        { label: '100 Million Views', price: '₹1,79,00,000' },
      ],
      cpmNote: 'Starting from ₹179 per 1,000 verified views at 100M scale.',
      upgradesTitle: 'Available Upgrades',
      upgrades:
        'Professionally edited master clips, language localisation, audience geography requirements, premium publisher selection, content strategy and advanced analytics.',
      cta: { label: 'Choose PUSHWAVE Authority', href: '#builder', prefill: { model: 'authority' } },
    },
  ] satisfies Offer[],
};

/* ── 07–08 Package breakdowns ────────────────────────────────── */
export type Package = {
  tag: string;
  name: string;
  scale: string;
  price: string;
  cpm: string;
  includedLead?: string;
  included: string[];
  planning: { label: string; value: string }[];
  recommendedFor: string;
  cta: Cta;
};

export type PackageTrack = {
  id: 'reach' | 'authority';
  tab: string;
  label: string;
  headline: string;
  packages: Package[];
  disclaimer: string;
};

export const PACKAGES: PackageTrack[] = [
  {
    id: 'reach',
    tab: 'PUSHWAVE Reach',
    label: 'Reach Package Breakdown',
    headline: 'Choose Your Distribution Scale.',
    packages: [
      {
        tag: 'Package 01',
        name: 'Reach Starter',
        scale: '10 Million View Campaign',
        price: '₹12,90,000',
        cpm: '₹129 per 1,000 eligible views',
        included: [
          'Campaign onboarding',
          'One primary campaign theme',
          'Approved content-source management',
          'Publisher recruitment',
          'Publisher-created clipping submissions',
          'Approved post tracking',
          'Eligible-view verification',
          'Weekly performance summary',
          'Campaign budget management',
          'Final campaign reconciliation',
        ],
        planning: [
          { label: 'Publishing placements', value: 'Approximately 300–1,200' },
          { label: 'Illustrative deployment', value: '8–12 weeks' },
          { label: 'First standard production batch', value: '36–48 hours, when purchased' },
          { label: 'Professionally edited master clips', value: 'Optional' },
        ],
        recommendedFor: 'Entertainment creators, media launches and initial large-scale distribution campaigns.',
        cta: { label: 'Get Reach Starter', href: '#builder', prefill: { model: 'reach', views: '10M' } },
      },
      {
        tag: 'Package 02',
        name: 'Reach Growth',
        scale: '50 Million View Campaign',
        price: '₹59,50,000',
        cpm: '₹119 per 1,000 eligible views',
        includedLead: 'Everything in Reach Starter, plus:',
        included: [
          'Multiple approved content themes',
          'Expanded publisher recruitment',
          'Larger distribution coordination',
          'Content-angle optimisation',
          'Dedicated campaign manager',
          'Weekly performance reviews',
          'Platform-level reporting',
        ],
        planning: [
          { label: 'Publishing placements', value: 'Approximately 1,500–6,000' },
          { label: 'Illustrative deployment', value: '12–20 weeks' },
          { label: 'First standard production batch', value: '36–48 hours, when purchased' },
          { label: 'Professionally edited master clips', value: 'Optional' },
        ],
        recommendedFor: 'Established entertainment brands, larger creator campaigns and national awareness initiatives.',
        cta: { label: 'Get Reach Growth', href: '#builder', prefill: { model: 'reach', views: '50M' } },
      },
      {
        tag: 'Package 03',
        name: 'Reach Enterprise',
        scale: '100 Million+ View Campaign',
        price: '₹1,09,00,000',
        cpm: '₹109 per 1,000 eligible views',
        includedLead: 'Everything in Reach Growth, plus:',
        included: [
          'Enterprise campaign planning',
          'Multiple creative and content themes',
          'Expanded publisher-network coordination',
          'Custom approval workflows',
          'Advanced campaign reporting',
          'Senior campaign oversight',
          'Multiple source-content coordination',
          'Custom campaign milestones',
        ],
        planning: [
          { label: 'Publishing placements', value: 'Approximately 3,000–12,000' },
          { label: 'Illustrative deployment', value: '16–26 weeks' },
          { label: 'First standard production batch', value: '36–48 hours, when purchased' },
          { label: 'Professionally edited master clips', value: 'Optional' },
        ],
        recommendedFor: 'Major releases, entertainment properties and large consumer campaigns.',
        cta: { label: 'Discuss Reach Enterprise', href: '#builder', prefill: { model: 'reach', views: '100M+' } },
      },
    ],
    disclaimer:
      'Publishing placements and deployment timelines are planning assumptions, not minimum delivery guarantees. Final commitments depend on approved inventory, campaign economics and scope.',
  },
  {
    id: 'authority',
    tab: 'PUSHWAVE Authority',
    label: 'Authority Package Breakdown',
    headline: 'Build Attention Around Your Expertise.',
    packages: [
      {
        tag: 'Package 01',
        name: 'Authority Starter',
        scale: '10 Million View Campaign',
        price: '₹21,90,000',
        cpm: '₹219 per 1,000 eligible views',
        included: [
          'Audience and subject-matter strategy',
          'Content suitability review',
          'Category-relevant publisher sourcing',
          'Creator-produced clipping submissions',
          'Defined approval guidelines',
          'Enhanced editorial moderation',
          'Eligible-view verification',
          'Weekly performance summaries',
          'Topic-level creative recommendations',
          'Dedicated campaign manager',
        ],
        planning: [
          { label: 'Publishing placements', value: 'Custom, subject to niche availability' },
          { label: 'Illustrative deployment', value: '8–12 weeks' },
          { label: 'Professional master clips', value: 'Optional' },
        ],
        recommendedFor: 'Founders, podcast hosts, business experts and education brands.',
        cta: { label: 'Get Authority Starter', href: '#builder', prefill: { model: 'authority', views: '10M' } },
      },
      {
        tag: 'Package 02',
        name: 'Authority Growth',
        scale: '50 Million View Campaign',
        price: '₹99,50,000',
        cpm: '₹199 per 1,000 eligible views',
        includedLead: 'Everything in Authority Starter, plus:',
        included: [
          'Multi-topic campaign strategy',
          'Expanded niche publisher sourcing',
          'Advanced editorial guidelines',
          'Creative angle testing',
          'Dedicated content-performance reviews',
          'Senior account oversight',
          'Enhanced platform and topic reporting',
        ],
        planning: [
          { label: 'Publishing placements', value: 'Custom, subject to niche availability' },
          { label: 'Illustrative deployment', value: '12–20 weeks' },
          { label: 'Professional master clips', value: 'Optional' },
        ],
        recommendedFor: 'Established thought leaders, podcast networks and category-focused businesses.',
        cta: { label: 'Get Authority Growth', href: '#builder', prefill: { model: 'authority', views: '50M' } },
      },
      {
        tag: 'Package 03',
        name: 'Authority Enterprise',
        scale: '100 Million+ View Campaign',
        price: '₹1,79,00,000',
        cpm: '₹179 per 1,000 eligible views',
        includedLead: 'Everything in Authority Growth, plus:',
        included: [
          'Enterprise content strategy',
          'Multi-series or multi-IP campaign planning',
          'Advanced publisher suitability requirements',
          'Executive-level reporting',
          'Custom content approval governance',
          'Senior strategy oversight',
          'Custom campaign milestones',
          'Dedicated delivery coordination',
        ],
        planning: [
          { label: 'Publishing placements', value: 'Custom, subject to niche availability' },
          { label: 'Illustrative deployment', value: '16–26 weeks' },
          { label: 'Professional master clips', value: 'Optional' },
        ],
        recommendedFor: 'Major expert-led brands, media networks and large content-led businesses.',
        cta: {
          label: 'Build My Authority Enterprise Campaign',
          href: '#builder',
          prefill: { model: 'authority', views: '100M+' },
        },
      },
    ],
    disclaimer:
      'Eligible views do not establish that every viewer belongs to a defined professional demographic. Audience-quality requirements must be separately scoped and measured.',
  },
];

/* ── 09 Professional clipping production ─────────────────────── */
export const PRODUCTION = {
  label: 'Professional Clipping Production',
  headline: 'Want 100, 200 or 300 Professionally Edited Clips Too?',
  intro: [
    'Your distribution campaign helps increase content exposure. Your professional clipping package gives you a separate collection of polished short-form videos for your own social media accounts.',
    'Add professional master-clip production to any PUSHWAVE campaign.',
  ],
  packs: [
    {
      count: 100,
      name: 'Production 100',
      title: '100 Edited Clips',
      price: '₹1,40,000',
      perClip: '₹1,400 per clip',
      includedLead: undefined as string | undefined,
      included: [
        '100 unique edited short-form videos',
        'Up to 60 seconds each',
        'Client-provided source footage',
        'Vertical 9:16 formatting',
        'Standard subtitle template',
        'Branded fonts and colours',
        'Clean transitions and reframing',
        'Basic audio balancing',
        'Quality-control review',
        'One consolidated revision round per batch',
        'Organised delivery folders',
        'Up to 8 hours of source footage',
      ],
      batch: 'First batch of up to 25 clips: 36–48 hours after approval.',
      cta: { label: 'Add 100 Clips', href: '#builder', prefill: { clips: '100' } } satisfies Cta,
    },
    {
      count: 200,
      name: 'Production 200',
      title: '200 Edited Clips',
      price: '₹2,50,000',
      perClip: '₹1,250 per clip',
      includedLead: 'Everything in Production 100, plus:',
      included: [
        '200 unique clips',
        'Up to 16 hours of source footage',
        'Multiple approved edit templates',
        'Dedicated production coordination',
        'Scheduled batch deliveries',
        'Organised version tracking',
        'Production progress summaries',
      ],
      batch: 'First batch of up to 25 clips: 36–48 hours after approval.',
      cta: { label: 'Add 200 Clips', href: '#builder', prefill: { clips: '200' } } satisfies Cta,
    },
    {
      count: 300,
      name: 'Production 300',
      title: '300 Edited Clips',
      price: '₹3,60,000',
      perClip: '₹1,200 per clip',
      includedLead: 'Everything in Production 200, plus:',
      included: [
        '300 unique clips',
        'Up to 24 hours of source footage',
        'High-volume batch scheduling',
        'Dedicated delivery coordination',
        'Custom production calendar',
        'Priority capacity planning',
        'Enterprise production workflow',
      ],
      batch: 'First batch of up to 25 clips: 36–48 hours after approval.',
      cta: { label: 'Add 300 Clips', href: '#builder', prefill: { clips: '300' } } satisfies Cta,
    },
  ],
  termsTitle: 'Production Terms',
  termsLead: 'Standard production assumes:',
  terms: [
    'Clips up to 60 seconds.',
    'Client-supplied footage and required usage rights.',
    'Pre-approved visual and subtitle templates.',
    'Suitable source footage quality.',
    'A clear creative brief before production begins.',
    'Scheduled delivery batches.',
    'One consolidated revision round per batch.',
    'Standard delivery, excluding original filming.',
  ],
  termsNote: 'Advanced editing and other non-standard requirements are priced separately.',
};

/* ── 10 Creative add-ons ─────────────────────────────────────── */
export const CREATIVE_ADDONS = {
  label: 'Creative Add-Ons',
  headline: 'Customise Your Creative Production.',
  items: [
    { name: 'Manual Highlight Discovery', price: 'From ₹250 per clip', copy: 'Our team reviews approved long-form footage and identifies suitable moments for short-form editing.' },
    { name: 'Advanced Motion Graphics', price: 'From ₹500 per clip', copy: 'Enhanced animated typography, graphics and visual treatments.' },
    { name: 'Additional Hook Variation', price: 'From ₹300 per variation', copy: 'A different opening angle or hook built from the same approved clip.' },
    { name: 'Additional Aspect Ratio', price: 'From ₹150 per clip', copy: 'Adapt one approved video into an additional delivery format.' },
    { name: 'Language Localisation', price: 'From ₹400 per clip', copy: 'Basic caption and on-screen text localisation for an additional supported language.' },
    { name: 'Extended Video Duration', price: 'From ₹300 per additional 30 seconds', copy: 'For professionally edited clips longer than the standard 60-second length.' },
    { name: 'Premium Subtitles', price: 'From ₹200 per clip', copy: 'Enhanced animated captions and branded text emphasis.' },
    { name: 'Rush Editing', price: 'Custom quote', copy: 'Prioritised production subject to team capacity and agreed source-material readiness.' },
  ],
  cta: { label: 'Customise My Clipping Production', href: '#builder' } satisfies Cta,
  disclaimer: 'Add-on rates are starting prices and may vary with editing complexity and volume.',
};

/* ── 11 Distribution add-ons ─────────────────────────────────── */
export const DISTRIBUTION_ADDONS = {
  label: 'Distribution Add-Ons',
  headline: 'Take Greater Control of Your Campaign.',
  items: [
    { name: 'Geographic Audience Preferences', price: 'Custom pricing', copy: 'Prioritise eligible publishing partners whose audience geography is aligned with your campaign, subject to available audience data.' },
    { name: 'Language-Specific Distribution', price: 'Custom pricing', copy: 'Create separate publishing guidelines and sourcing requirements for selected language markets.' },
    { name: 'Premium Publisher Criteria', price: 'Custom pricing', copy: 'Apply additional publishing-account eligibility requirements and selection criteria.' },
    { name: 'Additional Content Series', price: 'From ₹15,000 per series', copy: 'Separate creative direction, content organisation and reporting for another approved campaign theme.' },
    { name: 'Dedicated Reporting Dashboard', price: 'From ₹25,000 per campaign', copy: 'A custom dashboard for agreed reporting metrics, stakeholders and campaign visibility.' },
    { name: 'Owned-Account Publishing', price: 'From ₹20,000 per month', copy: 'Publishing administration for selected client-owned social accounts.' },
    { name: 'Monthly Content Strategy', price: 'From ₹35,000 per month', copy: 'Content themes, creative recommendations, short-form distribution ideas and periodic performance reviews.' },
    { name: 'Additional Analytics Reporting', price: 'From ₹15,000 per month', copy: 'Additional performance analysis, presentations and stakeholder reporting beyond standard campaign reports.' },
    { name: 'White-Label Fulfilment', price: 'Custom pricing', copy: 'Backend clipping production or distribution coordination for marketing agencies.' },
  ],
  cta: { label: 'Add Campaign Enhancements', href: '#builder' } satisfies Cta,
};

/* ── 12 Category pricing ─────────────────────────────────────── */
export const CATEGORY_PRICING = {
  label: 'Content-Specific Campaign Pricing',
  headline: 'Different Content. Different Distribution Economics.',
  intro:
    'Every content category has different creative requirements, publisher availability and audience expectations. That’s why PUSHWAVE pricing changes according to your content type.',
  categories: [
    {
      id: 'entertainment',
      name: 'Entertainment, Music & Film',
      lead: 'Starting from',
      rate: '₹109 CPM',
      tail: 'at 100M scale.',
      copy: 'Built for mass-market content with broad distribution potential.',
      prefill: { category: 'entertainment' } satisfies BuilderPrefill,
    },
    {
      id: 'gaming',
      name: 'Gaming, Sports & Lifestyle',
      lead: 'Starting from',
      rate: '₹119 CPM',
      tail: 'at 100M scale.',
      copy: 'Designed for interest-based entertainment communities and creator-led content.',
      prefill: { category: 'gaming' } satisfies BuilderPrefill,
    },
    {
      id: 'podcasts',
      name: 'Podcasts, Founders & Education',
      lead: 'Starting from',
      rate: '₹179 CPM',
      tail: 'at 100M scale.',
      copy: 'Designed for expert conversations, educational topics and thought-leadership content.',
      prefill: { category: 'podcasts' } satisfies BuilderPrefill,
    },
    {
      id: 'finance',
      name: 'Finance, AI & Specialised B2B',
      lead: '',
      rate: 'Custom premium pricing.',
      tail: '',
      copy: 'Additional editorial, audience-suitability or compliance requirements may increase the campaign rate above the standard Authority tier.',
      prefill: { category: 'finance' } satisfies BuilderPrefill,
    },
  ],
  dependsTitle: 'Pricing Depends On',
  depends:
    'Content category, view volume, languages, audience location, approval requirements, supported platforms, creator availability and campaign duration.',
  cta: { label: 'Request My Category-Specific Quote', href: '#builder' } satisfies Cta,
};

/* ── 13 Campaign builder ─────────────────────────────────────── */
export const BUILDER = {
  label: 'Custom Campaign Builder',
  headline: 'Your Content. Your View Target. Your Campaign.',
  intro:
    'Not every campaign needs the same number of clips, audience or distribution model. Build a campaign around your own requirements.',
  steps: {
    location: {
      number: '01',
      title: 'Where Are You Based?',
      options: [
        { value: 'india', label: 'India' },
        { value: 'uae', label: 'UAE' },
        { value: 'international', label: 'USA or International' },
      ],
    },
    category: {
      number: '02',
      title: 'What Are You Promoting?',
      options: [
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'music', label: 'Music' },
        { value: 'film', label: 'Film' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'sports', label: 'Sports' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'podcasts', label: 'Podcasts' },
        { value: 'founder', label: 'Founder Brand' },
        { value: 'education', label: 'Education' },
        { value: 'finance', label: 'Finance' },
        { value: 'ai', label: 'AI' },
        { value: 'technology', label: 'Technology' },
        { value: 'b2b', label: 'B2B' },
        { value: 'other', label: 'Other' },
      ],
    },
    model: {
      number: '03',
      title: 'Which Campaign Model Do You Need?',
      options: [
        { value: 'reach', label: 'PUSHWAVE Reach' },
        { value: 'authority', label: 'PUSHWAVE Authority' },
        { value: 'unsure', label: 'Not Sure' },
      ],
    },
    views: {
      number: '04',
      title: 'Your View Target',
      options: [
        { value: '10M', label: '10M' },
        { value: '50M', label: '50M' },
        { value: '100M+', label: '100M+' },
        { value: 'custom', label: 'Custom Number' },
      ],
    },
    clips: {
      number: '05',
      title: 'Professional Master Clips',
      options: [
        { value: 'none', label: 'None' },
        { value: '100', label: '100' },
        { value: '200', label: '200' },
        { value: '300', label: '300' },
        { value: '300+', label: '300+' },
      ],
    },
    platforms: {
      number: '06',
      title: 'Preferred Platforms',
      options: [
        { value: 'instagram', label: 'Instagram Reels' },
        { value: 'youtube', label: 'YouTube Shorts' },
        { value: 'tiktok', label: 'TikTok Where Supported' },
      ],
    },
    services: {
      number: '07',
      title: 'Additional Services',
      options: [
        { value: 'highlight', label: 'Highlight Discovery' },
        { value: 'motion', label: 'Advanced Motion Graphics' },
        { value: 'multilingual', label: 'Multilingual Content' },
        { value: 'geo', label: 'Geographic Preferences' },
        { value: 'premium', label: 'Premium Publishers' },
        { value: 'publishing', label: 'Publishing Management' },
        { value: 'reporting', label: 'Reporting' },
        { value: 'other', label: 'Other' },
      ],
    },
    content: {
      number: '08',
      title: 'Your Current Content',
      hint: 'Provide a podcast, YouTube channel, video folder, social account or sample content link.',
    },
  },
  estimateTitle: 'Your Estimated Campaign Investment',
  rows: {
    distribution: 'Campaign Distribution',
    production: 'Professional Clip Production',
    services: 'Additional Services',
    total: 'Estimated Total Investment',
  },
  disclaimer:
    'Estimates are indicative. Campaign eligibility, targets, performance terms and final pricing are confirmed after content review.',
  cta: 'Get My Custom Proposal',
};

/* ── 14 Verification ─────────────────────────────────────────── */
export const VERIFICATION = {
  label: 'View Verification and Performance Protection',
  headline: 'Your Campaign Should Be Measurable From Day One.',
  intro: 'Before a PUSHWAVE campaign begins, the deliverables and performance conditions are documented.',
  items: [
    { id: 'eligible', title: 'Eligible Views', copy: 'Only qualifying platform views from approved campaign posts count toward the billable performance total.' },
    { id: 'publishers', title: 'Approved Publishers', copy: 'Participating accounts must satisfy the agreed campaign requirements.' },
    { id: 'window', title: 'Clear Measurement Window', copy: 'The campaign agreement defines the period during which eligible views are measured.' },
    { id: 'budget', title: 'Budget Protection', copy: 'Your total billable campaign spend cannot exceed the approved campaign cap without additional authorisation.' },
    { id: 'reporting', title: 'Transparent Reporting', copy: 'Review eligible views, approved posts, spending and delivery progress.' },
    { id: 'fraud', title: 'Fraud Controls', copy: 'Identified ineligible or prohibited artificial traffic is excluded according to the agreed verification methodology.' },
    { id: 'shortfall', title: 'Shortfall Protection', copy: 'For campaigns with a signed view-delivery commitment, the contract establishes a make-good period and the applicable credit or refund treatment for undelivered performance.' },
  ],
  honestyTitle: 'What We Don’t Promise',
  honesty: [
    'We do not automatically guarantee sales, revenue, followers, unique people reached or platform virality.',
    'We commit to clearly defined deliverables, transparent reporting and agreed performance terms.',
  ],
  cta: { label: 'Discuss My Performance Plan', href: '#builder' } satisfies Cta,
};

/* ── 15 Campaign examples ────────────────────────────────────── */
export const EXAMPLES = {
  label: 'Campaign Examples',
  headline: 'See How Your Campaign Could Be Structured.',
  examples: [
    {
      tag: 'Example 01',
      title: 'Entertainment Release',
      goal: 'Distribute approved entertainment content at scale.',
      rows: [
        { label: 'Campaign', value: 'PUSHWAVE Reach 10M' },
        { label: 'View target', value: '10 million eligible views' },
        { label: 'Distribution investment', value: '₹12,90,000' },
        { label: 'Optional master clips', value: '100' },
        { label: 'Production investment', value: '₹1,40,000' },
      ],
      totalLabel: 'Total Illustrative Investment',
      total: '₹14,30,000',
      creative: 'Highlights, dramatic moments, reactions, memorable dialogue and different opening hooks.',
      setup: 'Approved content library, publisher-created short-form variations, managed publishing operations and verified-view reporting.',
      cta: {
        label: 'Build a Similar Campaign',
        href: '#builder',
        prefill: { model: 'reach', views: '10M', clips: '100', category: 'entertainment' },
      } satisfies Cta,
    },
    {
      tag: 'Example 02',
      title: 'Founder or Podcast Brand',
      goal: 'Expand discoverability for founder ideas and podcast conversations.',
      rows: [
        { label: 'Campaign', value: 'PUSHWAVE Authority 10M' },
        { label: 'View target', value: '10 million eligible views' },
        { label: 'Distribution investment', value: '₹21,90,000' },
        { label: 'Optional master clips', value: '200' },
        { label: 'Production investment', value: '₹2,50,000' },
      ],
      totalLabel: 'Total Illustrative Investment',
      total: '₹24,40,000',
      creative: 'Founder insights, business decisions, educational topics, interview highlights and short-form explanations.',
      setup: 'Niche publisher sourcing, creative moderation, content-angle recommendations and eligible-view reporting.',
      cta: {
        label: 'Build a Similar Campaign',
        href: '#builder',
        prefill: { model: 'authority', views: '10M', clips: '200', category: 'podcasts' },
      } satisfies Cta,
    },
  ],
  creativeLabel: 'Creative opportunities',
  setupLabel: 'Campaign setup',
  goalLabel: 'Goal',
  note: 'Both examples illustrate package configurations and pricing, not historical campaigns or achieved results.',
};

/* ── 16 Who we work with ─────────────────────────────────────── */
export const AUDIENCES = {
  label: 'Who We Work With',
  headline: 'Built for Brands That Have Something Worth Sharing.',
  items: [
    { id: 'podcasters', title: 'Podcasters', copy: 'Turn conversations into a larger collection of discoverable moments.' },
    { id: 'creators', title: 'Creators and Streamers', copy: 'Give memorable moments more opportunities to reach new audiences.' },
    { id: 'entertainment', title: 'Entertainment Brands', copy: 'Expand distribution around releases, trailers, performances and entertainment content.' },
    { id: 'founders', title: 'Founders and Personal Brands', copy: 'Build visibility around valuable insights, opinions and expertise.' },
    { id: 'education', title: 'Education and Technology Brands', copy: 'Distribute useful explanations and educational content through relevant publishing channels.' },
    { id: 'agencies', title: 'Marketing Agencies', copy: 'Access high-volume clipping production and managed distribution support.' },
    { id: 'media', title: 'Media Companies', copy: 'Scale content repurposing across multiple shows, series and content libraries.' },
  ],
  cta: { label: 'Find My Clipping Package', href: '#packages' } satisfies Cta,
};

/* ── 17 Our content experience ───────────────────────────────── */
export const OUR_WORK = {
  label: 'Our Content Experience',
  headline: 'Built by a Team That Understands Content at Scale.',
  intro: [
    'PUSHWAVE combines high-volume short-form production capabilities with a managed clipping and distribution model.',
    'From podcast highlights to creator-led storytelling, our focus is turning approved source content into effective, platform-ready creative assets.',
  ],
  workTitle: 'Explore Our Work',
  samples: [
    '[INSERT PODCAST CLIP SAMPLES]',
    '[INSERT FOUNDER CLIP SAMPLES]',
    '[INSERT ENTERTAINMENT CLIP SAMPLES]',
    '[INSERT EDUCATIONAL CLIP SAMPLES]',
    '[INSERT BEFORE/AFTER EDIT EXAMPLES]',
  ],
  trustTitle: 'Trusted Production Experience',
  trust: [
    '[INSERT VERIFIED PUSHWEBB PRODUCTION METRICS]',
    '[INSERT AUTHORISED CLIENT LOGOS]',
    '[INSERT APPROVED TESTIMONIALS]',
    '[INSERT VERIFIED CLIPPING CAMPAIGN DATA WHEN AVAILABLE]',
  ],
  // TODO(portfolio): point at the dedicated clipping portfolio once it exists.
  cta: { label: 'View Our Clipping Portfolio', href: '/work' } satisfies Cta,
};

/* ── 18 FAQ ──────────────────────────────────────────────────── */
export const FAQ = {
  headline: 'Frequently Asked Questions',
  items: [
    { q: 'What exactly is clipping as a service?', a: 'Clipping converts existing footage into short-form content. PUSHWAVE offers both professional short-form production and managed distribution campaigns through eligible publishing accounts.' },
    { q: 'What is the difference between Reach and Authority?', a: 'Reach is designed for broad-audience distribution. Authority adds category-specific planning, more selective publisher sourcing and higher editorial oversight.' },
    { q: 'Do I receive 100 or 300 professional edits within my distribution package?', a: 'Not automatically. Creator-produced distributed clips are part of the managed campaign. Professionally edited master files for your own channels are separately priced.' },
    { q: 'Can PUSHWAVE handle more than 300 clips?', a: 'Yes. Larger master-clip production requirements can be quoted according to available capacity and the desired delivery schedule.' },
    { q: 'What does 36–48-hour turnaround mean?', a: 'It refers to the first agreed batch of up to 25 standard-format professional clips after footage, creative references and scope are approved. It does not mean the entire distribution campaign or its view target will be completed within that time.' },
    { q: 'Are 10M, 50M and 100M views guaranteed?', a: 'These are campaign target sizes. A minimum view guarantee exists only when a signed agreement specifies the quantity, eligibility rules, measurement window and shortfall remedy.' },
    { q: 'How do you verify views?', a: 'Through the agreed platform reporting and approved-post verification process. Metrics and procedures are defined before the campaign begins.' },
    { q: 'Can I pay only for views?', a: 'Performance-led campaigns can bill against eligible verified views up to an agreed budget cap. Setup, professional production and optional services may be separately payable.' },
    { q: 'Can I cap my campaign spending?', a: 'Yes. Every campaign operates against an approved maximum budget.' },
    { q: 'What happens if the campaign does not deliver the contracted view target?', a: 'The applicable make-good, credit or refund terms are followed. For purely pay-as-delivered campaigns, only qualifying delivered views are billed according to the agreement.' },
    { q: 'Can I target one country or language?', a: 'Campaigns can be scoped around eligible geographies and languages, depending on publisher availability and verifiable audience information.' },
    { q: 'Are the views generated through paid advertisements?', a: 'Standard PUSHWAVE campaigns focus on approved creator-led publishing. Paid advertising, if requested, is scoped and reported separately.' },
    { q: 'Will these views convert into followers or sales?', a: 'Views can support awareness and discovery, but they do not automatically translate into followers, leads, revenue or purchases. Those outcomes cannot be guaranteed by a view-based contract alone.' },
    { q: 'Can I see the clips before publication?', a: 'Creative guidelines are approved in advance. Specific pre-approval workflows can be arranged depending on scale and platform requirements.' },
    { q: 'How do I get started?', a: 'Choose your campaign type and view target, share your source content and submit your requirements. We then prepare a proposal with the actual scope, budget and delivery terms.' },
  ],
};

/* ── 19 Final call to action ─────────────────────────────────── */
export const FINAL_CTA = {
  headline: 'Stop Giving Great Content Just One Chance.',
  body: [
    'You’ve already created the content.',
    'You’ve invested in the production.',
    'Now give it more opportunities to be discovered.',
  ],
  points: [
    '10M | 50M | 100M+ View Campaigns',
    '36–48-Hour First Production Batch',
    '100–300+ Professional Master Clips Available',
    'Custom Performance-Based Pricing',
    'One Managed Production and Distribution Partner',
  ],
  closeTitle: 'Ready to Make Your Content Go Further?',
  close:
    'Share your content, audience and budget. We’ll build a PUSHWAVE proposal outlining the production scope, distribution plan, pricing and performance conditions.',
  cta: { label: 'Build My PUSHWAVE Campaign', href: '#builder' } satisfies Cta,
};
