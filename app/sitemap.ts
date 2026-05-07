import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { projects } from "../lib/data/projects";
import { getCaseStudy } from "../lib/data/case-studies";
import { trips } from "../lib/data/travels";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://suthankan.dev";

const staticPages = [
  "",
  "/about",
  "/projects",
  "/blog",
  "/blog/external",
  "/travels",
  "/services",
  "/newsletter",
  "/certificates",
  "/contact",
  "/uses",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...allPosts
      .filter((post) => post.published)
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...projects
      .filter((project) => getCaseStudy(project.slug))
      .map((project) => ({
        url: `${SITE_URL}/projects/${project.slug}`,
        lastModified: new Date(`${project.builtAt}-01`),
        changeFrequency: "monthly" as const,
        priority: project.flagship ? 0.9 : 0.7,
      })),
    ...trips.map((trip) => ({
      url: `${SITE_URL}/travels/${trip.slug}`,
      lastModified: new Date(trip.dateRange.end),
      changeFrequency: "yearly" as const,
      priority: trip.featured ? 0.8 : 0.6,
    })),
  ];
}
