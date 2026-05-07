import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "../../../../lib/data/projects";
import { getCaseStudy } from "../../../../lib/data/case-studies";
import { ProjectCaseStudyContent } from "../../../../components/sections/projects/ProjectCaseStudyContent";
import { createOgImageUrl } from "../../../../lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.filter((project) => getCaseStudy(project.slug)).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = project.title;
  const description = project.description;
  const ogImage = createOgImageUrl({
    title,
    description: project.tagline,
    type: "project",
    stack: project.stack.join(","),
  });

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${title} — Case Study`,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} project Open Graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Case Study`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) {
    notFound();
  }

  return <ProjectCaseStudyContent project={project} caseStudy={caseStudy} />;
}
