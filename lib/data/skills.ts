import {
  Braces,
  Cloud,
  Database,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type SkillCategory =
  | "all"
  | "frontend"
  | "backend"
  | "devops"
  | "database"
  | "tools";

export type SkillLevel = "core" | "production" | "advanced" | "learning";

export interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, "all">;
  level: SkillLevel;
  highlight?: boolean;
  context: string;
}

export interface SkillDomain {
  id: Exclude<SkillCategory, "all">;
  title: string;
  eyebrow: string;
  narrative: string;
  icon: LucideIcon;
  accentColor: string;
  skills: SkillItem[];
}

export const CORE_DAILY_DRIVERS: readonly string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Go",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
] as const;

export const SKILL_DOMAINS: readonly SkillDomain[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    eyebrow: "UI ARCHITECTURE",
    narrative:
      "Crafting responsive, accessible, high-performance web applications with end-to-end type safety and fluid motion.",
    icon: Braces,
    accentColor: "from-blue-500/20 to-indigo-500/5",
    skills: [
      {
        name: "Next.js",
        category: "frontend",
        level: "core",
        highlight: true,
        context: "App Router, SSR, Server Components & Route Handlers",
      },
      {
        name: "React",
        category: "frontend",
        level: "core",
        highlight: true,
        context: "Hooks, Concurrent features, Context, State Architecture",
      },
      {
        name: "TypeScript",
        category: "frontend",
        level: "core",
        highlight: true,
        context: "Strict static typing, Generics, Utility Types",
      },
      {
        name: "Tailwind CSS",
        category: "frontend",
        level: "core",
        highlight: true,
        context: "Design tokens, Responsive utilities, Dark mode",
      },
      {
        name: "Framer Motion",
        category: "frontend",
        level: "production",
        context: "Micro-interactions, Page transitions, Layout springs",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    eyebrow: "DISTRIBUTED SERVICES",
    narrative:
      "Engineering concurrent microservices, resilient business logic, and contract-first RESTful & GraphQL APIs.",
    icon: Server,
    accentColor: "from-emerald-500/20 to-teal-500/5",
    skills: [
      {
        name: "Node.js",
        category: "backend",
        level: "core",
        highlight: true,
        context: "Event-driven runtime, Express, Async streams",
      },
      {
        name: "Go",
        category: "backend",
        level: "core",
        highlight: true,
        context: "Goroutines, Channels, High-throughput microservices",
      },
      {
        name: "Spring Boot",
        category: "backend",
        level: "production",
        context: "Enterprise Java, Spring Security, Dependency Injection",
      },
      {
        name: "REST APIs",
        category: "backend",
        level: "core",
        context: "Clean architectural patterns, Pagination, Rate limiting",
      },
      {
        name: "GraphQL",
        category: "backend",
        level: "production",
        context: "Type schemas, Queries, Mutations, Resolvers",
      },
    ],
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    eyebrow: "INFRASTRUCTURE & CI/CD",
    narrative:
      "Automating deployment pipelines, containerizing workloads, and orchestrating robust cloud infrastructure.",
    icon: Cloud,
    accentColor: "from-sky-500/20 to-cyan-500/5",
    skills: [
      {
        name: "Docker",
        category: "devops",
        level: "core",
        highlight: true,
        context: "Multi-stage container builds, Compose orchestration",
      },
      {
        name: "Kubernetes",
        category: "devops",
        level: "production",
        context: "Cluster architecture, Pod deployments, Services",
      },
      {
        name: "AWS",
        category: "devops",
        level: "production",
        context: "EC2, S3, IAM, Cloud architecture best practices",
      },
      {
        name: "GitHub Actions",
        category: "devops",
        level: "production",
        context: "Automated test suites, CI/CD deployment pipelines",
      },
      {
        name: "Linux",
        category: "devops",
        level: "production",
        context: "Shell scripting, System administration, Process management",
      },
      {
        name: "Vercel",
        category: "devops",
        level: "production",
        context: "Edge network delivery, Serverless execution, Preview deployments",
      },
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    eyebrow: "DATA ARCHITECTURE",
    narrative:
      "Modeling structured and unstructured data, architecting high-efficiency relational schemas, and in-memory caching.",
    icon: Database,
    accentColor: "from-purple-500/20 to-violet-500/5",
    skills: [
      {
        name: "PostgreSQL",
        category: "database",
        level: "core",
        highlight: true,
        context: "Relational modeling, Indexing, Transactions, ACID guarantees",
      },
      {
        name: "Redis",
        category: "database",
        level: "core",
        highlight: true,
        context: "In-memory caching, Key-value stores, Rate limiting",
      },
      {
        name: "Supabase",
        category: "database",
        level: "production",
        context: "Auth integration, Row-level security, Realtime subscriptions",
      },
      {
        name: "MongoDB",
        category: "database",
        level: "production",
        context: "Document modeling, Aggregation pipelines, Unstructured data",
      },
    ],
  },
  {
    id: "tools",
    title: "Tooling & Foundations",
    eyebrow: "VELOCITY & NETWORKING",
    narrative:
      "Empowering engineering speed with modern design systems, comprehensive API testing, and computer networking principles.",
    icon: Wrench,
    accentColor: "from-amber-500/20 to-orange-500/5",
    skills: [
      {
        name: "Git",
        category: "tools",
        level: "core",
        highlight: true,
        context: "Branching strategies, Rebase workflows, Code review",
      },
      {
        name: "Figma",
        category: "tools",
        level: "production",
        context: "UI/UX component specs, Wireframing, Interactive prototypes",
      },
      {
        name: "Postman",
        category: "tools",
        level: "production",
        context: "API automation, Endpoint validation, Environment workflows",
      },
      {
        name: "Python",
        category: "tools",
        level: "production",
        context: "Scripting, Automation, Data manipulation with Pandas",
      },
      {
        name: "Networking",
        category: "tools",
        level: "learning",
        context: "TCP/IP, Routing & Switching, CCNA (in progress)",
      },
    ],
  },
];

export const CATEGORY_FILTERS: readonly { id: SkillCategory; label: string }[] = [
  { id: "all", label: "All Architectural Domains" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "Cloud & DevOps" },
  { id: "database", label: "Databases" },
  { id: "tools", label: "Tools & AI" },
] as const;
