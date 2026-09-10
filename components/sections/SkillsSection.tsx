"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";
import { cn } from "../../lib/utils";
import { TECH_ICONS } from "../icons/TechIcons";
import {
  SKILL_DOMAINS,
  CORE_DAILY_DRIVERS,
  CATEGORY_FILTERS,
  type SkillCategory,
  type SkillItem,
} from "../../lib/data/skills";

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>("all");
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredDomains =
    activeFilter === "all"
      ? SKILL_DOMAINS
      : SKILL_DOMAINS.filter((d) => d.id === activeFilter);

  return (
    <SectionWrapper className="pt-6">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <p className="type-accent-label text-accent-primary">
                SYSTEMS & TECH STACK
              </p>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-primary/60" />
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Architectural Depth
              </span>
            </div>
            <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              <AnimatedText text="Engineered for product craft and systems reliability." />
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-text-secondary">
            A battle-tested repertoire spanning responsive interface systems,
            concurrent backend services, and automated cloud pipelines.
          </p>
        </div>

        {/* Core Daily Drivers Ribbon */}
        <div className="mb-8 overflow-hidden rounded-xl border border-border/80 bg-bg-secondary/60 p-4 shadow-sm backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-secondary" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
                Primary Daily Drivers
              </span>
              <span className="hidden rounded-full border border-border bg-bg-primary px-2 py-0.5 text-[10px] font-medium text-text-muted sm:inline-block">
                Production Core
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {CORE_DAILY_DRIVERS.map((skillName) => {
                const IconComponent = TECH_ICONS[skillName];
                return (
                  <div
                    key={skillName}
                    className="group inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-bg-primary/90 px-2.5 py-1 text-xs font-medium text-text-primary shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary/40 hover:bg-bg-primary hover:shadow-sm"
                  >
                    {IconComponent && (
                      <IconComponent size={14} className="shrink-0" />
                    )}
                    <span className="tracking-tight">{skillName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex items-center justify-start overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Filter tech stack domains"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-bg-secondary/70 p-1 backdrop-blur-sm"
          >
            {CATEGORY_FILTERS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "relative rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent-primary",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-lg border border-border/90 bg-bg-primary shadow-xs"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Architectural Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {filteredDomains.map((domain, index) => {
              const DomainIcon = domain.icon;
              // Balanced layout:
              // When all domains are shown:
              // Frontend (6 cols) & Backend (6 cols)
              // DevOps (4 cols), Database (4 cols), Tools (4 cols)
              const spanClass =
                activeFilter === "all"
                  ? index < 2
                    ? "lg:col-span-6"
                    : "lg:col-span-4"
                  : "lg:col-span-6";

              return (
                <motion.article
                  key={domain.id}
                  layout
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05 }}
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-bg-secondary/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-primary/50 hover:shadow-md",
                    spanClass,
                  )}
                >
                  {/* Subtle ambient gradient lighting */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      domain.accentColor,
                    )}
                  />

                  <div>
                    {/* Domain Header */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-bg-primary text-accent-primary shadow-xs transition-colors duration-300 group-hover:border-accent-primary/40">
                          <DomainIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-primary">
                            {domain.eyebrow}
                          </p>
                          <h3 className="font-display text-xl font-bold tracking-tight text-text-primary">
                            {domain.title}
                          </h3>
                        </div>
                      </div>
                      <span className="rounded-md border border-border/60 bg-bg-primary/50 px-2 py-0.5 font-mono text-[11px] text-text-muted">
                        {domain.skills.length} tools
                      </span>
                    </div>

                    {/* Narrative Description */}
                    <p className="mb-6 text-xs leading-relaxed text-text-secondary sm:text-sm">
                      {domain.narrative}
                    </p>
                  </div>

                  {/* Skills Grid within Card */}
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Technologies & Capabilities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {domain.skills.map((skill) => {
                        const IconComponent = TECH_ICONS[skill.name];
                        const isSelected = activeSkill?.name === skill.name;

                        return (
                          <button
                            key={skill.name}
                            type="button"
                            onClick={() =>
                              setActiveSkill(isSelected ? null : skill)
                            }
                            onMouseEnter={() => setActiveSkill(skill)}
                            className={cn(
                              "group/pill relative inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-left text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent-primary",
                              skill.highlight
                                ? "border-accent-primary/30 bg-[color-mix(in_srgb,var(--accent-primary)_7%,var(--bg-primary))] text-text-primary hover:border-accent-primary/60 hover:bg-[color-mix(in_srgb,var(--accent-primary)_12%,var(--bg-primary))]"
                                : "border-border/80 bg-bg-primary/80 text-text-primary hover:border-border hover:bg-bg-primary",
                              isSelected &&
                                "border-accent-primary bg-bg-primary ring-2 ring-accent-primary/20",
                            )}
                          >
                            {IconComponent ? (
                              <IconComponent
                                size={14}
                                className="shrink-0 transition-transform duration-200 group-hover/pill:scale-110"
                              />
                            ) : (
                              <Terminal className="h-3.5 w-3.5 text-accent-primary" />
                            )}
                            <span>{skill.name}</span>
                            {skill.highlight && (
                              <span
                                title="Core Stack"
                                className="h-1.5 w-1.5 rounded-full bg-accent-secondary"
                              />
                            )}
                            {skill.level === "learning" && (
                              <span className="rounded bg-accent-primary/10 px-1 py-0.2 text-[9px] font-mono text-accent-primary">
                                In Progress
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Interactive Capability Inspector Footer */}
        <div className="mt-5 rounded-xl border border-border/80 bg-bg-secondary/40 p-4 transition-all duration-300">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent-secondary shrink-0" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {activeSkill
                  ? `Selected Capability: ${activeSkill.name}`
                  : "Hover or select any technology for architectural context"}
              </span>
            </div>
            {activeSkill ? (
              <p className="text-xs font-medium text-text-primary">
                {activeSkill.context}
              </p>
            ) : (
              <p className="text-xs text-text-muted">
                Highlighted with green dot = Production Daily Driver
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
