"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountUp } from "../../lib/hooks/useCountUp";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";
import { cn } from "../../lib/utils";

const STAT_ITEMS = [
  { label: "Projects Built", value: 2 },
  { label: "Blog Posts", value: 2 },
  { label: "Certifications", value: 5 },
  { label: "Countries Visited", value: 1 },
] as const;

function AboutStatCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { count, targetRef } = useCountUp({ end: value, duration: 1150 });

  return (
    <motion.article
      ref={targetRef}
      className={cn(
        "border border-border bg-bg-secondary p-6 shadow-sm",
        "transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <p className="font-display text-5xl font-extrabold tracking-tight text-accent-primary sm:text-6xl">
        {count}+
      </p>
      <p className="mt-2 text-sm font-medium tracking-wide text-text-muted">{label}</p>
    </motion.article>
  );
}

export function AboutTeaserSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper className="pt-4 lg:pt-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
        <motion.div
          className="space-y-6"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62, ease: "easeOut" }}
        >
          <p className="type-accent-label text-accent-primary">ABOUT ME</p>

          <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            <AnimatedText text="More than just a developer." />
          </h2>

          <div className="max-w-2xl space-y-4 text-base leading-8 text-text-secondary sm:text-lg">
            <p>
              I am an <span className="font-semibold text-accent-primary">IT undergraduate at the University of Moratuwa</span>,
              building a strong foundation in software engineering, systems thinking, and practical problem solving.
            </p>
            <p>
              My main technical focus is <span className="font-semibold text-accent-primary">Java and Spring Boot</span>,
              supported by TypeScript, React, SQL, and Python. I am currently working on academic full-stack projects
              like <span className="font-semibold text-accent-primary">OmniHealth</span> and a project management system.
            </p>
            <p>
              I also write on <span className="font-semibold text-accent-primary">Medium</span>, sharing what I learn
              through articles such as my introduction to quantum computing.
            </p>
          </div>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            Read Full Story
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.08 }}
        >
          {STAT_ITEMS.map((item, index) => (
            <AboutStatCard
              key={item.label}
              label={item.label}
              value={item.value}
              className={
                index === 0
                  ? "rounded-sm"
                  : index === 1
                    ? "rounded-lg"
                    : index === 2
                      ? "rounded-2xl"
                      : "rounded-md"
              }
            />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
