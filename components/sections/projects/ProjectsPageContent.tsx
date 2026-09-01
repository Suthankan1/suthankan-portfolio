import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ExternalLink, GitFork, Layers3, Route } from "lucide-react";
import { Button } from "../../ui/Button";
import { PageIntro } from "../../ui/PageIntro";
import { StatusLabel } from "../../ui/StatusLabel";
import { caseStudies } from "../../../lib/data/case-studies";
import { projects, type Project } from "../../../lib/data/projects";
import { BLUR_DATA_URL } from "../../../lib/images";

const caseStudySlugs = new Set(caseStudies.map((caseStudy) => caseStudy.slug));
const flagshipProject = projects.find((project) => project.flagship) ?? projects[0];
const supportingProjects = projects.filter((project) => project.slug !== flagshipProject.slug);

function formatBuiltAt(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(year, month - 1));
}

function statusTone(status: Project["status"]) {
  return status === "In Development" ? "accent" : "active";
}

function ActionLinks({ project }: { project: Project }) {
  const hasCaseStudy = caseStudySlugs.has(project.slug);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {hasCaseStudy ? (
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-primary"
        >
          Case study
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent-primary"
        >
          Live
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent-primary"
        >
          Source
          <GitFork className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  );
}

function FlagshipProject({ project }: { project: Project }) {
  return (
    <section className="border-y border-border bg-bg-secondary">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-18">
        <Link href={`/projects/${project.slug}`} className="relative min-h-80 overflow-hidden rounded-lg bg-bg-tertiary lg:min-h-[32rem]">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </Link>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusLabel tone={statusTone(project.status)}>{project.status}</StatusLabel>
              <StatusLabel>Flagship case</StatusLabel>
            </div>
            <h2 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              {project.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">{project.description}</p>
          </div>

          <div className="mt-8 grid gap-7">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border-t border-border-strong pt-3">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-text-muted">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Built
                </p>
                <p className="mt-2 text-sm text-text-primary">{formatBuiltAt(project.builtAt)}</p>
              </div>
              <div className="border-t border-border-strong pt-3">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-text-muted">
                  <Layers3 className="h-3.5 w-3.5" />
                  Category
                </p>
                <p className="mt-2 text-sm text-text-primary">{project.category}</p>
              </div>
              <div className="border-t border-border-strong pt-3">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-text-muted">
                  <Route className="h-3.5 w-3.5" />
                  Route
                </p>
                <p className="mt-2 text-sm text-text-primary">Case study ready</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs text-text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/projects/${project.slug}`}>
                  Read the case
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {project.githubUrl ? (
                <Button asChild variant="secondary">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    Source
                    <GitFork className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-border bg-bg-primary md:grid-cols-[18rem_1fr]">
      <Link
        href={caseStudySlugs.has(project.slug) ? `/projects/${project.slug}` : "/projects"}
        className="relative min-h-64 bg-bg-tertiary md:min-h-full"
      >
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 288px, 100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </Link>
      <div className="grid gap-6 p-6 sm:p-7">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusLabel tone={statusTone(project.status)}>{project.status}</StatusLabel>
            <span className="text-sm text-text-muted">{formatBuiltAt(project.builtAt)}</span>
          </div>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight tracking-normal">
            {project.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary sm:text-base">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((tech) => (
            <span key={tech} className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary">
              {tech}
            </span>
          ))}
        </div>

        <ActionLinks project={project} />
      </div>
    </article>
  );
}

export function ProjectsPageContent() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <PageIntro
        eyebrow="Work"
        title="Project casebook."
        description="A smaller, more honest collection of builds: current full-stack academic systems first, followed by earlier frontend and project-documentation work that shows progression."
        aside={
          <div className="grid gap-3">
            <p>{projects.length} public projects are represented here.</p>
            <p>{caseStudies.length} have dedicated case-study routes with architecture notes, constraints, and lessons.</p>
          </div>
        }
      />

      <FlagshipProject project={flagshipProject} />

      <section className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
        <div className="mb-8 grid gap-4 border-b border-border pb-5 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="field-note-kicker">Project ledger</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">More builds</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-text-secondary">
            Each entry links to the most useful next artifact: a case study when the project has one, and source when the public repository is the clearest evidence.
          </p>
        </div>

        <div className="grid gap-5">
          {supportingProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
