"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Fuse from "fuse.js";
import { ArrowRight, CalendarDays, Search, X } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { BLUR_DATA_URL } from "../../../lib/images";
import { cn } from "../../../lib/utils";

export type BlogIndexPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  coverImage: string;
  excerpt: string;
  featured: boolean;
};

const CATEGORIES = [
  "All",
  "Case Study",
  "UI Engineering",
  "Backend",
  "Full-Stack",
  "Travel",
  "Personal Notes",
] as const;

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(date: string): string {
  return dateFormatter.format(new Date(date));
}

function FeaturedPostHero({ post }: { post: BlogIndexPost }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="group relative min-h-[520px] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--accent-primary)_24%,var(--border))] bg-bg-tertiary shadow-[var(--shadow-lg)]"
    >
      <Image
        src={post.coverImage}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 1120px, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.12)_0%,rgba(13,13,13,0.62)_52%,rgba(13,13,13,0.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge variant="featured" className="border-white/25 bg-white/12 text-white backdrop-blur">
            Featured
          </Badge>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/86 backdrop-blur">
            {post.category}
          </span>
        </div>
        <h2 className="max-w-4xl font-display text-[clamp(2.8rem,8vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white">
          {post.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">{post.excerpt}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-medium text-white/78">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--accent-secondary)]" />
          <span>{post.readingTime} min read</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_24%,transparent)] bg-[var(--text-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

function PostCard({ post, index }: { post: BlogIndexPost; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-secondary shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-56 overflow-hidden bg-bg-tertiary">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
        <div className="space-y-4 p-5">
          <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_30%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_9%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-accent-primary">
            {post.category}
          </span>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-text-primary">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--border)_78%,transparent)] pt-4 text-xs font-medium uppercase tracking-[0.11em] text-text-muted">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime} min</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogIndexContent({ posts }: { posts: BlogIndexPost[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const tags = useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), [posts]);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "excerpt", "tags"],
        threshold: 0.32,
        ignoreLocation: true,
      }),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const base = query.trim() ? fuse.search(query.trim()).map((result) => result.item) : posts;

    return base.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesCategory && matchesTag;
    });
  }, [fuse, posts, query, selectedCategory, selectedTag]);

  function clearFilters() {
    setQuery("");
    setSelectedCategory("All");
    setSelectedTag(null);
  }

  return (
    <main className="bg-bg-primary">
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
              FIELD NOTES
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
              Blog
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:justify-self-end">
            Engineering notes, product lessons, and personal field reports from the overlap of full-stack craft,
            interface design, and travel-shaped curiosity.
          </p>
        </div>

        {featuredPost ? <FeaturedPostHero post={featuredPost} /> : null}
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="mx-auto w-full max-w-7xl space-y-6 px-5 py-7 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    selectedCategory === category
                      ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
                      : "border-border bg-bg-primary text-text-secondary hover:border-[var(--accent-primary)] hover:text-text-primary",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="relative block">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, excerpt, tags"
                className="h-12 w-full rounded-full border border-border bg-bg-primary pl-11 pr-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-[var(--accent-primary)]"
                type="search"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag((current) => (current === tag ? null : tag))}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  selectedTag === tag
                    ? "border-[color-mix(in_srgb,var(--accent-secondary)_70%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_18%,transparent)] text-text-primary"
                    : "border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary text-text-secondary hover:text-text-primary",
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Latest writing
            </h2>
          </div>
          {(query || selectedCategory !== "All" || selectedTag) && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          )}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_35%,var(--border))] bg-bg-secondary px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-9 w-9 text-accent-primary" />
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">No matching notes.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              The archive is being a little too precise. Clear the filters or search for a broader idea.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full border border-border bg-bg-primary px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-[var(--accent-primary)]"
            >
              Reset view
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
