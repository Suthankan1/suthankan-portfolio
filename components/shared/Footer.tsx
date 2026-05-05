"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp, Github, Linkedin, Mail, X } from "lucide-react";
import { cn } from "../../lib/utils";

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
  { label: "Travels", href: "/travels" },
  { label: "Certificates", href: "/certificates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly QuickLink[];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Suthankan1", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Twitter/X", href: "https://x.com/", icon: "x" },
  { label: "Medium", href: "https://medium.com/", icon: "medium" },
] as const satisfies readonly SocialLink[];

function MonogramLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-12 w-12 drop-shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_24%,transparent)]"
      fill="none"
    >
      <defs>
        <linearGradient id="footer-monogram-gradient" x1="8" x2="56" y1="8" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent-primary)" />
          <stop offset="1" stopColor="var(--accent-secondary)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" stroke="url(#footer-monogram-gradient)" strokeWidth="3" opacity="0.92" />
      <path
        d="M20 42V22c0-1.1.9-2 2-2h5c3.9 0 7 3.1 7 7s-3.1 7-7 7h-2v8m17 0-8-10 7-10"
        stroke="url(#footer-monogram-gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M4.5 6.5c0-.4.2-.8.5-.9L6.7 5l5.4 12.1L18.5 5l1.7.6c.3.1.5.5.5.9v10.8c0 .4-.2.8-.5.9l-1.6.6V8.6l-5 11.2c-.2.4-.7.4-.9 0L8 8.6v8.2l1.6.6c.3.1.5.5.5.9s-.2.8-.5.9l-1.7.6-1.7-.6a1 1 0 0 1-.5-.9V6.5Z" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  if (icon === "github") {
    return <Github className="h-4 w-4" />;
  }

  if (icon === "linkedin") {
    return <Linkedin className="h-4 w-4" />;
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
                <MonogramLogo />
                <p className="max-w-sm text-sm leading-6 text-text-secondary">
                  Suthankan is building a crafted portfolio that blends strong engineering with
                  editorial storytelling and travel depth.
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
                href="mailto:hello@suthankan.dev"
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <Mail className="h-4 w-4" />
                hello@suthankan.dev
              </a>

              <div className="space-y-1 text-sm text-text-secondary">
                <p>UTC+5:30</p>
                <p>Sri Lanka</p>
              </div>
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
