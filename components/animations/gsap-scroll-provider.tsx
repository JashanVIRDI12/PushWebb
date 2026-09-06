'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { onEnterOnce } from '@/lib/reveal';

type SplitRecord = { element: HTMLElement; html: string };

function splitWords(element: HTMLElement, records: SplitRecord[]) {
  const existing = element.querySelectorAll<HTMLElement>('.gsap-word');
  if (existing.length) return existing;

  records.push({ element, html: element.innerHTML });
  element.innerHTML = element.innerHTML.replace(
    /(<[^>]+>)|([^<\s]+)/g,
    (_, tag, word) => tag
      ? tag
      : `<span class="gsap-mask"><span class="gsap-word">${word}</span></span>`,
  );
  return element.querySelectorAll<HTMLElement>('.gsap-word');
}

/** Owns non-scrubbed entrance choreography for one page subtree. */
export function useGsapScrollAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP((_, contextSafe) => {
    const root = scope.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const cleanups: Array<() => void> = [];
      const splitRecords: SplitRecord[] = [];
      const select = <T extends Element>(selector: string) => root.querySelector<T>(selector);
      const selectAll = <T extends Element>(selector: string) => root.querySelectorAll<T>(selector);
      const defaults = { ease: 'power3.out' };

      // Observer callbacks run after this hook returns, so make animations
      // created by them part of the hook's GSAP context as well.
      const watch = (
        element: Element | null,
        play: () => gsap.core.Animation | void,
        rootMargin?: string,
      ) => {
        if (!element) return;
        const safePlay = contextSafe!(() => {
          const animation = play();
          if (animation) cleanups.push(() => animation.kill());
        });
        cleanups.push(onEnterOnce(element, safePlay, rootMargin));
      };

      // One timeline owns the hero sequence, avoiding independent delay clocks.
      const heroTagline = select<HTMLElement>('#hero-tagline');
      const heroHeadline = select<HTMLElement>('#hero-headline');
      const heroServices = select<HTMLElement>('#hero-services');
      const heroCta = select<HTMLElement>('#hero-cta');
      const heroScroll = select<HTMLElement>('#hero-scroll');
      const heroWords = heroHeadline ? splitWords(heroHeadline, splitRecords) : [];
      const heroTimeline = gsap.timeline({ defaults });

      if (heroTagline) heroTimeline.from(heroTagline, { autoAlpha: 0, y: -20, duration: 0.65 }, 0);
      if (heroWords.length) {
        heroTimeline.from(heroWords, {
          yPercent: 105,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.05,
        }, 0.1);
      }
      if (heroServices) heroTimeline.from(heroServices, { autoAlpha: 0, y: 18, duration: 0.6 }, 0.38);
      if (heroCta) {
        heroTimeline.from(heroCta, {
          autoAlpha: 0,
          scale: 0.88,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, 0.52);
      }
      if (heroScroll) heroTimeline.from(heroScroll, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.68);

      selectAll<HTMLElement>('.reveal-section').forEach((section) => {
        const eyebrow = section.querySelector<HTMLElement>('.anim-eyebrow');
        const heading = section.querySelector<HTMLElement>('h2.split-h2');
        const words = heading ? splitWords(heading, splitRecords) : [];
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 20 });
        if (words.length) gsap.set(words, { yPercent: 105 });

        watch(section, () => {
          const timeline = gsap.timeline({ defaults });
          if (eyebrow) timeline.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);
          if (words.length) timeline.to(words, { yPercent: 0, duration: 0.75, stagger: 0.055 }, 0.08);
          return timeline;
        }, '0px 0px -14% 0px');

        const staggerGroup = section.querySelector<HTMLElement>('.reveal-stagger');
        if (staggerGroup) gsap.set(staggerGroup.children, { autoAlpha: 0, y: 36 });
        watch(staggerGroup, () => gsap.to(staggerGroup!.children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ...defaults,
        }), '0px 0px -10% 0px');
      });

      selectAll<HTMLElement>('.stat-number[data-count]').forEach((element) => {
        const count = Number.parseFloat(element.dataset.count ?? '0');
        const suffix = element.dataset.suffix ?? '';
        if (Number.isNaN(count)) return;
        element.textContent = `0${suffix}`;

        watch(element, () => {
          const value = { current: 0 };
          return gsap.to(value, {
            current: count,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = `${Math.ceil(value.current)}${suffix}`;
            },
          });
        }, '0px 0px -8% 0px');
      });

      const frameworkGrid = select<HTMLElement>('.framework-grid');
      if (frameworkGrid) {
        const cards = gsap.utils.toArray<HTMLElement>('.framework-card', frameworkGrid);
        gsap.set(frameworkGrid, { perspective: 1100 });
        gsap.set(cards, { autoAlpha: 0, y: 64, rotateX: 12, scale: 0.94, transformOrigin: '50% 0%' });
        gsap.set(frameworkGrid.querySelectorAll('.framework-rule'), { scaleX: 0 });
        gsap.set(frameworkGrid.querySelectorAll('.framework-icon'), { autoAlpha: 0, scale: 0.5, rotate: -25 });
        gsap.set(frameworkGrid.querySelectorAll('.framework-step'), { autoAlpha: 0, x: 18 });
        gsap.set(frameworkGrid.querySelectorAll('.framework-copy'), { autoAlpha: 0, y: 14 });

        watch(frameworkGrid, () => {
          const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
          cards.forEach((card, index) => {
            const at = index * 0.13;
            timeline
              .to(card, { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.85 }, at)
              .to(card.querySelector('.framework-rule'), { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, at + 0.12)
              .to(card.querySelector('.framework-icon'), { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(2)' }, at + 0.2)
              .to(card.querySelector('.framework-step'), { autoAlpha: 1, x: 0, duration: 0.5 }, at + 0.26)
              .to(card.querySelectorAll('.framework-copy'), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 }, at + 0.3);
          });
          return timeline;
        }, '0px 0px -12% 0px');
      }

      const about = select<HTMLElement>('#about');
      if (about) {
        const badge = about.querySelector<HTMLElement>('.about-badge');
        const heading = about.querySelector<HTMLElement>('h2');
        const words = heading ? splitWords(heading, splitRecords) : [];
        const mainCard = about.querySelector<HTMLElement>('#about-main-card');
        const copy = about.querySelectorAll('#about-main-card p');
        const avatars = about.querySelectorAll('.about-avatars > *');
        const tiles = about.querySelectorAll('.stat-card');

        if (badge) gsap.set(badge, { autoAlpha: 0, y: 16 });
        if (words.length) gsap.set(words, { yPercent: 105 });
        if (mainCard) gsap.set(mainCard, { autoAlpha: 0, y: 40, clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set(copy, { autoAlpha: 0, y: 16 });
        gsap.set(avatars, { autoAlpha: 0, scale: 0.4 });
        gsap.set(tiles, { autoAlpha: 0, x: 46, scale: 0.96 });

        watch(about, () => {
          const timeline = gsap.timeline({ defaults });
          if (badge) timeline.to(badge, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);
          if (words.length) timeline.to(words, { yPercent: 0, duration: 0.75, stagger: 0.06 }, 0.1);
          if (mainCard) {
            timeline.to(mainCard, {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.95,
              ease: 'power4.out',
            }, 0.25);
          }
          timeline
            .to(copy, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.09 }, 0.55)
            .to(avatars, { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2.4)' }, 0.9)
            .to(tiles, { autoAlpha: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.12 }, 0.45);
          return timeline;
        }, '0px 0px -14% 0px');
      }

      const contact = select<HTMLElement>('#contact');
      if (contact) {
        const heading = contact.querySelector<HTMLElement>('h2');
        const words = heading ? splitWords(heading, splitRecords) : [];
        const eyebrow = contact.querySelector<HTMLElement>('.anim-eyebrow');
        const fields = contact.querySelectorAll('.form-field');
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 18 });
        if (words.length) gsap.set(words, { yPercent: 105 });
        if (fields.length) gsap.set(fields, { autoAlpha: 0, y: 28 });

        watch(contact, () => {
          const timeline = gsap.timeline({ defaults });
          if (eyebrow) timeline.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);
          if (words.length) timeline.to(words, { yPercent: 0, duration: 0.75, stagger: 0.05 }, 0.08);
          if (fields.length) timeline.to(fields, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.3);
          return timeline;
        }, '0px 0px -12% 0px');
      }

      const footerContent = select<HTMLElement>('footer .footer-reveal');
      if (footerContent) gsap.set(footerContent.children, { autoAlpha: 0, y: 22 });
      watch(footerContent, () => gsap.to(footerContent!.children, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ...defaults,
      }), '0px');

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        splitRecords.forEach(({ element, html }) => {
          element.innerHTML = html;
        });
      };
    });

    return () => media.revert();
  }, { scope });

}
