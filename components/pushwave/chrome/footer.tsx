import Link from 'next/link';
import { BRAND, NAV_LINKS } from '@/lib/pushwave/content';
import { CONTACT_EMAIL } from '@/lib/site';
import { WaveGlyph } from '../ui/primitives';
import { GooeyWordmark } from '../ui/gooey-wordmark';

export function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden bg-pw-void pt-24 md:pt-32">
      <div className="pw-shell">
        <div className="grid gap-12 border-t border-pw-line pt-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-6">
            <p className="flex items-center gap-3 text-sm font-medium text-pw-steel">
              <WaveGlyph className="text-pw-wave" />
              {BRAND.byline}
            </p>
            <p className="pw-d3 mt-6 text-pw-ink">
              {BRAND.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-8">
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="pw-link text-pw-soft hover:text-pw-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 text-[0.9375rem] lg:col-span-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="pw-link w-fit text-pw-soft hover:text-pw-ink">
              {CONTACT_EMAIL}
            </a>
            <Link href="/" className="pw-link w-fit text-pw-soft hover:text-pw-ink">
              {BRAND.parent}
            </Link>
          </div>
        </div>
      </div>

      {/* Move the pointer across it: the gooey trail lights the word up. */}
      <div className="mt-16 px-2 md:mt-24 md:px-4">
        <GooeyWordmark />
      </div>

      <div className="pw-shell flex flex-col gap-2 border-t border-pw-line py-6 text-xs text-pw-steel sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {BRAND.parent}</p>
        <p>{BRAND.tagline.join(' ')}</p>
      </div>
    </footer>
  );
}
