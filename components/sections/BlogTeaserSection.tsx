"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Newspaper, PenLine } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";
import { BLUR_DATA_URL } from "../../lib/images";

export type BlogTeaserPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: number;
  coverImage: string;
  excerpt: string;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type BlogTeaserSectionProps = {
  posts: BlogTeaserPost[];
};

export function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper className="pt-2">
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
        <div className="space-y-3">
          <p className="type-accent-label text-accent-primary">BLOG TEASER</p>
          <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            <AnimatedText text="Notes from the build process." />
          </h2>
        </div>
        <Newspaper className="hidden h-8 w-8 text-accent-primary sm:block" />
      </div>

      {posts.length > 0 ? (
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              className="group overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-primary)_36%,var(--border))] hover:shadow-md"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.42 }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-tertiary">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-bg-primary/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-primary backdrop-blur">
                    {post.category}
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-text-primary transition-colors group-hover:text-accent-primary">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-6 text-text-secondary">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {dateFormatter.format(new Date(post.date))}
                    </span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="rounded-xl border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] bg-bg-secondary px-6 py-14 text-center sm:px-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <PenLine className="mx-auto h-8 w-8 text-accent-primary" />
          <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-text-primary">
            Real articles are coming soon.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            The placeholder posts have been removed. This space will feature only Suthankan's real technical writing.
          </p>
        </motion.div>
      )}

      <div className="mt-9 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:text-accent-primary"
        >
          Read All Articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
