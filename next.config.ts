import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDir,
  },
  // The home page brief (#57) lists keyword URLs for the service pages; the
  // services brief (#20) puts them under /services/. The pages live at the
  // second set, and every URL from the first lands on its page. Podcast
  // production and content clipping were folded into video production and
  // short form by the services brief. Temporary (307) until the URL scheme
  // is signed off — a permanent redirect is cached by browsers for good.
  async redirects() {
    return [
      { source: "/youtube-growth-agency", destination: "/services/youtube-growth", permanent: false },
      { source: "/short-form-content-agency", destination: "/services/short-form-content", permanent: false },
      { source: "/video-production-post-production", destination: "/services/video-production", permanent: false },
      { source: "/social-media-management", destination: "/services/social-media-management", permanent: false },
      { source: "/performance-creative", destination: "/services/performance-creative", permanent: false },
      { source: "/ai-content-production", destination: "/services/ai-content-automation", permanent: false },
      {
        source: "/podcast-production",
        destination: "/services/video-production#the-podcast-content-engine",
        permanent: false,
      },
      { source: "/content-clipping", destination: "/services/short-form-content", permanent: false },
    ];
  },
};

export default nextConfig;
