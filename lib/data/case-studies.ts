export interface FeatureScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface Challenge {
  title: string;
  context: string;
  solution: string;
}

export interface StackRow {
  layer: string;
  technology: string;
  purpose: string;
}

export interface CaseStudy {
  slug: string;
  role: string;
  timeline: string;
  teamSize: string;
  overview: [string, string];
  problem: string;
  architecture: {
    description: string;
    diagram: string;
    stackBreakdown: StackRow[];
  };
  features: FeatureScreenshot[];
  challenges: Challenge[];
  lessons: string[];
}

/**
 * Case-study copy intentionally stays within facts represented by the public
 * project metadata. Add measured outcomes only when a source can be linked.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "omnihealth",
    role: "Full-stack engineering contributor",
    timeline: "May 2026 – Present",
    teamSize: "Academic project team",
    overview: [
      "OmniHealth is a full-stack hospital management project designed to bring clinical, administrative, and operational workflows into one consistent system.",
      "The current build combines a TypeScript-heavy interface with Java services and supporting Python utilities. The project is still in development, so this case study focuses on the system direction, implementation choices, and work completed so far rather than unverified outcomes.",
    ],
    problem:
      "Hospital staff often need to move between separate tools and disconnected records to complete everyday work. OmniHealth explores how a shared application structure can make those workflows easier to navigate while keeping responsibilities and data flow clear across modules.",
    architecture: {
      description:
        "The interface is organised as a TypeScript web application. Java owns the main service layer and business rules, while small Python utilities support specialised project tasks. The boundaries are kept explicit so modules can evolve without turning the interface into the system of record.",
      diagram: `graph LR
    User["Hospital staff"]
    Web["TypeScript web interface"]
    API["Java service layer"]
    Tools["Python support utilities"]

    User --> Web
    Web --> API
    API --> Tools`,
      stackBreakdown: [
        { layer: "Interface", technology: "TypeScript, HTML, CSS", purpose: "User workflows and responsive presentation" },
        { layer: "Services", technology: "Java", purpose: "Application logic and module coordination" },
        { layer: "Utilities", technology: "Python", purpose: "Supporting project tasks where appropriate" },
      ],
    },
    features: [
      {
        src: "/images/projects/omnihealth-cover.webp",
        alt: "OmniHealth project cover",
        caption: "Current public preview of the OmniHealth project direction.",
      },
    ],
    challenges: [
      {
        title: "Keeping a multi-module product coherent",
        context:
          "A hospital platform can quickly become a collection of unrelated screens when each workflow is designed independently.",
        solution:
          "The project uses shared interface patterns and a common service structure so new modules can reuse navigation, validation, and data-flow conventions instead of inventing them again.",
      },
      {
        title: "Separating interface concerns from business rules",
        context:
          "A TypeScript-heavy frontend can become difficult to maintain when domain decisions leak into presentation code.",
        solution:
          "Business responsibilities are kept in the Java service layer, leaving the interface responsible for interaction, feedback, and clear presentation of application state.",
      },
    ],
    lessons: [
      "Large products benefit from shared workflow patterns before individual screens are polished.",
      "Clear boundaries between interface and service logic make full-stack collaboration easier.",
      "An in-development case study should describe verified decisions and open work instead of presenting speculative metrics.",
    ],
  },
  {
    slug: "project-management-app",
    role: "Full-stack engineering contributor",
    timeline: "May 2026 – Present",
    teamSize: "Academic project team",
    overview: [
      "The Project Management App is a full-stack workspace for planning projects, assigning tasks, tracking status, and keeping updates visible to a team.",
      "It uses a TypeScript interface and Java backend. The project is currently in development, and the public case study documents the workflow and architecture without claiming features or results that are not yet available.",
    ],
    problem:
      "Students and small teams need a dependable way to turn broad project goals into owned tasks and visible progress. Informal chat and scattered notes make deadlines, responsibilities, and current status difficult to understand.",
    architecture: {
      description:
        "The application separates the interactive TypeScript workspace from Java services that coordinate project and task behaviour. CSS supports a responsive interface intended to remain usable across planning and review contexts.",
      diagram: `graph LR
    Team["Project team"]
    Workspace["TypeScript workspace"]
    Services["Java backend services"]

    Team --> Workspace
    Workspace --> Services`,
      stackBreakdown: [
        { layer: "Workspace", technology: "TypeScript", purpose: "Project, task, and progress interactions" },
        { layer: "Presentation", technology: "CSS", purpose: "Responsive hierarchy and state visibility" },
        { layer: "Backend", technology: "Java", purpose: "Application rules and data coordination" },
      ],
    },
    features: [
      {
        src: "/images/projects/project-management-app-cover.webp",
        alt: "Project Management App cover",
        caption: "Current public preview of the project-management workspace.",
      },
    ],
    challenges: [
      {
        title: "Making project state easy to scan",
        context:
          "Planning tools become noisy when tasks, owners, deadlines, and status are given equal visual weight.",
        solution:
          "The interface direction prioritises current status and next actions, while supporting detail is progressively disclosed when a task or project is opened.",
      },
      {
        title: "Keeping workflow rules consistent",
        context:
          "Task behaviour can drift when validation and transitions are implemented independently in different screens.",
        solution:
          "The Java service layer is treated as the source of application rules, while the TypeScript interface reflects those rules with clear feedback and disabled states.",
      },
    ],
    lessons: [
      "Project tools should optimise for the next decision, not the number of controls on screen.",
      "Shared status language is as important as the underlying data model.",
      "In-progress work is more credible when its current limits are made explicit.",
    ],
  },
  {
    slug: "last-web",
    role: "Student frontend developer",
    timeline: "May 2026",
    teamSize: "Academic project",
    overview: [
      "Last Web is a first-year web technology project created to practise foundational frontend development through a complete browser experience.",
      "The project is implemented primarily with JavaScript and CSS, supported by a lightweight HTML structure. It represents an earlier stage of the portfolio and is included to show progression rather than presented as current flagship work.",
    ],
    problem:
      "The project brief required a usable web experience built from core browser technologies, with enough structure and interaction to demonstrate practical understanding beyond isolated exercises.",
    architecture: {
      description:
        "The project follows a straightforward browser architecture: semantic HTML provides document structure, CSS controls responsive presentation, and JavaScript adds client-side behaviour.",
      diagram: `graph LR
    Visitor["Visitor"]
    HTML["HTML structure"]
    CSS["CSS presentation"]
    JS["JavaScript interactions"]

    Visitor --> HTML
    HTML --> CSS
    HTML --> JS`,
      stackBreakdown: [
        { layer: "Structure", technology: "HTML", purpose: "Semantic document and content hierarchy" },
        { layer: "Presentation", technology: "CSS", purpose: "Responsive layout and visual styling" },
        { layer: "Interaction", technology: "JavaScript", purpose: "Browser behaviour and UI state" },
      ],
    },
    features: [
      {
        src: "/images/projects/last-web-cover.svg",
        alt: "Last Web project cover",
        caption: "Public project artwork for the completed web-technology assignment.",
      },
    ],
    challenges: [
      {
        title: "Building responsive layouts from fundamentals",
        context:
          "Without a component framework, layout behaviour and breakpoints need to be designed directly in CSS.",
        solution:
          "The project uses lightweight structure and responsive CSS rules, keeping the relationship between markup and presentation easy to inspect and learn from.",
      },
    ],
    lessons: [
      "Strong framework skills are easier to develop when browser fundamentals are understood first.",
      "Small projects are useful evidence when they are framed honestly as part of a learning progression.",
      "Simple structure is easier to debug than premature abstraction.",
    ],
  },
  {
    slug: "hardware-website",
    role: "Student web developer",
    timeline: "May 2026",
    teamSize: "Academic hardware project",
    overview: [
      "The Hardware Project Website is a supporting web presence created to explain and present an academic hardware project.",
      "JavaScript provides most of the web behaviour, with CSS and HTML handling presentation and structure. A small amount of Python supports auxiliary project work where needed.",
    ],
    problem:
      "A physical project can be difficult to evaluate when its purpose, behaviour, and development process are only visible during a live demonstration. The website provides a persistent place to communicate that context.",
    architecture: {
      description:
        "The public-facing layer is a lightweight JavaScript website. HTML and CSS carry the narrative and responsive layout, while Python remains limited to supporting tasks instead of expanding the website into an unnecessary application stack.",
      diagram: `graph LR
    Viewer["Project viewer"]
    Site["JavaScript website"]
    Story["HTML and CSS presentation"]
    Support["Python support tasks"]

    Viewer --> Site
    Site --> Story
    Support --> Site`,
      stackBreakdown: [
        { layer: "Interaction", technology: "JavaScript", purpose: "Website behaviour" },
        { layer: "Presentation", technology: "HTML, CSS", purpose: "Project story and responsive layout" },
        { layer: "Support", technology: "Python", purpose: "Auxiliary project functionality or tooling" },
      ],
    },
    features: [
      {
        src: "/images/projects/hardware-cover.svg",
        alt: "Hardware Project Website cover",
        caption: "Public artwork for the website supporting the hardware project.",
      },
    ],
    challenges: [
      {
        title: "Explaining physical work through a website",
        context:
          "A web page cannot reproduce the experience of handling or observing a physical prototype directly.",
        solution:
          "The site focuses on project goals, features, and outcomes in a simple sequence so it can support the demonstration instead of competing with it.",
      },
    ],
    lessons: [
      "A supporting website should clarify the main project rather than become a second project with unrelated complexity.",
      "Technical communication is part of engineering work, especially when the output is physical.",
      "Scope discipline improves both delivery and presentation.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
