import { Braces, Cloud, Database, Server, Wrench, type LucideIcon } from "lucide-react";

type Capability = {
  title: string;
  description: string;
  tools: readonly string[];
  Icon: LucideIcon;
};

const CAPABILITIES: readonly Capability[] = [
  {
    title: "Frontend systems",
    description: "Interfaces that stay readable across responsive states, real content, and changing product scope.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    Icon: Braces,
  },
  {
    title: "Backend foundations",
    description: "Service boundaries, API contracts, validation paths, and business rules that the UI can trust.",
    tools: ["Java", "Spring Boot", "REST APIs", "SQL"],
    Icon: Server,
  },
  {
    title: "Data and persistence",
    description: "Schemas, queries, and state flows shaped around the product decisions users need to make.",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
    Icon: Database,
  },
  {
    title: "Delivery habits",
    description: "Small, verifiable changes with a bias toward maintainability, documentation, and deployment readiness.",
    tools: ["Git", "Docker", "Vercel", "GitHub Actions"],
    Icon: Cloud,
  },
  {
    title: "Working tools",
    description: "The day-to-day kit for design review, API exploration, debugging, and engineering communication.",
    tools: ["Figma", "Postman", "VS Code", "Linux"],
    Icon: Wrench,
  },
];

export function SkillsSection() {
  return (
    <section className="border-y border-border bg-bg-secondary">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="field-note-kicker">Stack map</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Tools organized by the decisions they support.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {CAPABILITIES.map(({ title, description, tools, Icon }) => (
            <article key={title} className="rounded-lg border border-border bg-bg-primary p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg-secondary text-accent-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-normal">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
