import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/blocks/service-detail-page";
import { SERVICE_CHANNELS, getServiceBySlug } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// The six capability pages from the revision brief, prerendered at build.
// Anything else under /services/ is a 404 rather than an empty page.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_CHANNELS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.name} | PUSHWebb`;
  const description = service.description[0];
  const path = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: "PUSHWebb",
      title,
      description,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: new URL(service.image, SITE_URL).href, alt: service.imageAlt }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
