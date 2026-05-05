import type { Metadata } from "next";
import type { Viewport } from "next";
import { bodyFont, displayFont, monoFont } from "../lib/fonts";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://suthankan.dev"),
  title: {
    default: "Suthankan",
    template: "%s | Suthankan",
  },
  description:
    "Suthankan's editorial portfolio for full-stack development, technical storytelling, and travel depth.",
  openGraph: {
    title: "Suthankan",
    description:
      "A premium editorial portfolio blending strong engineering, case studies, and personal depth.",
    siteName: "Suthankan",
    type: "website",
    url: "https://suthankan.dev",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <div className="flex-1 pt-20">{children}</div>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
