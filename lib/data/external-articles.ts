export type ExternalArticlePlatform = "Medium" | "Dev.to" | "LinkedIn" | "Hashnode";

export type ExternalArticle = Readonly<{
  title: string;
  url: string;
  platform: ExternalArticlePlatform;
  date: string;
  excerpt: string;
  readingTime: number;
  thumbnail: string;
}>;

export const externalArticlePlatforms = ["Medium", "Dev.to", "LinkedIn", "Hashnode"] as const satisfies readonly ExternalArticlePlatform[];

export const externalArticles = [
  {
    title: "The Need for Quantum Computers",
    url: "https://medium.com/@suthankanbala2019/the-need-for-quantum-computers-89fc6444c661",
    platform: "Medium",
    date: "2026-05-07",
    excerpt:
      "An introduction to why quantum computers matter, what limits classical computing, and where quantum thinking can change the future of technology.",
    readingTime: 4,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
  },
] as const satisfies readonly ExternalArticle[];
