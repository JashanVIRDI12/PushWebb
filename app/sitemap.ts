import type { MetadataRoute } from "next";
import { SERVICE_CHANNELS, serviceHref } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

/** Every indexable route, so the new work, service and location pages are
 *  discovered without waiting for a crawler to follow links to them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...SERVICE_CHANNELS.map((service) => ({ path: serviceHref(service.id), priority: 0.8 })),
    { path: "/work", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/dubai", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
