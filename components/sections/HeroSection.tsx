import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AtSign, BookOpen, BriefcaseBusiness, GitFork, MapPin } from "lucide-react";
import { Button } from "../ui/Button";

const PROOF_POINTS = [
  { label: "Current focus", value: "Java and Spring Boot systems" },
  { label: "Primary stack", value: "TypeScript, React, Next.js" },
  { label: "Work style", value: "Clear flows, honest constraints" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://github.com/Suthankan1", label: "GitHub", Icon: GitFork },
  { href: "https://www.linkedin.com/in/suthankan/", label: "LinkedIn", Icon: BriefcaseBusiness },
  { href: "https://medium.com/@suthankanbala2019", label: "Medium", Icon: BookOpen },
  { href: "mailto:Suthankanbala2019@gmail.com", label: "Email", Icon: AtSign },
] as const;

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-bg-primary text-text-primary">
      <Image
        src="/images/profile/my-photo.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-[62%_center] opacity-[0.42]"
      />
      <div className="absolute inset-0 -z-10 bg-[color-mix(in_srgb,var(--bg-primary)_72%,transparent)]" />

      <div className="mx-auto grid min-h-[88svh] w-full max-w-7xl content-end px-6 pb-12 pt-28 sm:px-8 lg:px-12">
        <div className="max-w-5xl">
          <p className="field-note-kicker">Suthankan / Full-stack engineer</p>
          <h1 className="mt-5 max-w-5xl text-balance font-display text-[clamp(4rem,12vw,9rem)] font-semibold leading-[0.88] tracking-normal">
            Suthankan
          </h1>
          <p className="mt-7 max-w-3xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
            I build full-stack product systems with a Java backend backbone, a TypeScript frontend habit, and a preference for interfaces that make the next decision obvious.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                Study the work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border-strong pt-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-3 sm:grid-cols-3">
            {PROOF_POINTS.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs font-semibold uppercase text-text-muted">{item.label}</p>
                <p className="max-w-52 text-sm leading-6 text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin className="h-3.5 w-3.5" />
              Colombo, UTC+5:30
            </span>
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary/80 text-text-primary transition-colors hover:border-border-strong hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
