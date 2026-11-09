import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'PUSHWAVE by PUSHWebb — Great Content Shouldn’t Go Unnoticed. Create Once. Distribute Smarter. Measure What Matters.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_DIR = join(process.cwd(), 'app/pushwave/fonts');

/** Eleven 9:16 cards fanning out from one master clip, as in the hero. */
function Fan() {
  const count = 11;
  const half = (count - 1) / 2;
  return (
    <div style={{ position: 'absolute', right: -40, top: 70, width: 620, height: 500, display: 'flex' }}>
      {Array.from({ length: count }, (_, i) => {
        const t = (i - half) / half;
        const depth = 1 - Math.abs(t);
        const master = i === half;
        const w = 84 + depth * 70;
        const h = (w * 16) / 9;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 310 + t * 280 - w / 2,
              top: 250 + Math.pow(Math.abs(t), 1.6) * 60 - h / 2,
              width: w,
              height: h,
              borderRadius: 16,
              transform: `rotate(${t * 14}deg)`,
              opacity: 0.35 + depth * 0.65,
              background: master
                ? 'linear-gradient(180deg, #2a3fd6 0%, #121a5c 100%)'
                : 'linear-gradient(180deg, #1c1d27 0%, #0d0d12 100%)',
              border: master ? '2px solid #3b5bff' : '1px solid rgba(242,242,240,0.16)',
              boxShadow: master ? '0 0 60px rgba(59,91,255,0.7)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: h * 0.12,
            }}
          >
            <div style={{ width: w * 0.56, height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.85)' }} />
            <div style={{ width: w * 0.38, height: 6, marginTop: 5, borderRadius: 6, background: master ? '#9aabff' : 'rgba(255,255,255,0.6)' }} />
            <div style={{ width: w * 0.8, height: 3, marginTop: h * 0.07, borderRadius: 3, background: 'rgba(255,255,255,0.25)', display: 'flex' }}>
              <div style={{ width: `${30 + ((i * 37) % 60)}%`, height: 3, borderRadius: 3, background: '#ffffff' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function Image() {
  const [display, sans] = await Promise.all([
    readFile(join(FONT_DIR, 'ClashDisplay-Semibold.ttf')),
    readFile(join(FONT_DIR, 'GeneralSans-Medium.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#07070a',
          backgroundImage:
            'radial-gradient(circle at 78% 46%, rgba(59,91,255,0.38) 0%, rgba(59,91,255,0) 46%), radial-gradient(circle at 50% 120%, rgba(59,91,255,0.22) 0%, rgba(59,91,255,0) 50%)',
          color: '#f2f2f0',
          fontFamily: 'General Sans',
          overflow: 'hidden',
        }}
      >
        <Fan />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(7,7,10,0.96) 0%, rgba(7,7,10,0.7) 46%, rgba(7,7,10,0) 70%)',
            display: 'flex',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="44" height="22" viewBox="0 0 32 16">
              <path d="M1 8c3.5 0 3.5-6 7-6s3.5 12 7 12 3.5-12 7-12 3.5 6 9 6" fill="none" stroke="#3b5bff" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <div style={{ fontFamily: 'Clash Display', fontSize: 34, letterSpacing: '-0.03em' }}>PUSHWAVE</div>
            <div style={{ fontSize: 20, color: '#8d8d95', marginTop: 6 }}>by PUSHWebb</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Clash Display',
                fontSize: 92,
                lineHeight: 0.92,
                letterSpacing: '-0.045em',
                maxWidth: 680,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              Great Content Shouldn’t Go Unnoticed.
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, fontSize: 24, color: '#bdbdc3' }}>
              <span>Create Once.</span>
              <span style={{ color: '#f2f2f0' }}>Distribute Smarter.</span>
              <span style={{ color: '#9aabff' }}>Measure What Matters.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Clash Display', data: display, weight: 600, style: 'normal' },
        { name: 'General Sans', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
