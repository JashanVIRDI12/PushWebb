import type { Metadata } from "next";
import { ServicesPage } from "@/components/blocks/services-page";

export const metadata: Metadata = {
  title: "Services — PUSHWebb",
  description:
    "Connected services — YouTube, short-form content, video production and post production, podcast production, content clipping, ad campaigns, AI automation, social media and performance marketing — built around how brands grow today.",
};

export default function Services() {
  return <ServicesPage />;
}
