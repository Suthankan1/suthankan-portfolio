"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Braces,
  Brain,
  Cloud,
  Database,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Tag } from "../ui/Tag";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";
import { cn } from "../../lib/utils";

type SkillBlock = {
  title: string;
  icon: LucideIcon;
  skills: readonly string[];
  className: string;
};

const SKILL_BLOCKS: readonly SkillBlock[] = [
  {
    title: "Frontend",
    icon: Braces,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    className: "lg:col-span-8 lg:row-span-1",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Spring Boot", "Go", "REST APIs", "GraphQL"],
    className: "lg:col-span-4 lg:row-span-1",
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Vercel"],
    className: "lg:col-span-4 lg:row-span-1",
  },
  {
    title: "AI / ML",
    icon: Brain,
    skills: ["Python", "Pandas", "Data Analysis"],
    className: "lg:col-span-3 lg:row-span-1",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
    className: "lg:col-span-5 lg:row-span-1",
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    skills: ["Figma", "Git", "VS Code", "Postman", "Linux", "Networking", "CCNA (in progress)"],
    className: "lg:col-span-12 lg:row-span-1",
  },
];

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper className="pt-6">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="mb-8 max-w-2xl space-y-3 lg:mb-10">
          <p className="type-accent-label text-accent-primary">SKILLS & STACK</p>
          <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
            <AnimatedText text="Built for product craft and engineering depth." />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {SKILL_BLOCKS.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.article
                key={block.title}
                className={cn(
                  "group relative overflow-hidden rounded-lg border border-border bg-bg-tertiary p-5 sm:p-6",
                  block.className,
                  block.title === "Frontend" ? "sm:min-h-60" : "sm:min-h-48",
                )}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-4 bottom-4 left-0 w-px bg-accent-primary opacity-0 transition-opacity duration-200 group-hover:opacity-90"
                />

                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg-primary text-accent-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-text-primary">
                    {block.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {block.skills.map((skill) => (
                    <Tag
                      key={skill}
                      className="bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-accent-primary"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
