export type ResumeKey = "se" | "devops";

export interface ResumeTrack {
  id: ResumeKey;
  title: string;
  badge: string;
  targetRole: string;
  shortDescription: string;
  filename: string;
  path: string;
  techHighlights: string[];
  lastUpdated: string;
}

export const RESUME_TRACKS: Record<ResumeKey, ResumeTrack> = {
  se: {
    id: "se",
    title: "Software Engineering CV",
    badge: "Full-Stack & Backend",
    targetRole: "Software Engineer Intern",
    shortDescription:
      "Enterprise backend, microservices, gRPC, GraphQL, distributed systems, Java 25 / Spring Boot, Go, and Next.js.",
    filename: "Suthankan_B_SE.pdf",
    path: "/cv/Suthankan_B_SE.pdf",
    techHighlights: [
      "Java 25 & Spring Boot",
      "Spring Modulith & Microservices",
      "Go & gRPC / Protobuf",
      "PostgreSQL & Flyway",
      "Next.js & React Native",
      "Testcontainers & Concurrency",
    ],
    lastUpdated: "March 2026",
  },
  devops: {
    id: "devops",
    title: "DevOps & Cloud Engineering CV",
    badge: "Cloud & Infrastructure",
    targetRole: "DevOps Intern",
    shortDescription:
      "Cloud fundamentals, Linux environments, Docker containerization, automated CI/CD pipelines, reliability, and security workflows.",
    filename: "Suthankan_B_DevOps.pdf",
    path: "/cv/Suthankan_B_DevOps.pdf",
    techHighlights: [
      "Linux & Shell",
      "Docker & Containerization",
      "CI/CD Automation",
      "Cloudflare & AWS Fundamentals",
      "Distributed Systems Reliability",
      "Security & Idempotency",
    ],
    lastUpdated: "March 2026",
  },
};

export const RESUME_LIST: ResumeTrack[] = [
  RESUME_TRACKS.se,
  RESUME_TRACKS.devops,
];
