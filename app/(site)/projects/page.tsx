import type { Metadata } from "next";
import { ProjectsPageContent } from "../../../components/sections/projects/ProjectsPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Featured projects",
  description:
    "A portfolio of web apps, mobile applications, open source libraries, and academic projects. Including NexaFlow, my flagship AI-powered workflow automation platform.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
