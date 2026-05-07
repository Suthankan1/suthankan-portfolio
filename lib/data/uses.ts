export type UsesItem = {
  icon: "code" | "terminal" | "browser" | "laptop" | "monitor" | "keyboard" | "app" | "book";
  name: string;
  description: string;
  link?: string;
  details?: string[];
};

export type UsesSection = {
  title: string;
  eyebrow: string;
  items: UsesItem[];
};

export const usesSections: UsesSection[] = [
  {
    title: "Development",
    eyebrow: "Daily build surface",
    items: [
      {
        icon: "code",
        name: "VS Code",
        description: "Main editor for full-stack TypeScript, MDX writing, and project notes.",
        link: "https://code.visualstudio.com/",
        details: ["ESLint", "Prettier", "Tailwind CSS IntelliSense", "GitLens", "MDX"],
      },
      {
        icon: "terminal",
        name: "Warp Terminal",
        description: "Fast terminal workflow for Git, Next.js scripts, and local debugging.",
        link: "https://www.warp.dev/",
      },
      {
        icon: "browser",
        name: "Chrome + Arc",
        description: "Chrome for devtools depth, Arc for research spaces and reading sessions.",
      },
    ],
  },
  {
    title: "Hardware",
    eyebrow: "Desk and travel kit",
    items: [
      {
        icon: "laptop",
        name: "MacBook Pro 14-inch",
        description: "Portable development machine with enough headroom for Next.js, design tools, and local services.",
        details: ["M-series chip", "16GB+ memory", "1TB SSD"],
      },
      {
        icon: "monitor",
        name: "27-inch 4K Monitor",
        description: "Primary layout review display for checking spacing, typography, and responsive polish.",
      },
      {
        icon: "keyboard",
        name: "Low-profile Keyboard + Wireless Mouse",
        description: "Quiet input setup for long coding and writing sessions without desk clutter.",
      },
    ],
  },
  {
    title: "Software & Services",
    eyebrow: "Operating rhythm",
    items: [
      {
        icon: "app",
        name: "Notion",
        description: "Project planning, learning logs, travel notes, and portfolio content drafts.",
        link: "https://www.notion.so/",
      },
      {
        icon: "app",
        name: "Figma",
        description: "Interface exploration, layout references, and design system experiments.",
        link: "https://www.figma.com/",
      },
      {
        icon: "app",
        name: "Vercel + Cloudinary",
        description: "Deployment and media workflow for portfolio projects and editorial assets.",
      },
    ],
  },
  {
    title: "Learning",
    eyebrow: "Inputs that compound",
    items: [
      {
        icon: "book",
        name: "Frontend Masters",
        description: "Deep technical courses for JavaScript, architecture, and modern frontend engineering.",
        link: "https://frontendmasters.com/",
      },
      {
        icon: "book",
        name: "Refactoring UI",
        description: "A practical reference for visual hierarchy, spacing, and product interface decisions.",
      },
      {
        icon: "book",
        name: "Engineering Blogs",
        description: "Regular reading from Vercel, Stripe, Linear, GitHub, and independent builders.",
      },
    ],
  },
];
