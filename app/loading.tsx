function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-bg-secondary ${className}`} />;
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-bg-primary px-6 py-10 text-text-primary sm:px-8 lg:px-12">
      <div className="h-20" />
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <SkeletonBlock className="h-8 w-36" />
        <SkeletonBlock className="h-24 w-full max-w-3xl" />
        <SkeletonBlock className="h-56 w-full" />
      </section>
    </main>
  );
}
