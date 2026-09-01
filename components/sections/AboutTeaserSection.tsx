import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "../../lib/data/case-studies";
import { certificates } from "../../lib/data/certificates";
import { projects } from "../../lib/data/projects";

const STAT_ITEMS = [
  { label: "Projects documented", value: projects.length },
  { label: "Case studies", value: caseStudies.length },
  { label: "Certificates", value: certificates.length },
] as const;

export function AboutTeaserSection() {
  return (
    <section className="bg-bg-primary">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-20">
        <div>
          <p className="field-note-kicker">About</p>
          <h2 className="mt-4 max-w-lg text-balance font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            A builder learning in public, one system at a time.
          </h2>
        </div>

        <div className="space-y-7">
          <div className="max-w-3xl space-y-4 text-base leading-8 text-text-secondary sm:text-lg">
            <p>
              I am an IT undergraduate at the University of Moratuwa, focused on full-stack engineering with Java, Spring Boot, TypeScript, React, SQL, and Python.
            </p>
            <p>
              The current portfolio follows the work that is actually happening: OmniHealth, a project-management workspace, earlier web-technology builds, and writing about what I learn along the way.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {STAT_ITEMS.map((item) => (
              <div key={item.label} className="border-t border-border-strong pt-3">
                <p className="text-4xl font-semibold tracking-normal text-text-primary">{item.value}</p>
                <p className="mt-1 text-sm text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-primary"
          >
            Read the full story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
