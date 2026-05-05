import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-bg-primary px-6 py-16 text-text-primary sm:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--accent-primary)_0%,transparent_28%),radial-gradient(circle_at_bottom_right,var(--accent-secondary)_0%,transparent_24%),linear-gradient(135deg,transparent_0%,color-mix(in_srgb,var(--bg-tertiary)_38%,transparent)_100%)] opacity-90" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[72px_72px] opacity-40 mask-[radial-gradient(circle_at_center,black_25%,transparent_82%)]" />

      <div className="absolute left-[8%] top-[14%] h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] blur-3xl motion-safe:animate-[float_16s_ease-in-out_infinite]" />
      <div className="absolute right-[10%] top-[22%] h-28 w-28 rounded-[2.5rem] bg-[color-mix(in_srgb,var(--accent-secondary)_16%,transparent)] blur-2xl motion-safe:animate-[float_19s_ease-in-out_infinite]" />
      <div className="absolute bottom-[14%] left-[20%] h-24 w-24 rounded-full border border-border/60 bg-transparent motion-safe:animate-[float_22s_ease-in-out_infinite]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="type-accent-label text-text-muted">Lost in the void?</p>

        <div className="relative mt-8">
          <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-[clamp(9rem,26vw,20rem)] font-semibold leading-none -tracking-widest text-[color-mix(in_srgb,var(--accent-primary)_14%,transparent)]">
            404
          </span>
          <h1 className="relative text-[clamp(2.75rem,7vw,5.25rem)] font-semibold tracking-[-0.06em] text-text-primary">
            Lost in the void?
          </h1>
        </div>

        <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
          This page doesn't exist — but great things do.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">← Back Home</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -18px, 0) scale(1.04);
          }
        }
      `}</style>
    </main>
  );
}