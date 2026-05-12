"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Copy, Mail, MessageSquare, Share2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon } from "../icons/GithubIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { CodeBlock } from "./MDXComponents";
import { LikeButton } from "./LikeButton";
import { ViewCounter } from "./ViewCounter";
import type { TocHeading } from "../../lib/blog";
import { formatPostDate, slugifyHeading } from "../../lib/blog";
import { BLUR_DATA_URL } from "../../lib/images";
import { cn } from "../../lib/utils";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  coverImage: string;
  excerpt: string;
  bodyRaw: string;
};

type RelatedPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: number;
  coverImage: string;
};

type BlogPostContentProps = {
  post: BlogPost;
  relatedPosts: RelatedPost[];
  toc: TocHeading[];
};

const GISCUS_CONFIG = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "",
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "",
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements",
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  theme: "preferred_color_scheme",
  lang: "en",
} as const;

function isGiscusConfigured() {
  return Boolean(
    GISCUS_CONFIG.repo &&
      GISCUS_CONFIG.repoId &&
      GISCUS_CONFIG.category &&
      GISCUS_CONFIG.categoryId &&
      !GISCUS_CONFIG.repoId.includes("NOTCONFIGURED") &&
      !GISCUS_CONFIG.categoryId.includes("NOTCONFIGURED"),
  );
}

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-[var(--accent-primary)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function useActiveHeading(toc: TocHeading[]) {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    if (toc.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -70% 0px",
        threshold: 0.01,
      },
    );

    toc.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  return activeId;
}

function TableOfContents({ mode, toc }: { mode: "desktop" | "mobile"; toc: TocHeading[] }) {
  const activeId = useActiveHeading(toc);

  if (toc.length === 0) {
    return null;
  }

  const links = (
    <nav className="space-y-1">
      {toc.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            "block border-l px-3 py-2 text-sm leading-snug transition-colors",
            heading.level === 3 ? "ml-3" : "",
            activeId === heading.id
              ? "border-[var(--accent-primary)] text-text-primary"
              : "border-border text-text-muted hover:border-[var(--accent-primary)] hover:text-text-primary",
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {mode === "desktop" ? (
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
            On this page
          </p>
          {links}
        </div>
      </aside>
      ) : (
      <details className="mb-8 rounded-[var(--radius-md)] border border-border bg-bg-secondary p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.14em] text-text-primary">
          Table of contents
        </summary>
        <div className="mt-4">{links}</div>
      </details>
      )}
    </>
  );
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
        <Share2 className="h-4 w-4" />
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
        aria-label="Share on X"
      >
        <X className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 text-sm font-semibold text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
      >
        <Copy className="h-4 w-4" />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function AuthorBioCard() {
  return (
    <section className="mt-16 rounded-[var(--radius-md)] border border-border bg-bg-secondary p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] bg-bg-tertiary">
          <Image
            src="/images/profile/my-photo.webp"
            alt="Portrait of Suthankan"
            fill
            sizes="80px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Written by</p>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em]">Suthankan</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-text-secondary">
            IT undergraduate, full-stack developer, and traveller from Sri Lanka. I write about building polished
            products, learning in public, and the small technical choices that make software feel considered.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="mailto:Suthankanbala2019@gmail.com"
            aria-label="Email Suthankan"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/Suthankan1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

const newsletterSchema = z.object({
  email: z.string().trim().email(),
});

type NewsletterFields = z.infer<typeof newsletterSchema>;

function NewsletterCta() {
  const [submitted, setSubmitted] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<NewsletterFields>({
    resolver: zodResolver(newsletterSchema),
  });

  function onSubmit() {
    setSubmitted(true);
  }

  return (
    <section className="mt-12 border-y border-border bg-bg-secondary px-5 py-10 sm:px-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Newsletter</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em]">
            Enjoyed this? Subscribe for more.
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">
            Occasional notes on full-stack craft, polished interfaces, and building a portfolio with real signal.
          </p>
        </div>
        <form className="flex w-full max-w-md flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-12 min-w-0 flex-1 rounded-full border border-border bg-bg-primary px-4 text-sm outline-none transition-colors placeholder:text-text-muted focus:border-[var(--accent-primary)]"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-[var(--accent-primary)] px-5 text-sm font-semibold text-[var(--bg-primary)]"
          >
            Subscribe
          </button>
          </div>
          {errors.email ? (
            <p className="text-sm text-text-muted">{errors.email.message}</p>
          ) : null}
          {submitted ? (
            <p className="text-sm font-medium text-text-primary">You are on the early list. Proper backend wiring comes next.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function GiscusComments() {
  const configured = isGiscusConfigured();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!configured || !mounted) return;

    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const theme = isLocalhost
      ? (isDark ? "noborder_dark" : "noborder_light")
      : `${window.location.origin}/giscus-theme-${isDark ? "dark" : "light"}.css`;

    const container = document.getElementById("giscus-comments");
    if (!container) return;

    if (container.childElementCount > 0) {
      const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS_CONFIG.repo);
    script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
    script.setAttribute("data-category", GISCUS_CONFIG.category);
    script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
    script.setAttribute("data-mapping", GISCUS_CONFIG.mapping);
    script.setAttribute("data-strict", GISCUS_CONFIG.strict);
    script.setAttribute("data-reactions-enabled", GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute("data-emit-metadata", GISCUS_CONFIG.emitMetadata);
    script.setAttribute("data-input-position", GISCUS_CONFIG.inputPosition);
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", GISCUS_CONFIG.lang);
    container.appendChild(script);
  }, [configured, mounted, isDark]);

  return (
    <section className="mt-14">
      <div className="mb-7 flex items-center gap-4 border-b border-border pb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--accent-primary)_20%,transparent)]">
          <MessageSquare className="h-4.5 w-4.5 text-accent-primary" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">Discussion</h2>
          <p className="mt-0.5 text-xs font-medium text-text-muted">
            Sign in with GitHub to leave a comment or reaction
          </p>
        </div>
      </div>

      {configured ? (
        <div id="giscus-comments" className="min-h-40" />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_28%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_4%,var(--bg-secondary))] px-8 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--accent-primary)_20%,transparent)]">
            <MessageSquare className="h-5 w-5 text-accent-primary" />
          </div>
          <div>
            <p className="font-semibold text-text-primary">Discussions not yet enabled</p>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-text-muted">
              Install the Giscus app on the GitHub repo and set the four environment variables to activate comments.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Related</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em]">Keep reading</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-secondary transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative h-44 bg-bg-tertiary">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div className="space-y-3 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-primary">{post.category}</p>
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">{post.title}</h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{post.excerpt}</p>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                {formatPostDate(post.date)} · {post.readingTime} min
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; language: string; code: string };

function parseMarkdownBlocks(raw: string): MarkdownBlock[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const current = lines[index];
    const trimmed = current.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim() || "text";
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4).trim() });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3).trim() });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().slice(2).trim());
        index += 1;
      }

      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length) {
      const paragraphLine = lines[index].trim();

      if (
        !paragraphLine ||
        paragraphLine.startsWith("## ") ||
        paragraphLine.startsWith("### ") ||
        paragraphLine.startsWith("> ") ||
        paragraphLine.startsWith("```") ||
        /^[-*]\s+/.test(paragraphLine) ||
        /^\d+\.\s+/.test(paragraphLine)
      ) {
        break;
      }

      paragraphLines.push(paragraphLine);
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let cursor = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > cursor) {
      parts.push(text.slice(cursor, m.index));
    }
    const full = m[0];
    if (full.startsWith("**")) {
      parts.push(
        <strong key={m.index} className="font-semibold text-text-primary">
          {m[2]}
        </strong>,
      );
    } else if (full.startsWith("`")) {
      parts.push(
        <code key={m.index} className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-sm text-accent-primary">
          {m[3]}
        </code>,
      );
    } else if (full.startsWith("[")) {
      parts.push(
        <a key={m.index} href={m[5]} target="_blank" rel="noopener noreferrer" className="text-accent-primary underline underline-offset-2 hover:opacity-80">
          {m[4]}
        </a>,
      );
    }
    cursor = re.lastIndex;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length === 0 ? text : <>{parts}</>;
}

function MarkdownBody({ raw }: { raw: string }) {
  const blocks = parseMarkdownBlocks(raw);

  return (
    <div className="prose-none space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const id = slugifyHeading(block.text);
          const Heading = block.level === 2 ? "h2" : "h3";
          const className =
            block.level === 2
              ? "scroll-mt-28 pt-8 font-display text-4xl font-semibold tracking-[-0.04em]"
              : "scroll-mt-28 pt-5 font-display text-2xl font-semibold tracking-[-0.03em]";

          return (
            <Heading key={`${block.type}-${id}-${index}`} id={id} className={className}>
              {block.text}
            </Heading>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={`${block.type}-${index}`}
              className="my-8 border-l-4 border-[var(--accent-primary)] bg-bg-secondary px-5 py-4 font-display text-2xl leading-snug tracking-[-0.03em] text-text-primary"
            >
              {renderInline(block.text)}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          const listClassName = block.ordered
            ? "my-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-text-secondary marker:text-accent-primary"
            : "my-6 list-disc space-y-3 pl-6 text-lg leading-8 text-text-secondary marker:text-accent-primary";

          return (
            <List key={`${block.type}-${index}`} className={listClassName}>
              {block.items.map((item) => (
                <li key={item} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </List>
          );
        }

        if (block.type === "code") {
          return (
            <CodeBlock key={`${block.type}-${index}`} className={`language-${block.language}`}>
              {block.code}
            </CodeBlock>
          );
        }

        return (
          <p key={`${block.type}-${index}`} className="text-lg leading-8 text-text-secondary">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export function BlogPostContent({ post, relatedPosts, toc }: BlogPostContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="bg-bg-primary">
      <ReadingProgressBar />
      <article>
        <header className="mx-auto w-full max-w-5xl px-5 pb-10 pt-10 text-center sm:px-6 lg:px-8 lg:pt-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="relative mx-auto mb-8 aspect-[16/10] max-w-[700px] overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-tertiary shadow-[var(--shadow-lg)]">
              <Image
                src={post.coverImage}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div className="flex justify-center">
              <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">
                {post.category}
              </span>
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
              {post.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-text-muted">
              <span>{formatPostDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent-primary)]" />
              <span>{post.readingTime} min read</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent-primary)]" />
              <span>By Suthankan</span>
            </div>
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <LikeButton slug={post.slug} />
                <ViewCounter slug={post.slug} />
              </div>
              <ShareButtons title={post.title} />
            </div>
          </motion.div>
        </header>

        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[220px_minmax(0,760px)_160px] lg:px-8">
          <TableOfContents mode="desktop" toc={toc} />
          <div className="min-w-0">
            <TableOfContents mode="mobile" toc={toc} />
            <MarkdownBody raw={post.bodyRaw} />
            <AuthorBioCard />
            <NewsletterCta />
            <GiscusComments />
          </div>
          <div className="hidden lg:block" />
        </div>
      </article>
      <RelatedPosts posts={relatedPosts} />
    </main>
  );
}
