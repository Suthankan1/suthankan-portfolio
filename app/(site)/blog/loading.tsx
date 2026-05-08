function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-bg-secondary ${className}`} />;
}

function BlogCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-bg-primary">
      <SkeletonBlock className="h-52 w-full rounded-none" />
      <div className="space-y-4 p-5">
        <SkeletonBlock className="h-5 w-24" />
        <SkeletonBlock className="h-8 w-4/5" />
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-2/3" />
        </div>
        <SkeletonBlock className="h-4 w-44" />
      </div>
    </article>
  );
}

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-bg-primary px-6 py-12 text-text-primary sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl space-y-10">
        <section className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
          <SkeletonBlock className="h-[26rem] w-full rounded-none" />
        </section>

        <section className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <SkeletonBlock className="h-10 w-20 rounded-full" />
            <SkeletonBlock className="h-10 w-28 rounded-full" />
            <SkeletonBlock className="h-10 w-24 rounded-full" />
            <SkeletonBlock className="h-10 w-32 rounded-full" />
          </div>
          <SkeletonBlock className="h-12 w-full max-w-xl rounded-full" />
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
