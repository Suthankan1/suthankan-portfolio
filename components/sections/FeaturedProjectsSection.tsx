import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import { Button } from "../ui/Button";
import { StatusLabel } from "../ui/StatusLabel";
import { caseStudies } from "../../lib/data/case-studies";
import { projects } from "../../lib/data/projects";
import { BLUR_DATA_URL } from "../../lib/images";

const caseStudySlugs = new Set(caseStudies.map((caseStudy) => caseStudy.slug));

const featuredProjects = projects
  .filter((project) => project.featured || project.flagship)
  .sort((a, b) => {
    if (a.flagship !== b.flagship) {
      return b.flagship ? 1 : -1;
    }

    return new Date(b.builtAt).getTime() - new Date(a.builtAt).getTime();
  })
  .slice(0, 3);

export function FeaturedProjectsSection() {
  return (
    <section className="border-y border-border bg-bg-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="field-note-kicker">Selected work</p>
            <h2 className="mt-4 max-w-md text-balance font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Case studies with the constraints left visible.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-text-secondary">
              The strongest projects here are not treated as shiny thumbnails. They are documented as systems: what they are for, how they are structured, and what is still evolving.
            </p>
            <Button asChild variant="secondary" className="mt-7">
              <Link href="/projects">
                View the work ledger
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5">
            {featuredProjects.map((project, index) => {
              const hasCaseStudy = caseStudySlugs.has(project.slug);

              return (
                <article
                  key={project.slug}
                  className="grid overflow-hidden rounded-lg border border-border bg-bg-primary md:grid-cols-[0.42fr_1fr]"
                >
                  <Link
                    href={hasCaseStudy ? `/projects/${project.slug}` : "/projects"}
                    className="relative min-h-64 overflow-hidden bg-bg-tertiary md:min-h-full"
                  >
                    <Image
                      src={project.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      priority={index === 0}
                    />
                  </Link>

                  <div className="flex min-h-80 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusLabel tone={project.status === "In Development" ? "accent" : "active"}>
                          {project.status}
                        </StatusLabel>
                        {project.flagship ? <StatusLabel>Flagship</StatusLabel> : null}
                      </div>

                      <h3 className="mt-5 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight tracking-normal">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                        {project.tagline}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      {hasCaseStudy ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-primary"
                        >
                          Read case study
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
                          Live project
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
