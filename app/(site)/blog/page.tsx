import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { BlogIndexContent, type BlogIndexPost } from "../../../components/sections/blog/BlogIndexContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Blog | Suthankan",
  description:
    "Engineering notes, case studies, and editorial writing from Suthankan on full-stack development, UI craft, and building polished products.",
  path: "/blog",
});

function sortByNewest(posts: BlogIndexPost[]): BlogIndexPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = sortByNewest(
    allPosts
      .filter((post) => post.published)
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        category: post.category,
        tags: post.tags,
        readingTime: post.readingTime,
        coverImage: post.coverImage,
        excerpt: post.excerpt,
        featured: post.featured,
      })),
  );

  return <BlogIndexContent posts={posts} />;
}
