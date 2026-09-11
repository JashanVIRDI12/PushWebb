import type { Metadata } from "next";
import { AgencyLanding } from "@/components/blocks/agency-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackingPixels } from "@/components/analytics/tracking-pixels";
import { organizationJsonLd } from "@/lib/structured-data";

// Title, description and social cards come from the root layout, whose
// defaults are the home page's values.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <TrackingPixels />
      <AgencyLanding />
    </>
  );
}
