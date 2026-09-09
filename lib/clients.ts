/* ────────────────────────────────────────────────────────────────
   CLIENT ROSTER — shared by the roster section and the stats route.

   Reach numbers come from two places, and the split is deliberate:

   • `youtube` is LIVE. The YouTube Data API is the only one of these
     platforms with a public endpoint for an account you don't own, so
     those counts are fetched and cached server-side. Note YouTube
     itself rounds subscriber counts to three significant figures — no
     API returns the exact number any more.

   • `manual` is EVERYTHING ELSE, and has to be:
       – Google Play publishes an install *tier* ("50M+"), never an
         exact count, and only on the listing page.
       – Apple publishes no download figure at all — not on the
         listing, not in the iTunes API. Ratings are all that is
         public, which is why App Store entries below are stars.
       – Instagram's Graph API only covers accounts you administer.
     These are typed in from the public listing; `sourcedOn` records
     when a human last checked them.
──────────────────────────────────────────────────────────────── */

export type Stat = {
  value: string;
  platform: string;
};

/** What /api/channel-stats returns per channel. Declared here, in the shared
 *  module, so the client component never has to import a server route. */
export type LiveStats = {
  subscribers: number | null;
  views: number | null;
};

export type Client = {
  name: string;
  /** Researched, and load-bearing — it says what the name alone doesn't. */
  category: string;
  src: string;
  /** `mark` is contained on a white disc; `tile` bleeds to the edges. */
  kind: 'mark' | 'tile';
  /** Either identifier resolves a live subscriber count. `channelId` is
   *  cheaper — those are batched into a single upstream request. */
  youtube?: { channelId?: string; handle?: string };
  /** Hand-entered metrics, shown as-is and never presented as live. */
  manual?: Stat[];
  /** ISO date the manual figures above were last checked. */
  sourcedOn?: string;
};

export const CLIENTS: Client[] = [
  {
    name: 'BookMyShow',
    category: 'Ticketing Platform',
    src: '/logos/bookmyshow.png',
    kind: 'mark',
    manual: [
      { value: '100M+', platform: 'Downloads' },
      { value: '4.8★', platform: 'App Store' },
    ],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'AppsForBharat',
    category: 'Faith-Tech Platform',
    src: '/logos/apps-for-bharat.jpg',
    kind: 'mark',
    // The company behind Sri Mandir; its reach is the temple network rather
    // than a store listing of its own.
    manual: [{ value: '1,000+', platform: 'Temples' }],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'Sri Mandir',
    category: 'Devotional App',
    src: '/logos/sri-mandir.png',
    kind: 'tile',
    // Play's published tier. Series C press quotes "4 crore downloads", but
    // that is a company-reported all-platform cumulative figure — mixing it
    // with store tiers on the other cards would not compare like with like.
    manual: [
      { value: '10M+', platform: 'Downloads' },
      { value: '4.6★', platform: 'App Store' },
    ],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'Blaupunkt',
    category: 'Electronics',
    src: '/logos/blaupunkt.png',
    kind: 'mark',
    // Heritage rather than reach — the brand's own "Since 1924" positioning.
    manual: [{ value: '1924', platform: 'Est. Germany' }],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'The Lalit',
    category: 'Luxury Hospitality',
    src: '/logos/the-lalit.png',
    kind: 'mark',
    // 12 LaLiT properties + 2 LaLiT Traveller hotels across India.
    manual: [{ value: '14', platform: 'Properties' }],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'FRND',
    category: 'Social App',
    src: '/logos/frnd.webp',
    kind: 'tile',
    manual: [
      { value: '50M+', platform: 'Downloads' },
      { value: '4.6★', platform: 'App Store' },
    ],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'Veda Mandir',
    category: 'Online Puja App',
    src: '/logos/vedamandir.jpg',
    kind: 'tile',
    // Genuinely what the listing says — a new app, and no App Store ratings
    // yet. Drop this `manual` block if 5K+ reads badly beside 100M+.
    manual: [{ value: '5K+', platform: 'Downloads' }],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'TribeVibe',
    category: 'Live Events + Campus',
    src: '/logos/tribevibe.jpg',
    kind: 'mark',
    manual: [
      { value: '1,500+', platform: 'Campus Fests' },
      { value: '10K+', platform: 'Ambassadors' },
    ],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'Baadshah',
    category: 'Film Commentary',
    src: '/logos/baadshah.jpg',
    kind: 'tile',
    // @baadshahig — Aditya Shetty, the film-commentary creator repped by
    // Pocket Aces. NOT the rapper Badshah (@badshahlive, 8.5M on YouTube);
    // the names collide and the wrong one is an easy, bad mistake to make.
    manual: [{ value: '1.4M', platform: 'Instagram' }],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'BeerBiceps',
    category: 'Creator + Podcast',
    src: '/logos/beerbiceps.jpg',
    kind: 'tile',
    // Not UCneyi-aYq4VIBYIAQgWmk_w — that id is Ranveer's own
    // @ranveerallahbadia channel (11.3M), a different property.
    youtube: { handle: 'BeerBiceps' },
  },
  {
    name: 'Supertalks',
    category: 'Long-Form Podcast',
    src: '/logos/supertalks.jpg',
    kind: 'tile',
    // The /c/themovingship legacy URL does not map to a handle; the channel's
    // actual handle is @supertalksbytms.
    youtube: { handle: 'supertalksbytms' },
  },
  {
    name: 'The Creator Room',
    category: 'Creator Business',
    src: '/logos/the-creator-room.jpg',
    kind: 'tile',
    youtube: { handle: 'TCRpodcast' },
  },
  {
    name: 'Misfit Humans',
    category: 'Interview Podcast',
    src: '/logos/misfit-humans.jpg',
    kind: 'mark',
    youtube: { handle: 'MisfitHumans' },
  },
  {
    name: 'Sarthak Sachdeva',
    category: 'Short-Form Creator',
    src: '/logos/sarthak-sachdeva.jpg',
    kind: 'tile',
    youtube: { handle: 'sarthakksachdeva' },
  },
  {
    name: 'Shreya Godhawat',
    category: 'Digital Creator',
    src: '/logos/shreya-godhawat.jpg',
    kind: 'tile',
    manual: [{ value: '123K+', platform: 'Instagram' }],
    sourcedOn: '2026-09-09',
  },
  {
    name: 'Simply Pankaj',
    category: 'Digital Creator',
    src: '/logos/simply-pankaj.jpg',
    kind: 'tile',
    youtube: { handle: 'simplypankaj' },
  },
];

/** 8_250_000 → "8.25M", 4_119_778_516 → "4.12B". Keeps M/K/B rather than
 *  lakh/crore, matching how these channels report themselves. */
export function formatCount(n: number): string {
  if (n >= 1_000_000_000) {
    const b = n / 1_000_000_000;
    return `${Number(b.toFixed(b >= 10 ? 1 : 2))}B`;
  }
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m >= 100 ? Math.round(m) : Number(m.toFixed(m >= 10 ? 1 : 2))}M`;
  }
  if (n >= 1_000) {
    const k = n / 1_000;
    return `${k >= 100 ? Math.round(k) : Number(k.toFixed(1))}K`;
  }
  return String(n);
}
