export type ProjectCategory = "Web App" | "Mobile" | "Open Source" | "AI/ML" | "Freelance" | "Academic";
export type ProjectStatus = "Live" | "In Development" | "Completed" | "Archived";

export interface ProjectLanguage {
  name: string;
  percent: number;
}

export interface ProjectRepoMeta {
  repo: string;
  repoId: number;
  repositoryDescription?: string;
  languageComposition: ProjectLanguage[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  status: ProjectStatus;
  featured: boolean;
  flagship: boolean;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  builtAt: string;
  stars?: number;
  repoMeta?: ProjectRepoMeta;
}

export const projects: Project[] = [
  {
    slug: "planora",
    title: "Planora",
    tagline: "Unified Agile sprint planning, Kanban workflow, and delivery tracking workspace.",
    description:
      "Planora is a full-stack project management and sprint delivery platform built for modern engineering teams. Consolidates backlog grooming, interactive sprint boards, burndown velocity analytics, multi-space portfolio hierarchy, and real-time alerts into a unified workspace. Combines a high-performance TypeScript UI with a robust Spring Boot Java service layer.",
    category: "Web App",
    stack: ["TypeScript", "Java", "Spring Boot", "Next.js", "Full Stack", "Agile"],
    status: "Live",
    featured: true,
    flagship: true,
    thumbnail: "/images/projects/planora-cover.webp",
    liveUrl: "https://planora-pma.netlify.app/",
    githubUrl: undefined,
    builtAt: "2026-05",
    stars: 0,
    repoMeta: {
      repo: "axzellinnovations/project_management_app",
      repoId: 1128722075,
      languageComposition: [
        { name: "TypeScript", percent: 60.7 },
        { name: "Java", percent: 37.6 },
        { name: "CSS", percent: 1.1 },
        { name: "Other", percent: 0.6 },
      ],
    },
  },
  {
    slug: "grantai",
    title: "GrantAI",
    tagline: "AI-powered grant & scholarship intelligence platform with semantic matching and automated application drafting.",
    description:
      "An end-to-end grant intelligence and proposal command center designed to eliminate administrative application overhead. Leverages semantic vector search to match candidate research profiles against thousands of live funding opportunities with ranked suitability scores, provides a drag-and-drop Kanban tracker, streams customized cover letters via Server-Sent Events (SSE), and features an AI mock defense interview simulator.",
    category: "AI/ML",
    stack: ["Next.js", "FastAPI", "Spring Boot", "Python", "Java", "PostgreSQL", "pgvector", "LangChain", "Docker"],
    status: "Completed",
    featured: true,
    flagship: false,
    thumbnail: "/images/projects/grantai-cover.webp",
    githubUrl: "https://github.com/Suthankan1/grantai",
    builtAt: "2026-05",
    stars: 0,
    repoMeta: {
      repo: "Suthankan1/grantai",
      repoId: 1248430021,
      repositoryDescription:
        "🎓 AI-powered grant & scholarship intelligence platform — find, apply, and track funding opportunities with semantic matching and one-click AI cover letter generation.",
      languageComposition: [
        { name: "TypeScript", percent: 69.1 },
        { name: "Java", percent: 20.7 },
        { name: "Python", percent: 8.3 },
        { name: "CSS", percent: 1.3 },
        { name: "Other", percent: 0.6 },
      ],
    },
  },
  {
    slug: "mindtrack",
    title: "MindTrack",
    tagline: "AI-driven cross-platform mood and stress tracking ecosystem supporting UN SDG 3 (Good Health & Well-being).",
    description:
      "A cross-platform mental health platform built to monitor, analyze, and support personal wellness. Features longitudinal mood analytics with interactive trend charting, streak tracking, AI-powered emotional reflections with personalized coping techniques, crisis detection protocols, and a certified therapist directory. Engineered across Flutter for mobile, Next.js for web, and a Spring Boot microservice backend.",
    category: "AI/ML",
    stack: ["Flutter", "Dart", "Next.js", "TypeScript", "Spring Boot", "Java", "Tailwind CSS", "Recharts"],
    status: "Completed",
    featured: true,
    flagship: false,
    thumbnail: "/images/projects/mindtrack-cover.webp",
    githubUrl: "https://github.com/Suthankan1/mindtrack",
    builtAt: "2026-05",
    stars: 0,
    repoMeta: {
      repo: "Suthankan1/mindtrack",
      repoId: 1248105664,
      repositoryDescription: "AI-powered mood & stress tracking platform | SDG 3 - Good Health & Well-being",
      languageComposition: [
        { name: "Dart", percent: 47.2 },
        { name: "TypeScript", percent: 30.7 },
        { name: "Java", percent: 21.4 },
        { name: "CSS", percent: 0.5 },
        { name: "Other", percent: 0.2 },
      ],
    },
  },
  {
    slug: "omnihealth",
    title: "OmniHealth",
    tagline: "Unified hospital management ecosystem for clinical and administrative workflows.",
    description:
      "OmniHealth is an integrated healthcare management platform built to coordinate clinical, operational, and administrative operations across hospital departments. Features modular interfaces for medical staff, patient scheduling, and records management, built with a reactive TypeScript frontend and an enterprise Java service layer.",
    category: "Web App",
    stack: ["TypeScript", "Java", "Python", "Spring Boot", "Full Stack"],
    status: "Completed",
    featured: true,
    flagship: false,
    thumbnail: "/images/projects/omnihealth-cover.webp",
    githubUrl: "https://github.com/Suthankan1/OmniHealth",
    builtAt: "2026-05",
    stars: 0,
    repoMeta: {
      repo: "Suthankan1/OmniHealth",
      repoId: 1175878133,
      repositoryDescription: "Unified Hospital Management Ecosystem",
      languageComposition: [
        { name: "TypeScript", percent: 56.3 },
        { name: "Java", percent: 40.6 },
        { name: "HTML", percent: 2.6 },
        { name: "Python", percent: 0.2 },
        { name: "CSS", percent: 0.2 },
        { name: "JavaScript", percent: 0.1 },
      ],
    },
  },
  {
    slug: "last-web",
    title: "Last Web",
    tagline: "Interactive client-side web application demonstrating modern front-end standards.",
    description:
      "Created for the Web Technology module at the University of Moratuwa, demonstrating foundational client-side engineering, responsive layout patterns, and dynamic UI interactions without heavy external dependencies.",
    category: "Academic",
    stack: ["JavaScript", "CSS3", "HTML5", "Front-End"],
    status: "Completed",
    featured: false,
    flagship: false,
    thumbnail: "/images/projects/last-web-cover.svg",
    githubUrl: "https://github.com/Suthankan1/Last-Web",
    builtAt: "2026-05",
    stars: 0,
    repoMeta: {
      repo: "Suthankan1/Last-Web",
      repoId: 991496525,
      repositoryDescription: "The web project build for the first year second semester web tech module.",
      languageComposition: [
        { name: "JavaScript", percent: 67.3 },
        { name: "CSS", percent: 32.5 },
        { name: "HTML", percent: 0.2 },
      ],
    },
  },
  {
    slug: "hardware-website",
    title: "Hardware Project Website",
    tagline: "Project documentation portal and telemetry interface for an embedded hardware build.",
    description:
      "An academic portal built to showcase embedded systems and hardware engineering work. Communicates hardware pinouts, sensor telemetry, and system architecture through an intuitive, accessible web dashboard.",
    category: "Academic",
    stack: ["JavaScript", "Python", "CSS3", "IoT / Hardware"],
    status: "Completed",
    featured: false,
    flagship: false,
    thumbnail: "/images/projects/hardware-cover.svg",
    githubUrl: "https://github.com/Suthankan1/hardware",
    builtAt: "2026-05",
    stars: 0,
    repoMeta: {
      repo: "Suthankan1/hardware",
      repoId: 1014887184,
      repositoryDescription: "This website build for hardware project",
      languageComposition: [
        { name: "JavaScript", percent: 91.6 },
        { name: "CSS", percent: 4.8 },
        { name: "Python", percent: 1.9 },
        { name: "HTML", percent: 1.7 },
      ],
    },
  },
];
