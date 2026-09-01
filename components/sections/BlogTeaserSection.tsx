import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, PenLine } from "lucide-react";
import { BLUR_DATA_URL } from "../../lib/images";

export type BlogTeaserPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: number;
  coverImage: string;
  excerpt: string;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type BlogTeaserSectionProps = {
  posts: BlogTeaserPost[];
};

export function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  return (
    <section className="bg-bg-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10 grid gap-4 border-b border-border pb-5 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="field-note-kicker">Writing</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Notes from the build process.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-text-secondary">
            Short essays, technical reflections, and project notes from the same learning path as the portfolio work.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-lg border border-border bg-bg-secondary">
                <Link href={`/blog/${post.slug}`} className="grid h-full md:grid-cols-[0.42fr_1fr]">
                  <div className="relative min-h-56 bg-bg-tertiary">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                  <div className="flex min-h-56 flex-col justify-between p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase text-accent-primary">{post.category}</p>
                      <h3 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight tracking-normal">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">{post.excerpt}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {dateFormatter.format(new Date(post.date))}
                      </span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-bg-secondary px-6 py-12 text-center">
            <PenLine className="mx-auto h-7 w-7 text-accent-primary" />
            <h3 className="mt-5 text-2xl font-semibold tracking-normal">Real articles are coming soon.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary">
              Placeholder posts have been removed, so this preview will only show published writing.
            </p>
          </div>
        )}

        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent-primary"
        >
          Open writing index
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
