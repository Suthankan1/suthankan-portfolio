import type { Metadata } from "next";
import {
  AppWindow,
  BookOpen,
  Code2,
  ExternalLink,
  Keyboard,
  Laptop,
  Monitor,
  Terminal,
} from "lucide-react";
import { usesSections, type UsesItem } from "../../../lib/data/uses";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Uses | Suthankan",
  description:
    "The development tools, hardware, software, services, and learning resources Suthankan uses to build and study.",
  path: "/uses",
});

const iconMap: Record<UsesItem["icon"], typeof Code2> = {
  code: Code2,
  terminal: Terminal,
  browser: AppWindow,
  laptop: Laptop,
  monitor: Monitor,
  keyboard: Keyboard,
  app: AppWindow,
  book: BookOpen,
};

export default function UsesPage() {
  return (
    <main className="bg-bg-primary">
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
              My setup
            </p>
            <h1 className="font-display text-[clamp(3.4rem,10vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.06em]">
              Uses
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            A practical inventory of the tools, hardware, services, and learning inputs that shape how I code,
            study, write, and keep projects moving.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {usesSections.map((section) => (
            <section key={section.title} className="border-t border-border pt-6">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">
                  {section.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em]">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const content = (
                    <div className="group flex gap-4 rounded-[var(--radius-md)] border border-border bg-bg-secondary p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] hover:shadow-[var(--shadow-sm)]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[color-mix(in_srgb,var(--accent-primary)_26%,var(--border))] bg-bg-primary text-accent-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">
                            {item.name}
                          </h3>
                          {item.link ? <ExternalLink className="h-4 w-4 text-text-muted" /> : null}
                        </div>
                        <p className="mt-2 leading-relaxed text-text-secondary">{item.description}</p>
                        {item.details ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.details.map((detail) => (
                              <span
                                key={detail}
                                className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-medium text-text-muted"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );

                  return item.link ? (
                    <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={item.name}>{content}</div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
