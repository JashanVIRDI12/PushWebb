import type { Metadata } from 'next';
import { TrackingPixels } from '@/components/analytics/tracking-pixels';
import { JsonLd } from '@/components/seo/json-ld';
import { PushwaveLanding } from '@/components/pushwave/redesign/landing';
import { BRAND, HERO } from '@/lib/pushwave/content';
import { pushwaveFaqJsonLd, pushwaveServiceJsonLd } from '@/lib/pushwave/structured-data';
import './redesign.css';
import './redesign-fx.css';

const TITLE = `${BRAND.byline} | ${BRAND.descriptor}`;
const DESCRIPTION = HERO.body[1];

// The share image comes from ./opengraph-image.tsx and ./twitter-image.tsx.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/pushwave' },
  openGraph: {
    type: 'website',
    url: '/pushwave',
    siteName: BRAND.parent,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PushwavePage() {
  return <>
    <JsonLd data={pushwaveServiceJsonLd()} />
    <JsonLd data={pushwaveFaqJsonLd()} />
    <TrackingPixels />
    <PushwaveLanding />
  </>;
}
