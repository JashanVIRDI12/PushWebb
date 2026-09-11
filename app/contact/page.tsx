import type { Metadata } from "next";
import { ContactPage } from "@/components/blocks/contact-page";

const TITLE = "Contact PUSHWebb | Content & Creative Growth Agency";
const DESCRIPTION =
  "Talk to PUSHWebb about YouTube, short form content, video production, social media, paid performance or AI content systems. Serving India, Dubai and global clients.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/contact",
    siteName: "PUSHWebb",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function Contact() {
  return <ContactPage />;
}
