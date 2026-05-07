import type { Metadata } from "next";
import { NewsletterPageContent } from "../../../components/sections/newsletter/NewsletterPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Newsletter | Suthankan",
  description:
    "Subscribe to Suthankan's monthly notes on full-stack engineering, travel journals, and project updates.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return <NewsletterPageContent />;
}
