"use client";

import { useEffect } from "react";
import { Button } from "../components/ui/Button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-bg-primary px-6 py-16 text-text-primary sm:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--accent-primary)_0%,transparent_28%),radial-gradient(circle_at_bottom_right,var(--accent-secondary)_0%,transparent_24%),linear-gradient(135deg,transparent_0%,color-mix(in_srgb,var(--bg-tertiary)_38%,transparent)_100%)] opacity-90" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[72px_72px] opacity-40 mask-[radial-gradient(circle_at_center,black_25%,transparent_82%)]" />

      <div className="absolute left-[8%] top-[14%] h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] blur-3xl motion-safe:animate-pulse" />
      <div className="absolute right-[10%] top-[22%] h-28 w-28 rounded-[2.5rem] bg-[color-mix(in_srgb,var(--accent-secondary)_16%,transparent)] blur-2xl motion-safe:animate-pulse" />
      <div className="absolute bottom-[14%] left-[20%] h-24 w-24 rounded-full border border-border/60 bg-transparent motion-safe:animate-pulse" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="type-accent-label text-text-muted">Runtime error</p>

        <div className="relative mt-8">
          <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-[clamp(8rem,24vw,18rem)] font-semibold leading-none -tracking-widest text-[color-mix(in_srgb,var(--accent-primary)_14%,transparent)]">
            500
          </span>
          <h1 className="relative text-[clamp(2.75rem,7vw,5.25rem)] font-semibold tracking-[-0.06em] text-text-primary">
            Something went wrong
          </h1>
        </div>

        <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
          The page hit a temporary issue. Try again and it should recover cleanly.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" type="button" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
