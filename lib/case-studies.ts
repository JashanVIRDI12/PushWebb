/* ────────────────────────────────────────────────────────────────
   CASE STUDIES — the Selected Work section and /work.

   Written from work that can be watched. Every entry is one client
   whose output is published and linked below, and every field traces
   to a documented source:

     • `managed` and `system` — the PUSHWebb capability deck, which
       names the delivery model used for each format (the Podcast
       Content Engine, the documentary format, the AI pipeline).
     • `challenge` — the production problem that format poses, as the
       deck describes it. It is not a claimed client situation, and
       nothing here is invented on the client's behalf.
     • `result` — the published work itself, linked in `links`. View
       figures appear only where the deck states one.

   House rule from the revision brief: never publish a performance
   number that cannot be substantiated.
──────────────────────────────────────────────────────────────── */

export type CaseStudy = {
  slug: string;
  client: string;
  /** Who the client is, in a few words. */
  category: string;
  /** Omitted where there is no logo file yet — a monogram stands in. */
  logo?: string;
  /** `mark` sits contained on white; `tile` bleeds to the circle's edge. */
  logoKind?: 'mark' | 'tile';
  managed: string;
  challenge: string;
  system: string;
  result: string;
  /** The published work. Every link is checked against YouTube. */
  links: { label: string; href: string }[];
  /** The client's own words, verbatim. */
  quote?: { text: string; name: string; role: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'beerbiceps',
    client: 'BeerBiceps',
    category: 'Creator-Led Media',
    logo: '/logos/beerbiceps.jpg',
    logoKind: 'tile',
    managed: 'Podcast production, documentary production and post production',
    challenge:
      'A flagship interview show and a documentary slate publishing in parallel, where every episode needs a full multi-camera edit, a trailer and a run of shorts before the next one is due.',
    system:
      'The Podcast Content Engine. Multi-camera switching, audio enhancement, branded graphics and structured pacing on the full episode, then one trailer and 10 to 20 shorts, then thumbnails, titles, audiograms and platform clips prepared for publishing.',
    result:
      'Episodes including Naval Ravikant at 1.9M+ views and the world’s first India-China podcast at 2.4M+ views, alongside long-form documentaries on the same channel.',
    links: [
      { label: 'Naval Ravikant', href: 'https://www.youtube.com/watch?v=wQGOYnWHnto' },
      { label: 'India-China podcast', href: 'https://www.youtube.com/watch?v=_jcKVoi38-0' },
      { label: 'Hair transplant documentary', href: 'https://www.youtube.com/watch?v=ssudoYMUmfE' },
      { label: 'Control your mind', href: 'https://www.youtube.com/watch?v=TgNYGM-HtBA' },
    ],
  },
  {
    slug: 'sri-mandir',
    client: 'Sanatan by Sri Mandir',
    category: 'Devotional App',
    logo: '/logos/sri-mandir.png',
    logoKind: 'mark',
    managed: 'Documentary production and post production',
    challenge:
      'Devotional subject matter that has to be handled with reverence and still hold a YouTube audience: deep research, a clear narrative spine and a cinematic finish rather than a lecture.',
    system:
      'The documentary format — research, structure, story. Scripting and pacing built around the narrative, then cinematic post production across colour, sound and motion.',
    result:
      'The Untold History of Ayodhya & Sri Ram, a narrative-led film published on the Sanatan channel.',
    links: [
      { label: 'The Untold History of Ayodhya', href: 'https://www.youtube.com/watch?v=7er3S1Bv1wg' },
    ],
  },
  {
    slug: 'supertalks',
    client: 'Supertalks',
    category: 'Long-Form Podcast',
    logo: '/logos/supertalks.jpg',
    logoKind: 'tile',
    managed: 'Podcast production and post production',
    challenge:
      'A long-form interview format that runs well past the ninety-minute mark and still has to stay watchable end to end, while producing enough short form to promote itself.',
    system:
      'Full-episode edit with chaptering and pacing, then the trailer and clips cut from the same session so the promotion ships with the episode rather than a week behind it.',
    result: 'Episode 207 with Praveen Mohan on temple mysteries, at 200K+ views.',
    links: [{ label: 'Praveen Mohan, ST-207', href: 'https://www.youtube.com/watch?v=MWSGcyaQnbI' }],
  },
  {
    slug: 'the-creator-room',
    client: 'The Creator Room',
    category: 'Creator Economy Show',
    logo: '/logos/the-creator-room.jpg',
    logoKind: 'tile',
    managed: 'Podcast production and post production',
    challenge:
      'A business show where the value sits in the detail — the edit has to keep figures, frameworks and long answers legible without flattening the conversation into clips.',
    system:
      'Multi-camera edit with on-screen support for the numbers being discussed, chaptered for navigation, with thumbnails, titles and short form prepared alongside each episode.',
    result:
      'Episodes including the story of how Siddhesh Lokare raised ₹3 crore in 30 days for rural schools.',
    links: [{ label: 'Siddhesh Lokare episode', href: 'https://www.youtube.com/watch?v=jKfo2FR576s' }],
  },
  {
    slug: 'divine-sparks',
    client: 'Divine Sparks',
    category: 'AI-Led Storytelling',
    managed: 'AI content production with human quality control',
    challenge:
      'Mythological storytelling at publishing volume, where every frame has to stay visually consistent and culturally accurate across a long-form film and a continuous run of shorts.',
    system:
      'The five-stage AI pipeline: creative brief, visual direction, AI generation, post production, then human quality control on every asset before it ships.',
    result:
      'A long-form film on Sati’s sacrifice and the Shakti Peethas, plus a running series of vertical shorts on the same channel.',
    links: [
      { label: 'Shiva’s Greatest Pain', href: 'https://www.youtube.com/watch?v=utM7x33Lr8U' },
      { label: 'Shiva Tandava Stotram', href: 'https://www.youtube.com/shorts/87s64If3tU4' },
      { label: 'Bhasmasura', href: 'https://www.youtube.com/shorts/nIp3x3vBvqQ' },
      { label: 'Draupadi', href: 'https://www.youtube.com/shorts/9zwgztIRuOU' },
    ],
  },
];
