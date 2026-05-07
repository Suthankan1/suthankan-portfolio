import { Geist_Mono, Inter, Syne } from "next/font/google";

export const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

export const displayFont = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: true,
});

export const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
