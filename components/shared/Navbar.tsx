"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

type NavLink = Readonly<{
  label: string;
  href: string;
  note: string;
}>;

const NAV_LINKS = [
  { label: "Work", href: "/projects", note: "Selected builds" },
  { label: "Writing", href: "/blog", note: "Technical notes" },
  { label: "About", href: "/about", note: "Background" },
  { label: "Contact", href: "/contact", note: "Start a conversation" },
] as const satisfies readonly NavLink[];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ProfileLogo({ priority = false }: { priority?: boolean }) {
  return (
    <span className="relative inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border-strong bg-bg-tertiary">
      <Image
        src="/images/profile/my-photo.webp"
        alt=""
        fill
        priority={priority}
        sizes="44px"
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsMenuOpen(true);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [closeMenu, isMenuOpen]);

  const currentTheme = useMemo(() => {
    if (!isMounted) {
      return "light";
    }

    return resolvedTheme ?? "light";
  }, [isMounted, resolvedTheme]);

  function openCommandPalette() {
    window.dispatchEvent(new Event("open-command-palette"));
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        isScrolled
          ? "border-border bg-bg-primary/92 backdrop-blur-xl"
          : "border-transparent bg-bg-primary/75 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Suthankan home"
          className="flex min-w-0 items-center gap-3 text-text-primary"
        >
          <ProfileLogo priority />
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold leading-5">Suthankan</span>
            <span className="block truncate text-xs text-text-muted">Full-stack engineer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary",
                  isActive ? "bg-bg-secondary text-text-primary" : null,
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open command palette"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary transition-colors hover:border-border-strong hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary sm:w-auto sm:px-3"
            onClick={openCommandPalette}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-xs sm:font-semibold sm:text-text-muted">
              Ctrl K
            </span>
          </button>

          <button
            type="button"
            aria-label={currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary transition-colors hover:border-border-strong hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {currentTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Let's talk</Link>
          </Button>

          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary transition-colors hover:border-border-strong hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary lg:hidden"
            onClick={isMenuOpen ? closeMenu : openMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary/96 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
          >
            <div
              ref={menuPanelRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="mx-auto flex h-dvh w-full max-w-xl flex-col px-5 py-5"
            >
              <div className="flex items-center justify-between">
                <Link href="/" aria-label="Suthankan home" className="flex items-center gap-3" onClick={closeMenu}>
                  <ProfileLogo />
                  <span>
                    <span className="block text-sm font-semibold text-text-primary">Suthankan</span>
                    <span className="block text-xs text-text-muted">Full-stack engineer</span>
                  </span>
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-primary text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  onClick={closeMenu}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-3" aria-label="Mobile primary navigation">
                {NAV_LINKS.map((link, index) => {
                  const isActive = isActivePath(pathname, link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.2, delay: index * 0.03, ease: "easeOut" }
                      }
                    >
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "grid gap-1 rounded-lg border px-4 py-4 transition-colors",
                          isActive
                            ? "border-border-strong bg-bg-secondary text-text-primary"
                            : "border-border bg-transparent text-text-secondary hover:border-border-strong hover:text-text-primary",
                        )}
                        onClick={closeMenu}
                      >
                        <span className="text-3xl font-semibold tracking-normal">{link.label}</span>
                        <span className="text-sm text-text-muted">{link.note}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="grid gap-3 border-t border-border pt-5">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={closeMenu}>
                    Start a project
                  </Link>
                </Button>
                <p className="text-center text-xs text-text-muted">Available for product engineering and Java backend work.</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
