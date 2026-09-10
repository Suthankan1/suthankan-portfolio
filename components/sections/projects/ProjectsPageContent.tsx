"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Code2,
  ExternalLink,
  Grid3X3,
  Layers,
  List,
  Search,
  X,
  Zap,
} from "lucide-react";
import Fuse from "fuse.js";
import { Button } from "../../../components/ui/Button";
import { GithubIcon } from "../../../components/icons/GithubIcon";
import { caseStudies } from "../../../lib/data/case-studies";
import {
  projects,
  type Project,
  type ProjectStatus,
} from "../../../lib/data/projects";
import { BLUR_DATA_URL } from "../../../lib/images";
import { cn } from "../../../lib/utils";

type ViewMode = "list" | "grid";
type SortOption = "featured" | "newest";
type FilterCategory = "All" | "Full Stack" | "AI / ML" | "Academic" | "Open Source";

const filterCategories: FilterCategory[] = [
  "All",
  "Full Stack",
  "AI / ML",
  "Academic",
  "Open Source",
];

const statusStyles: Record<
  ProjectStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  Live: {
    label: "Live",
    dotClass: "bg-emerald-500 ring-2 ring-emerald-500/20",
    textClass: "text-emerald-600 dark:text-emerald-400",
  },
  "In Development": {
    label: "In Development",
    dotClass: "bg-accent-primary ring-2 ring-accent-primary/25",
    textClass: "text-accent-primary",
  },
  Completed: {
    label: "Completed",
    dotClass: "bg-emerald-500/80",
    textClass: "text-text-secondary",
  },
  Archived: {
    label: "Archived",
    dotClass: "bg-text-muted/60",
    textClass: "text-text-muted",
  },
};

const languageColorMap: Record<string, string> = {
  TypeScript: "bg-sky-500",
  JavaScript: "bg-amber-400",
  Java: "bg-amber-700",
  Python: "bg-blue-500",
  Dart: "bg-teal-500",
  HTML: "bg-orange-500",
  CSS: "bg-indigo-500",
  CSS3: "bg-indigo-500",
  Other: "bg-neutral-400",
};

const caseStudySlugs = new Set(caseStudies.map((cs) => cs.slug));

function formatBuiltAt(value: string) {
  const [year, month] = value.split("-").map(Number);
  if (!month) return year.toString();
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1)));
}

function getPrimaryLink(project: Project): { href: string; isExternal: boolean } | null {
  if (caseStudySlugs.has(project.slug)) {
    return { href: `/projects/${project.slug}`, isExternal: false };
  }
  if (project.liveUrl) {
    return { href: project.liveUrl, isExternal: true };
  }
  if (project.githubUrl) {
    return { href: project.githubUrl, isExternal: true };
  }
  return null;
}

export function ProjectsPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const saved = localStorage.getItem("projects-view-mode") as ViewMode | null;
    if (saved && (saved === "list" || saved === "grid")) {
      setViewMode(saved);
    }
  }, []);

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("projects-view-mode", mode);
    } catch {
      // Ignore storage write errors in private browsing
    }
  };

  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: ["title", "tagline", "description", "stack", "category"],
      threshold: 0.35,
    });
  }, []);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter logic
    if (selectedFilter === "Full Stack") {
      result = result.filter(
        (p) =>
          p.stack.some((tech) => tech.toLowerCase().includes("full stack")) ||
          p.category === "Web App"
      );
    } else if (selectedFilter === "AI / ML") {
      result = result.filter(
        (p) =>
          p.category === "AI/ML" ||
          p.stack.some((tech) =>
            ["fastapi", "langchain", "pgvector", "ai", "dart"].includes(
              tech.toLowerCase()
            )
          ) ||
          p.tagline.toLowerCase().includes("ai") ||
          p.description.toLowerCase().includes("ai")
      );
    } else if (selectedFilter === "Academic") {
      result = result.filter((p) => p.category === "Academic");
    } else if (selectedFilter === "Open Source") {
      result = result.filter((p) => Boolean(p.githubUrl));
    }

    // Search query logic
    if (searchQuery.trim()) {
      const searched = fuse.search(searchQuery.trim());
      result = searched.map((r) => r.item);
    }

    // Sort logic
    if (sortBy === "featured") {
      result.sort((a, b) => {
        if (a.flagship !== b.flagship) return a.flagship ? -1 : 1;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return 0;
      });
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.builtAt).getTime() - new Date(a.builtAt).getTime()
      );
    }

    return result;
  }, [searchQuery, selectedFilter, sortBy, fuse]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header Section */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-16 pb-8 sm:px-8 lg:px-12 lg:pt-24 lg:pb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary" />
          Engineering Portfolio · 2024 — 2026
        </div>

        <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
          Featured projects.
        </h1>

        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-text-secondary">
          A curated ledger of full-stack platforms, distributed systems, and
          academic software engineering builds. Each project demonstrates
          deliberate architecture, clean state management, and real-world execution.
        </p>

        {/* Quick Highlights Strip */}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-text-muted">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3.5 py-1.5">
            <Layers className="h-3.5 w-3.5 text-accent-primary" />
            <span className="font-semibold text-text-primary">
              {projects.length}
            </span>{" "}
            Public Systems
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3.5 py-1.5">
            <Zap className="h-3.5 w-3.5 text-accent-secondary" />
            <span className="font-semibold text-text-primary">
              {projects.filter((p) => p.flagship).length}
            </span>{" "}
            Flagship App
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3.5 py-1.5">
            <Code2 className="h-3.5 w-3.5 text-text-muted" />
            <span>Java · TypeScript · Python · Dart</span>
          </div>
        </div>
      </section>

      {/* Control & Filter Toolbar */}
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="space-y-4 rounded-2xl border border-border bg-bg-secondary/50 p-4 sm:p-5 backdrop-blur-xs">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2" role="tablist">
              {filterCategories.map((category) => {
                const isActive = selectedFilter === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setSelectedFilter(category);
                    }}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-accent-primary text-white shadow-sm"
                        : "border border-border bg-bg-primary text-text-secondary hover:border-accent-primary hover:text-text-primary"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              {/* Sort Switch */}
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <span>Sort:</span>
                <button
                  type="button"
                  onClick={() => setSortBy("featured")}
                  className={cn(
                    "font-medium transition-colors hover:text-text-primary cursor-pointer",
                    sortBy === "featured"
                      ? "text-accent-primary font-semibold"
                      : "text-text-muted"
                  )}
                >
                  Featured
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => setSortBy("newest")}
                  className={cn(
                    "font-medium transition-colors hover:text-text-primary cursor-pointer",
                    sortBy === "newest"
                      ? "text-accent-primary font-semibold"
                      : "text-text-muted"
                  )}
                >
                  Newest
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border border-border bg-bg-primary p-1">
                <button
                  type="button"
                  aria-label="List view"
                  title="List view"
                  onClick={() => handleViewChange("list")}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer",
                    viewMode === "list"
                      ? "bg-accent-primary text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Grid view"
                  title="Grid view"
                  onClick={() => handleViewChange("grid")}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer",
                    viewMode === "grid"
                      ? "bg-accent-primary text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Input and Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/60">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                aria-label="Search projects"
                placeholder="Search projects by name, stack, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-bg-primary pl-9 pr-9 py-2 text-xs sm:text-sm text-text-primary outline-hidden transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-text-muted">
              Showing{" "}
              <span className="font-semibold text-text-primary">
                {filteredProjects.length}
              </span>{" "}
              of {projects.length} {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        </div>
      </section>

      {/* Projects List / Grid Showcase */}
      <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-bg-secondary text-text-muted">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold text-base">No projects found</h3>
            <p className="mt-2 text-sm text-text-secondary">
              No projects matched your search criteria or active filter.
            </p>
            <div className="mt-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("All");
                }}
              >
                Reset filters
              </Button>
            </div>
          </div>
        ) : viewMode === "list" ? (
          <AnimatePresence mode="wait">
            <motion.ul
              key="list-view"
              role="list"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filteredProjects.map((project, idx) => (
                <motion.li
                  key={project.slug}
                  initial={
                    prefersReducedMotion ? {} : { opacity: 0, y: 16 }
                  }
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? {}
                      : { delay: idx * 0.05, duration: 0.3 }
                  }
                >
                  <ProjectListRow project={project} />
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="grid-view"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.slug}
                  initial={
                    prefersReducedMotion ? {} : { opacity: 0, y: 16 }
                  }
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? {}
                      : { delay: idx * 0.05, duration: 0.3 }
                  }
                >
                  <ProjectGridCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Unified Editorial Project List Row
───────────────────────────────────────────────────────────────────────────── */
function ProjectListRow({ project }: { project: Project }) {
  const primaryLink = getPrimaryLink(project);
  const status = statusStyles[project.status];
  const hasCase = caseStudySlugs.has(project.slug);

  return (
    <article
      className={cn(
        "group relative flex flex-col md:flex-row items-stretch gap-6 rounded-2xl border p-5 sm:p-6 transition-all duration-300",
        project.flagship
          ? "border-accent-primary/45 bg-accent-primary/[0.02] dark:bg-accent-primary/[0.04] shadow-sm hover:border-accent-primary/70 hover:shadow-md"
          : "border-border bg-bg-primary hover:border-border-strong hover:bg-bg-secondary/40 hover:shadow-sm"
      )}
    >
      {/* Thumbnail Section */}
      <div className="relative w-full md:w-64 lg:w-72 shrink-0 aspect-16/10 rounded-xl overflow-hidden bg-bg-tertiary border border-border/60">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Overlaid Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
          {project.flagship && (
            <span className="inline-flex items-center gap-1 rounded-md bg-black/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white tracking-wide border border-white/15 shadow-sm">
              <Zap className="h-3 w-3 text-accent-secondary" />
              Flagship
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between min-w-0 space-y-4">
        <div>
          {/* Metadata Row: Category, Status, Built Date */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 font-medium text-text-secondary">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 font-medium text-text-muted">
              <span
                className={cn("h-2 w-2 rounded-full", status.dotClass)}
                aria-hidden="true"
              />
              <span className={status.textClass}>{status.label}</span>
            </span>

            <span className="text-text-muted">·</span>

            <span className="flex items-center gap-1 text-text-muted font-mono">
              <Calendar className="h-3 w-3" />
              {formatBuiltAt(project.builtAt)}
            </span>

            {project.repoMeta?.repo && (
              <>
                <span className="text-text-muted hidden sm:inline">·</span>
                <span className="text-text-muted font-mono text-[11px] hidden sm:inline truncate max-w-[180px]">
                  {project.repoMeta.repo}
                </span>
              </>
            )}
          </div>

          {/* Title with link */}
          <h2 className="mt-2.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            {primaryLink ? (
              <Link
                href={primaryLink.href}
                target={primaryLink.isExternal ? "_blank" : undefined}
                rel={primaryLink.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 hover:text-accent-primary transition-colors"
              >
                {project.title}
                {primaryLink.isExternal ? (
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                ) : (
                  <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                )}
              </Link>
            ) : (
              project.title
            )}
          </h2>

          {/* Tagline */}
          <p className="mt-1 text-sm font-medium text-text-secondary leading-snug">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Language Breakdown & Tech Stack */}
        <div className="space-y-2.5 pt-2 border-t border-border/50">
          {/* Language Composition Breakdown (if available) */}
          {project.repoMeta?.languageComposition &&
            project.repoMeta.languageComposition.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted">
                <span className="font-semibold uppercase tracking-wider text-text-muted/80">
                  Languages:
                </span>
                {project.repoMeta.languageComposition.slice(0, 3).map((lang) => (
                  <span
                    key={lang.name}
                    className="inline-flex items-center gap-1.5 font-mono"
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        languageColorMap[lang.name] || "bg-neutral-400"
                      )}
                    />
                    {lang.name} {lang.percent}%
                  </span>
                ))}
              </div>
            )}

          {/* Stack Chips & Action Suite */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {hasCase ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary text-white text-xs font-semibold hover:bg-accent-primary/90 transition-colors shadow-xs"
                >
                  Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${project.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-primary text-text-secondary text-xs font-semibold hover:border-accent-primary hover:text-accent-primary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source repository for ${project.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-primary text-text-secondary text-xs font-semibold hover:border-accent-primary hover:text-accent-primary transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Unified Editorial Project Grid Card
───────────────────────────────────────────────────────────────────────────── */
function ProjectGridCard({ project }: { project: Project }) {
  const primaryLink = getPrimaryLink(project);
  const status = statusStyles[project.status];
  const hasCase = caseStudySlugs.has(project.slug);

  return (
    <article
      className={cn(
        "group flex flex-col justify-between rounded-2xl border overflow-hidden transition-all duration-300",
        project.flagship
          ? "border-accent-primary/45 bg-accent-primary/[0.02] dark:bg-accent-primary/[0.04] shadow-sm hover:border-accent-primary/70 hover:shadow-md"
          : "border-border bg-bg-primary hover:border-border-strong hover:bg-bg-secondary/40 hover:shadow-sm"
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-bg-tertiary">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.flagship && (
            <span className="inline-flex items-center gap-1 rounded-md bg-black/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white tracking-wide border border-white/15 shadow-sm">
              <Zap className="h-3 w-3 text-accent-secondary" />
              Flagship
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium border border-white/10">
            {project.category}
          </span>
          <span className="font-mono text-[11px] drop-shadow-sm">
            {formatBuiltAt(project.builtAt)}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span
                className={cn("h-2 w-2 rounded-full", status.dotClass)}
                aria-hidden="true"
              />
              <span className={status.textClass}>{status.label}</span>
            </span>
          </div>

          <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-text-primary">
            {primaryLink ? (
              <Link
                href={primaryLink.href}
                target={primaryLink.isExternal ? "_blank" : undefined}
                rel={primaryLink.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 hover:text-accent-primary transition-colors"
              >
                {project.title}
                {primaryLink.isExternal ? (
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            ) : (
              project.title
            )}
          </h2>

          <p className="mt-1 text-xs sm:text-sm font-medium text-text-secondary leading-snug">
            {project.tagline}
          </p>

          <p className="mt-2 text-xs text-text-muted leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Stack and Action Buttons */}
        <div className="space-y-3 pt-3 border-t border-border/50">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-md border border-border bg-bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-text-muted">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source repository for ${project.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-primary text-text-secondary text-xs font-semibold hover:border-accent-primary hover:text-accent-primary transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${project.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-primary text-text-secondary text-xs font-semibold hover:border-accent-primary hover:text-accent-primary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </a>
              )}
            </div>

            {hasCase && (
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary text-white text-xs font-semibold hover:bg-accent-primary/90 transition-colors"
              >
                Case Study <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
