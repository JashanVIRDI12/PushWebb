import type { ReactElement, SVGProps } from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/ui/brand-mark';
import { CONTACT_EMAIL, CTA_HREF, CTA_LABEL, DUBAI_ADDRESS_LINE, PHONES, SOCIAL } from '@/lib/site';

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

type FooterLink = {
  label: string;
  href: string | null;
  icon?: IconComponent;
};

/* Brand glyphs — lucide-react dropped its brand icons, so these are inline. */
const iconBase: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
};

const InstagramIcon: IconComponent = (props) => (
  <svg {...iconBase} {...props}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a4.32 4.32 0 1 1 0 8.64 4.32 4.32 0 0 1 0-8.64Zm0 7.13a2.81 2.81 0 1 0 0-5.62 2.81 2.81 0 0 0 0 5.62Zm5.5-7.3a1.01 1.01 0 1 1-2.02 0 1.01 1.01 0 0 1 2.02 0Z" />
  </svg>
);

const LinkedInIcon: IconComponent = (props) => (
  <svg {...iconBase} {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const YouTubeIcon: IconComponent = (props) => (
  <svg {...iconBase} {...props}>
    <path d="M23.5 6.51a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.51C0 8.4 0 12 0 12s0 3.6.5 5.49a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.6 24 12 24 12s0-3.6-.5-5.49ZM9.6 15.6V8.4l6.26 3.6-6.26 3.6Z" />
  </svg>
);

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Locations',
    links: [{ label: 'Dubai, UAE', href: '/dubai' }],
  },
  {
    title: 'Contact',
    links: [
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      ...PHONES,
      { label: CTA_LABEL, href: CTA_HREF },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: SOCIAL.instagram, icon: InstagramIcon },
      // No LinkedIn URL yet — the link stays inert until SOCIAL.linkedin is set.
      { label: 'LinkedIn', href: SOCIAL.linkedin ?? '#', icon: LinkedInIcon },
      { label: 'YouTube', href: SOCIAL.youtube, icon: YouTubeIcon },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      {/* .footer-reveal is the shared footer animation target. */}
      <div className="footer-reveal container relative z-10 mx-auto max-w-5xl px-4 py-14 md:px-8">
        {/* Wordmark + centred tagline */}
        <div className="mb-12 flex flex-col items-center gap-3 border-b border-line pb-10 text-center">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <BrandMark className="h-10 w-10 text-ink" />
            <span className="flex items-baseline gap-0.5">
              <span className="font-display text-xl font-bold tracking-[-0.5px] text-ink">PUSH</span>
              <span className="font-display text-xl font-medium tracking-[-0.5px] text-ink-muted">Webb</span>
            </span>
          </Link>
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink-muted">
            Content. Creative. Performance. AI.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="mb-3 font-display text-[10px] uppercase tracking-widest text-ink-muted">
                {column.title}
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                {column.links.map((link) => {
                  const Icon = link.icon;
                  const external = link.href?.startsWith('http');
                  const content = (
                    <span className="inline-flex items-center gap-2">
                      {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
                      {link.label}
                    </span>
                  );
                  return (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="no-underline transition-colors duration-200 hover:text-ink"
                          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                          {content}
                        </Link>
                      ) : (
                        <span>{content}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center">
          <address className="mb-2 text-xs not-italic text-ink-soft sm:text-sm">
            {DUBAI_ADDRESS_LINE}
          </address>
          <p className="text-xs text-ink-muted sm:text-sm">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved by PUSHWEBB.
          </p>
        </div>
      </div>
    </footer>
  );
}
