import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, AtSign, BookOpen, BriefcaseBusiness, Circle, GitFork, Mail, MapPin } from "lucide-react";

type FooterLink = Readonly<{
  label: string;
  href: string;
}>;

type SocialLink = Readonly<{
  label: string;
  href: string;
  Icon: typeof BookOpen;
}>;

const EXPLORE_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly FooterLink[];

const MORE_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Certificates", href: "/certificates" },
  { label: "Uses", href: "/uses" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "External writing", href: "/blog/external" },
] as const satisfies readonly FooterLink[];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Suthankan1", Icon: GitFork },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/suthankan/", Icon: BriefcaseBusiness },
  { label: "Medium", href: "https://medium.com/@suthankanbala2019", Icon: BookOpen },
  { label: "Email", href: "mailto:Suthankanbala2019@gmail.com", Icon: AtSign },
] as const satisfies readonly SocialLink[];

function FooterNav({ label, links }: { label: string; links: readonly FooterLink[] }) {
  return (
    <nav aria-label={label} className="grid gap-3">
      <p className="field-note-kicker">{label}</p>
      <div className="grid gap-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg-secondary text-text-primary">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.6fr_0.6fr_0.8fr]">
          <section className="max-w-xl space-y-6">
            <Link href="/" aria-label="Suthankan home" className="flex w-fit items-center gap-3">
              <span className="relative inline-flex h-12 w-12 overflow-hidden rounded-full border border-border-strong bg-bg-tertiary">
                <Image
                  src="/images/profile/my-photo.webp"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block text-sm font-semibold">Suthankan</span>
                <span className="block text-xs text-text-muted">Full-stack engineer</span>
              </span>
            </Link>

            <div className="space-y-3">
              <h2 className="max-w-lg text-2xl font-semibold tracking-normal text-balance sm:text-3xl">
                Build notes, system decisions, and honest product engineering.
              </h2>
              <p className="max-w-md text-sm leading-6 text-text-secondary">
                Java, Spring Boot, React, Next.js, and the practical craft of turning rough product ideas into usable systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary transition-colors hover:border-border-strong hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </section>

          <FooterNav label="Explore" links={EXPLORE_LINKS} />
          <FooterNav label="More" links={MORE_LINKS} />

          <section className="space-y-4">
            <p className="field-note-kicker">Availability</p>
            <div className="grid gap-3 text-sm text-text-secondary">
              <p className="inline-flex items-center gap-2 text-text-primary">
                <Circle className="h-3 w-3 fill-accent-secondary text-accent-secondary" />
                Open to opportunities
              </p>
              <a
                href="mailto:Suthankanbala2019@gmail.com"
                className="inline-flex w-fit items-center gap-2 transition-colors hover:text-text-primary"
              >
                <Mail className="h-4 w-4" />
                Suthankanbala2019@gmail.com
              </a>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Colombo, Sri Lanka, UTC+5:30
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex w-fit items-center gap-2 text-text-primary transition-colors hover:text-accent-primary"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-5 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Suthankan. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and a growing engineering notebook.</p>
        </div>
      </div>
    </footer>
  );
}
