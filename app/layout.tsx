import type { Metadata } from "next";
import type { Viewport } from "next";
import { allPosts } from "contentlayer/generated";
import { bodyFont, displayFont, monoFont } from "../lib/fonts";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { CommandPalette } from "../components/shared/CommandPalette";
import { PageTransition } from "../components/shared/PageTransition";
import { CursorGlow } from "../components/ui/CursorGlow";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { projects } from "../lib/data/projects";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://suthankan.dev"),
  title: {
    default: "Suthankan",
    template: "%s | Suthankan",
  },
  description:
    "Suthankan's editorial portfolio for full-stack development, technical storytelling, and travel depth.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Suthankan",
    description:
      "A premium editorial portfolio blending strong engineering, case studies, and personal depth.",
    siteName: "Suthankan",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://suthankan.dev",
    images: [
      {
        url: `/og?${new URLSearchParams({
          title: "Suthankan",
          description: "Full-stack development, technical writing, projects, and travel stories.",
          type: "default",
        }).toString()}`,
        width: 1200,
        height: 630,
        alt: "Suthankan portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suthankan",
    description:
      "A premium editorial portfolio blending strong engineering, case studies, and personal depth.",
    images: [
      `/og?${new URLSearchParams({
        title: "Suthankan",
        description: "Full-stack development, technical writing, projects, and travel stories.",
        type: "default",
      }).toString()}`,
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

function Links() {
  return (
    <>
      <link rel="me" href="https://github.com/Suthankan1" />
      <link rel="me" href="https://www.linkedin.com/in/suthankan/" />
      <link rel="me" href="https://x.com/B_Suthankan" />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paletteProjects = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
  }));
  const palettePosts = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
    }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <head>
        <Links />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <CursorGlow />
          <Navbar />
          <CommandPalette projects={paletteProjects} posts={palettePosts} />
          <div className="flex-1 pt-20">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
