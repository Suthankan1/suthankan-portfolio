function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-bg-secondary ${className}`} />;
}

function ProjectCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-bg-primary">
      <SkeletonBlock className="h-48 w-full rounded-none" />
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <SkeletonBlock className="h-5 w-24 rounded-full" />
          <SkeletonBlock className="h-5 w-20 rounded-full" />
        </div>
        <SkeletonBlock className="h-8 w-4/5" />
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
        </div>
        <div className="flex flex-wrap gap-2">
          <SkeletonBlock className="h-7 w-20 rounded-full" />
          <SkeletonBlock className="h-7 w-16 rounded-full" />
          <SkeletonBlock className="h-7 w-24 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-bg-primary px-6 py-12 text-text-primary sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <SkeletonBlock className="h-5 w-36 rounded-full" />
            <SkeletonBlock className="h-28 w-full max-w-3xl" />
            <SkeletonBlock className="h-6 w-full max-w-2xl" />
          </div>
          <SkeletonBlock className="h-40 w-full" />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <SkeletonBlock className="h-[28rem] w-full" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
