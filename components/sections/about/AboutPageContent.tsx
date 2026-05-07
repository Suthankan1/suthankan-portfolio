"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Compass,
  Download,
  Flame,
  GraduationCap,
  Handshake,
  Heart,
  Lightbulb,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { Tag } from "../../ui/Tag";
import { BLUR_DATA_URL } from "../../../lib/images";
import { cn } from "../../../lib/utils";
import { WakaTimeStats } from "./WakaTimeStats";

const TIMELINE = [
  { year: "2003", title: "Born", description: "The beginning of the story in Sri Lanka." },
  { year: "2019", title: "GCE O/L completed", description: "Completed Ordinary Level examinations with 9A results." },
  { year: "2020", title: "First line of code", description: "Started programming and discovered the craft of building software." },
  { year: "2023", title: "GCE A/L completed", description: "Completed Advanced Level examinations with 2A and C results." },
  { year: "2024", title: "University entered", description: "Started my IT undergraduate journey at the University of Moratuwa." },
  { year: "2025", title: "Level 1 hardware project completed", description: "Completed my first university hardware project milestone." },
  { year: "2026", title: "Level 2 software project in progress", description: "Currently building Planora as my Level 2 software project." },
] as const;

const VALUES = [
  {
    title: "Craftsmanship",
    icon: Sparkles,
    description:
      "I care deeply about detail, from architecture to micro-interactions. Great software should feel intentional at every layer.",
  },
  {
    title: "Curiosity",
    icon: Compass,
    description:
      "I explore new tools, patterns, and ideas constantly. Learning is how I stay sharp and create better outcomes.",
  },
  {
    title: "Impact",
    icon: Rocket,
    description:
      "I focus on work that solves real problems and improves lives. Shipping useful products matters more than shipping noise.",
  },
  {
    title: "Authenticity",
    icon: Heart,
    description:
      "I show up as myself in work and communication. Honest collaboration builds stronger products and better relationships.",
  },
] as const;

const FUN_FACTS = [
  "I plan trips with the same precision I plan architecture.",
  "I keep a notebook of UI patterns spotted while traveling.",
  "I enjoy refactoring almost as much as building from scratch.",
  "I can spend hours tuning typography on a single section.",
  "I collect coffee stories from every city I visit.",
] as const;

function SectionReveal({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
}

function ValueCard({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState<CSSProperties>({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });

  function onMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;

    setTilt({
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
    });
  }

  function onLeave() {
    setTilt({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });
  }

  return (
    <motion.article
      className="rounded-lg border border-border bg-bg-secondary p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.06 }}
    >
      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-primary text-accent-primary">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-text-secondary">{description}</p>
    </motion.article>
  );
}

export function AboutPageContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <SectionReveal className="relative overflow-hidden border-b border-border bg-[linear-gradient(120deg,color-mix(in_srgb,var(--accent-primary)_12%,var(--bg-secondary))_0%,var(--bg-primary)_45%,var(--bg-secondary)_100%)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-12 lg:py-28">
          <div className="space-y-6">
            <p className="type-accent-label text-accent-primary">ABOUT</p>
            <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              I'm Suthankan.
            </h1>
            <p className="text-xl font-medium tracking-tight text-text-secondary sm:text-2xl">
              IT undergrad. Full-stack builder. World traveller.
            </p>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary">
              I craft digital products that feel sharp, useful, and human. My work blends
              strong engineering with editorial design thinking.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="relative aspect-square overflow-hidden rounded-4xl border border-border bg-bg-tertiary p-2">
              <div className="absolute inset-2 rounded-[1.6rem] border-2 border-accent-primary/70" />
              <Image
                src="/images/profile/my-photo.jpeg"
                alt="Portrait of Suthankan"
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 70vw"
                className="rounded-[1.45rem] object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>

            <div className="absolute -top-4 -left-4 rounded-full border border-border bg-bg-primary px-3 py-1 text-sm font-medium text-text-primary shadow-sm">
              Sri Lanka 🇱🇰
            </div>
            <div className="absolute -right-4 bottom-6 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_40%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] px-3 py-1 text-sm font-medium text-text-primary shadow-sm">
              Available
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-12 lg:py-24">
        <blockquote className="mb-8 border-l-4 border-accent-primary pl-5 font-display text-3xl italic leading-tight tracking-tight text-text-primary sm:text-4xl lg:mb-0">
          "I build at the intersection of engineering precision and human storytelling."
        </blockquote>

        <div className="space-y-5 text-base leading-8 text-text-secondary sm:text-lg">
          <p>
            I grew up being curious about how things work, from everyday gadgets to websites.
            That curiosity slowly became a habit of taking things apart and rebuilding them better.
          </p>
          <p>
            Coding started as an experiment and quickly became a craft. Once I shipped my first
            project, I realized software could be both technically rigorous and emotionally clear.
          </p>
          <p>
            Today, I am driven by impact: creating products people genuinely use, learning fast,
            and documenting lessons through writing and travel-led perspective.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="mb-7">
          <p className="type-accent-label text-accent-primary">WHAT I STAND FOR</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Values that guide my work</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              Icon={value.icon}
              index={index}
            />
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mb-8">
          <p className="type-accent-label text-accent-primary">THE JOURNEY</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Life timeline</h2>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border lg:left-1/2" />

          <div className="space-y-8">
            {TIMELINE.map((event, index) => (
              <motion.div
                key={event.title}
                className={cn(
                  "relative pl-10 lg:pl-0",
                  index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]",
                )}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              >
                <span className="absolute left-0 top-3 h-2.5 w-2.5 rounded-full bg-accent-primary lg:left-1/2 lg:-translate-x-1/2" />

                <article className="rounded-lg border border-border bg-bg-secondary p-5">
                  <div className="inline-flex rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-text-muted">
                    {event.year}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{event.description}</p>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="mb-7">
          <p className="type-accent-label text-accent-primary">CURRENTLY</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What I'm focused on</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <motion.article
            className="rounded-lg border border-border bg-bg-secondary p-5"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Briefcase className="h-5 w-5 text-accent-primary" />
            <h3 className="mt-3 font-display text-2xl font-semibold">Building</h3>
            <p className="mt-2 text-sm leading-7 text-text-secondary">NexaFlow with a strong focus on architecture, clarity, and performance.</p>
          </motion.article>

          <motion.article
            className="rounded-lg border border-border bg-bg-secondary p-5"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.06 }}
          >
            <Lightbulb className="h-5 w-5 text-accent-primary" />
            <h3 className="mt-3 font-display text-2xl font-semibold">Learning</h3>
            <p className="mt-2 text-sm leading-7 text-text-secondary">Deepening my backend and infrastructure skills with Go and Kubernetes.</p>
          </motion.article>

          <motion.article
            className="rounded-lg border border-border bg-bg-secondary p-5"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.12 }}
          >
            <BookOpen className="h-5 w-5 text-accent-primary" />
            <h3 className="mt-3 font-display text-2xl font-semibold">Reading</h3>
            <p className="mt-2 text-sm leading-7 text-text-secondary">"Designing Data-Intensive Applications" and notes on scalable system design.</p>
          </motion.article>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <WakaTimeStats />
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="rounded-xl border border-border bg-bg-secondary p-6 sm:p-8">
          <p className="type-accent-label text-accent-primary">EDUCATION</p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                University of Moratuwa
              </h2>
              <p className="mt-2 text-sm text-text-secondary sm:text-base">
                IT Undergraduate • Entered: 2024
              </p>
            </div>
            <GraduationCap className="h-7 w-7 text-accent-primary" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Data Structures", "Software Engineering", "Database Systems", "Distributed Systems", "Human-Computer Interaction", "Cloud Computing"].map((course) => (
              <Tag key={course}>{course}</Tag>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="mb-6">
          <p className="type-accent-label text-accent-primary">FUN FACTS</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">A bit of personality</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {FUN_FACTS.map((fact, index) => (
            <motion.article
              key={fact}
              className="rounded-md border border-border bg-bg-secondary p-4 text-sm leading-6 text-text-secondary"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.04 }}
            >
              <Flame className="mb-2 h-4 w-4 text-accent-primary" />
              {fact}
            </motion.article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="rounded-xl border border-border bg-bg-secondary px-6 py-10 text-center sm:px-10">
          <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Interested in working together?
          </h2>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="/cv.pdf" download>
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Let's Connect
                <Handshake className="h-4 w-4" />
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
