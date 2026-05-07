import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://suthankan.dev";

type SiteMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
};

export function createOgImageUrl(params: Record<string, string>): string {
  return `/og?${new URLSearchParams(params).toString()}`;
}

export function createSiteMetadata({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
  ogType = "website",
}: SiteMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const image = createOgImageUrl({
    title: ogTitle,
    description: ogDescription,
    type: "default",
  });

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${ogTitle} Open Graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}
