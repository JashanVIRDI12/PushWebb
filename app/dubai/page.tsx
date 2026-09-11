import type { Metadata } from "next";
import { DubaiPage } from "@/components/blocks/dubai-page";

const TITLE = "Content & Growth Agency in Dubai | PUSHWebb";
const DESCRIPTION =
  "PUSHWebb operates in Dubai and works with brands, creators and organisations across the UAE: YouTube management, short-form content, video production, social media, performance creative and AI content production.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/dubai" },
  openGraph: {
    type: "website",
    url: "/dubai",
    siteName: "PUSHWebb",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/pushwebb-assets/generated/dubai-dusk.jpg", alt: "Dubai skyline at dusk" }],
  },
};

export default function Page() {
  return <DubaiPage />;
}
