import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Eye,
  Plus,
  RefreshCw,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './site-footer';
import { Globe, type GlobeConfig } from '@/components/ui/globe-feature-section';
import { ExpandButton } from '@/components/ui/expand-button';
import { CLIENTS } from '@/lib/clients';
import { CTA_HREF, CTA_LABEL, DUBAI_ADDRESS_LINE, FOUNDER, SCALE_PROOF } from '@/lib/site';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   ABOUT — built as PUSHWebb's production document rather than an
   agency manifesto: ruled register sheets (label left, value right),
   hairlines instead of card borders, one navy band, and the crew,
   the loop and the client slate all named on one page.
──────────────────────────────────────────────────────────────── */

/** The masthead fact sheet — the header block of a call sheet. */
const MASTHEAD_FACTS = [
  { label: 'Operating base', value: 'Dubai, UAE' },
  { label: 'Team', value: '16+ specialists' },
  { label: 'Output', value: '1,500+ videos / month' },
];

const DIFFERENTIATORS = [
  {
    icon: Eye,
    title: 'Audience Before Output',
    description: 'We start with what people will actually choose to watch, engage with, and remember.',
  },
  {
    icon: Workflow,
    title: 'Strategy + Execution, Together',
    description: 'The thinking behind the work stays connected to the team responsible for creating and delivering it.',
  },
  {
    icon: TrendingUp,
    title: 'Built for High Volume',
    description: 'We build repeatable workflows that support higher content output while maintaining consistency and quality.',
  },
  {
    icon: BarChart3,
    title: 'Performance Feeds Creativity',
    description: 'Performance insights help us understand what is working and make better decisions about what comes next.',
  },
  {
    icon: Bot,
    title: 'AI Where It Actually Helps',
    description: 'We use AI to reduce repetitive work, improve efficiency, and strengthen workflows without replacing human strategy and creative judgment.',
  },
  {
    icon: Users,
    title: 'One Team. One Owner.',
    description: 'From planning and production to publishing and optimisation, we keep the process connected so there are fewer gaps between strategy and execution.',
  },
];

/** The loop every engagement runs on — the visible form of the Scaling System. */
const OPERATING_LOOP = [
  'Strategy',
  'Research',
  'Script',
  'Produce',
  'Edit',
  'QA',
  'Publish',
  'Analyse',
];

const TEAM = [
  {
    name: FOUNDER.name,
    role: FOUNDER.role,
    bio: 'Spent over six years at BeerBiceps leading end-to-end content and YouTube operations across research, planning, production, post production, publishing and channel growth. That experience shaped the systems behind PUSHWebb.',
  },
  {
    name: 'Pragyansh',
    role: 'Co Founder',
    bio: 'Six years alongside Mrigank inside the same BeerBiceps content operation. Keeps research, scripting, editing, design and publishing moving through one pipeline rather than separate handoffs.',
  },
  {
    name: 'Bhavishya',
    role: 'Operations',
    bio: 'Runs the day-to-day: scheduling, resourcing and the quality checks every piece of content passes through before it reaches a client.',
  },
];

/** Selective proof — context for the team's experience, not the full roster.
 *  Logos come from the shared roster so a name is never duplicated here. */
const BUILT_ALONGSIDE = [
  'BeerBiceps',
  'Sri Mandir',
  'Sarthak Sachdeva',
  'TribeVibe',
  'BookMyShow',
  'The Lalit',
].map((name) => CLIENTS.find((client) => client.name === name)!);

const FAQS = [
  {
    question: 'What exactly does PUSHWebb do?',
    answer: 'PUSHWebb is a content, creative, performance and AI agency serving brands, creators and organisations from Dubai. PUSHWebb provides YouTube management, short form content, video production, post production, social media management, performance creative and AI content production.',
  },
  {
    question: 'Who does PUSHWebb typically work with?',
    answer: 'Creators, brands, businesses, marketing teams and agencies — from founders building a first channel to in-house teams that need more output than they can produce internally.',
  },
  {
    question: 'What makes PUSHWebb different from a traditional content agency?',
    answer: 'Most agencies sell deliverables. We build the operating system behind them, so strategy, production, distribution, performance and technology run as one connected process instead of separate teams handing work to each other.',
  },
  {
    question: 'Can PUSHWebb manage strategy and execution together?',
    answer: 'Yes. Strategy, planning, production, editing, publishing, campaign execution and optimisation sit under one roof, which is what keeps the thinking connected to the work.',
  },
  {
    question: 'Can PUSHWebb manage our complete YouTube operation?',
    answer: 'Yes. Our YouTube as a Service offering covers strategy, scripting, production, editing, thumbnails, publishing, optimisation and analytics.',
  },
  {
    question: 'Does PUSHWebb handle high volume video production?',
    answer: 'Yes. Our team delivers more than 1,500 videos a month through structured production workflows, with human review and quality control before anything is delivered.',
  },
  {
    question: 'How does PUSHWebb use AI without compromising creative quality?',
    answer: 'AI handles the repetitive layer — research support, repurposing, publishing, reporting and decision support. Strategy, storytelling and final judgment stay with people, and every output is reviewed before it goes out.',
  },
  {
    question: 'Does PUSHWebb work with clients in Dubai and the UAE?',
    answer: 'Yes. PUSHWebb operates in Dubai, UAE, and works with brands, creators and marketing teams throughout the Middle East and international markets.',
  },
  {
    question: 'Can we hire PUSHWebb for one service only?',
    answer: 'Yes. Clients can work with us for an individual service or combine several, depending on brand goals and what the internal team already covers.',
  },
  {
    question: 'How does a PUSHWebb engagement begin?',
    answer: 'Start with a strategy call. We first understand your goals, current setup and challenges, then recommend the most relevant service or working model.',
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
    { location: [25.2048, 55.2708], size: 0.12 },
    { location: [51.5074, -0.1278], size: 0.045 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [1.3521, 103.8198], size: 0.04 },
  ],
};

/** Small mono label used as a register heading throughout the document. */
function SheetLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft', className)}>
      {children}
    </p>
  );
}

function AboutMasthead() {
  return (
    <header className="relative border-b border-line bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
        {/* Document title line, then the statement, then the fact sheet. */}
        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
          <SheetLabel>About</SheetLabel>
          <SheetLabel className="text-right">Dubai · Global delivery</SheetLabel>
        </div>

        <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-10 md:pt-14">
          <div className="md:col-span-7">
            <h1 className="max-w-[24ch] font-display text-base font-bold normal-case leading-[1.35] tracking-[-0.01em] text-ink-soft sm:text-lg">
              PUSHWebb: A Content, Creative, Performance &amp; AI Agency
            </h1>

            {/* The brand line, ruled like a slate rather than set as gradient
                type: three statements, each on its own rule. */}
            <p className="mt-9 border-t border-line-strong">
              {['Strategy.', 'Story.', 'Growth.'].map((word, i) => (
                <span
                  key={word}
                  className={cn(
                    'display-caps block border-b border-line py-2.5 font-display text-[clamp(2.75rem,9vw,5.75rem)] leading-[0.92] tracking-[-0.035em]',
                    i === 2 ? 'text-accent-hover' : 'text-ink',
                  )}
                >
                  {word}
                </span>
              ))}
            </p>

            <div className="mt-9 max-w-[64ch] space-y-4">
              <p className="text-base leading-relaxed text-ink-soft">
                PUSHWebb is a content, creative, performance and AI agency built by operators who
                have spent years managing high volume content ecosystems for creators, brands and
                digital businesses.
              </p>
              <p className="text-base leading-relaxed text-ink-soft">
                From strategy and production to distribution, performance and AI, we connect the
                entire content operation under one system.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/work"
                className="inline-flex h-[54px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-paper  items-center justify-center gap-2.5 rounded-lg bg-ink px-8 text-sm font-semibold text-paper no-underline transition-colors duration-200 hover:bg-accent-hover"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
              <ExpandButton href={CTA_HREF} label={CTA_LABEL} />
            </div>
          </div>

          {/* Fact sheet + one plate of the studio at work */}
          <aside className="md:col-span-4 md:col-start-9">
            <dl className="border-t border-line-strong">
              {MASTHEAD_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {fact.label}
                  </dt>
                  <dd className="font-display text-sm font-semibold tracking-[-0.01em] text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <figure className="mt-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/pushwebb-assets/generated/team-studio.jpg"
                  alt="The PUSHWebb team reviewing footage in the studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                Review — every cut is checked by a person
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </header>
  );
}

function BuiltByOperatorsSection() {
  return (
    <section className="border-b border-line bg-paper px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <SheetLabel className="mb-6">Built by operators</SheetLabel>
            <h2 className="max-w-[14ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              We learned content by operating it at scale.
            </h2>
          </div>

          <div className="max-w-[68ch] space-y-5 md:col-span-6 md:col-start-7">
            <p className="text-base leading-relaxed text-ink-soft">
              Before PUSHWebb, our founders spent years inside high volume creator and YouTube
              operations, working across research, planning, production, post production,
              publishing and channel growth.
            </p>
            <p className="text-base leading-relaxed text-ink-soft">
              That experience shaped how PUSHWebb works today: fewer disconnected teams, clearer
              workflows, stronger quality control and systems designed to scale without creating
              operational chaos.
            </p>
          </div>
        </div>

        {/* Figures as a measured register, not four cards */}
        <dl className="mt-14 grid grid-cols-2 gap-px border-y border-line-strong bg-line-strong lg:grid-cols-4">
          {SCALE_PROOF.map((item) => (
            <div key={item.label} className="bg-paper px-5 py-7 sm:px-7">
              <dt className="font-display text-[clamp(2.2rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                {item.value}
              </dt>
              <dd className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function AskAnswerBand() {
  return (
    <div className="on-dark dark-zone">
      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <SheetLabel className="mb-6">You ask</SheetLabel>
            <h2 className="max-w-[18ch] font-display text-[clamp(2.1rem,4.6vw,3.75rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] text-ink">
              Why does content get harder as you scale?
            </h2>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <SheetLabel className="mb-6">We answer</SheetLabel>
            <div className="max-w-[66ch] space-y-5 border-t border-line pt-6">
              <p className="text-base leading-relaxed text-ink-soft">
                Because more content usually means more people, more tools, more approvals and more
                room for things to break.
              </p>
              <p className="text-base font-semibold leading-relaxed text-ink">
                PUSHWebb builds the operating system behind the work, connecting strategy,
                production, distribution, performance and technology so scale creates momentum
                instead of complexity.
              </p>
            </div>
          </div>
        </div>

        {/* The page's quiet beat before the loop */}
        <div className="mx-auto mt-20 max-w-[1240px] border-t border-line pt-14 md:mt-28 md:pt-20">
          <h2 className="mx-auto max-w-[22ch] text-center font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold uppercase leading-[1] tracking-[-0.035em] text-ink">
            Strategy becomes story. Story becomes momentum.
          </h2>
          <p className="mx-auto mt-8 max-w-[62ch] text-center text-base leading-relaxed text-ink-soft">
            We turn strategy into repeatable content workflows, then use performance to make every
            cycle smarter. The result is more consistent execution without sacrificing creativity,
            judgment or quality.
          </p>
        </div>
      </section>
    </div>
  );
}

function OperatingSystemSection() {
  return (
    <section className="border-b border-line bg-paper px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <SheetLabel className="mb-6">The system</SheetLabel>
            <h2 className="max-w-[13ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              The PUSHWebb Operating System
            </h2>
          </div>
          <div className="max-w-[64ch] md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-ink-soft">
              Every output is part of the same loop. Performance from one cycle informs the strategy
              behind the next.
            </p>
          </div>
        </div>

        {/* The loop, with the highlight walking the stages on a shared clock —
            the page's one authored motion moment. Reduced motion stops it. */}
        <ol
          aria-label="The PUSHWebb operating loop"
          className="mt-12 flex flex-wrap items-center gap-x-1.5 gap-y-2.5 border-t border-line-strong pt-10"
        >
          {OPERATING_LOOP.map((stage, i) => (
            <li key={stage} className="flex items-center gap-1.5">
              <span
                className="workflow-step rounded-full border border-line-strong bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ink sm:px-3.5 sm:text-xs"
                style={{ animationDelay: `${i}s` }}
              >
                {stage}
              </span>
              <ArrowRight aria-hidden className="h-3.5 w-3.5 text-ink-soft" />
            </li>
          ))}
          <li>
            <span
              className="workflow-step workflow-step--loop inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-gold-dark sm:px-3.5 sm:text-xs"
              style={{ animationDelay: `${OPERATING_LOOP.length}s` }}
            >
              <RefreshCw aria-hidden className="h-3 w-3" />
              Repeat
            </span>
          </li>
        </ol>

        <figure className="mt-12 grid gap-4 sm:grid-cols-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:col-span-8 sm:aspect-[16/9]">
            <Image
              src="/pushwebb-assets/generated/ai-workflow.jpg"
              alt="PUSHWebb editors working through an AI-assisted content workflow"
              fill
              sizes="(max-width: 640px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:col-span-4 sm:aspect-auto">
            <Image
              src="/pushwebb-assets/generated/strategy-blueprint.jpg"
              alt="A PUSHWebb content strategy blueprint being developed"
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}

function DifferentSection() {
  return (
    <section className="border-b border-line bg-surface px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <h2 className="max-w-[12ch] font-display text-[clamp(2.1rem,4.6vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
                More than an agency. A system behind the work.
              </h2>
              <p className="mt-7 max-w-[56ch] text-base leading-relaxed text-ink-soft">
                We bring strategy, production, performance, and technology together so your content
                works as one connected growth system, not a collection of disconnected deliverables.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover"
              >
                Explore our services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="border-t border-line-strong md:col-span-6 md:col-start-7">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group grid gap-3 border-b border-line py-6 sm:grid-cols-[28px_1fr] sm:gap-5"
                >
                  <Icon
                    className="mt-1 h-4 w-4 text-ink-soft transition-colors duration-200 group-hover:text-accent-hover"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-[-0.01em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
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

function CrewSection() {
  return (
    <section id="team" className="border-b border-line bg-paper px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SheetLabel className="mb-6">The people behind PUSHWebb</SheetLabel>
            <h2 className="max-w-[15ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              Built by people who have led content at scale.
            </h2>
          </div>
          <div className="max-w-[58ch] md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-base leading-relaxed text-ink-soft">
              16+ specialists across strategy, research, writing, editing, design, social media,
              YouTube and AI production.
            </p>
          </div>
        </div>

        {/* Crew list, not portrait cards — the monogram holds the slot until
            real photography lands, rather than standing in with stock. */}
        <div className="mt-14 border-t border-line-strong">
          {TEAM.map((person) => (
            <article
              key={person.name}
              className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <div className="flex items-center gap-4 md:col-span-4">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-xs font-bold tracking-[0.04em] text-ink-soft"
                >
                  {person.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-[-0.02em] text-ink sm:text-2xl">
                  {person.name}
                </h3>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark md:col-span-3">
                {person.role}
              </p>
              <p className="max-w-[62ch] text-sm leading-relaxed text-ink-soft md:col-span-5">
                {person.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltAlongsideSection() {
  return (
    <section className="border-b border-line bg-surface px-5 py-20 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-5 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[20ch] font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold uppercase leading-[1] tracking-[-0.03em] text-ink">
            Built Alongside
          </h2>
          <Link
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
          >
            See Our Work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* A slate of real logos — the proof the names alone can't carry. */}
        <ul className="grid gap-px bg-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {BUILT_ALONGSIDE.map((client) => (
            <li key={client.name} className="group bg-surface transition-colors duration-200 hover:bg-surface-hover">
              <div className="flex items-center gap-4 px-4 py-5 sm:px-6 sm:py-6">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-white">
                  <Image
                    src={client.src}
                    alt={`${client.name} logo`}
                    width={48}
                    height={48}
                    className={cn(
                      'h-full w-full transition-transform duration-500 ease-out group-hover:scale-105',
                      client.kind === 'mark' ? 'object-contain p-[8%]' : 'object-cover',
                    )}
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold uppercase tracking-[-0.01em] text-ink sm:text-base">
                    {client.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    {client.category}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section id="locations" className="overflow-hidden border-b border-line bg-paper px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <SheetLabel className="mb-6">Where we operate</SheetLabel>
            <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              Operating in Dubai
            </h2>
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-ink-soft">
              PUSHWebb works with creators, brands, agencies and marketing teams across the UAE and
              international markets through a connected production and growth model.
            </p>

            <dl className="mt-9 border-t border-line-strong">
              <div className="border-b border-line py-4">
                <dt className="font-display text-sm font-bold uppercase tracking-[-0.01em] text-ink">
                  Dubai, UAE
                  <span className="ml-3 font-mono text-[10px] font-normal tracking-[0.16em] text-gold-dark">
                    Operating base
                  </span>
                </dt>
                <dd className="mt-2 max-w-[56ch] text-sm leading-relaxed text-ink-soft">
                  A regional hub for brand storytelling, creator work, and paid media across the
                  Middle East.
                </dd>
                <dd className="mt-2 font-mono text-[11px] leading-relaxed text-ink-soft">
                  <address className="not-italic">{DUBAI_ADDRESS_LINE}</address>
                </dd>
              </div>
            </dl>
          </div>

          {/* Globe renders absolutely positioned, so the caption sits outside
              its square or it paints over the sphere. */}
          <div className="md:col-span-6 md:col-start-7">
            <div className="relative mx-auto aspect-square w-full max-w-[540px]">
              <Globe config={GLOBE_CONFIG} />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Drag the globe to explore
            </p>
          </div>
        </div>

        {/* Plain-language entity statement — written for search engines and AI
            systems rather than for the visual hierarchy. */}
        <p className="mt-14 max-w-[72ch] border-t border-line pt-8 text-sm leading-relaxed text-ink-soft">
          PUSHWebb is a content, creative, performance and AI agency operating in Dubai, UAE. The
          company works with creators, brands, businesses and marketing teams across
          YouTube, short form content, video production, social media, paid performance and AI
          content workflows.
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-paper px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              Questions, answered.
            </h2>
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
              Everything you need to know before we start building your growth system.
            </p>
          </div>
        </div>

        <div className="border-t border-line-strong md:col-span-7 md:col-start-6">
          {FAQS.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-bold uppercase tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent-hover focus-visible:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&::-webkit-details-marker]:hidden sm:text-lg">
                {item.question}
                <Plus className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45 group-open:text-accent-hover" />
              </summary>
              <p className="max-w-[68ch] pb-6 pr-8 text-sm leading-relaxed text-ink-soft md:text-[15px]">
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
      <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 md:py-28">
        <Image
          src="/pushwebb-assets/generated/paid-campaign-review.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="-z-20 object-cover opacity-40 grayscale"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />

        <div className="mx-auto w-full max-w-[1240px]">
          <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-ink">
            Ready to build a content system that can scale with your business?
          </h2>

          <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
            <p className="max-w-[62ch] text-base leading-relaxed text-ink-soft md:col-span-7">
              Whether you need one capability or the full content operation, we can build around
              where your business is today and where it needs to go next.
            </p>
            <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-9 md:items-end">
              <Link
                href={CTA_HREF}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 font-display text-sm font-semibold text-[#060d1d] no-underline transition-colors duration-200 hover:bg-[#eaeaea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="bg-paper">
      <NavbarModernBlock />
      <main>
        <AboutMasthead />
        <BuiltByOperatorsSection />
        <AskAnswerBand />
        <OperatingSystemSection />
        <DifferentSection />
        <CrewSection />
        <BuiltAlongsideSection />
        <LocationsSection />
        <FaqSection />
        <AboutClose />
      </main>
      {/* Outside <main> so the footer stays the contentinfo landmark. Flat
          ground rather than a second dark-zone: stacking two restarts the
          gradient and seams where the bands meet. */}
      <div className="on-dark bg-[#050b1c]">
        <Footer />
      </div>
    </div>
  );
}
