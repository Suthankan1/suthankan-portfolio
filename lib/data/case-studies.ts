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

export const caseStudies: CaseStudy[] = [
  {
    slug: "nexaflow",
    role: "Sole Designer & Full-Stack Engineer",
    timeline: "Oct 2024 – Nov 2024 (6 weeks)",
    teamSize: "Solo",
    overview: [
      "NexaFlow is a real-time workflow automation platform built for distributed engineering teams who need to move fast without losing visibility. It combines an AI-assisted task engine with live collaboration — think Jira stripped of ceremony and injected with GPT-4 intelligence.",
      "The platform supports drag-and-drop workflow builders, automated status transitions triggered by code events, and a chat-style AI co-pilot that can summarise project state, generate sub-tasks, or flag blockers across active sprints. Every interaction is real-time via WebSocket and persisted in Supabase.",
    ],
    problem:
      "Engineering teams at early-stage startups often operate across Notion, Linear, Slack, and email simultaneously. Context is fragmented, status updates are manual, and on-boarding new contributors takes days instead of hours. Existing tools either demand too much process (Jira) or provide too little structure (Trello). NexaFlow explores what a purpose-built, AI-native alternative looks like when you start from first principles.",
    architecture: {
      description:
        "The frontend is a Next.js 15 App Router application with React Server Components used for data fetching and static shell rendering. Real-time collaboration is handled by a WebSocket layer that broadcasts state mutations to all connected clients. The AI layer uses the Vercel AI SDK to stream GPT-4 responses into the UI token-by-token, giving instant feedback without blocking the thread. Supabase acts as both the primary database and the real-time pub/sub broker.",
      diagram: `graph TD
    Client["Browser Client\n(Next.js App Router)"]
    WS["WebSocket Server\n(Supabase Realtime)"]
    API["REST API Routes\n(Next.js Route Handlers)"]
    AI["Vercel AI SDK\n(Streaming)"]
    GPT["OpenAI GPT-4"]
    DB[("Supabase PostgreSQL")]
    Auth["Supabase Auth\n(JWT + RLS)"]

    Client -->|"HTTP/2"| API
    Client <-->|"ws://"| WS
    API --> AI
    AI -->|"stream"| GPT
    API --> DB
    WS --> DB
    DB -->|"row-level events"| WS
    Client -->|"session token"| Auth
    Auth --> DB`,
      stackBreakdown: [
        { layer: "Frontend", technology: "Next.js 15 + TypeScript", purpose: "App Router, RSC, streaming UI" },
        { layer: "Styling", technology: "Tailwind CSS v4", purpose: "Design tokens, responsive layout" },
        { layer: "Animation", technology: "Framer Motion", purpose: "Drag-and-drop, page transitions" },
        { layer: "AI Layer", technology: "Vercel AI SDK", purpose: "Streaming completions, tool calls" },
        { layer: "LLM", technology: "OpenAI GPT-4o", purpose: "Task generation, summarisation" },
        { layer: "Database", technology: "Supabase (PostgreSQL)", purpose: "Primary store + row-level security" },
        { layer: "Realtime", technology: "Supabase Realtime", purpose: "WebSocket pub/sub for live updates" },
        { layer: "Deployment", technology: "Vercel Edge", purpose: "Global CDN, edge middleware" },
      ],
    },
    features: [
      {
        src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
        alt: "NexaFlow dashboard with active workflows",
        caption: "Workflow dashboard — real-time status updates across all active sprints",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        alt: "AI co-pilot chat interface",
        caption: "AI Co-pilot — stream-rendered GPT-4 responses with task context injection",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
        alt: "Drag-and-drop workflow builder",
        caption: "Visual workflow builder — drag-and-drop with auto-save and conflict resolution",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        alt: "Analytics and sprint reporting",
        caption: "Sprint analytics — burndown charts generated from live task state",
      },
    ],
    challenges: [
      {
        title: "WebSocket state reconciliation under concurrent edits",
        context:
          "When two users edited the same workflow node simultaneously, the last-write-wins approach caused silent data loss. With 20+ concurrent users in a demo session, this became a critical issue that surfaced within hours of the first load test.",
        solution:
          "I implemented an operational-transform-lite approach using vector clocks stored on each task record. Supabase's row-level change events carry a version counter; the client only applies a patch if it has seen all preceding versions. Conflicting edits are queued and merged client-side, with a visual 'conflict resolved' toast when a merge occurs. This eliminated data loss while keeping latency under 80ms on the critical path.",
      },
      {
        title: "AI response streaming breaking RSC hydration",
        context:
          "The Vercel AI SDK's `useChat` hook streams tokens directly into a React subtree. When I mixed this with Server Components, React's hydration pass was comparing server-rendered empty strings against partially-streamed client state, throwing hydration errors in production.",
        solution:
          "I added a `'use client'` boundary at the streaming component entry point and wrapped the AI panel in a Suspense boundary with a skeleton fallback. The server component fetches the conversation history for the initial render; the client component takes over streaming from there. This pattern cleanly separated server-rendered history from client-streamed live completions.",
      },
      {
        title: "Row-level security blocking multi-tenant data access",
        context:
          "Supabase RLS policies are powerful but write-once-read-many in intent. I needed dynamic, team-scoped access where a user could belong to multiple workspaces with different permission levels. Early policies either blocked legitimate cross-workspace queries or, worse, allowed too much.",
        solution:
          "I redesigned the membership model: a `workspace_members` junction table with a `role` enum. RLS policies use `auth.uid()` with a sub-query against `workspace_members` for every protected table. The join is fast because `workspace_members(user_id, workspace_id)` has a composite index. Policies are now declarative and auditable, covering 100% of data access paths with no application-layer guards needed.",
      },
    ],
    lessons: [
      "Streaming UI is genuinely delightful for users — but the React hydration boundary between server and client must be explicit and intentional from day one, not retrofitted.",
      "Build the permission model before writing a single feature. Retrofitting RLS onto an existing schema is a two-day detour that should be a two-hour design session.",
      "Real-time websockets expose race conditions that unit tests can never catch. Load-test with realistic concurrency early — I wish I had done this in week one rather than week five.",
    ],
  },
  {
    slug: "travel-journal",
    role: "Full-Stack Engineer & Product Designer",
    timeline: "Aug 2024 – Sep 2024 (8 weeks)",
    teamSize: "Solo",
    overview: [
      "Travel Journal is an interactive travel documentation platform where the map IS the navigation. Instead of a list of destinations, users explore a living world map — every pinned country reveals a cinematic trip entry with day-by-day itineraries, photo galleries, and personal narratives.",
      "The project was born out of frustration with Instagram's ephemeral nature and Google Photos' lack of story structure. It's a hybrid between a public travel blog and a personal memory vault, with Mapbox powering the spatial layer and Supabase storing the editorial content.",
    ],
    problem:
      "Travel memories decay fast. Photos scattered across three apps, itineraries buried in WhatsApp threads, and no way to share the story behind a trip without stitching together a dozen links. Existing travel apps (TripAdvisor, Polarsteps) optimise for discovery, not personal storytelling. I wanted a space where the geography is the table of contents — you navigate by place, not by date.",
    architecture: {
      description:
        "The spatial layer is handled entirely by Mapbox GL JS, with custom vector tiles for country polygons and cluster markers for trip points. Trip data is stored in Supabase with PostGIS extensions enabling bounding-box queries for map viewport filtering — only trips in the visible region are fetched. Photos are processed through a Cloudinary pipeline: uploaded at full resolution, resized to three responsive variants, and served via Cloudinary's CDN with automatic format negotiation (AVIF > WebP > JPEG).",
      diagram: `graph TD
    Browser["React Frontend\n(Next.js 15)"]
    Map["Mapbox GL JS\n(WebGL renderer)"]
    API["Next.js Route Handlers"]
    DB[("Supabase + PostGIS")]
    Storage["Supabase Storage\n(raw uploads)"]
    CDN["Cloudinary CDN\n(processed images)"]
    Transform["Cloudinary Transform\nPipeline"]

    Browser <-->|"GL context"| Map
    Browser -->|"viewport bounds"| API
    API -->|"ST_Within query"| DB
    Browser -->|"upload"| Storage
    Storage -->|"webhook trigger"| Transform
    Transform -->|"AVIF/WebP/JPEG"| CDN
    Browser -->|"img srcset"| CDN`,
      stackBreakdown: [
        { layer: "Frontend", technology: "Next.js 15 + React 19", purpose: "App Router, ISR for trip pages" },
        { layer: "Mapping", technology: "Mapbox GL JS", purpose: "WebGL-powered interactive world map" },
        { layer: "Spatial DB", technology: "Supabase + PostGIS", purpose: "Geographic queries, bounding box filters" },
        { layer: "Media CDN", technology: "Cloudinary", purpose: "Upload, transform, serve responsive images" },
        { layer: "Styling", technology: "Tailwind CSS v4", purpose: "Responsive layout, dark/light themes" },
        { layer: "Animation", technology: "Framer Motion", purpose: "Page transitions, lightbox, gallery" },
        { layer: "Lightbox", technology: "yet-another-react-lightbox", purpose: "Full-screen photo gallery" },
        { layer: "Deployment", technology: "Vercel", purpose: "ISR revalidation, edge routing" },
      ],
    },
    features: [
      {
        src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop",
        alt: "Interactive world map with trip pins",
        caption: "World map view — clustered trip markers with animated flyTo on selection",
      },
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
        alt: "Trip detail page with hero image",
        caption: "Trip detail page — cinematic hero image with parallax scroll effect",
      },
      {
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop",
        alt: "Day-by-day itinerary view",
        caption: "Day-by-day itinerary — timeline with embedded map route overlay",
      },
      {
        src: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1200&h=800&fit=crop",
        alt: "Photo gallery lightbox",
        caption: "Photo gallery — masonry grid with full-screen lightbox and keyboard navigation",
      },
    ],
    challenges: [
      {
        title: "Mapbox performance on mobile with 100+ trip markers",
        context:
          "Rendering 100+ individual markers as DOM elements caused severe jank on mid-range Android devices. Each marker was a React component portal, and the reconciliation on every map move event was blocking the main thread for 200-400ms.",
        solution:
          "I migrated to Mapbox's native GeoJSON cluster layer — markers render as WebGL primitives instead of DOM nodes. React components are only mounted for the selected marker's popup. Viewport filtering via PostGIS means we only load trips in the current map bounds. Frame time dropped from 18ms average to under 4ms on the same device.",
      },
      {
        title: "Lighthouse score tanking from unoptimised hero images",
        context:
          "Trip pages with full-bleed hero images were scoring 34 on Lighthouse mobile. Each hero was a 4MB JPEG served directly from Supabase storage with no responsive variants, no lazy loading, and no format negotiation.",
        solution:
          "I built a Cloudinary upload pipeline triggered by a Supabase Storage webhook. On upload, Cloudinary generates AVIF, WebP, and JPEG variants at 400w, 800w, and 1600w. The Next.js `<Image>` component uses `sizes` to pick the right variant. LCP on the hero improved from 8.2s to 1.1s. Lighthouse mobile score jumped from 34 to 91.",
      },
      {
        title: "ISR cache stale after editing a trip entry",
        context:
          "Trip pages were statically generated at build time via ISR with a 24-hour revalidation window. When I edited a trip entry in the CMS, the old page stayed live for up to 24 hours — unacceptable for a personal journal where I might fix a typo immediately after publishing.",
        solution:
          "I implemented on-demand revalidation: the Supabase admin dashboard calls a `POST /api/revalidate` route handler with the trip slug and a secret token when content changes. The handler calls `revalidatePath()` for that specific trip page and the index. The stale TTL is now effectively zero for intentional updates, while the ISR background revalidation still covers unintentional cache misses.",
      },
    ],
    lessons: [
      "WebGL-native rendering beats DOM-based rendering decisively for map overlays. Always reach for a layer-level solution before a component-level one when working with mapping libraries.",
      "LCP is not a build-time metric — it's a runtime contract. Test on real devices with network throttling before launch, not after. Slow hero images are invisible in development.",
      "On-demand revalidation and time-based ISR serve different needs. Use both: time-based as a safety net, on-demand as the primary trigger for content changes.",
    ],
  },
  {
    slug: "portfolio-v2",
    role: "Designer, Full-Stack Engineer",
    timeline: "Apr 2025 – Present",
    teamSize: "Solo",
    overview: [
      "This portfolio is not a template — it's a product. Built with Next.js 15 App Router, Tailwind CSS v4, and a bespoke design system, it deliberately rejects the cookie-cutter look that most developer portfolios settle for. Every layout decision, animation, and typographic choice is intentional.",
      "The technical surface is broad by design: MDX-powered blog with syntax highlighting, travel journal integration, a contact API backed by Resend, view and like counters via Upstash Redis, and dynamic Open Graph images generated with Satori. It is the portfolio equivalent of a working proof of competence.",
    ],
    problem:
      "Most developer portfolios look identical: a hero with a waving emoji, a grey card grid of projects, and a contact form that goes nowhere. The signal-to-noise ratio is terrible for a hiring manager reviewing fifty candidates. I wanted a portfolio that communicates craft through the product itself — where the code, the design, and the writing all tell the same story.",
    architecture: {
      description:
        "The site is a Next.js 15 App Router application with a clear server/client split. Static pages (home, about, projects list) are server-rendered and cached at the edge. Dynamic features (blog views, likes, contact form) use Next.js Route Handlers backed by Upstash Redis and the Resend email API. MDX content is transformed at build time by Contentlayer2 into typed TypeScript modules, which means every blog post and project case study is type-safe. OG images are generated on-demand at the edge using Satori.",
      diagram: `graph TD
    Visitor["Visitor Browser"]
    Edge["Vercel Edge Network\n(CDN + Middleware)"]
    RSC["React Server Components\n(Static Shell)"]
    Redis[("Upstash Redis\n(views + likes)")]
    Email["Resend\n(Contact API)"]
    OG["Satori OG Generator\n(Edge Function)"]
    MDX["Contentlayer2\n(Build-time MDX)"]
    Analytics["Vercel Analytics\n(Edge)"]

    Visitor -->|"request"| Edge
    Edge --> RSC
    RSC -->|"read counters"| Redis
    Visitor -->|"POST /api/contact"| Email
    Visitor -->|"GET /api/og"| OG
    MDX -->|"build"| RSC
    Visitor -.->|"event"| Analytics`,
      stackBreakdown: [
        { layer: "Framework", technology: "Next.js 15 (App Router)", purpose: "RSC, static generation, route handlers" },
        { layer: "Language", technology: "TypeScript (strict)", purpose: "End-to-end type safety" },
        { layer: "Styling", technology: "Tailwind CSS v4 + CSS Variables", purpose: "Design token system, dark mode" },
        { layer: "Animation", technology: "Framer Motion 12", purpose: "Scroll reveals, page transitions" },
        { layer: "Content", technology: "Contentlayer2 + MDX", purpose: "Type-safe blog and project content" },
        { layer: "Code Highlight", technology: "Shiki", purpose: "Accurate syntax highlighting, dark/light" },
        { layer: "Email", technology: "Resend + React Email", purpose: "Transactional contact form emails" },
        { layer: "Counters", technology: "Upstash Redis", purpose: "Serverless view and like counters" },
        { layer: "OG Images", technology: "Satori + Vercel Edge", purpose: "Dynamic social preview images" },
        { layer: "Analytics", technology: "Vercel Analytics", purpose: "Privacy-first page view tracking" },
      ],
    },
    features: [
      {
        src: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=800&fit=crop",
        alt: "Portfolio home page hero section",
        caption: "Hero section — animated role ticker with Syne display type and magnetic CTA buttons",
      },
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
        alt: "Technical blog with syntax highlighting",
        caption: "Blog article — Shiki syntax highlighting, sticky TOC, reading progress bar",
      },
      {
        src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
        alt: "Projects case study page",
        caption: "Case study page — sticky sidebar, architecture diagrams, challenge accordions",
      },
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
        alt: "Contact page with smart form",
        caption: "Contact form — react-hook-form + zod validation with Resend email delivery",
      },
    ],
    challenges: [
      {
        title: "Tailwind CSS v4 breaking changes from v3",
        context:
          "Tailwind v4 moved from a config-based design system to a CSS-first `@theme` declaration. Utility class names changed, the `JIT` engine was retired, and the postcss plugin moved packages. Early in the project, half the utility classes I wrote were silently dropped because I was mixing v3 mental models with v4 syntax.",
        solution:
          "I did a full read of the Tailwind v4 migration guide and rewrote the `globals.css` from scratch using `@theme inline` for design token registration. All CSS variable references are now resolved at the `@theme` level, which means Tailwind utilities like `bg-accent-primary` map directly to the CSS variable. I also added a build-time check that fails if any `text-[#hex]` hardcoded values appear outside the token file.",
      },
      {
        title: "Contentlayer2 breaking on Next.js 15 server component imports",
        context:
          "Contentlayer2 generates TypeScript modules for each MDX document at build time. In Next.js 15 with React 19, importing these generated modules inside a React Server Component triggered an obscure Webpack module resolution error — the generated path used `__dirname` which is undefined in the RSC bundle.",
        solution:
          "The fix was to create a thin server-side data access layer (`lib/content.ts`) that re-exports Contentlayer's generated types and applies `'use server'` semantics via async functions. Server components never import from `.contentlayer/` directly — they call the data access functions. This also centralised sorting and filtering logic, making the codebase easier to navigate.",
      },
      {
        title: "Satori font loading causing edge function cold-start timeouts",
        context:
          "The OG image generator uses Satori to render JSX to SVG at the edge. Satori requires font files to be loaded as ArrayBuffers — I was fetching them from the public folder on every request. On cold starts, the font fetch added 600-800ms, occasionally exceeding Vercel's edge function timeout.",
        solution:
          "I pre-loaded the font data as top-level module constants using `fs.readFileSync` at module initialisation time. In the edge runtime, this runs once per worker instance and is shared across all requests to that instance. Cold-start time dropped to under 180ms; warm requests generate OG images in under 40ms.",
      },
    ],
    lessons: [
      "When adopting a major version of a styling tool, read the migration guide in full before writing a single component. The hour spent reading saves two days of debugging silent failures.",
      "Build your content data access layer as a typed abstraction over whatever CMS or file format you use. Swapping Contentlayer2 for something else later should touch one file, not thirty.",
      "Edge functions are fantastic for latency-sensitive tasks but unforgiving about cold-start cost. Pre-load expensive assets at module initialisation time — treat it like a constructor for your serverless function.",
    ],
  },
  {
    slug: "task-sync-mobile",
    role: "Mobile Engineer",
    timeline: "Jun 2024 – Jul 2024 (6 weeks)",
    teamSize: "Solo",
    overview: [
      "Task Sync is an offline-first task management application for iOS and Android built with React Native and Expo. It was designed for users in low-bandwidth environments — field workers, travellers, and commuters — who need a reliable task list that functions perfectly without connectivity.",
      "The app synchronises seamlessly in the background when a connection is restored, resolving conflicts automatically using a last-write-wins strategy with logical timestamps. Push notifications keep users informed of sync events, due dates, and shared task updates without requiring the app to be open.",
    ],
    problem:
      "Every major task manager assumes a persistent internet connection. When you go offline, they either freeze, silently lose data, or show a disruptive error state. For users in emerging markets or on mobile data plans with spotty coverage, this is not an edge case — it is the normal experience. Task Sync treats offline as the primary state and connectivity as a bonus.",
    architecture: {
      description:
        "The local persistence layer uses SQLite via Expo SQLite, which gives the app a fully functional relational database on-device. Every write goes to SQLite first, then to a background sync queue. Firebase Firestore handles cloud persistence with its own offline SDK providing a second sync layer. Redux Toolkit manages global app state with RTK Query caching sync status. The dual-sync architecture means the app continues working even if Firebase is unreachable.",
      diagram: `graph TD
    UI["React Native UI\n(Expo)"]
    Redux["Redux Toolkit\n(RTK Query)"]
    SQLite["Expo SQLite\n(On-device DB)"]
    SyncQueue["Background Sync Queue\n(Expo TaskManager)"]
    Firebase[("Firebase Firestore\n(Cloud)")]
    Push["Firebase Cloud Messaging\n(Push Notifications)"]
    Auth["Firebase Auth"]

    UI <--> Redux
    Redux --> SQLite
    SQLite --> SyncQueue
    SyncQueue -->|"when online"| Firebase
    Firebase -->|"pull changes"| SyncQueue
    Push -->|"notification"| UI
    UI --> Auth
    Auth --> Firebase`,
      stackBreakdown: [
        { layer: "Framework", technology: "React Native + Expo SDK 51", purpose: "Cross-platform iOS/Android" },
        { layer: "Language", technology: "TypeScript (strict)", purpose: "Type-safe component and hook layer" },
        { layer: "State", technology: "Redux Toolkit + RTK Query", purpose: "Global state, sync status, cache" },
        { layer: "Local DB", technology: "Expo SQLite", purpose: "Offline-first on-device persistence" },
        { layer: "Cloud DB", technology: "Firebase Firestore", purpose: "Cloud sync, real-time listeners" },
        { layer: "Auth", technology: "Firebase Auth", purpose: "Email + Google OAuth" },
        { layer: "Push", technology: "Firebase Cloud Messaging", purpose: "Background push notifications" },
        { layer: "BG Tasks", technology: "Expo TaskManager", purpose: "Background sync when app is closed" },
      ],
    },
    features: [
      {
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
        alt: "Task list with offline indicator",
        caption: "Offline mode — subtle badge indicates sync pending; all actions still functional",
      },
      {
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
        alt: "Task creation with priority levels",
        caption: "Task creation — priority levels, due dates, and project assignment with haptic feedback",
      },
      {
        src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop",
        alt: "Background sync status screen",
        caption: "Sync dashboard — real-time view of pending, in-flight, and completed sync events",
      },
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
        alt: "Push notification for due task",
        caption: "Push notifications — local and remote notifications with deep link to task detail",
      },
    ],
    challenges: [
      {
        title: "Conflict resolution when the same task is edited on two devices offline",
        context:
          "A user edits task title on their phone (offline), then edits the same task's description on a tablet (also offline). When both devices come online, both want to write their version. A naive last-write-wins by `updatedAt` timestamp would silently lose one edit.",
        solution:
          "I implemented field-level merging: instead of treating the entire task as a single record, each field (title, description, priority, dueDate) carries its own `updatedAt` timestamp. During sync, each field is resolved independently using the most recent timestamp. In the above scenario, the merged result gets the new title AND the new description. The sync engine logs all merges for the user to review in a 'Recent Activity' screen.",
      },
      {
        title: "Expo background tasks being killed aggressively on iOS",
        context:
          "iOS 16+ is extremely aggressive about suspending background tasks. The Expo TaskManager sync job that was supposed to run every 15 minutes was being killed after 30 seconds on most iPhones, leaving queued tasks unsynced until the user opened the app.",
        solution:
          "I moved the sync trigger from a pure background task to a silent push notification: Firebase sends a silent push every 15 minutes to wake the app, which triggers a short-lived background fetch instead of a long-running task. iOS allows background fetch tasks up to 30 seconds reliably. Combined with Firestore's offline persistence layer as a fallback, sync reliability improved from 62% to 98% completion on iOS.",
      },
      {
        title: "SQLite schema migrations breaking on app update",
        context:
          "When I added new columns to the tasks table in v1.2.0, users who updated the app found all their local tasks gone. The migration script was running `DROP TABLE` and recreating it — I had not accounted for preserving existing data.",
        solution:
          "I implemented a version-based migration system: a `schema_migrations` table tracks which migration scripts have run. Each migration is an append-only SQL script that uses `ALTER TABLE ADD COLUMN` or creates new tables. The app runs pending migrations on startup. For v1.2.0, instead of dropping the table, I added the new columns with defaults. Zero data loss since.",
      },
    ],
    lessons: [
      "Offline-first means writing to local storage first, always — never to a network first with local as a fallback. Get this inverted and your app degrades instead of gracefully tolerating lost connectivity.",
      "iOS background execution policy is ruthless. Silent push notifications as a wake mechanism are far more reliable than long-running background tasks for anything requiring network access.",
      "Schema migrations are load-bearing infrastructure. Design a migration system in v0.1 and it costs you two hours. Design it after v1.0 with live users and it costs you a weekend and user trust.",
    ],
  },
  {
    slug: "open-auth-kit",
    role: "Open Source Author & Maintainer",
    timeline: "May 2024 – Jun 2024 (5 weeks)",
    teamSize: "Solo (890+ stars, 12 contributors)",
    overview: [
      "Open Auth Kit is a lightweight TypeScript authentication library for Next.js that provides JWT session management, role-based access control, and middleware-based route protection in under 8KB gzipped. It is opinionated about security defaults while remaining completely customisable.",
      "The library reached 890 stars in its first month primarily because it solves a genuine pain point: every Next.js authentication tutorial either recommends NextAuth (now Auth.js) — which is heavyweight and config-heavy — or writes bespoke JWT code that lacks security best practices. Open Auth Kit occupies the space between the two.",
    ],
    problem:
      "Authentication in Next.js has a discoverability problem. Auth.js covers enterprise use cases with OAuth providers but brings a full database adapter and provider ecosystem when you just want JWT sessions. Rolling your own requires understanding subtle security details (HttpOnly cookies, CSRF, token rotation) that most developers get wrong. Open Auth Kit is a well-tested, opinionated library that does one thing — JWT session management — with documented security trade-offs.",
    architecture: {
      description:
        "Open Auth Kit is a zero-dependency TypeScript library that wraps the Web Crypto API for token signing and the Next.js `cookies()` and `headers()` APIs for session management. It ships ESM and CJS bundles built by tsup. The middleware integration hooks into Next.js Edge Middleware for route-level protection without adding a database roundtrip on every request. JWT signing uses RS256 by default (asymmetric keys) with HS256 as a zero-config fallback.",
      diagram: `graph LR
    App["Your Next.js App"]
    Middleware["Next.js Edge Middleware\n(route protection)"]
    Kit["open-auth-kit\ncreateAuth()"]
    Crypto["Web Crypto API\n(RS256 / HS256)"]
    Cookies["Next.js cookies()\n(HttpOnly session)"]
    RBAC["RBAC Engine\n(role + permission)"]

    App -->|"import"| Kit
    Kit --> Middleware
    Kit --> Crypto
    Kit --> Cookies
    Kit --> RBAC
    Middleware -->|"verify JWT"| Crypto
    Middleware -->|"check role"| RBAC`,
      stackBreakdown: [
        { layer: "Language", technology: "TypeScript 5 (strict)", purpose: "Full type inference for session data" },
        { layer: "Bundler", technology: "tsup", purpose: "ESM + CJS dual bundle, .d.ts generation" },
        { layer: "Crypto", technology: "Web Crypto API", purpose: "RS256/HS256 JWT signing, zero deps" },
        { layer: "Testing", technology: "Vitest + MSW", purpose: "Unit tests, mock edge runtime" },
        { layer: "CI/CD", technology: "GitHub Actions", purpose: "Test, lint, publish to npm on tag" },
        { layer: "Docs", technology: "Fumadocs + MDX", purpose: "Searchable API reference site" },
        { layer: "Registry", technology: "npm", purpose: "Public package distribution" },
      ],
    },
    features: [
      {
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
        alt: "Open Auth Kit documentation site",
        caption: "Documentation site — searchable API reference with live code examples",
      },
      {
        src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop",
        alt: "Type-safe session configuration",
        caption: "Type-safe session — TypeScript infers your custom session shape from the createAuth() config",
      },
      {
        src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=800&fit=crop",
        alt: "GitHub repository with CI/CD",
        caption: "Open source infrastructure — CI/CD pipeline, automated npm publish on semver tags",
      },
      {
        src: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop",
        alt: "RBAC permission configuration",
        caption: "RBAC engine — declarative role and permission definitions with middleware integration",
      },
    ],
    challenges: [
      {
        title: "Dual ESM/CJS bundle compatibility breaking tree-shaking",
        context:
          "The first npm publish used a single CJS bundle. Users reported that bundling the library in a Next.js App Router project was pulling in the entire 32KB bundle even when they only used two functions. The tree-shaker couldn't eliminate dead code from a CJS module.",
        solution:
          "I rewrote the build with tsup to output separate `dist/esm` and `dist/cjs` directories, with package.json `exports` conditions routing each environment to the correct bundle. ESM consumers get full tree-shaking; CJS consumers (legacy Node.js tools) get a functional but unshaken bundle. Published size for typical usage went from 32KB to 4.2KB gzipped.",
      },
      {
        title: "Web Crypto API unavailable in some Jest test environments",
        context:
          "The library uses the global `crypto.subtle` API for JWT operations. In Node.js 18 Jest runs, `globalThis.crypto` was undefined because Jest was configured to use `jsdom` as its test environment, and jsdom did not expose the Node.js Crypto module.",
        solution:
          "I switched the test runner to Vitest, which has first-class support for the Web Crypto API in Node.js environments. For the small subset of tests that need browser globals (like `Request` and `Response`), I used MSW's interceptors instead of jsdom. The migration also halved the test run time from 8s to 3.4s.",
      },
      {
        title: "Token rotation causing a logout race condition in concurrent requests",
        context:
          "Sliding session tokens need to be refreshed on activity. When a user opened two tabs simultaneously and both sent requests within the same rotation window, both tabs would trigger a rotation. The second rotation would invalidate the first's new token, causing one tab to be silently logged out.",
        solution:
          "Token rotation is now guarded by a short-lived distributed lock stored in a user-provided cache (Redis or in-memory). The `withAuth()` middleware checks the lock before rotating; if a rotation is in flight, the request uses the current valid token and skips the rotation. The lock has a 500ms TTL to prevent deadlocks. This requires the user to pass a cache adapter, which the docs make explicit as a required step for sliding sessions.",
      },
    ],
    lessons: [
      "Shipping a zero-dependency library requires auditing every line for runtime environment assumptions. `globalThis.crypto`, `process.env`, and `__dirname` all behave differently across Node.js, Edge Runtime, and browsers.",
      "Package.json `exports` conditions are the modern way to handle dual ESM/CJS bundles. Set them up before the first publish — migrating after users have your package in their lockfile is painful.",
      "Open source momentum is a flywheel. One well-written README and a featured mention on a newsletter generated 400 stars in 48 hours. Invest in documentation at least as much as in the code itself.",
    ],
  },
  {
    slug: "sentiment-analysis-thesis",
    role: "Researcher, ML Engineer, Full-Stack Developer",
    timeline: "Feb 2024 – Apr 2024 (10 weeks)",
    teamSize: "Solo (Academic Project)",
    overview: [
      "This research project implements a fine-tuned transformer model for real-time sentiment classification of Twitter data. The model — a DistilBERT variant fine-tuned on a 50,000-tweet corpus — achieves 92% F1-score on a held-out test set, outperforming the baseline VADER lexicon approach by 11 percentage points.",
      "Beyond the academic contribution, the project includes a production-ready FastAPI inference service with Redis caching for repeat queries, and a React dashboard for real-time sentiment visualisation. The full pipeline from tweet collection to prediction result runs under 150ms for cached queries and under 450ms for cold inference.",
    ],
    problem:
      "Lexicon-based sentiment analysis tools (VADER, TextBlob) struggle with Twitter's informal language: sarcasm, abbreviations, emoji, and domain-specific slang produce systematic errors. This thesis investigates whether a transfer-learning approach using a pre-trained transformer achieves meaningfully better accuracy on social media text with a tractable fine-tuning dataset (50K examples rather than millions).",
    architecture: {
      description:
        "The ML pipeline has three stages: data collection (Twitter API v2 + filtering), fine-tuning (Hugging Face Trainer API on a DistilBERT base), and inference serving (FastAPI + Uvicorn). The React frontend communicates with the FastAPI backend via a REST interface. Predictions for repeat queries are cached in Redis with a 1-hour TTL, reducing load on the GPU inference server. The model is serialised to ONNX format for deployment, which reduces inference time by 40% versus the PyTorch eager mode baseline.",
      diagram: `graph TD
    Dashboard["React Dashboard\n(Recharts visualisation)"]
    API["FastAPI Inference Server\n(Python 3.11)"]
    Cache[("Redis Cache\n(1hr TTL)")]
    Model["DistilBERT ONNX\n(fine-tuned)"]
    Tokenizer["Hugging Face Tokenizer\n(distilbert-base)"]
    Twitter["Twitter API v2\n(stream endpoint)"]
    Training["Training Pipeline\n(PyTorch + HF Trainer)"]
    Dataset["Annotated Dataset\n(50K tweets)"]

    Dashboard -->|"POST /predict"| API
    API --> Cache
    Cache -->|"miss"| Model
    Model --> Tokenizer
    Twitter --> Dataset
    Dataset --> Training
    Training --> Model`,
      stackBreakdown: [
        { layer: "Model", technology: "DistilBERT (Hugging Face)", purpose: "Pre-trained transformer backbone" },
        { layer: "Fine-tuning", technology: "PyTorch + HF Trainer", purpose: "Supervised fine-tuning on tweet corpus" },
        { layer: "Inference", technology: "ONNX Runtime", purpose: "Optimised model serving (40% faster)" },
        { layer: "API", technology: "FastAPI + Uvicorn", purpose: "Async prediction endpoint" },
        { layer: "Cache", technology: "Redis", purpose: "Repeated query caching, 1hr TTL" },
        { layer: "Frontend", technology: "React + Recharts", purpose: "Real-time sentiment dashboard" },
        { layer: "Data", technology: "Twitter API v2", purpose: "Tweet collection and streaming" },
        { layer: "Experiment Tracking", technology: "Weights & Biases", purpose: "Training metrics, model comparison" },
      ],
    },
    features: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        alt: "Real-time sentiment dashboard",
        caption: "Live dashboard — streaming sentiment classification with Recharts time-series visualisation",
      },
      {
        src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=800&fit=crop",
        alt: "Training curves and model metrics",
        caption: "Training metrics — W&B dashboard showing loss curves and F1-score across 5 epochs",
      },
      {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
        alt: "Confusion matrix and evaluation",
        caption: "Evaluation results — 92% F1-score, confusion matrix showing improvement over VADER baseline",
      },
      {
        src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop",
        alt: "FastAPI prediction endpoint",
        caption: "FastAPI endpoint — <150ms cached inference with Redis TTL and batch prediction support",
      },
    ],
    challenges: [
      {
        title: "Class imbalance in the annotated dataset causing biased predictions",
        context:
          "The scraped Twitter corpus had a 74% / 18% / 8% split across positive, neutral, and negative labels. The model trained on this raw distribution achieved 94% accuracy but only 67% F1-score on the minority negative class — it was predicting 'positive' for ambiguous examples. For sentiment analysis, false negatives on negative sentiment are the most costly error.",
        solution:
          "I applied two interventions: class-weighted loss (inverse frequency weighting) and oversampling the negative class with back-translation augmentation (English → French → English using Helsinki-NLP models). The augmentation added 3,200 synthetic negative examples. Final F1-score on the negative class improved from 0.67 to 0.89, and overall F1 went from 0.83 to 0.92.",
      },
      {
        title: "ONNX export breaking with custom pooling layer",
        context:
          "The fine-tuned model used a custom mean-pooling layer on top of DistilBERT's CLS token, which PyTorch's ONNX exporter could not trace correctly. The exported model produced wrong predictions on 30% of inputs because the pooling operator was not represented faithfully in the ONNX graph.",
        solution:
          "I replaced the custom pooling with a registered operator-compatible implementation using `torch.jit.script` first, then re-exported to ONNX. The scripted module produces a clean computational graph that ONNX can trace without dynamic shapes. I added a post-export validation step that runs 1,000 test cases through both the PyTorch and ONNX models and asserts < 0.001 max absolute difference in outputs.",
      },
      {
        title: "Redis caching causing stale predictions after model redeployment",
        context:
          "After retraining the model with additional data and redeploying, the Redis cache still served predictions from the old model. Users querying the same tweets they had previously analysed received the old (less accurate) predictions silently, with no indication that a model update had occurred.",
        solution:
          "I added a model version hash (SHA-256 of the ONNX model file) to every cache key. When the model is updated and the binary changes, all existing keys miss immediately because they embed the old hash. A cache warmup script pre-loads the 500 most queried tweets for the new model on deployment. Cold-start impact is under 2 minutes; correctness is guaranteed.",
      },
    ],
    lessons: [
      "Accuracy is a misleading metric for imbalanced classification. Always evaluate with per-class F1-score and a confusion matrix from day one — accuracy hides systematic failure on minority classes.",
      "Validate ONNX exports with quantitative equivalence checks, not just shape checks. A model that produces the wrong number confidently is worse than one that fails noisily.",
      "Cache keys must include a version signal when the underlying model or logic changes. Correctness bugs from stale caches are harder to diagnose than cache misses.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
