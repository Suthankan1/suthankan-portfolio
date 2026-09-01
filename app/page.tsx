import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutTeaserSection } from "../components/sections/AboutTeaserSection";
import {
  BlogTeaserSection,
  type BlogTeaserPost,
} from "../components/sections/BlogTeaserSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { CTASection } from "../components/sections/CTASection";
import { FeaturedProjectsSection } from "../components/sections/FeaturedProjectsSection";

export const metadata: Metadata = {
  title: "Suthankan — Full-Stack Developer & IT Professional",
  description:
    "Portfolio of Suthankan: full-stack developer and IT professional showcasing projects, technical writing, and product engineering.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Suthankan — Full-Stack Developer & IT Professional",
    description:
      "Portfolio of Suthankan: full-stack developer and IT professional showcasing projects, technical writing, and product engineering.",
    url: "/",
    images: [
      {
        url: `/og?${new URLSearchParams({
          title: "Suthankan",
          description: "Full-stack developer, IT undergraduate, and technical writer from Sri Lanka.",
          type: "default",
        }).toString()}`,
        width: 1200,
        height: 630,
        alt: "Suthankan portfolio Open Graph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suthankan — Full-Stack Developer & IT Professional",
    description:
      "Portfolio of Suthankan: full-stack developer and IT professional showcasing projects, technical writing, and product engineering.",
    images: [
      `/og?${new URLSearchParams({
        title: "Suthankan",
        description: "Full-stack developer, IT undergraduate, and technical writer from Sri Lanka.",
        type: "default",
      }).toString()}`,
    ],
  },
};

function getLatestBlogPosts(): BlogTeaserPost[] {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
      readingTime: post.readingTime,
      coverImage: post.coverImage,
      excerpt: post.excerpt,
    }));
}

export default function Home() {
  const latestBlogPosts = getLatestBlogPosts();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <HeroSection />
      <AboutTeaserSection />
      <FeaturedProjectsSection />
      <BlogTeaserSection posts={latestBlogPosts} />
      <SkillsSection />
      <CTASection />
    </main>
  );
}
