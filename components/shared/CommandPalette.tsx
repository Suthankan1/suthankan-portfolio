"use client";

import type { ComponentType, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Fuse from "fuse.js";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Copy,
  Download,
  FileText,
  FolderKanban,
  Home,
  Mail,
  Moon,
  Newspaper,
  Plane,
  Search,
  Sparkles,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";

export type CommandPaletteProject = {
  slug: string;
  title: string;
  category: string;
};

export type CommandPalettePost = {
  slug: string;
  title: string;
  date: string;
  category: string;
};

type CommandPaletteProps = {
  projects: CommandPaletteProject[];
  posts: CommandPalettePost[];
};

type PaletteGroup = "Pages" | "Projects" | "Blog Posts" | "Actions";
type PaletteItemType = "link" | "action";

type PaletteItem = {
  id: string;
  group: PaletteGroup;
  type: PaletteItemType;
  label: string;
  description: string;
  href?: string;
  rightLabel?: string;
  keywords: string[];
  Icon: ComponentType<{ className?: string }>;
  action?: () => void | Promise<void>;
};

const EMAIL_ADDRESS = "Suthankanbala2019@gmail.com";
const CV_PATH = "/cv.pdf";
const GROUPS: PaletteGroup[] = ["Pages", "Projects", "Blog Posts", "Actions"];

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function openCv() {
  const link = document.createElement("a");
  link.href = CV_PATH;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function CommandPalette({ projects, posts }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentTheme = resolvedTheme ?? "light";

  const items = useMemo<PaletteItem[]>(() => {
    const pageItems: PaletteItem[] = [
      {
        id: "page-home",
        group: "Pages",
        type: "link",
        label: "Home",
        description: "Return to the portfolio introduction",
        href: "/",
        rightLabel: "⌘ H",
        keywords: ["landing", "intro", "suthankan"],
        Icon: Home,
      },
      {
        id: "page-about",
        group: "Pages",
        type: "link",
        label: "About",
        description: "Bio, values, timeline, and current focus",
        href: "/about",
        keywords: ["bio", "timeline", "values"],
        Icon: User,
      },
      {
        id: "page-projects",
        group: "Pages",
        type: "link",
        label: "Projects",
        description: "Case studies and selected engineering work",
        href: "/projects",
        keywords: ["work", "case studies", "portfolio"],
        Icon: FolderKanban,
      },
      {
        id: "page-blog",
        group: "Pages",
        type: "link",
        label: "Blog",
        description: "Technical writing and product notes",
        href: "/blog",
        keywords: ["articles", "writing", "mdx"],
        Icon: Newspaper,
      },
      {
        id: "page-travels",
        group: "Pages",
        type: "link",
        label: "Travels",
        description: "Travel journal, photos, and places",
        href: "/travels",
        keywords: ["travel", "journal", "photos"],
        Icon: Plane,
      },
      {
        id: "page-certificates",
        group: "Pages",
        type: "link",
        label: "Certificates",
        description: "Verified learning and credentials",
        href: "/certificates",
        keywords: ["certifications", "credentials", "learning"],
        Icon: Award,
      },
      {
        id: "page-contact",
        group: "Pages",
        type: "link",
        label: "Contact",
        description: "Email, social links, and project enquiry form",
        href: "/contact",
        keywords: ["hire", "email", "message"],
        Icon: Mail,
      },
      {
        id: "page-uses",
        group: "Pages",
        type: "link",
        label: "Uses",
        description: "Tools, stack, setup, and daily workflow",
        href: "/uses",
        keywords: ["setup", "tools", "gear"],
        Icon: Wrench,
      },
    ];

    const projectItems = projects.map<PaletteItem>((project) => ({
      id: `project-${project.slug}`,
      group: "Projects",
      type: "link",
      label: project.title,
      description: project.category,
      href: `/projects/${project.slug}`,
      rightLabel: project.category,
      keywords: ["project", "case study", project.category],
      Icon: BriefcaseBusiness,
    }));

    const postItems = posts.map<PaletteItem>((post) => ({
      id: `post-${post.slug}`,
      group: "Blog Posts",
      type: "link",
      label: post.title,
      description: post.category,
      href: `/blog/${post.slug}`,
      rightLabel: formatDate(post.date),
      keywords: ["blog", "post", "article", post.category],
      Icon: FileText,
    }));

    const actionItems: PaletteItem[] = [
      {
        id: "action-theme",
        group: "Actions",
        type: "action",
        label: currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        description: "Toggle the portfolio colour theme",
        rightLabel: currentTheme === "dark" ? "Light" : "Dark",
        keywords: ["theme", "dark", "light", "appearance"],
        Icon: currentTheme === "dark" ? Sun : Moon,
        action: () => setTheme(currentTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "action-cv",
        group: "Actions",
        type: "action",
        label: "Download CV",
        description: "Download Suthankan's curriculum vitae",
        rightLabel: "PDF",
        keywords: ["resume", "cv", "download"],
        Icon: Download,
        action: openCv,
      },
      {
        id: "action-email",
        group: "Actions",
        type: "action",
        label: copiedEmail ? "Email copied" : "Copy email address",
        description: EMAIL_ADDRESS,
        rightLabel: copiedEmail ? "Done" : "Copy",
        keywords: ["email", "contact", "copy", EMAIL_ADDRESS],
        Icon: copiedEmail ? Check : Copy,
        action: async () => {
          await navigator.clipboard.writeText(EMAIL_ADDRESS);
          setCopiedEmail(true);
          window.setTimeout(() => setCopiedEmail(false), 1600);
        },
      },
    ];

    return [...pageItems, ...projectItems, ...postItems, ...actionItems];
  }, [copiedEmail, currentTheme, posts, projects, setTheme]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["label", "description", "keywords", "rightLabel", "group"],
        threshold: 0.36,
        ignoreLocation: true,
      }),
    [items],
  );

  const visibleItems = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return items;
    }

    return fuse.search(trimmedQuery).map((result) => result.item);
  }, [fuse, items, query]);

  const groupedItems = useMemo(
    () =>
      GROUPS.map((group) => ({
        group,
        items: visibleItems.filter((item) => item.group === group),
      })).filter((section) => section.items.length > 0),
    [visibleItems],
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    function openPalette() {
      setIsOpen(true);
    }

    function handleKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        setIsOpen((value) => !value);
        return;
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("open-command-palette", openPalette);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-command-palette", openPalette);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function closePalette() {
    setIsOpen(false);
    setQuery("");
  }

  async function selectItem(item: PaletteItem) {
    if (item.type === "link" && item.href) {
      router.push(item.href);
    } else {
      await item.action?.();
    }

    closePalette();
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => (visibleItems.length === 0 ? 0 : (index + 1) % visibleItems.length));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) => (visibleItems.length === 0 ? 0 : (index - 1 + visibleItems.length) % visibleItems.length));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selectedItem = visibleItems[selectedIndex];
      if (selectedItem) {
        void selectItem(selectedItem);
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] flex min-h-screen items-start justify-center px-4 pt-24 sm:px-6 sm:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md"
            onClick={closePalette}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-[600px] overflow-hidden rounded-xl border border-border bg-bg-primary shadow-[var(--shadow-lg)]"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22 }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-4">
              <Search className="h-5 w-5 text-accent-primary" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search pages, projects, writing, and actions..."
                className="min-w-0 flex-1 bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted"
                aria-label="Search command palette"
              />
              <kbd className="hidden rounded-full border border-border bg-bg-secondary px-2 py-1 text-[11px] font-semibold text-text-muted sm:inline-flex">
                ESC
              </kbd>
            </div>

            <div className="max-h-[62vh] overflow-y-auto px-2 py-3">
              {visibleItems.length > 0 ? (
                groupedItems.map((section) => (
                  <div key={section.group} className="pb-3 last:pb-0">
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                      {section.group}
                    </p>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const flatIndex = visibleItems.findIndex((visibleItem) => visibleItem.id === item.id);
                        const isSelected = flatIndex === selectedIndex;
                        const Icon = item.Icon;

                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            onClick={() => void selectItem(item)}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            className={cn(
                              "group flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-3 text-left transition-colors",
                              isSelected
                                ? "bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-text-primary"
                                : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
                            )}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={
                              prefersReducedMotion ? { duration: 0 } : { duration: 0.18, delay: Math.min(flatIndex, 8) * 0.025 }
                            }
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border",
                                isSelected
                                  ? "border-[color-mix(in_srgb,var(--accent-primary)_45%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_14%,transparent)] text-accent-primary"
                                  : "border-border bg-bg-secondary text-text-muted",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold">{item.label}</span>
                              <span className="mt-0.5 block truncate text-xs text-text-muted">{item.description}</span>
                            </span>
                            {item.rightLabel ? (
                              <span className="shrink-0 rounded-full border border-border bg-bg-secondary px-2.5 py-1 text-xs font-semibold text-text-muted">
                                {item.rightLabel}
                              </span>
                            ) : null}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-14 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-accent-primary" />
                  <p className="mt-4 font-display text-2xl font-semibold text-text-primary">No matching command</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-muted">
                    Try searching for a page, a project name, an article topic, or an action like theme or email.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-bg-secondary px-4 py-3 text-xs text-text-muted">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" />
                Navigate with arrows
              </span>
              <span>Enter to open</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
