import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Database, Download, GraduationCap, Handshake, Server, Wrench } from "lucide-react";
import { Button } from "../../ui/Button";
import { PageIntro } from "../../ui/PageIntro";
import { StatusLabel } from "../../ui/StatusLabel";
import { caseStudies } from "../../../lib/data/case-studies";
import { certificates } from "../../../lib/data/certificates";
import { projects } from "../../../lib/data/projects";
import { BLUR_DATA_URL } from "../../../lib/images";
import GitHubContributions from "./GitHubContributions";
import { WakaTimeStats } from "./WakaTimeStats";

const TIMELINE = [
  {
    year: "2020",
    title: "Started programming",
    description: "Began learning how software is structured, tested, and shipped through small practical builds.",
  },
  {
    year: "2024",
    title: "Entered University of Moratuwa",
    description: "Started the IT undergraduate path and began connecting classroom foundations with project work.",
  },
  {
    year: "2025",
    title: "Hardware project milestone",
    description: "Completed a university hardware-focused project and built a companion website to present the work.",
  },
  {
    year: "2026",
    title: "Full-stack systems in progress",
    description: "Building OmniHealth and a project-management workspace with TypeScript interfaces and Java services.",
  },
] as const;

const VALUES = [
  {
    title: "Truthful progress",
    description: "I would rather show a project clearly in progress than dress it up with unsupported claims.",
    Icon: BookOpen,
  },
  {
    title: "Backend discipline",
    description: "Clear service boundaries, validation, and data flow matter because they let the interface stay honest.",
    Icon: Server,
  },
  {
    title: "Interface clarity",
    description: "Good UI reduces hesitation. It helps people understand what changed, what matters, and what to do next.",
    Icon: Wrench,
  },
  {
    title: "Systems thinking",
    description: "I like tracing how product decisions move through database shape, API design, and frontend state.",
    Icon: Database,
  },
] as const;

export function AboutPageContent() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <PageIntro
        eyebrow="About"
        title="Builder, student, and technical writer."
        description="I am an IT undergraduate at the University of Moratuwa, focused on full-stack engineering with Java, Spring Boot, TypeScript, React, SQL, and Python."
        aside={
          <div className="grid gap-3">
            <StatusLabel tone="active">Open to opportunities</StatusLabel>
            <p>{projects.length} projects, {caseStudies.length} case studies, and {certificates.length} certificates are represented in this portfolio.</p>
          </div>
        }
      />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:py-18">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-bg-tertiary lg:sticky lg:top-28 lg:self-start">
          <Image
            src="/images/profile/my-photo.webp"
            alt="Portrait of Suthankan"
            fill
            priority
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        <div className="space-y-12">
          <section className="space-y-5 text-base leading-8 text-text-secondary sm:text-lg">
            <p>
              My current work sits around full-stack academic systems: hospital operations in OmniHealth, project planning in a TypeScript and Java workspace, and earlier frontend builds that show where the craft started.
            </p>
            <p>
              I care about the parts of software that make teams trust a product: clear flows, maintainable boundaries, accessible interfaces, and documentation that admits what is known and what is still being built.
            </p>
            <p>
              Writing is part of the same practice. It helps me slow down, explain decisions, and turn project lessons into something another developer can use.
            </p>
          </section>

          <section>
            <div className="mb-6">
              <p className="field-note-kicker">Current focus</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">What I am sharpening now</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Java and Spring Boot service design",
                "TypeScript interfaces with clear state and feedback",
                "SQL-backed product workflows",
                "Network fundamentals and CCNA learning",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-bg-secondary p-5 text-sm leading-7 text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6">
              <p className="field-note-kicker">Values</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">How I approach the work</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {VALUES.map(({ title, description, Icon }) => (
                <article key={title} className="rounded-lg border border-border bg-bg-secondary p-5">
                  <Icon className="h-5 w-5 text-accent-primary" />
                  <h3 className="mt-4 text-xl font-semibold tracking-normal">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <p className="field-note-kicker">Timeline</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">Learning path</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary">
              A short version of the journey, focused on software milestones rather than decoration.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((event) => (
              <article key={event.year} className="rounded-lg border border-border bg-bg-primary p-5">
                <p className="text-sm font-semibold text-accent-primary">{event.year}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-normal">{event.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-18">
        <WakaTimeStats />
        <GitHubContributions />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <div className="grid gap-8 rounded-lg border border-border bg-bg-secondary p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="field-note-kicker">Education</p>
            <div className="mt-4 flex items-start gap-4">
              <GraduationCap className="mt-1 h-7 w-7 text-accent-primary" />
              <div>
                <h2 className="text-3xl font-semibold tracking-normal">University of Moratuwa</h2>
                <p className="mt-2 text-sm leading-7 text-text-secondary">IT undergraduate. Entered in 2024.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href="/cv.pdf" download>
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild>
              <Link href="/contact">
                Let&apos;s connect
                <Handshake className="h-4 w-4" />
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
