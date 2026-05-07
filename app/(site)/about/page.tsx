import type { Metadata } from "next";
import { AboutPageContent } from "../../../components/sections/about/AboutPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "About Suthankan",
  description:
    "Learn about Suthankan: IT undergraduate, full-stack developer, and traveler building thoughtful digital products.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
