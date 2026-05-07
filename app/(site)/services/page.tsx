import type { Metadata } from "next";
import { ServicesPageContent } from "../../../components/sections/services/ServicesPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Services | Suthankan",
  description:
    "Freelance services from Suthankan for full-stack development, frontend engineering, technical writing, code review, backend APIs, and developer mentoring.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
