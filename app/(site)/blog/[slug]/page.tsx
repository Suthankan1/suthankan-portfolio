import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { BlogPostContent } from "../../../../components/blog/BlogPostContent";
import { extractTocHeadings } from "../../../../lib/blog";
import { createOgImageUrl } from "../../../../lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function getPost(slug: string) {
  return allPosts.find((post) => post.slug === slug && post.published);
}

export function generateStaticParams() {
  return allPosts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const ogImage = createOgImageUrl({
    title: post.title,
    description: post.excerpt,
    type: "blog",
    category: post.category,
  });

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ["Suthankan"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${post.title} Open Graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter((candidate) => candidate.published && candidate.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) {
        return -1;
      }

      if (a.category !== post.category && b.category === post.category) {
        return 1;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3)
    .map((candidate) => ({
      slug: candidate.slug,
      title: candidate.title,
      date: candidate.date,
      category: candidate.category,
      excerpt: candidate.excerpt,
      readingTime: candidate.readingTime,
      coverImage: candidate.coverImage,
    }));

  return (
    <BlogPostContent
      post={{
        slug: post.slug,
        title: post.title,
        date: post.date,
        category: post.category,
        tags: post.tags,
        readingTime: post.readingTime,
        coverImage: post.coverImage,
        excerpt: post.excerpt,
        bodyRaw: post.body.raw,
      }}
      relatedPosts={relatedPosts}
      toc={extractTocHeadings(post.body.raw)}
    />
  );
}
