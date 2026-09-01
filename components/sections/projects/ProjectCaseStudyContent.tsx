import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, GitFork, Layers3, UserRound, UsersRound } from "lucide-react";
import { Button } from "../../ui/Button";
import { StatusLabel } from "../../ui/StatusLabel";
import { type CaseStudy } from "../../../lib/data/case-studies";
import { projects, type Project } from "../../../lib/data/projects";
import { BLUR_DATA_URL } from "../../../lib/images";

function formatBuiltAt(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(year, month - 1));
}

function statusTone(status: Project["status"]) {
  return status === "In Development" ? "accent" : "active";
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="field-note-kicker">{label}</p>
      <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function MetaItem({
  Icon,
  label,
  value,
}: {
  Icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="border-t border-border-strong pt-3">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase text-text-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-text-primary">{value}</p>
    </div>
  );
}

function RelatedProjects({ currentProject }: { currentProject: Project }) {
  const related = projects.filter((project) => project.slug !== currentProject.slug).slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {related.map((project) => (
        <article key={project.slug} className="overflow-hidden rounded-lg border border-border bg-bg-primary">
          <Link href={`/projects/${project.slug}`} className="block">
            <div className="relative h-44 bg-bg-tertiary">
              <Image
                src={project.thumbnail}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase text-accent-primary">{project.category}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-normal">{project.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">{project.tagline}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProjectCaseStudyContent({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="transition-colors hover:text-text-primary">
              Work
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{project.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.36fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusLabel tone={statusTone(project.status)}>{project.status}</StatusLabel>
                {project.flagship ? <StatusLabel>Flagship</StatusLabel> : null}
                <StatusLabel>{project.category}</StatusLabel>
              </div>
              <h1 className="mt-6 max-w-5xl text-balance font-display text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[0.9] tracking-normal">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">{project.tagline}</p>
            </div>

            <aside className="grid gap-4">
              <MetaItem Icon={CalendarDays} label="Built" value={formatBuiltAt(project.builtAt)} />
              <MetaItem Icon={UserRound} label="Role" value={caseStudy.role} />
              <MetaItem Icon={UsersRound} label="Team" value={caseStudy.teamSize} />
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:py-16">
        <div className="relative min-h-80 overflow-hidden rounded-lg border border-border bg-bg-tertiary lg:min-h-[34rem]">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        <div className="flex flex-col justify-between gap-8">
          <div>
            <SectionHeading label="Overview" title="What the project is trying to solve" />
            <div className="space-y-4 text-base leading-8 text-text-secondary sm:text-lg">
              {caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.githubUrl ? (
              <Button asChild variant="secondary">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  Source
                  <GitFork className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live project
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-18">
          <div>
            <SectionHeading label="Problem" title="Why this exists" />
            <p className="text-base leading-8 text-text-secondary">{caseStudy.problem}</p>
          </div>

          <div>
            <SectionHeading label="Architecture" title="How the work is structured" />
            <p className="max-w-3xl text-base leading-8 text-text-secondary">{caseStudy.architecture.description}</p>

            <div className="mt-7 overflow-hidden rounded-lg border border-border bg-bg-primary">
              <div className="grid border-b border-border bg-bg-tertiary px-4 py-3 text-xs font-semibold uppercase text-text-muted sm:grid-cols-[0.22fr_0.34fr_1fr]">
                <span>Layer</span>
                <span>Technology</span>
                <span>Purpose</span>
              </div>
              <div className="divide-y divide-border">
                {caseStudy.architecture.stackBreakdown.map((row) => (
                  <div key={row.layer} className="grid gap-2 px-4 py-4 text-sm sm:grid-cols-[0.22fr_0.34fr_1fr]">
                    <span className="font-semibold text-text-primary">{row.layer}</span>
                    <span className="text-text-secondary">{row.technology}</span>
                    <span className="text-text-secondary">{row.purpose}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-lg border border-border bg-[#0d0d0d] p-5 text-[#b0b0b0]">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase">
                <Layers3 className="h-3.5 w-3.5" />
                Architecture note
              </p>
              <pre className="overflow-x-auto text-xs leading-6">
                <code>{caseStudy.architecture.diagram}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
        <SectionHeading label="Evidence" title="Feature and interface snapshot" />
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudy.features.map((feature) => (
            <figure key={feature.src} className="overflow-hidden rounded-lg border border-border bg-bg-secondary">
              <div className="relative h-72 bg-bg-tertiary">
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              <figcaption className="p-4 text-sm leading-6 text-text-secondary">{feature.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-18">
          <div>
            <SectionHeading label="Depth" title="Challenges and decisions" />
            <p className="text-sm leading-7 text-text-secondary">
              Each challenge is written as a decision record: the context first, then the implementation response.
            </p>
          </div>

          <div className="grid gap-4">
            {caseStudy.challenges.map((challenge, index) => (
              <details key={challenge.title} className="group rounded-lg border border-border bg-bg-primary p-5" open={index === 0}>
                <summary className="cursor-pointer list-none text-lg font-semibold tracking-normal text-text-primary">
                  <span className="mr-3 text-sm text-accent-primary">{String(index + 1).padStart(2, "0")}</span>
                  {challenge.title}
                </summary>
                <div className="mt-5 grid gap-4 border-t border-border pt-5 text-sm leading-7 text-text-secondary md:grid-cols-2">
                  <div>
                    <p className="mb-2 font-semibold text-text-primary">Context</p>
                    <p>{challenge.context}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-text-primary">Response</p>
                    <p>{challenge.solution}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-18">
        <div>
          <SectionHeading label="Reflection" title="Lessons carried forward" />
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-accent-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
        </div>

        <div className="grid gap-4">
          {caseStudy.lessons.map((lesson, index) => (
            <div key={lesson} className="flex gap-4 rounded-lg border border-border bg-bg-secondary p-5">
              <span className="text-sm font-semibold text-accent-primary">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-7 text-text-secondary">{lesson}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-secondary">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="field-note-kicker">Next</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">Related project notes</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-accent-primary">
              All work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <RelatedProjects currentProject={project} />
        </div>
      </section>
    </main>
  );
}
