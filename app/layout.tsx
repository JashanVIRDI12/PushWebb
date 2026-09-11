import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import "./globals.css";

/**
 * Single-family system, matching the PUSHWebb deck: one heavy, slightly
 * expanded grotesque for statements and the same face at lighter weights for
 * copy. The `wdth` axis is loaded so display type can widen without a
 * second family.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const SITE_TITLE = "PUSHWebb | Content, Creative, Performance & AI Agency";
const SITE_DESCRIPTION =
  "PUSHWebb helps brands and creators scale through content strategy, YouTube, short form video, social media, performance marketing and AI powered content systems. 5B+ views generated.";

// Site-wide defaults. They are also the home page's own values; every other
// route overrides title/description with its own.
export const metadata: Metadata = {
  metadataBase: new URL("https://pushwebb.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PUSHWebb",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PUSHWebb — We Build Content Systems That Turn Attention Into Business Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/* The app renders inside the single persistent Lenis owner. Its bridge
            drives Lenis from GSAP's ticker and keeps ScrollTrigger synchronized
            across client-side route changes. */}
        <SmoothScrollProvider>
          <AppProviders>{children}</AppProviders>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
