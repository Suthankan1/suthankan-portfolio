"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import {
  ArrowLeft,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Home,
  ChevronRight,
  Calendar,
  User,
  Layers,
  Lightbulb,
  Code2,
  Zap,
  Star,
  Users,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { GithubIcon } from "../../icons/GithubIcon";
import { type Project, projects } from "../../../lib/data/projects";
import { type CaseStudy } from "../../../lib/data/case-studies";
import { BLUR_DATA_URL } from "../../../lib/images";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

// ─── Animation helper (pure function, not a hook) ────────────────────────────

function fadeUp(delay = 0, prefersReduced = false) {
  if (prefersReduced) return {};
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.5, delay },
  } as const;
}

// ─── Mermaid placeholder ─────────────────────────────────────────────────────

function ArchitectureDiagram({ content }: { content: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3">
        <Code2 className="h-3.5 w-3.5 text-[var(--text-muted)]" />
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Architecture Diagram
        </span>
        <span className="ml-auto rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_30%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_8%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent-primary)]">
          mermaid
        </span>
      </div>
      <pre className="overflow-x-auto bg-[#0d0d0d] p-5 text-[13px] leading-6 text-[#b0b0b0]">
        <code className="font-mono">{content}</code>
      </pre>
    </div>
  );
}

// ─── Challenges accordion ────────────────────────────────────────────────────

function ChallengeItem({
  challenge,
  index,
  prefersReduced,
}: {
  challenge: CaseStudy["challenges"][number];
  index: number;
  prefersReduced: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      {...(prefersReduced
        ? {}
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.1 },
            transition: { duration: 0.45, delay: index * 0.07 },
          })}
      className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)]"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--text-primary)_3%,transparent)]"
        aria-expanded={open}
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_35%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] font-mono text-xs font-semibold text-[var(--accent-primary)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-lg font-semibold leading-snug tracking-tight text-[var(--text-primary)]">
          {challenge.title}
        </span>
        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]">
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-4 border-t border-[var(--border)] px-6 pb-6 pt-5">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">The Problem</p>
            <p className="leading-7 text-[var(--text-secondary)]">{challenge.context}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)]">The Solution</p>
            <p className="leading-7 text-[var(--text-secondary)]">{challenge.solution}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Feature screenshot grid ─────────────────────────────────────────────────

function FeatureShowcase({
  features,
  prefersReduced,
}: {
  features: CaseStudy["features"];
  prefersReduced: boolean;
}) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature, idx) => (
          <motion.button
            key={idx}
            {...(prefersReduced
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.1 },
                  transition: { duration: 0.45, delay: idx * 0.06 },
                })}
            onClick={() => {
              setLightboxIndex(idx);
              setLightboxOpen(true);
            }}
            className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
          >
            <div className="relative h-52 overflow-hidden bg-[var(--bg-tertiary)]">
              <Image
                src={feature.src}
                alt={feature.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0" />
              <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="bg-[var(--bg-secondary)] px-4 py-3">
              <p className="text-sm leading-snug text-[var(--text-secondary)]">{feature.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={features.map((f) => ({ src: f.src, alt: f.alt }))}
      />
    </>
  );
}

// ─── Related projects ─────────────────────────────────────────────────────────

function RelatedProjects({ currentProject }: { currentProject: Project }) {
  const related = projects.filter(
    (p) => p.slug !== currentProject.slug && p.category === currentProject.category,
  );
  const cards = related.length >= 2 ? related.slice(0, 3) : projects.filter((p) => p.slug !== currentProject.slug).slice(0, 3);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((project, idx) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: idx * 0.07 }}
        >
          <Card className="group overflow-hidden transition-all duration-300">
            <div className="relative h-44 overflow-hidden bg-[var(--bg-tertiary)]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div className="space-y-3 p-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {project.category}
                </p>
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.tagline}
                </p>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
              >
                View Case Study
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({
  label,
  title,
  icon: Icon,
  prefersReduced,
}: {
  label: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  prefersReduced: boolean;
}) {
  return (
    <motion.div {...fadeUp(0, prefersReduced)} className="mb-8 space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-[var(--accent-primary)]" />}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-primary)]">{label}</p>
      </div>
      <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[var(--text-primary)]">
        {title}
      </h2>
    </motion.div>
  );
}

// ─── Sidebar meta row ─────────────────────────────────────────────────────────

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-0.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{value}</p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ProjectCaseStudyContent({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  const prefersReduced = useReducedMotion() ?? false;

  const statusVariant =
    project.status === "Live"
      ? "live"
      : project.status === "In Development"
        ? "in-progress"
        : "archived";

  const formattedDate = new Date(project.builtAt + "-01").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const headerAnim = (delay: number) =>
    prefersReduced
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* ── Header strip ─────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-12">

          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            {...(prefersReduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } })}
            className="mb-8 flex items-center gap-1.5 text-sm text-[var(--text-muted)]"
          >
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-[var(--text-primary)]">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--border)]" />
            <Link href="/projects" className="transition-colors hover:text-[var(--text-primary)]">
              Projects
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--border)]" />
            <span className="text-[var(--text-secondary)]">{project.title}</span>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              {/* Badges */}
              <motion.div
                {...headerAnim(0.05)}
                className="mb-5 flex flex-wrap items-center gap-3"
              >
                <Badge variant={statusVariant}>{project.status}</Badge>
                {project.flagship && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_40%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                    <Zap className="h-3 w-3" />
                    Flagship
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                  <User className="h-3 w-3" />
                  {caseStudy.role.split("&")[0].trim()}
                </span>
                {project.stars && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                    <Star className="h-3 w-3" />
                    {project.stars.toLocaleString()} stars
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                {...(prefersReduced
                  ? {}
                  : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: 0.1 } })}
                className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[var(--text-primary)]"
              >
                {project.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                {...headerAnim(0.18)}
                className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl"
              >
                {project.tagline}
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              {...headerAnim(0.22)}
              className="flex flex-wrap gap-3"
            >
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="primary" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Body: sidebar + content ───────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16 xl:grid-cols-[280px_1fr]">

          {/* ── Sticky sidebar ─────────────────────────────────────────────── */}
          <aside>
            <motion.div
              {...(prefersReduced
                ? {}
                : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.15 } })}
              className="space-y-6 lg:sticky lg:top-28"
            >
              {/* Tech stack */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] p-5">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <Layers className="h-3.5 w-3.5" />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] p-5">
                <MetaRow icon={Calendar} label="Timeline" value={caseStudy.timeline} />
                <MetaRow icon={User} label="My Role" value={caseStudy.role} />
                <MetaRow icon={Users} label="Team" value={caseStudy.teamSize} />
                {project.liveUrl && (
                  <div>
                    <p className="mb-0.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      <ExternalLink className="h-3 w-3" />
                      Live URL
                    </p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sm font-medium text-[var(--accent-primary)] underline-offset-2 hover:underline"
                    >
                      {project.liveUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>

              {/* Back link */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </Link>
            </motion.div>
          </aside>

          {/* ── Main content ────────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-20">

            {/* 1. Overview */}
            <section>
              <SectionHeading label="Overview" title="What is it?" prefersReduced={prefersReduced} />
              <div className="space-y-4">
                {caseStudy.overview.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    {...(prefersReduced
                      ? {}
                      : {
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true, amount: 0.1 },
                          transition: { duration: 0.5, delay: idx * 0.08 },
                        })}
                    className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </section>

            {/* 2. Problem statement */}
            <section>
              <SectionHeading label="Context" title="The Problem" prefersReduced={prefersReduced} />
              <motion.div
                {...fadeUp(0, prefersReduced)}
                className="relative rounded-[var(--radius-lg)] border-l-4 border-l-[var(--accent-primary)] bg-[var(--bg-secondary)] py-6 pl-8 pr-6"
              >
                <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">{caseStudy.problem}</p>
              </motion.div>
            </section>

            {/* 3. Architecture */}
            <section>
              <SectionHeading label="Engineering" title="How It's Built" icon={Code2} prefersReduced={prefersReduced} />
              <div className="space-y-8">
                <motion.p {...fadeUp(0, prefersReduced)} className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  {caseStudy.architecture.description}
                </motion.p>

                <motion.div {...fadeUp(0.06, prefersReduced)}>
                  <ArchitectureDiagram content={caseStudy.architecture.diagram} />
                </motion.div>

                <motion.div
                  {...fadeUp(0.1, prefersReduced)}
                  className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]"
                >
                  <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Stack Breakdown
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)] text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          <th className="px-5 py-3 text-left">Layer</th>
                          <th className="px-5 py-3 text-left">Technology</th>
                          <th className="px-5 py-3 text-left">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caseStudy.architecture.stackBreakdown.map((row, idx) => (
                          <tr
                            key={idx}
                            className={cn(
                              "border-b border-[var(--border)] transition-colors hover:bg-[color-mix(in_srgb,var(--text-primary)_3%,transparent)]",
                              idx === caseStudy.architecture.stackBreakdown.length - 1 && "border-b-0",
                            )}
                          >
                            <td className="px-5 py-3.5 font-medium text-[var(--text-primary)]">{row.layer}</td>
                            <td className="px-5 py-3.5">
                              <span className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 py-0.5 font-mono text-xs text-[var(--text-secondary)]">
                                {row.technology}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-[var(--text-secondary)]">{row.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* 4. Feature showcase */}
            <section>
              <SectionHeading label="Features" title="Key Features" prefersReduced={prefersReduced} />
              <FeatureShowcase features={caseStudy.features} prefersReduced={prefersReduced} />
            </section>

            {/* 5. Challenges */}
            <section>
              <SectionHeading label="Engineering depth" title="Hard Problems I Solved" prefersReduced={prefersReduced} />
              <div className="space-y-4">
                {caseStudy.challenges.map((challenge, idx) => (
                  <ChallengeItem
                    key={idx}
                    challenge={challenge}
                    index={idx}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </div>
            </section>

            {/* 6. Lessons learned */}
            <section>
              <SectionHeading label="Reflection" title="Lessons Learned" icon={Lightbulb} prefersReduced={prefersReduced} />
              <div className="space-y-4">
                {caseStudy.lessons.map((lesson, idx) => (
                  <motion.div
                    key={idx}
                    {...(prefersReduced
                      ? {}
                      : {
                          initial: { opacity: 0, x: -16 },
                          whileInView: { opacity: 1, x: 0 },
                          viewport: { once: true, amount: 0.1 },
                          transition: { duration: 0.45, delay: idx * 0.07 },
                        })}
                    className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] p-5"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] text-xs font-bold text-[var(--text-primary)]">
                      {idx + 1}
                    </span>
                    <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{lesson}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ── Related projects ──────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <motion.div {...fadeUp(0, prefersReduced)} className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-primary)]">Continue Reading</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Related Projects
            </h2>
          </motion.div>
          <RelatedProjects currentProject={project} />
        </div>
      </section>
    </main>
  );
}
