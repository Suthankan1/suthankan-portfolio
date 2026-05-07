"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedText } from "../ui/AnimatedText";
import { GithubIcon } from "../icons/GithubIcon";
import { projects } from "../../lib/data/projects";

const featuredProjects = projects
  .filter((project) => project.featured || project.flagship)
  .sort((a, b) => {
    if (a.flagship !== b.flagship) return b.flagship ? 1 : -1;
    return new Date(b.builtAt).getTime() - new Date(a.builtAt).getTime();
  })
  .slice(0, 3);

export function FeaturedProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper className="pt-0">
      <div className="mb-8 max-w-3xl space-y-3 lg:mb-10">
        <p className="type-accent-label text-accent-primary">FEATURED PROJECTS</p>
        <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <AnimatedText text="Work with technical depth and product intent." />
        </h2>
      </div>

      <div className="space-y-5">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.08 }}
            className={index % 2 === 1 ? "lg:ml-auto lg:max-w-[85%]" : "lg:max-w-[85%]"}
          >
            <Card variant={index === 0 ? "featured" : "default"} className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-text-primary">
                    {project.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                    {project.tagline}
                  </p>
                </div>

                <Badge variant={index === 0 ? "live" : "in-progress"} className="w-fit">
                  {project.status}
                </Badge>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-primary"
                  >
                    <GithubIcon className="h-4 w-4" />
                    View Repository
                  </a>
                ) : null}

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent-primary"
                >
                  See Project Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
