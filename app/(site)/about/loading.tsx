function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-bg-secondary ${className}`} />;
}

export default function AboutLoading() {
  return (
    <main className="min-h-screen bg-bg-primary px-6 py-12 text-text-primary sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-14">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div className="space-y-6">
            <SkeletonBlock className="h-5 w-32 rounded-full" />
            <SkeletonBlock className="h-32 w-full max-w-4xl" />
            <div className="space-y-3">
              <SkeletonBlock className="h-5 w-full max-w-2xl" />
              <SkeletonBlock className="h-5 w-full max-w-xl" />
              <SkeletonBlock className="h-5 w-3/4 max-w-lg" />
            </div>
          </div>
          <SkeletonBlock className="aspect-[4/5] w-full" />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-border bg-bg-primary p-5">
              <SkeletonBlock className="h-10 w-16" />
              <SkeletonBlock className="mt-4 h-4 w-28" />
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div className="space-y-4">
            <SkeletonBlock className="h-5 w-28 rounded-full" />
            <SkeletonBlock className="h-20 w-full" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-xl border border-border bg-bg-primary p-5">
                <SkeletonBlock className="h-5 w-24 rounded-full" />
                <SkeletonBlock className="mt-4 h-7 w-3/4" />
                <SkeletonBlock className="mt-3 h-4 w-full" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
