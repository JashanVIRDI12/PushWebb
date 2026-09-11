import type { Metadata } from "next";
import { AboutPage } from "@/components/blocks/about-page";

const TITLE = "About PUSHWebb | Content, Creative, Performance & AI Agency";
const DESCRIPTION =
  "Meet PUSHWebb, a content, creative, performance and AI agency built by operators experienced in high volume content, YouTube, social media and scalable growth systems.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/about",
    siteName: "PUSHWebb",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function Page() {
  return <AboutPage />;
}
