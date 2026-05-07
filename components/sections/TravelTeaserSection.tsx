"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";

export function TravelTeaserSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper className="pt-0">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:mb-10">
          <div className="space-y-3">
            <p className="type-accent-label text-accent-primary">TRAVEL TEASER</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              <AnimatedText text="Beyond the code." />
            </h2>
            <p className="text-base text-text-secondary sm:text-lg">
              Exploring the world one trip at a time.
            </p>
          </div>

          <div className="inline-flex items-end gap-3 rounded-lg border border-border bg-bg-secondary px-4 py-3">
            <Globe2 className="h-5 w-5 text-accent-primary" />
            <div>
              <p className="font-display text-3xl font-bold leading-none text-accent-primary">1+</p>
              <p className="mt-1 text-xs tracking-wide text-text-muted sm:text-sm">Countries Visited</p>
            </div>
          </div>
        </div>

        <motion.div
          className="rounded-xl border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] bg-bg-secondary px-6 py-14 text-center sm:px-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <Globe2 className="mx-auto h-9 w-9 text-accent-primary" />
          <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-text-primary">
            Real travel stories are coming soon.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            The placeholder trips have been removed. This section will show only real journeys, photos, and travel notes.
          </p>
        </motion.div>

        <div className="mt-9 text-center">
          <Link
            href="/travels"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:text-accent-primary"
          >
            See My Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
