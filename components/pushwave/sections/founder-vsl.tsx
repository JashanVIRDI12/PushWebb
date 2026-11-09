import { VSL } from '@/lib/pushwave/content';
import { AccordionItem } from '../ui/accordion';
import { PwButton } from '../ui/pw-button';
import { VslPlayer } from './vsl-player';

/**
 * TODO(founder-video): set this to the founder VSL embed URL (YouTube
 * "embed" link, Vimeo player link or an MP4). Until then the frame shows
 * the labelled placeholder.
 */
const FOUNDER_VIDEO_SRC = '';

/** 02 — Founder VSL. Its background opens from an inset card over the wave. */
export function FounderVsl() {
  return (
    <section id="vsl" aria-labelledby="vsl-title" className="pw-section relative bg-transparent">
      <div data-wipe className="absolute inset-0 -z-[1] bg-pw-void" aria-hidden />
      <div className="pw-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="vsl-title" className="pw-d2 lg:col-span-9" data-split>
            {VSL.headline}
          </h2>
          <p className="pw-lead lg:col-span-3 lg:pb-2" data-reveal>
            {VSL.subhead}
          </p>
        </div>

        <div className="mt-12 md:mt-16" data-reveal>
          <VslPlayer
            src={FOUNDER_VIDEO_SRC}
            title={VSL.videoTitle}
            placeholder={VSL.embedPlaceholder}
            meta={[
              { label: VSL.videoTitleLabel, value: VSL.videoTitle },
              { label: VSL.durationLabel, value: VSL.duration },
            ]}
          />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="border-y border-pw-line lg:col-span-7">
            <AccordionItem
              title={
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-pw-steel">{VSL.scriptTitle}</span>
                  <span className="pw-title text-pw-ink">Read the script</span>
                </span>
              }
            >
              <div className="max-w-[64ch] space-y-4 text-[1.0625rem] leading-relaxed text-pw-soft">
                {VSL.script.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </AccordionItem>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9" data-reveal>
            <PwButton cta={VSL.cta} />
            <p className="pw-fine">{VSL.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
