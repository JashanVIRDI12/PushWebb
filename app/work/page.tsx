import type { Metadata } from "next";
import { WorkPage } from "@/components/blocks/work-page";

const TITLE = "Selected Work & Case Studies | PUSHWebb";
const DESCRIPTION =
  "Case studies from PUSHWebb: what we managed for creators and brands, the challenge behind each engagement and the content system built around it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    siteName: "PUSHWebb",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function Page() {
  return <WorkPage />;
}
