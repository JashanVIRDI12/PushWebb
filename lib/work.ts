/* ────────────────────────────────────────────────────────────────
   SELECTED WORK — the pieces shown in the PUSHWebb capability deck.

   The deck embeds these as videos, so it carries no links. Titles and
   channels were read off the embedded thumbnails, then every URL was
   resolved against YouTube and confirmed through its oEmbed endpoint,
   so each `url` below points at the exact video in the deck.

   House rule: never publish a number that cannot be substantiated.
   `views` is only present where the deck itself states one.
──────────────────────────────────────────────────────────────── */

export type WorkFormat = 'Podcast' | 'Documentary' | 'AI Film';

export type WorkPiece = {
  id: string;
  title: string;
  /** The channel or brand the piece was published under. */
  client: string;
  format: WorkFormat;
  /** What PUSHWebb ran on it, per the deck's own section for the piece. */
  managed: string;
  views?: string;
  url: string;
  image: string;
  imageAlt: string;
};

export const WORK_PIECES: WorkPiece[] = [
  {
    id: 'naval-ravikant-trs',
    title: 'Naval: Uncomfortable Truth about Life',
    client: 'BeerBiceps',
    format: 'Podcast',
    managed: 'Podcast production and post production',
    views: '1.9M+',
    url: 'https://www.youtube.com/watch?v=wQGOYnWHnto',
    image: '/work/naval-ravikant-trs.jpg',
    imageAlt: 'The Ranveer Show episode 446 with Naval Ravikant, produced for BeerBiceps',
  },
  {
    id: 'india-china-mary-lee',
    title: "World's First India-China Podcast",
    client: 'BeerBiceps',
    format: 'Podcast',
    managed: 'Podcast production and post production',
    views: '2.4M+',
    url: 'https://www.youtube.com/watch?v=_jcKVoi38-0',
    image: '/work/india-china-mary-lee.jpg',
    imageAlt: 'The Ranveer Show India-China episode with Mary Lee, produced for BeerBiceps',
  },
  {
    id: 'praveen-mohan-supertalks',
    title: 'Praveen Mohan on Unsolved Mysteries & Alien Secrets',
    client: 'Supertalks',
    format: 'Podcast',
    managed: 'Podcast production and post production',
    views: '200K+',
    url: 'https://www.youtube.com/watch?v=MWSGcyaQnbI',
    image: '/work/praveen-mohan-supertalks.jpg',
    imageAlt: 'Supertalks episode 207 with Praveen Mohan on ancient temple mysteries',
  },
  {
    id: 'siddhesh-lokare',
    title: 'He raised ₹3 Crore in 30 days teaching kids on the streets',
    client: 'The Creator Room',
    format: 'Podcast',
    managed: 'Podcast production and post production',
    url: 'https://www.youtube.com/watch?v=jKfo2FR576s',
    image: '/work/siddhesh-lokare.jpg',
    imageAlt: 'The Creator Room episode with social impact creator Siddhesh Lokare',
  },
  {
    id: 'hair-transplant-documentary',
    title: 'The ULTIMATE Hair Care & Hair Transplant Documentary',
    client: 'BeerBiceps',
    format: 'Documentary',
    managed: 'Documentary production and post production',
    url: 'https://www.youtube.com/watch?v=ssudoYMUmfE',
    image: '/work/hair-transplant-documentary.jpg',
    imageAlt: 'BeerBiceps hair care and hair transplant documentary thumbnail',
  },
  {
    id: 'control-your-mind',
    title: 'How to Control Your Mind Like the Top 1%',
    client: 'BeerBiceps',
    format: 'Documentary',
    managed: 'Documentary production and post production',
    views: '400K+',
    url: 'https://www.youtube.com/watch?v=TgNYGM-HtBA',
    image: '/work/control-your-mind.jpg',
    imageAlt: 'BeerBiceps documentary on mental discipline, thumbnail',
  },
  {
    id: 'ayodhya-sri-ram',
    title: 'The Untold History of Ayodhya & Sri Ram',
    client: 'Sanatan by Sri Mandir',
    format: 'Documentary',
    managed: 'Documentary production and post production',
    url: 'https://www.youtube.com/watch?v=7er3S1Bv1wg',
    image: '/work/ayodhya-sri-ram.jpg',
    imageAlt: 'Sanatan by Sri Mandir documentary on the history of Ayodhya and Sri Ram',
  },
  {
    id: 'shiva-sati-shakti-peethas',
    title: "Shiva's Greatest Pain: The Story of Sati's Sacrifice",
    client: 'Divine Sparks',
    format: 'AI Film',
    managed: 'AI content production with human quality control',
    url: 'https://www.youtube.com/watch?v=utM7x33Lr8U',
    image: '/work/shiva-sati-shakti-peethas.jpg',
    imageAlt: 'AI-produced film on Sati’s sacrifice and the Shakti Peethas for Divine Sparks',
  },
];

export type ShortPiece = {
  id: string;
  title: string;
  client: string;
  url: string;
  image: string;
  imageAlt: string;
};

/** Vertical work. Same resolution method as the long-form pieces. */
export const SHORT_PIECES: ShortPiece[] = [
  {
    id: 'short-shiva-tandava',
    title: 'How Ravana Created the Shiva Tandava Stotram',
    client: 'Divine Sparks',
    url: 'https://www.youtube.com/shorts/87s64If3tU4',
    image: '/work/short-shiva-tandava.jpg',
    imageAlt: 'Vertical short on the origin of the Shiva Tandava Stotram',
  },
  {
    id: 'short-bhasmasura',
    title: 'How Lord Shiva Had to Run from His Own Boon',
    client: 'Divine Sparks',
    url: 'https://www.youtube.com/shorts/nIp3x3vBvqQ',
    image: '/work/short-bhasmasura.jpg',
    imageAlt: 'Vertical short retelling the story of Bhasmasura',
  },
  {
    id: 'short-draupadi',
    title: "When Faith Became Draupadi's Greatest Strength",
    client: 'Divine Sparks',
    url: 'https://www.youtube.com/shorts/9zwgztIRuOU',
    image: '/work/short-draupadi.jpg',
    imageAlt: 'Vertical short on Draupadi’s faith in the Mahabharata',
  },
];

/** Formats the deck ships, used as the work page's fact row. */
export const WORK_FORMATS = [
  'Podcasts',
  'Documentaries',
  'Trailers & teasers',
  'Vlogs',
  'Reels & Shorts',
  'AI films',
  'Corporate & event films',
  'Branded content',
];
