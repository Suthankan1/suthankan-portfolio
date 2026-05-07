"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isValidElement } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AlertTriangle, Check, Clipboard, Info, Lightbulb, Siren } from "lucide-react";
import { slugifyHeading } from "../../lib/blog";
import { BLUR_DATA_URL } from "../../lib/images";
import { cn } from "../../lib/utils";

type CalloutVariant = "info" | "warning" | "tip" | "danger";

type CalloutProps = {
  children: ReactNode;
  title?: string;
  variant?: CalloutVariant;
};

const calloutConfig: Record<CalloutVariant, { label: string; icon: typeof Info; className: string }> = {
  info: {
    label: "Note",
    icon: Info,
    className:
      "border-[color-mix(in_srgb,var(--accent-primary)_55%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_9%,transparent)]",
  },
  warning: {
    label: "Watch",
    icon: AlertTriangle,
    className:
      "border-[color-mix(in_srgb,var(--accent-secondary)_70%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)]",
  },
  tip: {
    label: "Tip",
    icon: Lightbulb,
    className:
      "border-[color-mix(in_srgb,var(--accent-secondary)_72%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_14%,transparent)]",
  },
  danger: {
    label: "Risk",
    icon: Siren,
    className:
      "border-[color-mix(in_srgb,var(--accent-primary)_72%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)]",
  },
};

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  return "";
}

export function Callout({ children, title, variant = "info" }: CalloutProps) {
  const config = calloutConfig[variant];
  const Icon = config.icon;

  return (
    <aside className={cn("my-8 border-l-4 px-5 py-4", config.className)}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-text-primary">
        <Icon className="h-4 w-4 text-accent-primary" />
        {title ?? config.label}
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">{children}</div>
    </aside>
  );
}

export function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => textFromChildren(children).replace(/\n$/, ""), [children]);
  const language = className?.replace("language-", "") || "text";

  useEffect(() => {
    let cancelled = false;

    async function highlightCode() {
      const { codeToHtml } = await import("shiki");
      const highlighted = await codeToHtml(code, {
        lang: language,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });

      if (!cancelled) {
        setHtml(highlighted);
      }
    }

    highlightCode().catch(() => setHtml(""));

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="my-8 overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-tertiary">
      <div className="flex items-center justify-between border-b border-border bg-bg-secondary px-4 py-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          {language}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {html ? (
        <div
          className="[&>pre]:overflow-x-auto [&>pre]:bg-transparent! [&>pre]:p-5 [&_code]:font-mono [&_code]:text-sm [&_code]:leading-7"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-5">
          <code className="font-mono text-sm leading-7 text-text-secondary">{code}</code>
        </pre>
      )}
    </div>
  );
}

export function CaptionedImage({
  alt = "",
  src = "",
  title,
}: ComponentPropsWithoutRef<"img">) {
  if (!src || typeof src !== "string") {
    return null;
  }

  return (
    <figure className="my-10">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-tertiary">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      {(title || alt) && (
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-text-muted">{title ?? alt}</figcaption>
      )}
    </figure>
  );
}

function HeadingTwo({ children }: { children: ReactNode }) {
  const text = textFromChildren(children);
  return (
    <h2 id={slugifyHeading(text)} className="scroll-mt-28 pt-8 font-display text-4xl font-semibold tracking-[-0.04em]">
      {children}
    </h2>
  );
}

function HeadingThree({ children }: { children: ReactNode }) {
  const text = textFromChildren(children);
  return (
    <h3 id={slugifyHeading(text)} className="scroll-mt-28 pt-5 font-display text-2xl font-semibold tracking-[-0.03em]">
      {children}
    </h3>
  );
}

export const mdxComponents = {
  Callout,
  CodeBlock,
  Image: CaptionedImage,
  img: CaptionedImage,
  h2: HeadingTwo,
  h3: HeadingThree,
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
    if (isValidElement(children) && children.type === CaptionedImage) {
      return children;
    }

    return (
      <p className="text-lg leading-8 text-text-secondary" {...props}>
        {children}
      </p>
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-6 list-disc space-y-3 pl-6 text-lg leading-8 text-text-secondary marker:text-accent-primary" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-text-secondary marker:text-accent-primary" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-4 border-[var(--accent-primary)] bg-bg-secondary px-5 py-4 font-display text-2xl leading-snug tracking-[-0.03em] text-text-primary"
      {...props}
    />
  ),
  pre: ({ children }: { children: ReactNode }) => {
    if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props &&
      typeof children.props === "object"
    ) {
      const childProps = children.props as { children?: ReactNode; className?: string };
      return <CodeBlock className={childProps.className}>{childProps.children}</CodeBlock>;
    }

    return <pre>{children}</pre>;
  },
  code: ({ children, className }: ComponentPropsWithoutRef<"code">) => {
    if (className?.startsWith("language-")) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }

    return (
      <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-[0.92em] text-text-primary">
        {children}
      </code>
    );
  },
};
