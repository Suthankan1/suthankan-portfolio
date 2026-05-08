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
    slug: "omnihealth",
    title: "OmniHealth",
    tagline: "Unified hospital management ecosystem for streamlining clinical and administrative workflows.",
    description:
      "OmniHealth is a unified hospital management ecosystem built to centralize and simplify everyday hospital operations for staff and administrators. It is intended for healthcare environments that need a single platform to coordinate multiple modules across clinical, administrative, and operational workflows while maintaining a consistent user experience and reliable data flow. The project is implemented as a full-stack system with a TypeScript-heavy frontend and a robust Java backend, aiming to support scalable, real-world workflows in a hospital setting.",
    category: "Academic",
    stack: ["TypeScript", "Java", "HTML", "Python", "CSS", "JavaScript", "Web App (Full Stack)"],
    status: "In Development",
    featured: true,
    flagship: false,
    thumbnail: "/images/projects/omnihealth-cover.png",
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
    slug: "project-management-app",
    title: "Project Management App",
    tagline: "A full-stack project management system for planning, tracking, and collaborating on work.",
    description:
      "A full-stack project management application designed to help teams and students organize projects, break work into tasks, and monitor progress from a central workspace. It is built for people who need a structured way to manage deadlines, assignments, and project updates while keeping data consistent and accessible. The solution combines a modern TypeScript-based UI with a Java backend, providing an end-to-end workflow from task creation to status tracking and reporting.",
    category: "Academic",
    stack: ["TypeScript", "Java", "CSS", "Web App (Full Stack)"],
    status: "In Development",
    featured: true,
    flagship: true,
    thumbnail: "/images/projects/project-management-app-cover.png",
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
    slug: "last-web",
    title: "Last Web",
    tagline: "A first-year web technology project showcasing foundational front-end development skills.",
    description:
      "Last Web is a web project created for the first year, second semester Web Technology module, focused on demonstrating core front-end concepts and practical implementation. It is built for academic learning and assessment, emphasizing clean UI construction, responsive layout techniques, and front-end interactivity. The project is primarily implemented in JavaScript and CSS with lightweight HTML structure, reflecting a strong focus on client-side development fundamentals.",
    category: "Academic",
    stack: ["JavaScript", "CSS", "HTML", "Front-End Web"],
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
    tagline: "A project website built to present and support a hardware-focused academic project.",
    description:
      "This website was built to complement and present a hardware project, providing a simple and accessible web presence for showcasing the work. It is aimed at academic demonstration and documentation, helping communicate project goals, features, and outcomes through a clean interface. The implementation is strongly JavaScript-based with supporting CSS and HTML, with a small amount of Python used for auxiliary functionality or tooling as needed.",
    category: "Academic",
    stack: ["JavaScript", "CSS", "HTML", "Python", "Front-End Web"],
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
