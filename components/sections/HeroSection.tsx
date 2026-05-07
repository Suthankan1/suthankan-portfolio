"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, X as XIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { useMagneticHover } from "../../lib/hooks/useMagneticHover";
import { cn } from "../../lib/utils";

const ROLES = [
  "Full-Stack Developer",
  "NexaFlow Builder",
  "Technical Writer",
  "World Traveller",
] as const;

const SOCIAL_LINKS = [
  { href: "https://github.com/Suthankan1", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://x.com/B_Suthankan", label: "Twitter/X", icon: "x" },
  { href: "https://medium.com/@suthankanbala2019", label: "Medium", icon: "medium" },
] as const;

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.38c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.75c-1.1-.75.08-.73.08-.73a2.51 2.51 0 0 1 1.84 1.23 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.61c-2.66-.3-5.47-1.33-5.47-5.9a4.62 4.62 0 0 1 1.23-3.2 4.3 4.3 0 0 1 .12-3.15s1-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22a4.3 4.3 0 0 1 .12 3.15 4.6 4.6 0 0 1 1.22 3.2c0 4.58-2.8 5.6-5.48 5.9a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-1.02 1.85-2.09 3.81-2.09 4.08 0 4.83 2.68 4.83 6.16V21h-4v-5.62c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.97V21h-4V9Z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M5.38 6.13C2.41 6.13 0 8.76 0 12s2.41 5.87 5.38 5.87 5.38-2.63 5.38-5.87-2.41-5.87-5.38-5.87Zm8.56.34c-1.5 0-2.71 2.48-2.71 5.53s1.21 5.53 2.71 5.53 2.71-2.48 2.71-5.53-1.21-5.53-2.71-5.53Zm6.09.58c-.77 0-1.4 2.22-1.4 4.95s.63 4.95 1.4 4.95 1.4-2.22 1.4-4.95-.63-4.95-1.4-4.95Z" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: (typeof SOCIAL_LINKS)[number]["icon"] }) {
  if (icon === "github") {
    return <GitHubIcon />;
  }

  if (icon === "linkedin") {
    return <LinkedInIcon />;
  }

  if (icon === "x") {
    return <XIcon className="h-6 w-6" />;
  }

  return <MediumIcon />;
}

function SocialLinkButton({ link }: { link: (typeof SOCIAL_LINKS)[number] }) {
  const magnetic = useMagneticHover<HTMLAnchorElement>({ maxDisplacement: 8 });

  return (
    <a
      ref={magnetic.ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-primary text-text-secondary shadow-sm transition-all duration-200",
        "hover:-translate-y-1 hover:text-accent-primary hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
      )}
      onMouseLeave={magnetic.onMouseLeave}
      onMouseMove={magnetic.onMouseMove}
      style={magnetic.style}
    >
      <SocialIcon icon={link.icon} />
    </a>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    if (prefersReducedMotion) {
      setTypedLength(role.length);
      holdTimer = setTimeout(() => {
        setRoleIndex((current) => (current + 1) % ROLES.length);
      }, 2400);
      return () => {
        if (holdTimer) {
          clearTimeout(holdTimer);
        }
      };
    }

    setTypedLength(0);
    let cursor = 0;

    const typeTimer = setInterval(() => {
      cursor += 1;
      setTypedLength(Math.min(cursor, role.length));

      if (cursor >= role.length) {
        clearInterval(typeTimer);
        holdTimer = setTimeout(() => {
          setRoleIndex((current) => (current + 1) % ROLES.length);
        }, 1300);
      }
    }, 56);

    return () => {
      if (typeTimer) {
        clearInterval(typeTimer);
      }
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [prefersReducedMotion, roleIndex]);

  const revealContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const typedRole = ROLES[roleIndex].slice(0, typedLength);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-bg-primary"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_30%_50%,color-mix(in_srgb,var(--accent-primary)_15%,transparent)_0%,transparent_68%)]" />
        <div className="hero-grain absolute inset-0 opacity-45" />
      </motion.div>

      <motion.div
        className="mx-auto grid w-full max-w-7xl gap-12 px-6 pt-28 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)] lg:items-center lg:px-12"
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "show"}
        variants={prefersReducedMotion ? undefined : revealContainer}
      >
        <motion.div className="max-w-4xl space-y-8" variants={prefersReducedMotion ? undefined : revealItem}>
          <p className="type-accent-label text-text-muted">Portfolio / Intro</p>

          <div className="min-h-[2.1rem]">
            <p className="text-lg font-medium tracking-tight text-accent-primary sm:text-xl">
              <motion.span
                key={ROLES[roleIndex]}
                initial={prefersReducedMotion ? false : { opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                {typedRole}
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="ml-1 inline-block align-baseline"
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 1, 0] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
              >
                |
              </motion.span>
            </p>
          </div>

          <h1 className="text-balance font-display text-[clamp(3rem,8vw,5rem)] leading-[0.94] tracking-[-0.045em] text-text-primary">
            <span className="font-extrabold">Hi, I'm Suthankan.</span>
            <br />
            <span className="font-medium">I build things</span>{" "}
            <span className="inline-block -skew-x-6 italic text-accent-primary">that matter.</span>
          </h1>

          <p className="max-w-2xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
            IT Undergraduate from Sri Lanka 🇱🇰 — crafting digital experiences at the
            intersection of performance and design.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-2">
            {SOCIAL_LINKS.map((link) => (
              <SocialLinkButton key={link.href} link={link} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hidden lg:block"
          variants={prefersReducedMotion ? undefined : revealItem}
        >
          <div className="relative ml-auto w-full max-w-md rounded-2xl border border-border bg-[color-mix(in_srgb,var(--bg-tertiary)_84%,transparent)] p-6 shadow-lg backdrop-blur-sm">
            <div className="absolute -top-5 -right-5 h-20 w-20 rounded-[1.75rem] border border-accent-primary/35 bg-[color-mix(in_srgb,var(--accent-primary)_18%,transparent)]" />
            <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full border border-border bg-[color-mix(in_srgb,var(--accent-secondary)_16%,transparent)] blur-sm" />

            <div className="relative space-y-4 font-mono text-sm text-text-secondary">
              <p>
                <span className="text-accent-primary">const</span> builder = <span className="text-accent-secondary">"Suthankan"</span>;
              </p>
              <p>
                <span className="text-accent-primary">const</span> focus = [<span className="text-accent-secondary">"performance"</span>, <span className="text-accent-secondary">"design"</span>];
              </p>
              <p>
                <span className="text-accent-primary">export</span> <span className="text-accent-primary">default</span> function craft() {"{"}
              </p>
              <p className="pl-5">return <span className="text-accent-secondary">"work that matters"</span>;</p>
              <p>{"}"}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-1 text-text-muted">
        <span className="type-accent-label">Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 7, 0] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </div>

      <style jsx>{`
        .hero-grain {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.45), transparent 42%),
            radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.08), transparent 48%),
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.018) 0,
              rgba(0, 0, 0, 0.018) 1px,
              transparent 1px,
              transparent 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 0,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 2px
            );
          background-size: cover, cover, 3px 3px, 2px 2px;
          mix-blend-mode: multiply;
        }

        :global([data-theme="dark"]) .hero-grain {
          mix-blend-mode: screen;
          opacity: 0.28;
        }
      `}</style>
    </section>
  );
}
