"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp, Mail, Phone, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { NowPlaying } from "./NowPlaying";

type QuickLink = Readonly<{
  label: string;
  href: string;
}>;

type SocialLink = Readonly<{
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "medium";
}>;

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "External Articles", href: "/blog/external" },
  { label: "Travels", href: "/travels" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Certificates", href: "/certificates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly QuickLink[];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Suthankan1", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Twitter/X", href: "https://x.com/B_Suthankan", icon: "x" },
  { label: "Medium", href: "https://medium.com/@suthankanbala2019", icon: "medium" },
] as const satisfies readonly SocialLink[];

function ProfileLogo() {
  return (
    <span
      className="relative inline-flex h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[color-mix(in_srgb,var(--accent-primary)_55%,var(--border))] bg-bg-tertiary shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_18%,transparent)]"
    >
      <Image
        src="/images/profile/my-photo.jpeg"
        alt=""
        fill
        sizes="48px"
        className="object-cover"
      />
    </span>
  );
}

function MediumIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M5.38 6.13C2.41 6.13 0 8.76 0 12s2.41 5.87 5.38 5.87 5.38-2.63 5.38-5.87-2.41-5.87-5.38-5.87Zm8.56.34c-1.5 0-2.71 2.48-2.71 5.53s1.21 5.53 2.71 5.53 2.71-2.48 2.71-5.53-1.21-5.53-2.71-5.53Zm6.09.58c-.77 0-1.4 2.22-1.4 4.95s.63 4.95 1.4 4.95 1.4-2.22 1.4-4.95-.63-4.95-1.4-4.95Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.38c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.75c-1.1-.75.08-.73.08-.73a2.51 2.51 0 0 1 1.84 1.23 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.61c-2.66-.3-5.47-1.33-5.47-5.9a4.62 4.62 0 0 1 1.23-3.2 4.3 4.3 0 0 1 .12-3.15s1-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22a4.3 4.3 0 0 1 .12 3.15 4.6 4.6 0 0 1 1.22 3.2c0 4.58-2.8 5.6-5.48 5.9a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-1.02 1.85-2.09 3.81-2.09 4.08 0 4.83 2.68 4.83 6.16V21h-4v-5.62c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.97V21h-4V9Z" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  if (icon === "github") {
    return <GitHubIcon />;
  }

  if (icon === "linkedin") {
    return <LinkedInIcon />;
  }

  if (icon === "x") {
    return <X className="h-4 w-4" />;
  }

  return <MediumIcon />;
}

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 600);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <>
      <footer className="mt-20 w-full border-t border-border bg-bg-secondary text-text-primary">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="border-b border-border pb-10 lg:pb-12">
            <h2 className="type-display-section max-w-4xl text-balance">
              Let's build something remarkable.
            </h2>
          </div>

          <div className="grid gap-12 py-10 lg:grid-cols-[1.15fr_0.95fr_0.9fr] lg:gap-8 lg:py-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <ProfileLogo />
                <p className="max-w-sm text-sm leading-6 text-text-secondary">
                  I build full-stack products with a Java and Spring Boot backbone, document what
                  I learn through writing, and keep improving through real projects.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary",
                    )}
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Footer quick navigation" className="grid gap-3 text-sm">
              <p className="type-accent-label text-text-muted">Quick nav</p>
              <div className="grid gap-3">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_40%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] px-3 py-2 text-sm text-text-primary">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-secondary shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-secondary)_14%,transparent)]" />
                <span className="font-medium">Open to Opportunities</span>
              </div>

              <a
                href="mailto:Suthankanbala2019@gmail.com"
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <Mail className="h-4 w-4" />
                Suthankanbala2019@gmail.com
              </a>

              <a
                href="tel:+94719386979"
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <Phone className="h-4 w-4" />
                +94 71 938 6979
              </a>

              <div className="space-y-1 text-sm text-text-secondary">
                <p>UTC+5:30</p>
                <p>Sri Lanka</p>
              </div>

              <NowPlaying />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Suthankan. All rights reserved.</p>
            <p>Built with Next.js &amp; ☕</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary shadow-md backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
            onClick={scrollToTop}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
