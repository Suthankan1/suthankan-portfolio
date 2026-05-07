import type { Metadata } from "next";
import { ExternalArticlesPageContent } from "../../../../components/sections/blog/ExternalArticlesPageContent";
import { externalArticles } from "../../../../lib/data/external-articles";
import { createSiteMetadata } from "../../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "External Articles | Suthankan",
  description:
    "External writing by Suthankan across Medium, Dev.to, LinkedIn, and Hashnode.",
  path: "/blog/external",
});

export default function ExternalArticlesPage() {
  const articles = [...externalArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return <ExternalArticlesPageContent articles={articles} />;
}
