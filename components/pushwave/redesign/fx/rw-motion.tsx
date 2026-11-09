'use client';

import { useEffect } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { scrollSignal } from './scroll-signal';

gsap.registerPlugin(SplitText);

const EXPO = 'expo.out';
const once = (trigger: Element | string, start = 'top 86%') => ({ trigger, start, once: true });

/**
 * Scroll choreography for the redesigned landing page. It drives the
 * existing markup through its class names, so the sections stay plain
 * JSX. Everything lives inside one gsap.matchMedia context: reduced motion
 * gets no transforms at all (the page is fully visible without JS), and
 * unmounting reverts every tween, split and trigger.
 */
export function RwMotion() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('.rw');
    if (!root) return;
    const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root);
    const media = gsap.matchMedia();

    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        fine: '(hover: hover) and (pointer: fine)',
        wide: '(min-width: 900px)',
      },
      (context) => {
        const { motion, fine, wide } = context.conditions as { motion: boolean; fine: boolean; wide: boolean };
        if (!motion) return;
        const cleanups: (() => void)[] = [];
        const handled = new Set<Element>();

        /* ── Hero: letters rise, "Big waves." ripples, then rides the scroll ── */
        const [lineOne, lineTwo] = q('.rw-hero-line > span');
        if (lineOne && lineTwo) {
          const first = SplitText.create(lineOne, { type: 'chars', charsClass: 'rw-char' });
          const second = SplitText.create(lineTwo, { type: 'chars', charsClass: 'rw-char' });
          const intro = gsap.timeline({ delay: 0.15 });
          intro
            .from(first.chars, { yPercent: 118, rotate: 9, transformOrigin: '0% 100%', duration: 1.15, ease: 'power4.out', stagger: 0.024 }, 0)
            .from(second.chars, { yPercent: 118, rotate: 9, transformOrigin: '0% 100%', duration: 1.15, ease: 'power4.out', stagger: 0.03 }, 0.16)
            // A single ripple runs through the letters once they land.
            .to(second.chars, { yPercent: -16, duration: 0.3, ease: 'sine.inOut', stagger: 0.045, yoyo: true, repeat: 1 }, 1.05)
            .from(q('.rw-eyebrow > *'), { y: 14, autoAlpha: 0, duration: 0.8, ease: EXPO, stagger: 0.06 }, 0.45)
            .from(q('.rw-hero-bottom > *'), { y: 26, autoAlpha: 0, duration: 1, ease: EXPO, stagger: 0.09 }, 0.6)
            .from(q('.rw-art-note'), { autoAlpha: 0, duration: 1.2 }, 1.2);

          gsap.to(q('.rw-scroll-note > span'), { y: 7, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 });

          // The louder the scroll, the bigger the wave through "Big waves."
          const setters = second.chars.map((char) => gsap.quickSetter(char, 'y', 'px'));
          let heroOn = true;
          ScrollTrigger.create({ trigger: '.rw-hero', start: 'top bottom', end: 'bottom top', onToggle: (self) => (heroOn = self.isActive) });
          let resting = false;
          const ride = (time: number) => {
            if (!heroOn) return;
            const energy = scrollSignal.energy;
            if (energy < 0.003) {
              if (!resting) setters.forEach((set) => set(0));
              resting = true;
              return;
            }
            resting = false;
            setters.forEach((set, index) => set(Math.sin(time * 7 + index * 0.62) * energy * 24));
          };
          gsap.ticker.add(ride);
          cleanups.push(() => gsap.ticker.remove(ride));

          // Scrolling away: the two lines part, the details sink.
          gsap
            .timeline({ scrollTrigger: { trigger: '.rw-hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
            .to(lineOne, { xPercent: -9, ease: 'none' }, 0)
            .to(lineTwo, { xPercent: 7, ease: 'none' }, 0)
            .to(q('.rw-hero-bottom'), { y: -50, autoAlpha: 0.2, ease: 'none' }, 0);
        }

        /* ── Film strip: frames open bottom-up (WebGL follows --reveal), track drifts ── */
        const frames = q('.rw-frame');
        if (frames.length) {
          gsap.fromTo(
            frames,
            { '--reveal': 0 },
            { '--reveal': 1, duration: 1.4, ease: 'expo.inOut', stagger: 0.11, scrollTrigger: once('.rw-film', 'top 88%') },
          );
          gsap.from(q('.rw-frame-bottom, .rw-caption, .rw-frame-tag, .rw-frame-top, .rw-frame-type > *'), {
            y: 24,
            autoAlpha: 0,
            duration: 1,
            ease: EXPO,
            stagger: 0.05,
            delay: 0.5,
            scrollTrigger: once('.rw-film', 'top 88%'),
          });
          gsap.fromTo(
            q('.rw-film-track'),
            { xPercent: 2 },
            { xPercent: -13, ease: 'none', scrollTrigger: { trigger: '.rw-film', start: 'top bottom', end: 'bottom top', scrub: 1.2 } },
          );
        }

        /* ── Proof strip ── */
        gsap.from(q('.rw-proof > *'), { y: 30, autoAlpha: 0, duration: 1, ease: EXPO, stagger: 0.08, scrollTrigger: once('.rw-proof', 'top 90%') });

        /* ── Manifesto: words light up as they're read; the star turns with the scroll ── */
        const manifesto = q('.rw-manifesto')[0];
        if (manifesto) {
          handled.add(manifesto);
          const heading = manifesto.querySelector('h2');
          if (heading) {
            const split = SplitText.create(heading, { type: 'words', wordsClass: 'rw-word' });
            gsap.fromTo(
              split.words,
              { opacity: 0.12 },
              { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: heading, start: 'top 82%', end: 'bottom 42%', scrub: true } },
            );
          }
          gsap.from(manifesto.querySelectorAll('.rw-label, .rw-manifesto-bottom > p'), {
            y: 28,
            autoAlpha: 0,
            duration: 1,
            ease: EXPO,
            stagger: 0.1,
            scrollTrigger: once(manifesto, 'top 80%'),
          });
          gsap.fromTo(
            manifesto.querySelector('.rw-star'),
            { rotate: -90, scale: 0.6 },
            { rotate: 270, scale: 1, ease: 'none', scrollTrigger: { trigger: manifesto, start: 'top bottom', end: 'bottom top', scrub: 1 } },
          );
        }

        /* ── Headlines: masked line reveal, the violet words ink in last ── */
        q('.rw-section-head h2, .rw-faq h2, .rw-finale h2, .rw-builder-wrap h2').forEach((heading) => {
          // Word masks wrap naturally at every breakpoint. Automatic line
          // re-splitting can revert its animation (and remove its trigger)
          // while ScrollTrigger is walking earlier timeline triggers.
          const split = SplitText.create(heading, {
            type: 'words',
            mask: 'words',
            wordsClass: 'rw-split-word',
          });
          const accent = split.words.filter((word) => word.closest('em'));
          const reveal = gsap.timeline({ paused: true });
          reveal.from(split.words, { yPercent: 120, rotate: 4, duration: 1.15, ease: 'power4.out', stagger: 0.045 }, 0);
          if (accent.length) {
            reveal.from(accent, { color: '#f3f0eb', duration: 1.2, ease: 'power2.out', stagger: 0.05 }, 0.55);
          }
          // Attach only after the timeline is populated, so another trigger
          // never has to force-refresh a partially constructed timeline.
          ScrollTrigger.create({ ...once(heading, 'top 88%'), animation: reveal });
        });
        q('.rw-section-head, .rw-faq > div:first-child, .rw-finale').forEach((block) => {
          handled.add(block);
          const rest = Array.from(block.children).filter((child) => child.tagName !== 'H2' && !child.classList.contains('rw-logo-mark') && !child.classList.contains('rw-finale-wave'));
          if (!rest.length) return;
          gsap.from(rest, { y: 26, autoAlpha: 0, duration: 1, ease: EXPO, stagger: 0.08, delay: 0.25, scrollTrigger: once(block, 'top 86%') });
        });

        /* ── Dark panels open from an inset card to full bleed ── */
        q('.rw-engine, .rw-pricing, .rw-finale').forEach((panel) => {
          gsap.fromTo(
            panel,
            { clipPath: 'inset(4% 3% 0% 3% round 36px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 25%', scrub: true } },
          );
        });

        /* ── Engine: the reel opens up; each step lights as it passes the centre ── */
        const visual = q('.rw-engine-visual')[0];
        if (visual) {
          handled.add(visual);
          const scrub = { trigger: visual, start: 'top 92%', end: 'top 35%', scrub: true };
          gsap.fromTo(visual, { clipPath: 'inset(14% 10% 14% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: scrub });
          gsap.fromTo(visual.querySelector('video'), { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: scrub });
        }
        q('.rw-steps article').forEach((step, index) => {
          handled.add(step);
          gsap.fromTo(
            step,
            { '--line': 0 },
            { '--line': 1, duration: 1.3, ease: 'expo.inOut', delay: index * 0.06, scrollTrigger: once(step, 'top 90%') },
          );
          gsap.from(step.children, { y: 22, autoAlpha: 0, duration: 0.9, ease: EXPO, stagger: 0.06, delay: 0.15 + index * 0.06, scrollTrigger: once(step, 'top 90%') });
          ScrollTrigger.create({ trigger: step, start: 'top 62%', end: 'bottom 38%', toggleClass: 'is-active' });
        });

        /* ── Work: images wipe up, then drift; meta follows ── */
        q('.rw-work-grid > a').forEach((card, index) => {
          handled.add(card);
          const frame = card.querySelector<HTMLElement>('.rw-work-image');
          const img = card.querySelector('img');
          if (!frame || !img) return;
          gsap
            .timeline({ scrollTrigger: once(card, 'top 88%'), delay: index * 0.1 })
            .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0)
            .fromTo(img, { scale: 1.45 }, { scale: 1.12, duration: 1.9, ease: EXPO }, 0)
            .from(Array.from(card.children).slice(1), { y: 22, autoAlpha: 0, duration: 1, ease: EXPO, stagger: 0.07 }, 0.7);
          gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });

          if (fine) {
            // Tilt toward the pointer.
            const rx = gsap.quickTo(frame, 'rotationX', { duration: 0.8, ease: 'power3.out' });
            const ry = gsap.quickTo(frame, 'rotationY', { duration: 0.8, ease: 'power3.out' });
            gsap.set(frame, { transformPerspective: 1000 });
            const move = (event: PointerEvent) => {
              const rect = frame.getBoundingClientRect();
              ry(((event.clientX - rect.left) / rect.width - 0.5) * 7);
              rx(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            card.addEventListener('pointermove', move);
            card.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              card.removeEventListener('pointermove', move);
              card.removeEventListener('pointerleave', leave);
            });
          }
        });

        /* ── Pricing ── */
        gsap.from(q('.rw-pricing-toolbar > *'), { y: 20, autoAlpha: 0, duration: 0.9, ease: EXPO, stagger: 0.08, scrollTrigger: once('.rw-pricing-toolbar', 'top 90%') });
        gsap.from(q('.rw-price-grid > article'), {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          ease: EXPO,
          stagger: 0.12,
          scrollTrigger: once('.rw-price-grid', 'top 85%'),
        });
        gsap.from(q('.rw-production-note > *'), { y: 18, autoAlpha: 0, duration: 0.9, ease: EXPO, stagger: 0.08, scrollTrigger: once('.rw-production-note', 'top 92%') });

        /* ── Builder (the shared component's own reveal hooks) ── */
        q('.rw-builder-wrap [data-reveal]').forEach((el) => {
          gsap.from(el, { y: 32, autoAlpha: 0, duration: 1.1, ease: EXPO, scrollTrigger: once(el, 'top 90%') });
        });

        /* ── FAQ ── */
        gsap.from(q('.rw-faq-list article'), { x: 40, autoAlpha: 0, duration: 1, ease: EXPO, stagger: 0.05, scrollTrigger: once('.rw-faq-list', 'top 85%') });

        /* ── Finale: the mark turns slowly as the close arrives ── */
        gsap.fromTo(
          q('.rw-finale > .rw-logo-mark'),
          { rotate: -25, scale: 0.85 },
          { rotate: 10, scale: 1, ease: 'none', scrollTrigger: { trigger: '.rw-finale', start: 'top bottom', end: 'bottom bottom', scrub: 1 } },
        );

        /* ── Footer ── */
        gsap.from(q('.rw-footer > *'), { y: 24, autoAlpha: 0, duration: 1, ease: EXPO, stagger: 0.08, scrollTrigger: once('.rw-footer', 'top 95%') });

        /* ── Anything else marked for a reveal ── */
        q('[data-rw-reveal]').forEach((el) => {
          if (handled.has(el)) return;
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: EXPO, scrollTrigger: once(el, 'top 90%') });
        });

        /* ── Magnetic calls to action (fine pointers) ── */
        if (fine && wide) {
          q('.rw-hero-cta, .rw-nav-cta, .rw-finale .rw-campaign-button, .rw-play').forEach((el) => {
            const strength = el.classList.contains('rw-play') ? 0.5 : 0.3;
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
            const move = (event: PointerEvent) => {
              const rect = el.getBoundingClientRect();
              xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
              yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
            };
            const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: true });
            el.addEventListener('pointermove', move);
            el.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              el.removeEventListener('pointermove', move);
              el.removeEventListener('pointerleave', leave);
            });
          });
        }

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    return () => media.revert();
  });

  // Accordions, tabs and builder steps change the page height. ScrollTrigger
  // doesn't watch layout, so re-measure (debounced) when the page resizes.
  useEffect(() => {
    const root = document.querySelector('.rw');
    if (!root || typeof ResizeObserver === 'undefined') return;
    let timer: ReturnType<typeof setTimeout>;
    let last = root.getBoundingClientRect().height;
    const observer = new ResizeObserver(() => {
      const height = root.getBoundingClientRect().height;
      if (Math.abs(height - last) < 2) return;
      last = height;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(true), 200);
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return null;
}
