'use client';

import { useEffect } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

gsap.registerPlugin(SplitText);

/**
 * Scroll choreography for the static sections, driven by data attributes so
 * the sections themselves can stay Server Components:
 *
 *   data-split            headline: masked line + word reveal (SplitText)
 *   data-reveal           element fades up once
 *   data-reveal-stagger   children fade up in sequence
 *   data-parallax="-12"   scrubbed yPercent drift across the viewport
 *   data-wipe             clip-path opens from an inset card to full bleed
 *
 * Reduced motion: no transforms, a short opacity fade only.
 */
export function MotionDirector() {
  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add(
      { motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { motion } = context.conditions as { motion: boolean };
        const once = (trigger: Element, start = 'top 86%') => ({ trigger, start, once: true });

        if (!motion) {
          gsap.utils.toArray<HTMLElement>('.pw [data-split], .pw [data-reveal], .pw [data-reveal-stagger] > *').forEach((el) => {
            gsap.from(el, { autoAlpha: 0, duration: 0.4, ease: 'none', scrollTrigger: once(el, 'top 92%') });
          });
          return;
        }

        gsap.utils.toArray<HTMLElement>('.pw [data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines,words',
            mask: 'lines',
            linesClass: 'pw-split-line',
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                yPercent: 118,
                rotate: 2.5,
                duration: 1.15,
                ease: 'power4.out',
                stagger: 0.045,
                scrollTrigger: once(el),
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('.pw [data-reveal]').forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 32, duration: 1.1, ease: 'expo.out', scrollTrigger: once(el, 'top 90%') });
        });

        gsap.utils.toArray<HTMLElement>('.pw [data-reveal-stagger]').forEach((group) => {
          gsap.from(group.children, {
            autoAlpha: 0,
            y: 40,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: once(group, 'top 88%'),
          });
        });

        gsap.utils.toArray<HTMLElement>('.pw [data-parallax]').forEach((el) => {
          const amount = Number.parseFloat(el.dataset.parallax ?? '-10');
          gsap.fromTo(
            el,
            { yPercent: -amount / 2 },
            {
              yPercent: amount / 2,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('.pw [data-wipe]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(8% 5% 0% 5% round 48px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: true },
            },
          );
        });
      },
    );

    return () => media.revert();
  });

  // Accordions, tabs and builder steps change the page height. ScrollTrigger
  // doesn't watch layout, so re-measure (debounced) whenever the page resizes;
  // otherwise the pinned engine section would start in the wrong place.
  useEffect(() => {
    const root = document.querySelector('.pw');
    if (!root || typeof ResizeObserver === 'undefined') return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    let lastHeight = root.getBoundingClientRect().height;
    const observer = new ResizeObserver(() => {
      const height = root.getBoundingClientRect().height;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      clearTimeout(timer);
      timer = setTimeout(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      }, 180);
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
