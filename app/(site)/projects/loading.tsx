function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-bg-secondary ${className}`} />;
}

function ProjectRowSkeleton({ isFirst = false }: { isFirst?: boolean }) {
  return (
    <article className="flex flex-col md:flex-row items-stretch gap-6 rounded-2xl border border-border bg-bg-primary p-5 sm:p-6">
      {/* Thumbnail skeleton */}
      <SkeletonBlock className="w-full md:w-64 lg:w-72 shrink-0 aspect-16/10 rounded-xl" />

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata badges */}
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-5 w-20 rounded-full" />
            <SkeletonBlock className="h-5 w-24 rounded-full" />
            <SkeletonBlock className="h-5 w-16 rounded-full" />
          </div>

          {/* Title */}
          <SkeletonBlock className={`h-7 ${isFirst ? "w-3/5" : "w-1/2"} rounded-lg`} />

          {/* Tagline & Description */}
          <SkeletonBlock className="h-4 w-4/5" />
          <SkeletonBlock className="h-4 w-2/3" />
        </div>

        {/* Stack & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/50">
          <div className="flex gap-2">
            <SkeletonBlock className="h-6 w-16 rounded-md" />
            <SkeletonBlock className="h-6 w-16 rounded-md" />
            <SkeletonBlock className="h-6 w-20 rounded-md" />
          </div>
          <div className="flex gap-2">
            <SkeletonBlock className="h-8 w-20 rounded-lg" />
            <SkeletonBlock className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header Skeleton */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-16 pb-8 sm:px-8 lg:px-12 lg:pt-24 lg:pb-12">
        <SkeletonBlock className="h-4 w-44 rounded-full" />
        <SkeletonBlock className="mt-4 h-14 w-80 rounded-xl" />
        <SkeletonBlock className="mt-4 h-5 w-full max-w-2xl rounded-md" />
        <SkeletonBlock className="mt-2 h-5 w-3/4 max-w-xl rounded-md" />

        <div className="mt-8 flex gap-3">
          <SkeletonBlock className="h-8 w-36 rounded-full" />
          <SkeletonBlock className="h-8 w-32 rounded-full" />
          <SkeletonBlock className="h-8 w-48 rounded-full" />
        </div>
      </section>

      {/* Toolbar Skeleton */}
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-border bg-bg-secondary/40 p-4 sm:p-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <SkeletonBlock className="h-8 w-16 rounded-full" />
              <SkeletonBlock className="h-8 w-24 rounded-full" />
              <SkeletonBlock className="h-8 w-24 rounded-full" />
            </div>
            <SkeletonBlock className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </section>

      {/* List Skeletons */}
      <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12 space-y-4">
        <ProjectRowSkeleton isFirst />
        <ProjectRowSkeleton />
        <ProjectRowSkeleton />
        <ProjectRowSkeleton />
      </section>
    </main>
  );
}
