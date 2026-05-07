"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Grid3X3, List, Search, Zap } from "lucide-react";
import Fuse from "fuse.js";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { cn } from "../../../lib/utils";
import { GithubIcon } from "../../../components/icons/GithubIcon";
import { caseStudies } from "../../../lib/data/case-studies";
import { projects, type Project, type ProjectCategory, type ProjectStatus } from "../../../lib/data/projects";
import { BLUR_DATA_URL } from "../../../lib/images";

type ViewMode = "grid" | "list";
type SortOption = "newest" | "featured";

const categories: ProjectCategory[] = ["Web App", "Mobile", "Open Source", "AI/ML", "Freelance", "Academic"];

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  Live: { label: "Live", color: "text-accent-secondary" },
  "In Development": { label: "Building", color: "text-accent-primary" },
  Completed: { label: "Completed", color: "text-accent-secondary" },
  Archived: { label: "Archived", color: "text-text-muted" },
};

const caseStudySlugs = new Set(caseStudies.map((caseStudy) => caseStudy.slug));

function hasCaseStudy(project: Project) {
  return caseStudySlugs.has(project.slug);
}

function ProjectFlagshipCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <motion.div {...motionProps} className="mb-12">
      <Card className="overflow-hidden border-[color-mix(in_srgb,var(--accent-primary)_32%,var(--border))]">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative min-h-80 bg-bg-tertiary">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg-primary/60 to-transparent" />
          </div>
          <div className="flex flex-col justify-between p-8 lg:p-12">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_40%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">
                  <Zap className="h-3 w-3" />
                  Flagship
                </span>
                <span className={cn("text-xs font-semibold uppercase tracking-[0.14em]", statusConfig[project.status].color)}>
                  {statusConfig[project.status].label}
                </span>
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-[-0.04em]">
                {project.title}
              </h2>
              <p className="mt-4 max-w-md text-lg text-text-secondary">{project.tagline}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-text-secondary">{project.description}</p>
            </div>
            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-[color-mix(in_srgb,var(--border)_88%,transparent)] bg-bg-primary px-3 py-1 text-xs font-medium text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {hasCaseStudy(project) ? (
                  <Link href={`/projects/${project.slug}`}>
                    <Button size="md" variant="primary" className="gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Case Study
                    </Button>
                  </Link>
                ) : null}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="md" variant="secondary" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="md" variant="ghost" className="gap-2">
                      <GithubIcon className="h-4 w-4" />
                      Source
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ProjectGridCard({ project }: { project: Project }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300">
      <div className="relative h-56 overflow-hidden bg-bg-tertiary">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary/40 to-transparent" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block rounded-full border border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
              {project.category}
            </span>
            <span className={cn("text-xs font-semibold uppercase tracking-[0.12em]", statusConfig[project.status].color)}>
              {statusConfig[project.status].label}
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em]">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{project.tagline}</p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full border border-[color-mix(in_srgb,var(--border)_88%,transparent)] bg-bg-primary px-2 py-1 text-xs text-text-secondary">
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded-full border border-[color-mix(in_srgb,var(--border)_88%,transparent)] bg-bg-primary px-2 py-1 text-xs font-medium text-text-muted">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasCaseStudy(project) ? (
              <>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary transition-colors hover:text-accent-primary"
                >
                  Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[color-mix(in_srgb,var(--border)_82%,transparent)]">·</span>
              </>
            ) : null}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                className="inline-flex items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary p-2 transition-colors hover:border-accent-primary hover:text-accent-primary"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository for ${project.title}`}
                className="inline-flex items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary p-2 transition-colors hover:border-accent-primary hover:text-accent-primary"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProjectListRow({ project }: { project: Project }) {
  return (
    <tr className="border-b border-[color-mix(in_srgb,var(--border)_82%,transparent)] hover:bg-bg-secondary">
      <td className="px-4 py-4">
        <div className="space-y-1">
          <p className="font-medium text-text-primary">{project.title}</p>
          <p className="text-sm text-text-secondary">{project.tagline}</p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm">
        <span className="inline-block rounded-full border border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary px-2 py-1 text-xs font-semibold uppercase">
          {project.category}
        </span>
      </td>
      <td className="px-4 py-4 text-sm">
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 2).map((tech) => (
            <span key={tech} className="text-xs text-text-secondary">
              {tech}
            </span>
          ))}
          {project.stack.length > 2 && <span className="text-xs text-text-muted">+{project.stack.length - 2}</span>}
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={cn("text-xs font-semibold uppercase", statusConfig[project.status].color)}>
          {statusConfig[project.status].label}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 text-text-secondary transition-colors hover:text-accent-primary" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4 text-text-secondary transition-colors hover:text-accent-primary" />
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}

export function ProjectsPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("projects-view-mode") as ViewMode | null;
    if (saved) {
      setViewMode(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("projects-view-mode", viewMode);
    }
  }, [viewMode, mounted]);

  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: ["title", "tagline", "description", "stack"],
      threshold: 0.3,
    });
  }, []);

  const filtered = useMemo(() => {
    let result = projects;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const searched = fuse.search(searchQuery);
      result = searched.map((r) => r.item);
    }

    if (sortBy === "featured") {
      result = result.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        if (a.flagship !== b.flagship) return b.flagship ? 1 : -1;
        return 0;
      });
    } else if (sortBy === "newest") {
      result = result.sort((a, b) => new Date(b.builtAt).getTime() - new Date(a.builtAt).getTime());
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, fuse]);

  const flagship = filtered.find((p) => p.flagship);
  const regular = filtered.filter((p) => !p.flagship);

  const containerMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4 },
      };

  const gridMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.35 },
      };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 sm:px-8 lg:px-12 lg:pt-24 lg:pb-12">
        <p className="type-accent-label text-accent-primary">WORK</p>
        <h1 className="mt-3 font-display text-[clamp(3rem,8vw,5.8rem)] font-semibold leading-[0.94] tracking-tighter">
          Featured projects.
        </h1>
        <p className="mt-5 max-w-3xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
          Real project case studies will appear here once your final project details, screenshots, and links are added.
        </p>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="space-y-6 border-b border-[color-mix(in_srgb,var(--border)_82%,transparent)] pb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  selectedCategory === "All"
                    ? "border-accent-primary bg-accent-primary text-white"
                    : "border-[color-mix(in_srgb,var(--border)_82%,transparent)] text-text-secondary hover:border-accent-primary hover:text-text-primary"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchQuery("");
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                    selectedCategory === category
                      ? "border-accent-primary bg-accent-primary text-white"
                      : "border-[color-mix(in_srgb,var(--border)_82%,transparent)] text-text-secondary hover:border-accent-primary hover:text-text-primary"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Show projects as a grid"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "inline-flex items-center justify-center rounded-md border p-2 transition-colors",
                  viewMode === "grid"
                    ? "border-accent-primary bg-accent-primary text-white"
                    : "border-[color-mix(in_srgb,var(--border)_82%,transparent)] text-text-secondary hover:border-accent-primary"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Show projects as a list"
                onClick={() => setViewMode("list")}
                className={cn(
                  "inline-flex items-center justify-center rounded-md border p-2 transition-colors",
                  viewMode === "list"
                    ? "border-accent-primary bg-accent-primary text-white"
                    : "border-[color-mix(in_srgb,var(--border)_82%,transparent)] text-text-secondary hover:border-accent-primary"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                aria-label="Search projects"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary pl-10 pr-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-muted">
                {filtered.length} {filtered.length === 1 ? "project" : "projects"} found
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("featured")}
                  className={cn(
                    "text-xs font-medium transition-colors",
                    sortBy === "featured" ? "text-accent-primary" : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  Featured
                </button>
                <span className="text-text-muted">/</span>
                <button
                  onClick={() => setSortBy("newest")}
                  className={cn(
                    "text-xs font-medium transition-colors",
                    sortBy === "newest" ? "text-accent-primary" : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  Newest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {filtered.length === 0 ? (
          <motion.div {...containerMotionProps} className="text-center">
            <p className="text-text-muted">No real projects have been added yet.</p>
          </motion.div>
        ) : (
          <motion.div {...containerMotionProps}>
            {flagship && <ProjectFlagshipCard project={flagship} />}

            {viewMode === "grid" ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="grid-view"
                  {...gridMotionProps}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {regular.map((project, idx) => (
                    <motion.div
                      key={project.slug}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { delay: idx * 0.05, duration: 0.35 }}
                    >
                      <ProjectGridCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key="list-view" {...gridMotionProps} className="overflow-x-auto rounded-md border border-[color-mix(in_srgb,var(--border)_82%,transparent)]">
                  <table className="w-full text-sm">
                    <thead className="border-b border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-secondary">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-text-secondary">Project</th>
                        <th className="px-4 py-3 text-left font-medium text-text-secondary">Category</th>
                        <th className="px-4 py-3 text-left font-medium text-text-secondary">Stack</th>
                        <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-text-secondary">Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regular.map((project) => (
                        <ProjectListRow key={project.slug} project={project} />
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
}
