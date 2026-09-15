'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const MEDIA = [
  {
    type: 'image',
    src: '/pushwebb-assets/photos/mrigank-creator-selfie.jpg',
    alt: 'Mrigank Sharma with a creator outdoors',
    width: 'w-[210px] sm:w-[250px] lg:w-[270px]',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/pushwebb-assets/photos/mrigank-trs-studio.png',
    alt: 'Mrigank Sharma with a YouTube creator at the TRS studio',
    width: 'w-[280px] sm:w-[350px] lg:w-[380px]',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/pushwebb-assets/photos/mrigank-creators-group.png',
    alt: 'Mrigank Sharma with creators after a production',
    width: 'w-[280px] sm:w-[350px] lg:w-[380px]',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/pushwebb-assets/photos/mrigank-youtube-play-button.jpg',
    alt: 'Mrigank Sharma holding a YouTube Creator Award',
    width: 'w-[230px] sm:w-[285px] lg:w-[305px]',
    position: 'object-center',
  },
  {
    type: 'video',
    src: '/pushwebb-assets/videos/hero-video.mp4',
    alt: 'PUSHWebb production showreel',
    width: 'w-[260px] sm:w-[330px] lg:w-[360px]',
    position: 'object-center',
  },
] as const;

const IMAGE_COUNT = MEDIA.filter((media) => media.type === 'image').length;

function MarqueeVideo({ src, label, active }: { src: string; label?: string; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!video.getAttribute('src')) video.src = src;
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: '240px', threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [active, src]);

  return (
    <video
      ref={videoRef}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-cover [backface-visibility:hidden]"
    />
  );
}

function PhotoSet({
  duplicate = false,
  active,
  onImageReady,
}: {
  duplicate?: boolean;
  active: boolean;
  onImageReady: (src: string) => void;
}) {
  return (
    <div
      className={cn('flex shrink-0 gap-3 pr-3', duplicate && 'photo-marquee-copy')}
      aria-hidden={duplicate || undefined}
    >
      {MEDIA.map((media) => (
        <figure
          key={`${duplicate ? 'duplicate-' : ''}${media.src}`}
          className={cn(
            'group relative h-[300px] shrink-0 overflow-hidden rounded-[3px] border border-white/[0.08] bg-white/[0.04] [contain:layout_paint] sm:h-[380px] lg:h-[440px]',
            media.width,
          )}
        >
          {media.type === 'video' ? (
            <MarqueeVideo
              src={media.src}
              label={duplicate ? undefined : media.alt}
              active={active}
            />
          ) : active ? (
            <Image
              src={media.src}
              alt={duplicate ? '' : media.alt}
              fill
              loading="eager"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 380px"
              onLoad={() => onImageReady(media.src)}
              onError={() => onImageReady(media.src)}
              className={cn(
                'object-cover transition-transform duration-700 ease-out [backface-visibility:hidden] group-hover:scale-[1.025]',
                media.position,
              )}
            />
          ) : null}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0d1e26]/35 via-transparent to-black/10"
          />
        </figure>
      ))}
    </div>
  );
}

/** A quiet, continuous reel of real PUSHWebb moments. */
export function PhotoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const loadedImagesRef = useRef(new Set<string>());
  const [active, setActive] = useState(false);
  const [loadedImageCount, setLoadedImageCount] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: '800px 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const markImageReady = (src: string) => {
    if (loadedImagesRef.current.has(src)) return;
    loadedImagesRef.current.add(src);
    setLoadedImageCount(loadedImagesRef.current.size);
  };

  const ready = active && loadedImageCount >= IMAGE_COUNT;

  return (
    <section
      ref={sectionRef}
      aria-label="PUSHWebb creator and production moments"
      className="photo-marquee relative isolate overflow-hidden border-y border-white/[0.07] bg-[#11222a] py-5 sm:py-7 lg:py-9"
    >
      <div className="photo-marquee-viewport overflow-hidden">
        <div className={cn('photo-marquee-track flex w-max', ready && 'photo-marquee-track--ready')}>
          <PhotoSet active={active} onImageReady={markImageReady} />
          <PhotoSet duplicate active={active} onImageReady={markImageReady} />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[14vw] min-w-16 max-w-56 bg-gradient-to-r from-[#11222a] via-[#11222a]/78 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[14vw] min-w-16 max-w-56 bg-gradient-to-l from-[#11222a] via-[#11222a]/78 to-transparent"
      />
    </section>
  );
}
