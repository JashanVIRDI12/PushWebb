'use client';

import type { RefObject } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { onEnterOnce } from '@/lib/reveal';

gsap.registerPlugin(SplitText);

/**
 * Choreography for /about.
 *
 * Two rules hold the whole file together:
 *
 *  1. One-shot entrances establish their start state before paint, then run
 *     from a scoped IntersectionObserver that disconnects after the first hit.
 *  2. Anything on a ScrollTrigger is *scrubbed*, and its resting state is
 *     legible on its own: dimmed text, an un-scaled card. Progress is recomputed
 *     from scroll position continuously, so it is self-correcting.
 *
 * Everything lives inside gsap.matchMedia so `prefers-reduced-motion` gets a
 * static page and every tween, trigger and split is reverted on unmount.
 */
export function useAboutMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP((_, contextSafe) => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cleanups: Array<() => void> = [];
      const splits: SplitText[] = [];
      const watch = (
        el: Element | null,
        play: () => gsap.core.Animation | void,
        rootMargin?: string,
      ) => {
        if (!el) return;
        const safePlay = contextSafe!(() => {
          const animation = play();
          if (animation) cleanups.push(() => animation.kill());
        });
        cleanups.push(onEnterOnce(el, safePlay, rootMargin));
      };

      // ── HERO: character cascade out of a line mask ────────────
      const heroTitle = root.querySelector<HTMLElement>('[data-anim="hero-title"]');
      const heroTimeline = gsap.timeline();
      if (heroTitle) {
        const split = new SplitText(heroTitle, {
          type: 'lines,chars',
          linesClass: 'split-line',
        });
        splits.push(split);

        heroTimeline.set(heroTitle, { autoAlpha: 1 }).from(split.chars, {
          yPercent: 120,
          duration: 1,
          stagger: { each: 0.014, from: 'start' },
          ease: 'expo.out',
        }, 0.08);
      }

      heroTimeline
        .from(root.querySelectorAll('[data-anim="hero-meta"]'), {
          autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.09, ease: 'power3.out',
        }, 0.28)
        .from(root.querySelectorAll('[data-anim="hero-cta"]'), {
          autoAlpha: 0, y: 20, duration: 0.6, ease: 'power3.out',
        }, 0.52);

      // Hero drifts up and dims as the next section takes over. Scrubbed, so
      // it is always correct for the current scroll position.
      const hero = root.querySelector<HTMLElement>('[data-anim="hero"]');
      const heroInner = root.querySelector<HTMLElement>('[data-anim="hero-inner"]');
      if (hero && heroInner) {
        gsap.to(heroInner, {
          yPercent: -14,
          autoAlpha: 0.18,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      // Image frames establish their clipped/overscaled start state during the
      // layout phase, before the browser can paint the final frame and flash.
      root.querySelectorAll<HTMLElement>('[data-anim="img-frame"]').forEach((frame) => {
        const image = frame.querySelector<HTMLElement>('[data-anim="img-scale"], [data-anim="img-parallax"]');
        const isParallax = image?.dataset.anim === 'img-parallax';
        gsap.set(frame, { clipPath: 'inset(0 0 100% 0)' });
        if (image) gsap.set(image, { scale: isParallax ? 1.12 : 1.08 });

        watch(frame, () => {
          const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
          timeline.to(frame, { clipPath: 'inset(0 0 0% 0)', duration: 0.9 });
          if (image) timeline.to(image, { scale: isParallax ? 1.06 : 1, duration: 1.1 }, 0);
          return timeline;
        }, '0px 0px -10% 0px');
      });

      root.querySelectorAll<HTMLElement>('[data-anim="img-parallax"]').forEach((image) => {
        const frame = image.closest<HTMLElement>('[data-anim="img-frame"]');
        const trigger = frame ?? image.parentElement;
        if (!trigger) return;
        if (!frame) gsap.set(image, { scale: 1.08 });
        gsap.fromTo(image, { yPercent: -5 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // ── VELOCITY MARQUEE: scroll speed drives the loop ────────
      const track = root.querySelector<HTMLElement>('[data-anim="marquee-track"]');
      if (track) {
        const loop = gsap.to(track, {
          xPercent: -50, repeat: -1, duration: 26, ease: 'none',
        });

        const setTimeScale = gsap.quickTo(loop, 'timeScale', {
          duration: 0.35,
          ease: 'power2.out',
        });
        const setSkew = gsap.quickTo(track, 'skewX', {
          duration: 0.35,
          ease: 'power2.out',
        });
        const settle = gsap.delayedCall(0.14, () => {
          setTimeScale(1);
          setSkew(0);
        }).pause();

        const velocityTrigger = ScrollTrigger.create({
          onUpdate: (self) => {
            const speed = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 900);
            setTimeScale(speed);
            setSkew(gsap.utils.clamp(-8, 8, self.getVelocity() / 320));
            settle.restart(true);
          },
        });
        cleanups.push(() => {
          velocityTrigger.kill();
          settle.kill();
          loop.kill();
        });
      }

      const photoTrack = root.querySelector<HTMLElement>('[data-anim="photo-track"]');
      if (photoTrack) {
        const photoLoop = gsap.to(photoTrack, {
          xPercent: -50,
          repeat: -1,
          duration: 34,
          ease: 'none',
        });
        const visibility = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) photoLoop.play();
          else photoLoop.pause();
        }, { rootMargin: '100px 0px' });
        visibility.observe(photoTrack);
        cleanups.push(() => {
          visibility.disconnect();
          photoLoop.kill();
        });
      }

      // ── WORD-FILL: copy brightens word by word as it's read ───
      // Resting state is dimmed rather than hidden, so a missed trigger costs
      // contrast, never the content.
      root.querySelectorAll<HTMLElement>('[data-anim="fill"]').forEach((block) => {
        const split = new SplitText(block, { type: 'words' });
        splits.push(split);

        gsap.set(split.words, { autoAlpha: 0.22 });
        gsap.to(split.words, {
          autoAlpha: 1,
          ease: 'none',
          stagger: 0.4,
          scrollTrigger: {
            trigger: block,
            start: 'top 82%',
            end: 'bottom 58%',
            scrub: 0.6,
          },
        });
      });

      // ── STATEMENT LINES: masked line reveal per pillar ────────
      root.querySelectorAll<HTMLElement>('[data-anim="statement"]').forEach((el) => {
        const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });
        splits.push(split);

        gsap.set(el, { autoAlpha: 1 });
        gsap.set(split.lines, { yPercent: 110 });

        watch(el, () => {
          gsap.to(split.lines, {
            yPercent: 0, duration: 0.95, stagger: 0.09, ease: 'expo.out',
          });
        }, '0px 0px -18% 0px');
      });

      // ── STACKING CARDS ────────────────────────────────────────
      // Each card is sticky; the one beneath scales back and dims as the next
      // slides over it, so the stack reads as depth rather than a list.
      const stack = root.querySelector<HTMLElement>('[data-anim="stack"]');
      if (stack) {
        const cards = gsap.utils.toArray<HTMLElement>('[data-anim="stack-card"]', stack);

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.9,
            yPercent: -4,
            autoAlpha: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 88%',
              end: 'top 30%',
              scrub: 0.5,
            },
          });
        });

        // Progress rail beside the stack.
        const rail = root.querySelector<HTMLElement>('[data-anim="stack-progress"]');
        if (rail) {
          gsap.fromTo(rail,
            { scaleY: 0 },
            {
              scaleY: 1, ease: 'none', transformOrigin: 'top',
              scrollTrigger: { trigger: stack, start: 'top 60%', end: 'bottom 80%', scrub: 0.4 },
            },
          );
        }
      }

      // ── PARALLAX: globe drifts against its section ────────────
      const globeWrap = root.querySelector<HTMLElement>('[data-anim="parallax"]');
      const globeSection = root.querySelector<HTMLElement>('[data-anim="parallax-section"]');
      if (globeWrap && globeSection) {
        gsap.fromTo(globeWrap,
          { yPercent: 8 },
          {
            yPercent: -8, ease: 'none',
            scrollTrigger: { trigger: globeSection, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }

      // ── SIMPLE REVEALS ────────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-anim="rise"]').forEach((group) => {
        const items = group.children.length ? Array.from(group.children) : [group];
        gsap.set(items, { autoAlpha: 0, y: 30 });
        watch(group, () => {
          gsap.to(items, {
            autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          });
        }, '0px 0px -12% 0px');
      });

      // ── MAGNETIC CTAs ─────────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-anim="magnetic"]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        let rect: DOMRect | null = null;

        const onEnter = () => {
          rect = el.getBoundingClientRect();
        };
        const onMove = (event: PointerEvent) => {
          if (!rect) return;
          xTo((event.clientX - (rect.left + rect.width / 2)) * 0.28);
          yTo((event.clientY - (rect.top + rect.height / 2)) * 0.4);
        };
        const onLeave = () => {
          rect = null;
          xTo(0);
          yTo(0);
        };

        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('pointerenter', onEnter);
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        });
      });

      // ── FOOTER ────────────────────────────────────────────────
      // Scoped to the shared footer content wrapper.
      const footerContent = root.querySelector<HTMLElement>('footer .footer-reveal');
      if (footerContent) gsap.set(footerContent.children, { autoAlpha: 0, y: 22 });
      watch(footerContent, () => (
        gsap.to(footerContent!.children, {
          autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        })
      ), '0px');

      // Late images shift every trigger's start position.
      let refreshFrame = 0;
      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      const refreshOnLoad = () => refresh();
      window.addEventListener('load', refreshOnLoad);
      refresh();
      cleanups.push(() => {
        cancelAnimationFrame(refreshFrame);
        window.removeEventListener('load', refreshOnLoad);
      });

      return () => {
        cleanups.forEach((fn) => fn());
        // Restores the original text nodes — split characters are invisible to
        // screen readers and to text search.
        splits.forEach((split) => split.revert());
      };
    });

    return () => mm.revert();
  }, { scope });

}
