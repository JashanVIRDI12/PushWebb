/* ────────────────────────────────────────────────────────────────
   SERVICES — six capabilities, one system. Each has a section on the
   /services hub, anchored by its `id`, and its own page at
   /services/<slug>. The navbar's Services panel, the home service
   cards, the hub's Explore links, the Dubai page and the structured
   data all link to those pages, so this list is the one place a
   service is named, described or added.

   The revision brief consolidates what used to be nine separate
   services into six: clipping now sits inside short form, podcast
   production inside video production, and the two paid-media entries
   are one performance capability. The older keyword URLs from the
   brief redirect to these pages (next.config.ts).
──────────────────────────────────────────────────────────────── */

export type ServiceChannel = {
  /** Section anchor on /services — keep stable, links point at it. */
  id: string;
  /** The dedicated page, /services/<slug>, as named in the brief. */
  slug: string;
  name: string;
  hook: string;
  description: string[];
  cover: string[];
  /** Contextual link label, so six modules don't end in the same button. */
  cta: string;
  /** One substantiated line of proof. Omitted where there isn't one. */
  proof?: string;
  /** Short label for the sticky navigator. */
  navLabel: string;
  /** Named delivery models from the capability deck — how the work is
   *  actually structured, not another list of what we cover. */
  frameworks?: { label: string; items: { name: string; detail: string }[] }[];
  /** Search topics the brief lists for the service's own page. */
  topics?: string[];
  /** Case studies whose "What We Managed" is this capability. */
  caseStudies?: string[];
  /** Questions from the shared FAQ list (lib/faqs) shown on the page. */
  faqs: string[];
  image: string;
  imageAlt: string;
};

export const SERVICE_CHANNELS: ServiceChannel[] = [
  {
    id: 'yaas',
    slug: 'youtube-growth',
    name: 'YAAS: YouTube as a Service',
    navLabel: 'YouTube',
    hook: 'Turn Your YouTube Channel Into a Growth Engine',
    description: [
      'We manage YouTube from strategy to publishing, including research, scripting, production, editing, thumbnails and performance optimisation.',
      'Every decision is built around improving retention, watch time, click through rate and sustainable channel growth.',
    ],
    cover: [
      'Channel strategy and positioning',
      'Research and content planning',
      'Scriptwriting and production',
      'Editing and post production',
      'Thumbnails and publishing',
      'Analytics and optimisation',
    ],
    cta: 'Explore YouTube Growth',
    proof: '5B+ views generated',
    topics: [
      'YouTube channel management',
      'YouTube content strategy',
      'YouTube video production',
      'thumbnail strategy',
      'YouTube editing',
      'channel analytics',
      'YouTube for founders',
      'YouTube for brands',
    ],
    faqs: ['youtube', 'high-volume', 'single-campaign', 'dubai'],
    image: '/pushwebb-assets/generated/youtube-studio.jpg',
    imageAlt: 'PUSHWebb YouTube podcast production team filming creator interview',
  },
  {
    id: 'short-form',
    slug: 'short-form-content',
    name: 'Short Form Content & Reels',
    navLabel: 'Short Form',
    hook: 'Short Form Content Built to Earn Attention.',
    description: [
      'We build platform native Reels and Shorts around the mechanics that drive attention: the opening hook, pacing, storytelling, visual changes and retention.',
      'From original short form concepts to turning podcasts and long form videos into high performing clips, the system is designed for repeatable output.',
    ],
    cover: [
      'Short form strategy',
      'Research and ideation',
      'Hook development',
      'Reels and Shorts editing',
      'Podcast and long form clipping',
      'Performance optimisation',
    ],
    cta: 'Explore Short Form Content',
    proof: 'High volume workflows built for 1,500+ monthly video output',
    frameworks: [
      {
        label: 'Hook · Hold · Act',
        items: [
          {
            name: 'Hook',
            detail:
              'Interrupt the scroll. Bold visuals and a sharp opening frame capture attention in under one second.',
          },
          {
            name: 'Hold',
            detail:
              'Pacing, captions, sound, visual changes and narrative progression maintain attention throughout the video.',
          },
          {
            name: 'Act',
            detail:
              'Every reel is structured around a clear outcome: a view, follow, save, share, inquiry or click.',
          },
        ],
      },
    ],
    faqs: ['high-volume', 'white-label', 'single-campaign', 'dubai'],
    image: '/pushwebb-assets/generated/microcontent-shoot.jpg',
    imageAlt: 'PUSHWebb short form content production shoot',
  },
  {
    id: 'video-production',
    slug: 'video-production',
    name: 'Video Production & Post Production',
    navLabel: 'Production',
    hook: 'Video Production and Post Production, Run as One Pipeline.',
    description: [
      'PUSHWebb handles production and post production across podcasts, branded films, documentaries, trailers, creator content, corporate films and digital campaigns.',
      'Research, scripting, production, editing, sound, colour and motion are managed as one connected workflow rather than fragmented across multiple vendors.',
    ],
    cover: [
      'Creative development and pre production',
      'Podcast production',
      'Branded films and creator shoots',
      'Documentaries, vlogs and trailers',
      'Editing and post production',
      'Motion graphics, colour and sound',
    ],
    cta: 'Explore Video Production',
    proof: 'Podcasts · Documentaries · Trailers · Branded Content',
    frameworks: [
      {
        label: 'The Podcast Content Engine',
        items: [
          {
            name: 'Full episode',
            detail:
              'A professionally edited podcast with multi-camera switching, audio enhancement, branded graphics, pacing and structured storytelling.',
          },
          {
            name: 'Trailer & short form',
            detail: 'One high-impact trailer and 10 to 20 highly engaging Shorts.',
          },
          {
            name: 'Final assets',
            detail:
              'Thumbnails, titles, audiograms, LinkedIn clips, Reels, Shorts and promotional creatives prepared for publishing across platforms.',
          },
        ],
      },
      {
        label: 'Documentaries, vlogs & trailers',
        items: [
          {
            name: 'Documentary — research, structure, story',
            detail:
              'Narrative-led films that bring people, brands, cultures and ideas to life through thoughtful scripting, strong pacing and cinematic post production.',
          },
          {
            name: 'Vlog — experience, emotion, connection',
            detail:
              'Authentic edits that turn everyday footage, travel, events and behind-the-scenes moments into stories audiences want to follow.',
          },
          {
            name: 'Trailer — hook, build, reveal',
            detail:
              'High-impact storytelling designed to create curiosity, build anticipation and leave the audience wanting more.',
          },
        ],
      },
    ],
    // Podcast and documentary production, per each study's own record.
    caseStudies: ['beerbiceps', 'sri-mandir', 'supertalks', 'the-creator-room'],
    faqs: ['editing', 'white-label', 'high-volume', 'dubai'],
    image: '/pushwebb-assets/generated/video-production.jpg',
    imageAlt: 'PUSHWebb video production crew filming on set',
  },
  {
    id: 'ai-content',
    slug: 'ai-content-automation',
    name: 'AI Content & Automation',
    navLabel: 'AI',
    hook: 'Use AI to Increase Output. Not Lower the Bar.',
    description: [
      'We combine AI content production with workflow automation to help teams create faster, repurpose smarter and remove repetitive operational work.',
      'AI handles scale where it makes sense. Human creative direction and quality control remain responsible for what reaches the audience.',
    ],
    cover: [
      'AI filmmaking and visual production',
      'Creative variations at scale',
      'Content repurposing workflows',
      'Publishing and operations automation',
      'Reporting and insight workflows',
      'Human quality control',
    ],
    cta: 'Explore AI Content & Automation',
    proof: 'AI production + human quality control',
    caseStudies: ['divine-sparks'],
    faqs: ['ai', 'high-volume', 'single-campaign', 'dubai'],
    image: '/pushwebb-assets/generated/ai-workflow.jpg',
    imageAlt: 'PUSHWebb editors working through an AI-assisted content workflow',
  },
  {
    id: 'social-media',
    slug: 'social-media-management',
    name: 'Social Media Management',
    navLabel: 'Social',
    hook: 'Turn Social Media Into a Consistent Growth System.',
    description: [
      'We manage the complete content cycle across social platforms: strategy, planning, creative, publishing and performance optimisation.',
      'The goal is not simply to keep your feeds active. It is to build a recognizable content system that consistently earns attention and strengthens the brand.',
    ],
    cover: [
      'Social media strategy',
      'Content pillars and calendars',
      'Scripts and creative development',
      'Publishing and platform management',
      'Community and campaign coordination',
      'Reporting and optimisation',
    ],
    cta: 'Explore Social Media Management',
    proof: 'Multi platform operations across 15+ clients',
    faqs: ['organic-and-paid', 'brands-and-creators', 'single-campaign', 'dubai'],
    image: '/pushwebb-assets/generated/social-strategy.jpg',
    imageAlt: 'PUSHWebb social media team reviewing printed content for a posting calendar',
  },
  {
    id: 'performance',
    slug: 'performance-creative',
    name: 'Performance Creative & Paid Media',
    navLabel: 'Performance',
    hook: 'Creative That Learns. Media That Performs.',
    description: [
      'We connect creative development, media buying and performance data so campaigns improve as they run.',
      'Ideas are tested against real audience behaviour, winning creatives are scaled and learnings feed directly into the next production cycle.',
    ],
    cover: [
      'Paid media strategy',
      'Performance creative development',
      'Meta, Google and YouTube campaigns',
      'Audience and creative testing',
      'Attribution and performance tracking',
      'Continuous campaign optimisation',
    ],
    cta: 'Explore Performance Creative',
    // No proof line: the brief asks for a real campaign metric, and the house
    // rule is to publish no figure that cannot be substantiated.
    faqs: ['organic-and-paid', 'full-service', 'single-campaign', 'dubai'],
    image: '/pushwebb-assets/generated/paid-campaign-review.jpg',
    imageAlt: 'PUSHWebb performance marketing team reviewing campaign analytics',
  },
];

/** A service's own page. Takes the section id so call sites stay unchanged. */
export const serviceHref = (id: string) =>
  `/services/${SERVICE_CHANNELS.find((channel) => channel.id === id)?.slug ?? ''}`;

export const getServiceBySlug = (slug: string) =>
  SERVICE_CHANNELS.find((channel) => channel.slug === slug);

/** The PUSHWebb Scaling System — the four steps every engagement runs
 *  through. The home page adds icons and imagery on top of this copy. */
export const SCALING_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    tag: 'Understand Before We Create.',
    detail:
      'We understand your business, audience, positioning, objectives, current content and growth constraints before recommending what should be built.',
  },
  {
    step: '02',
    title: 'Strategy & Blueprint',
    tag: 'Build the System Before the Output.',
    detail:
      'We define content pillars, formats, channels, workflows, responsibilities, creative direction and performance goals before production begins.',
  },
  {
    step: '03',
    title: 'Execution',
    tag: 'Turn Strategy Into Content People Actually Watch.',
    detail:
      'Research, scripting, production, editing, design and publishing move through one coordinated production system.',
  },
  {
    step: '04',
    title: 'Optimisation & Scale',
    tag: 'Performance Makes the Next Cycle Stronger.',
    detail:
      'Retention, reach, engagement, click through rates and campaign performance feed back into the next content cycle.',
  },
];
