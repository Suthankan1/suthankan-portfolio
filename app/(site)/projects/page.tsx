import type { Metadata } from "next";
import { ProjectsPageContent } from "../../../components/sections/projects/ProjectsPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Projects",
  description:
    "Explore engineering projects by Suthankan Balenthiran — full-stack applications, distributed architectures, and open-source software built with Java, Spring Boot, TypeScript, and modern web frameworks.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
