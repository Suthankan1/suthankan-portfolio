"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

type NavLink = Readonly<{
  label: string;
  href: string;
}>;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Travels", href: "/travels" },
  { label: "Services", href: "/services" },
  { label: "Certificates", href: "/certificates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavLink[];

function ProfileLogo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full border-2 border-[color-mix(in_srgb,var(--accent-primary)_55%,var(--border))] bg-bg-tertiary shadow-[0_0_18px_color-mix(in_srgb,var(--accent-primary)_18%,transparent)]",
        size === "lg" ? "h-12 w-12" : "h-10 w-10",
      )}
    >
      <Image
        src="/images/profile/my-photo.jpeg"
        alt=""
        fill
        priority={size === "md"}
        sizes={size === "lg" ? "48px" : "40px"}
        className="object-cover"
      />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 80);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  const currentTheme = useMemo(() => {
    if (!isMounted) {
      return "light";
    }

    return resolvedTheme ?? "light";
  }, [isMounted, resolvedTheme]);

  const shellClassName = cn(
    "fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] transition-colors duration-300",
    isScrolled ? "bg-bg-primary/80 backdrop-blur-xl" : "bg-transparent backdrop-blur-none",
  );

  function openCommandPalette() {
    window.dispatchEvent(new Event("open-command-palette"));
  }

  return (
    <header className={shellClassName}>
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Suthankan home"
          className="flex items-center gap-3 text-text-primary transition-opacity hover:opacity-80"
        >
          <ProfileLogo />
          <span className="type-accent-label hidden text-text-muted sm:block">Suthankan</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium tracking-tight text-text-secondary transition-colors hover:text-text-primary",
                  isActive ? "text-text-primary" : null,
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 rounded-full bg-accent-primary transition-transform duration-300 ease-out",
                    isActive ? "scale-x-100" : null,
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Open command palette"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-bg-primary px-3 text-text-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={openCommandPalette}
          >
            <Search className="h-4 w-4" />
            <kbd className="hidden text-[11px] font-semibold text-text-muted sm:inline-flex">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            aria-label={currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {currentTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Hire Me</Link>
          </Button>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary lg:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
          >
            <button
              aria-label="Close mobile menu overlay"
              className="absolute inset-0 cursor-default bg-[color-mix(in_srgb,var(--bg-primary)_92%,transparent)] backdrop-blur-xl"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              className="relative flex h-full w-full flex-col justify-between px-6 py-6 sm:px-8"
              initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { y: 16, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <ProfileLogo size="lg" />
                  <span className="type-accent-label text-text-muted">Suthankan</span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-4">
                {NAV_LINKS.map((link, index) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <motion.div
                      key={link.href}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.28, delay: 0.04 * index, ease: "easeOut" }
                      }
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "group block text-5xl font-semibold tracking-tight sm:text-6xl",
                          isActive ? "text-text-primary" : "text-text-secondary",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative inline-block">
                          {link.label}
                          <span
                            className={cn(
                              "absolute left-0 -bottom-2 h-0.75 w-full origin-left scale-x-0 rounded-full bg-accent-primary transition-transform duration-300 group-hover:scale-x-100",
                              isActive ? "scale-x-100" : null,
                            )}
                          />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="flex items-center justify-between border-t border-border pt-5 text-sm text-text-secondary">
                <span>Premium editorial portfolio</span>
                <Button asChild size="sm">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Hire Me
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
