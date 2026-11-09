import type { Viewport } from 'next';
import localFont from 'next/font/local';
import './pushwave.css';

/**
 * PUSHWAVE is a dark sub-brand of PUSHWebb with its own type system.
 * Clash Display (display) and General Sans (body) are Fontshare faces
 * under the ITF Free Font License, self-hosted from ./fonts.
 */
const display = localFont({
  src: [
    { path: './fonts/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--pw-face-display',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

const sans = localFont({
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--pw-face-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

// The PUSHWebb site is light-only; this route is the one dark surface.
export const viewport: Viewport = {
  themeColor: '#07070A',
  colorScheme: 'dark',
};

export default function PushwaveLayout({ children }: { children: React.ReactNode }) {
  return <div className={`pw ${display.variable} ${sans.variable}`}>{children}</div>;
}
