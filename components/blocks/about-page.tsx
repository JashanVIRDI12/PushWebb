import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Eye,
  MapPin,
  Plus,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './site-footer';
import { Globe, type GlobeConfig } from '@/components/ui/globe-feature-section';
import { TextColor } from '@/components/ui/text-color';
import { ExpandButton } from '@/components/ui/expand-button';

const DIFFERENTIATORS = [
  {
    icon: Eye,
    title: 'Audience-led content',
    description: 'We start with what people will actually choose to watch, engage with, and remember.',
  },
  {
    icon: Workflow,
    title: 'Strategy meets execution',
    description: 'The thinking behind the work stays connected to the team responsible for creating and delivering it.',
  },
  {
    icon: TrendingUp,
    title: 'Designed for growth',
    description: 'We build repeatable workflows that support higher content output while maintaining consistency and quality.',
  },
  {
    icon: BarChart3,
    title: 'Data behind creativity',
    description: 'Performance insights help us understand what is working and make better decisions about what comes next.',
  },
  {
    icon: Bot,
    title: 'AI that brings value',
    description: 'We use AI to reduce repetitive work, improve efficiency, and strengthen workflows without replacing human strategy and creative judgment.',
  },
  {
    icon: Users,
    title: 'End-to-end ownership',
    description: 'From planning and production to publishing and optimisation, we keep the process connected so there are fewer gaps between strategy and execution.',
  },
];

const FAQS = [
  {
    question: 'What does PUSHWebb do?',
    answer: 'PUSHWebb is a creative and AI-powered marketing agency working across YouTube, short-form content, social media marketing, paid campaigns, performance marketing, and AI automation.',
  },
  {
    question: 'Does PUSHWebb handle both strategy and execution?',
    answer: 'Yes. PUSHWebb combines strategy, planning, production, editing, publishing, campaign execution, and optimisation under one roof to support growth.',
  },
  {
    question: 'Does PUSHWebb provide complete YouTube management?',
    answer: 'Yes. Our YouTube as a Service offering can cover strategy, scripting, production, editing, thumbnails, publishing, optimisation, and analytics.',
  },
  {
    question: 'Does PUSHWebb create short-form and social media content?',
    answer: 'Yes. We create short-form content for platforms including Instagram Reels, YouTube Shorts, and TikTok, along with broader social media planning and creative execution.',
  },
  {
    question: 'Does PUSHWebb work with clients outside India?',
    answer: 'Yes. PUSHWebb works with clients across markets and is expanding its presence in Dubai to work more closely with brands and creators across the UAE.',
  },
  {
    question: 'How does PUSHWebb use AI?',
    answer: 'We use AI to improve suitable content and marketing workflows, including research, repurposing, publishing, repetitive tasks, reporting, and decision support.',
  },
  {
    question: 'Can we work with PUSHWebb for only one service?',
    answer: 'Yes. Clients can work with us for an individual service or combine multiple services depending on their brand goals and internal capabilities.',
  },
  {
    question: 'How do we start working with PUSHWebb?',
    answer: 'Start with a strategy call. We first understand your goals, current setup, and challenges, then recommend the most relevant service or working model.',
  },
];

const GLOBE_CONFIG: GlobeConfig = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 0,
  diffuse: 0.42,
  mapSamples: 16000,
  mapBrightness: 1.15,
  baseColor: [0.92, 0.93, 0.95],
  markerColor: [30 / 255, 47 / 255, 168 / 255],
  glowColor: [0.85, 0.88, 0.95],
  markers: [
    { location: [19.076, 72.8777], size: 0.12 },
    { location: [25.2048, 55.2708], size: 0.1 },
    { location: [28.6139, 77.209], size: 0.06 },
    { location: [12.9716, 77.5946], size: 0.055 },
    { location: [51.5074, -0.1278], size: 0.045 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [1.3521, 103.8198], size: 0.04 },
  ],
};

function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pb-16 pt-14 md:pb-24 md:pt-20">
      {/* Faint scanline texture — broadcast/monitor atmosphere, kept subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #0B1A2B 0px, #0B1A2B 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center md:px-8">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
          PUSHWebb / About &nbsp;·&nbsp; India — Dubai
        </p>

        <TextColor words={['Strategy.', 'Story.', 'Growth.']} />

        <div className="mx-auto mt-10 max-w-xl space-y-3">
          <p className="text-sm leading-relaxed text-ink-soft md:text-base">
            PUSHWebb is a creative and AI-driven marketing agency built for brands, creators, and
            businesses that want more than content — they want growth.
          </p>
          <p className="text-sm leading-relaxed text-ink-soft md:text-base">
            We do not just produce content. We build it around a clear purpose, bringing together
            strategy, storytelling, production, performance, and technology as one connected system.
          </p>
        </div>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex h-[54px] select-none items-center justify-center gap-2.5 rounded-lg bg-ink px-8 text-sm font-semibold text-paper no-underline transition-all duration-200 hover:bg-ink/90 active:scale-[0.97]"
          >
            Book a Strategy Call
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
          <ExpandButton href="/#services" label="Explore Our Work" />
        </div>
      </div>
    </section>
  );
}
function ConnectedSystemSection() {
  return (
    <section className="bg-paper px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-12 md:gap-10">
        <div className="space-y-6 md:col-span-5">
          <p className="text-base leading-relaxed text-ink-soft">
            Our focus is on creating flexible content systems that link ideas, execution, data, and AI-driven workflows into one process, going beyond isolated deliverables.
          </p>
          <p className="text-base leading-relaxed text-ink-soft">
            From YouTube and Instagram to podcasts, social media, and paid campaigns, we help teams plan better, create more consistently, and make every piece of content work harder across platforms.
          </p>
          <p className="text-base leading-relaxed text-ink-soft">
            Your content needs to grow with your brand. That is where we bring clearer workflows, smarter execution, and systems that are easier to manage. The aim is to build a smart content engine that scales over time without losing quality, creativity, or consistency.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl sm:row-span-2">
            <Image
              src="/pushwebb-assets/generated/video-production.jpg"
              alt="A PUSHWebb video production in progress"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
            <Image
              src="/pushwebb-assets/generated/strategy-blueprint.jpg"
              alt="A content strategy blueprint being developed"
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
            <Image
              src="/pushwebb-assets/generated/performance-analytics.jpg"
              alt="A marketing performance review"
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="max-w-[10ch] text-[clamp(2.8rem,5.8vw,5.5rem)] leading-[0.88] tracking-[-0.035em] text-ink">
            You ask. We answer.
          </h2>
        </div>

        <div className="space-y-6 border-t border-line pt-7 md:col-span-6 md:col-start-7">
          <p className="text-base leading-relaxed text-ink-soft">
            We believe the brands that grow consistently are the ones that bring together strong creative thinking with clear systems behind it.
          </p>
          <p className="text-base leading-relaxed text-ink-soft">
            Our vision is to help brands move away from scattered execution, unorganised teams, and one-off content. Instead, we build structured ecosystems where strategy, creative, performance, and technology work together with a clear goal.
          </p>
          <p className="text-base leading-relaxed text-ink-soft">
            This helps teams create with more purpose, understand what is working, improve what is not, and build repeatable processes around the ideas that perform best.
          </p>
          <p className="text-base font-semibold leading-relaxed text-ink">
            The goal is not simply to produce more content. It is to create better, learn faster, work smarter, and build systems that can grow with the brand over time.
          </p>
        </div>
      </div>
    </section>
  );
}

function MomentumPlane() {
  return (
    <section
      className="border-t border-line px-5 py-24 sm:px-8 md:py-36"
      aria-label="How momentum grows"
    >
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
          How momentum grows
        </p>
        <h2 className="mx-auto max-w-[18ch] text-center text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink">
          We build systems that help brands grow.{' '}
          <span className="text-accent">Strategy</span> becomes{' '}
          <span className="text-accent">story</span>. Story becomes{' '}
          <span className="text-accent">momentum</span>.
        </h2>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="bg-paper px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 className="max-w-[10ch] text-[clamp(2.8rem,5.6vw,5.25rem)] leading-[0.88] tracking-[-0.035em] text-ink">
              Create better. Grow smarter.
            </h2>
          </div>
          <div className="space-y-6 md:col-span-6 md:col-start-7">
            <p className="text-base leading-relaxed text-ink-soft">
              Our mission is to remove unnecessary complexity from content and marketing so brands can work with more clarity, consistency, and purpose. We bring structure to the process, from planning and creative execution to publishing, performance, and ongoing optimisation.
            </p>
            <p className="text-base leading-relaxed text-ink-soft">
              We build clearer workflows, stronger creative systems, and more efficient ways of working across platforms. The aim is to help teams spend less time managing disconnected processes and more time creating work that helps the brand grow.
            </p>
            <p className="text-base leading-relaxed text-ink-soft">
              By combining creativity with data, technology, and AI-powered processes, we make execution faster and more informed without losing the judgment, storytelling, and strategic thinking that strong content depends on.
            </p>
          </div>
        </div>

        <div className="relative mt-16 aspect-[16/7] min-h-[320px] w-full overflow-hidden rounded-2xl">
          <Image
            src="/pushwebb-assets/generated/ai-workflow.jpg"
            alt="The PUSHWebb team working through an AI-assisted content workflow"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function DifferentSection() {
  return (
    <section className="border-y border-line bg-surface px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 className="max-w-[12ch] text-[clamp(2.7rem,5.2vw,5rem)] leading-[0.9] tracking-[-0.035em] text-ink">
              More than an agency. A system behind the work.
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft">
              We bring strategy, production, performance, and technology together so your content works as one connected growth system, not a collection of disconnected deliverables.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Explore our services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-line md:col-span-6 md:col-start-7">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="grid gap-4 border-b border-line py-7 sm:grid-cols-[44px_1fr] sm:gap-6 md:py-8">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  <div className="grid gap-3 lg:grid-cols-2 lg:gap-8">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section id="locations" className="overflow-hidden bg-paper px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.92] tracking-[-0.03em] text-ink">
              Built in India. Growing through Dubai. Working beyond both.
            </h2>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              PUSHWebb works with brands, creators, and marketing teams across India and the UAE, with a connected model built to travel across markets and platforms.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-ink-muted">
              <MapPin className="h-4 w-4 text-accent" /> Drag the globe to explore
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px] md:col-span-7">
            <Globe config={GLOBE_CONFIG} />
          </div>
        </div>

        <div className="mt-12 grid border-t border-line sm:grid-cols-2">
          <div className="border-b border-line py-7 sm:border-b-0 sm:border-r sm:pr-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">India</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                  Headquarters and studio for creative production, content pipelines, and full-funnel marketing systems.
                </p>
              </div>
              <span className="text-xs font-semibold text-accent">HQ</span>
            </div>
          </div>
          <div className="py-7 sm:pl-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Dubai, UAE</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                  A growing regional hub for brand storytelling, creator work, and paid media across the Middle East.
                </p>
              </div>
              <span className="text-xs font-semibold text-accent">UAE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="border-t border-line bg-paper px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-4">
          <h2 className="text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.03em] text-ink">
            Questions, answered.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
            Everything you need to know before we start building your growth system.
          </p>
        </div>

        <div className="border-t border-line md:col-span-7 md:col-start-6">
          {FAQS.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-semibold tracking-[-0.01em] text-ink focus-visible:outline-none focus-visible:text-accent [&::-webkit-details-marker]:hidden sm:text-xl">
                {item.question}
                <Plus className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45 group-open:text-accent" />
              </summary>
              <p className="max-w-2xl pb-7 pr-10 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutClose() {
  return (
    <div className="on-dark dark-zone">
      <section className="relative isolate min-h-[720px] overflow-hidden px-5 py-24 sm:px-8 md:flex md:items-end md:py-32">
        <Image
          src="/pushwebb-assets/generated/paid-campaign-review.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="-z-20 object-cover opacity-25 grayscale"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />

        <div className="mx-auto w-full max-w-[1240px]">
          <h2 className="max-w-[13ch] text-[clamp(3rem,7vw,6rem)] leading-[0.86] tracking-[-0.035em] text-ink">
            Ready to build a better growth system?
          </h2>
          <div className="mt-10 grid gap-8 border-t border-line pt-7 md:grid-cols-12">
            <div className="space-y-4 md:col-span-7">
              <p className="max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
                Great content is not just about posting more. It is about knowing what to create, how to reach the right audience, and how to improve what works.
              </p>
              <p className="max-w-2xl text-sm font-semibold leading-relaxed text-ink md:text-base">
                PUSHWebb helps turn your content into a better growth system.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-6 font-display text-sm font-semibold text-paper no-underline transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="bg-paper">
      <NavbarModernBlock />
      <main>
        <AboutHero />
        <ConnectedSystemSection />

        {/* Navy band — the same dark-zone treatment the home and contact pages use */}
        <div className="on-dark dark-zone">
          <VisionSection />
          <MomentumPlane />
        </div>

        <MissionSection />
        <DifferentSection />
        <LocationsSection />
        <FaqSection />
        <AboutClose />
      </main>
    </div>
  );
}
