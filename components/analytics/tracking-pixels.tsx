import Script from 'next/script';

/* ────────────────────────────────────────────────────────────────
   TRAFFIC TRACKING — Google Analytics 4 and the Meta (Facebook) pixel.

   Both IDs are read from the environment and both tags are skipped
   entirely when their ID is missing, so a fresh clone or a preview
   build never reports into the real property. The values are inlined
   at build time, which is why they have to be NEXT_PUBLIC_.

   Mounted on the home page. To track every route instead, render
   <TrackingPixels /> in app/layout.tsx rather than app/page.tsx.
──────────────────────────────────────────────────────────────── */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || null;

function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}

function MetaPixel({ id }: { id: string }) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${id}');
          fbq('track', 'PageView');
        `}
      </Script>
      {/* Fallback for visitors with JavaScript disabled. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

export function TrackingPixels() {
  return (
    <>
      {GA_MEASUREMENT_ID ? <GoogleAnalytics id={GA_MEASUREMENT_ID} /> : null}
      {FB_PIXEL_ID ? <MetaPixel id={FB_PIXEL_ID} /> : null}
    </>
  );
}
