"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, ExternalLink, Filter } from "lucide-react";
import type { ExternalArticle, ExternalArticlePlatform } from "../../../lib/data/external-articles";
import { externalArticlePlatforms } from "../../../lib/data/external-articles";
import { BLUR_DATA_URL } from "../../../lib/images";
import { cn } from "../../../lib/utils";

type ExternalArticlesPageContentProps = {
  articles: readonly ExternalArticle[];
};

const platformStyles: Record<ExternalArticlePlatform, string> = {
  Medium: "bg-text-primary text-bg-primary",
  "Dev.to": "bg-[color-mix(in_srgb,var(--accent-secondary)_22%,var(--bg-primary))] text-text-primary",
  LinkedIn: "bg-[color-mix(in_srgb,var(--accent-primary)_18%,var(--bg-primary))] text-text-primary",
  Hashnode: "bg-bg-tertiary text-text-primary",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function platformInitials(platform: ExternalArticlePlatform) {
  if (platform === "Dev.to") {
    return "DEV";
  }

  if (platform === "LinkedIn") {
    return "in";
  }

  return platform.slice(0, 2);
}

export function ExternalArticlesPageContent({ articles }: ExternalArticlesPageContentProps) {
  const [activePlatform, setActivePlatform] = useState<ExternalArticlePlatform | "All">("All");
  const prefersReducedMotion = useReducedMotion();

  const filteredArticles = useMemo(() => {
    if (activePlatform === "All") {
      return articles;
    }

    return articles.filter((article) => article.platform === activePlatform);
  }, [activePlatform, articles]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <section className="border-b border-border bg-bg-secondary">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <motion.div
            className="max-w-5xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-accent-label text-accent-primary">EXTERNAL ARTICLES</p>
            <h1 className="mt-4 text-balance font-display text-[clamp(3.25rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              Writing across the web
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
              Selected essays, technical notes, and short reflections published on developer platforms and writing networks.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="mb-8 rounded-xl border border-border bg-bg-secondary p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-secondary">
            <Filter className="h-4 w-4 text-accent-primary" />
            Platform
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", ...externalArticlePlatforms] as const).map((platform) => (
              <button
                key={platform}
                type="button"
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary",
                  activePlatform === platform
                    ? "border-accent-primary bg-accent-primary text-white"
                    : "border-border bg-bg-primary text-text-secondary hover:border-accent-primary hover:text-text-primary",
                )}
                onClick={() => setActivePlatform(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-lg border border-border bg-bg-secondary shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: prefersReducedMotion ? 0 : index * 0.05 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-tertiary">
                <Image
                  src={article.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 92vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-black uppercase tracking-tight",
                      platformStyles[article.platform],
                    )}
                  >
                    {platformInitials(article.platform)}
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {article.platform}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium text-text-muted">
                  <span>{formatDate(article.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {article.readingTime} min read
                  </span>
                </div>

                <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary">
                  {article.title}
                </h2>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">{article.excerpt}</p>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4 text-sm font-semibold">
                  <span className="inline-flex items-center gap-1 text-accent-primary">
                    External
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-4 w-4 text-text-muted transition group-hover:text-text-primary" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}
