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
    title: "The developer's toolkit: apps and tools I use every day in 2026",
    url: "https://medium.com/@suthankanbala2019/the-developers-toolkit-apps-and-tools-i-use-every-day-in-2026-1bc6a0db9db4",
    platform: "Medium",
    date: "2026-05-12",
    excerpt:
      "Every developer's setup is a record of their scars. Here's what's open on my machine right now — the tools that actually help me ship.",
    readingTime: 6,
    thumbnail: "/images/blog/developers-toolkit-2026.png",
  },
  {
    title: "Why I started blogging as an IT undergraduate",
    url: "https://medium.com/@suthankanbala2019/why-i-started-blogging-as-an-it-undergraduate-e9f4786c155e",
    platform: "Medium",
    date: "2026-05-10",
    excerpt:
      "I started writing because documenting what I build is the clearest way to understand it, remember it, and grow as an IT undergraduate.",
    readingTime: 4,
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
  },
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
