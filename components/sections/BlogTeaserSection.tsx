"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Newspaper, PenLine } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";

export function BlogTeaserSection() {
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
