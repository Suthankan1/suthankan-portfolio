import type { Metadata } from "next";
import { ProjectsPageContent } from "../../../components/sections/projects/ProjectsPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Featured projects",
  description:
    "A portfolio of academic and full-stack web projects, led by my flagship Project Management App.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
