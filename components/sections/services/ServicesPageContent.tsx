"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  HeartHandshake,
  Layers3,
  MessagesSquare,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { AnimatedText } from "../../ui/AnimatedText";
import { CALENDLY_URL, CalendlyInlineWidget } from "../../shared/CalendlyInlineWidget";
import { cn } from "../../../lib/utils";

type Service = {
  name: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

type ProcessStep = {
  title: string;
  description: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const services: Service[] = [
  {
    name: "Full-Stack Development",
    description: "End-to-end product builds with polished interfaces, robust APIs, and clean deployment workflows.",
    icon: Layers3,
    deliverables: ["Next.js applications", "Database schema design", "Auth and dashboard flows", "Production deployment"],
  },
  {
    name: "Frontend Development",
    description: "Premium, responsive interfaces that feel fast, intentional, and easy to use.",
    icon: Code2,
    deliverables: ["Design-to-code implementation", "Component systems", "Animation polish", "Performance optimisation"],
  },
  {
    name: "Technical Writing",
    description: "Clear technical content that turns complex engineering into practical, trusted explanations.",
    icon: BookOpenText,
    deliverables: ["Developer articles", "Case studies", "API documentation", "Architecture explainers"],
  },
  {
    name: "Code Review & Consulting",
    description: "A sharp outside eye on architecture, maintainability, performance, and user-facing quality.",
    icon: ShieldCheck,
    deliverables: ["Codebase audit", "Architecture review", "Performance notes", "Prioritised fix roadmap"],
  },
  {
    name: "API & Backend",
    description: "Reliable backend foundations for data-heavy products, integrations, and internal tools.",
    icon: ServerCog,
    deliverables: ["REST API design", "Redis-backed features", "Third-party integrations", "Validation and error handling"],
  },
  {
    name: "Developer Mentoring",
    description: "Practical guidance for students and junior developers building portfolio-ready projects.",
    icon: UserRoundCheck,
    deliverables: ["Project planning", "Code walkthroughs", "Portfolio feedback", "Weekly mentoring sessions"],
  },
];

const processSteps: ProcessStep[] = [
  {
    title: "Discovery Call",
    description: "We clarify the goal, audience, risks, and what success should look like before writing code.",
  },
  {
    title: "Proposal & Scoping",
    description: "You get a focused scope, timeline, deliverables, and communication rhythm with no vague hand-waving.",
  },
  {
    title: "Build & Iterate",
    description: "I ship in visible milestones, collect feedback early, and keep the product moving with care.",
  },
  {
    title: "Deliver & Support",
    description: "Final delivery includes handoff notes, deployment support, and follow-up fixes where needed.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Suthankan turned a rough product idea into a clean, working MVP faster than expected. The interface felt thoughtful from the first review.",
    name: "Amara Perera",
    role: "Founder",
    company: "LankaOps",
  },
  {
    quote:
      "The code review was direct, useful, and practical. We left with a clear refactor plan instead of a pile of abstract recommendations.",
    name: "Naveen Raj",
    role: "Engineering Lead",
    company: "Northstar Labs",
  },
  {
    quote:
      "His technical writing made our API documentation feel human without losing precision. Developers understood the product much faster.",
    name: "Maya Fernando",
    role: "Product Manager",
    company: "SignalGrid",
  },
];

const faqs: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Small landing pages or focused frontend builds usually take one to two weeks. Full-stack MVPs often need four to eight weeks depending on scope, integrations, and feedback speed.",
  },
  {
    question: "What stack do you usually work with?",
    answer:
      "My strongest stack is Next.js, TypeScript, Tailwind CSS, MDX, Redis, and serverless deployment on Vercel. I can also work across React, Node.js APIs, Supabase, Firebase, and common CMS setups.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Each scoped milestone includes review time and revisions. I prefer frequent lightweight feedback loops so the final delivery feels refined rather than patched together late.",
  },
  {
    question: "How do you price projects?",
    answer:
      "Pricing depends on scope, complexity, timeline, and support expectations. After discovery, I provide a fixed project quote or a weekly rate for open-ended consulting work.",
  },
  {
    question: "How will we communicate?",
    answer:
      "I usually work through email plus a shared Notion, Linear, or GitHub project board. For active builds, I send concise progress updates and book review calls at key milestones.",
  },
  {
    question: "Who owns the code and design after delivery?",
    answer:
      "You own the final project code, assets, and documentation after final payment. I only retain the right to reference the work in my portfolio unless an NDA says otherwise.",
  },
];

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = service.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.05 }}
    >
      <Card className="flex min-h-full flex-col p-5 sm:p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--accent-primary)_32%,var(--border))] bg-bg-primary text-accent-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-text-primary">{service.name}</h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">{service.description}</p>
        <ul className="mt-5 flex-1 space-y-2">
          {service.deliverables.map((deliverable) => (
            <li key={deliverable} className="flex gap-2 text-sm leading-6 text-text-secondary">
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent-primary" />
              <span>{deliverable}</span>
            </li>
          ))}
        </ul>
        <Button asChild variant="secondary" className="mt-6 w-full justify-between">
          <Link href="/contact">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </motion.div>
  );
}

function FaqAccordion() {
  const [openQuestion, setOpenQuestion] = useState(faqs[0]?.question ?? "");

  return (
    <div className="divide-y divide-border rounded-[var(--radius-lg)] border border-border bg-bg-secondary">
      {faqs.map((item) => {
        const isOpen = openQuestion === item.question;

        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
              aria-expanded={isOpen}
              onClick={() => setOpenQuestion(isOpen ? "" : item.question)}
            >
              <span className="font-display text-xl font-semibold tracking-[-0.03em] text-text-primary">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-accent-primary transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                )}
              />
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 text-sm leading-7 text-text-secondary sm:px-6">{item.answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function ServicesPageContent() {
  return (
    <main className="bg-bg-primary text-text-primary">
      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end">
          <div>
            <p className="type-accent-label text-accent-primary">Services / Freelance</p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.2rem,9vw,7.3rem)] font-semibold leading-[0.86] tracking-[-0.06em]">
              Let&apos;s build something great together.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
              Available for freelance projects — full-stack, frontend, technical writing, and consulting.
            </p>
          </div>
          <Card variant="featured" className="p-6">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-secondary">
                <span className="absolute inset-0 rounded-full bg-accent-secondary opacity-60 motion-safe:animate-ping" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">Open for work</span>
            </div>
            <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em]">
              Product-minded engineering without the agency theatre.
            </p>
          </Card>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="mb-9 max-w-3xl">
          <p className="type-accent-label text-accent-primary">Services</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            <AnimatedText text="Ways I can help." />
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="type-accent-label text-accent-primary">My Process</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              <AnimatedText text="Clear, collaborative, and practical." />
            </h2>
          </div>
          <MessagesSquare className="h-9 w-9 text-accent-primary" />
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative rounded-[var(--radius-md)] border border-border bg-bg-secondary p-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{step.description}</p>
              {index < processSteps.length - 1 ? (
                <ArrowRight className="absolute -right-3 top-8 hidden h-5 w-5 text-accent-primary lg:block" />
              ) : null}
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <Card variant="featured" className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_44%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] px-4 py-2">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-secondary">
                <span className="absolute inset-0 rounded-full bg-accent-secondary opacity-60 motion-safe:animate-ping" />
              </span>
              <span className="text-sm font-semibold text-text-primary">Currently accepting new projects</span>
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em]">Response time: 24h</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              Send a short brief or book a call. I&apos;ll reply with useful next steps, even if we are not the right fit.
            </p>
          </div>
          <Button asChild size="lg">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a call
              <CalendarDays className="h-4 w-4" />
            </a>
          </Button>
        </Card>
      </SectionReveal>

      <SectionReveal className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[0.55fr_1fr] lg:px-12">
        <div>
          <p className="type-accent-label text-accent-primary">Book a Call</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            <AnimatedText text="Pick a time that works for you." />
          </h2>
          <p className="mt-5 text-sm leading-7 text-text-secondary">
            Schedule a 30-minute call to discuss your idea, project scope, timeline, or collaboration
            fit. No pressure, just a focused conversation.
          </p>
        </div>
        <CalendlyInlineWidget />
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="mb-9 max-w-3xl">
          <p className="type-accent-label text-accent-primary">Testimonials</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            <AnimatedText text="Calm delivery, sharp execution." />
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6">
              <HeartHandshake className="h-7 w-7 text-accent-primary" />
              <blockquote className="mt-5 text-base leading-7 text-text-secondary">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-semibold text-text-primary">{testimonial.name}</p>
                <p className="mt-1 text-sm text-text-muted">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <p className="type-accent-label text-accent-primary">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            <AnimatedText text="Before we work together." />
          </h2>
          <p className="mt-5 text-sm leading-7 text-text-secondary">
            Straight answers to the questions clients usually ask before kicking off a project.
          </p>
        </div>
        <FaqAccordion />
      </SectionReveal>

      <SectionReveal className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-secondary p-7 text-center shadow-[var(--shadow-md)] sm:p-10">
          <Sparkles className="mx-auto h-8 w-8 text-accent-primary" />
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Ready to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary">
            Bring the brief, the messy idea, or the half-built prototype. I&apos;ll help turn it into a clear plan.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
                <CalendarDays className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}
