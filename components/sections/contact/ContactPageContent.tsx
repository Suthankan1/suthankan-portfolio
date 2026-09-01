"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GitFork,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CALENDLY_URL } from "../../shared/CalendlyInlineWidget";
import { Button } from "../../ui/Button";
import { StatusLabel } from "../../ui/StatusLabel";
import { cn } from "../../../lib/utils";

const subjectOptions = [
  "Job Opportunity",
  "Freelance Project",
  "Collaboration",
  "Technical Question",
  "Just Saying Hi",
] as const;

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.")),
  subject: z.enum(subjectOptions).refine((val) => val, {
    message: "Please select a subject.",
  }),
  message: z.string().trim().min(20, "Message must be at least 20 characters."),
  website: z.string().trim().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const emptyFormValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "" as ContactFormValues["subject"],
  message: "",
  website: "",
};

const DIRECT_LINKS = [
  {
    label: "Email",
    value: "Suthankanbala2019@gmail.com",
    href: "mailto:Suthankanbala2019@gmail.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "+94 71 938 6979",
    href: "tel:+94719386979",
    Icon: Phone,
  },
  {
    label: "Calendly",
    value: "Book a short call",
    href: CALENDLY_URL,
    Icon: CalendarDays,
  },
] as const;

const SOCIAL_LINKS = [
  { label: "GitHub", value: "@Suthankan1", href: "https://github.com/Suthankan1", Icon: GitFork },
  { label: "LinkedIn", value: "/in/suthankan", href: "https://www.linkedin.com/in/suthankan/", Icon: BriefcaseBusiness },
  { label: "Medium", value: "@suthankanbala2019", href: "https://medium.com/@suthankanbala2019", Icon: BookOpen },
  { label: "Twitter/X", value: "@B_Suthankan", href: "https://x.com/B_Suthankan", Icon: X },
] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="text-xs leading-5 text-[color-mix(in_srgb,var(--accent-primary)_78%,var(--text-primary))]">
      {message}
    </p>
  );
}

export function ContactPageContent() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: emptyFormValues,
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
        fallback?: "mailto";
        mailtoUrl?: string;
      };

      if (!response.ok || !payload.success) {
        throw new Error(payload.error ?? "Unable to send your message right now.");
      }

      if (payload.fallback === "mailto" && payload.mailtoUrl) {
        window.location.assign(payload.mailtoUrl);
      }

      setSubmitState("success");
      form.reset(emptyFormValues);
    } catch (error) {
      setSubmitState("error");
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1fr_0.38fr] lg:items-end lg:px-12 lg:py-18">
          <div>
            <p className="field-note-kicker">Contact</p>
            <h1 className="mt-5 max-w-5xl text-balance font-display text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[0.9] tracking-normal">
              Let&apos;s talk through the build.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
              Share what you are building, the current constraint, and what a useful next step would look like. I will reply with a practical direction.
            </p>
          </div>
          <aside className="field-note-rule pt-5 text-sm leading-6 text-text-secondary">
            <StatusLabel tone="active">Usually replies within 24 hours</StatusLabel>
            <p className="mt-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-primary" />
              Colombo, Sri Lanka, UTC+5:30
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:px-12 lg:py-18">
        <div className="rounded-lg border border-border bg-bg-secondary p-6 sm:p-8">
          <div className="mb-8 border-b border-border pb-6">
            <p className="field-note-kicker">Send a note</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              A clear first message is enough: context, timeline, and where you think I can help.
            </p>
          </div>

          <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2.5">
                <label htmlFor="name" className="text-sm font-medium text-text-primary">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={Boolean(form.formState.errors.name)}
                  aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                  className={fieldClassName}
                  {...form.register("name")}
                />
                <FieldError id="name-error" message={form.formState.errors.name?.message} />
              </div>

              <div className="space-y-2.5">
                <label htmlFor="email" className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(form.formState.errors.email)}
                  aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                  className={fieldClassName}
                  {...form.register("email")}
                />
                <FieldError id="email-error" message={form.formState.errors.email?.message} />
              </div>
            </div>

            <div className="space-y-2.5">
              <label htmlFor="subject" className="text-sm font-medium text-text-primary">
                Subject
              </label>
              <select
                id="subject"
                defaultValue=""
                aria-invalid={Boolean(form.formState.errors.subject)}
                aria-describedby={form.formState.errors.subject ? "subject-error" : undefined}
                className={fieldClassName}
                {...form.register("subject")}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError id="subject-error" message={form.formState.errors.subject?.message} />
            </div>

            <div className="space-y-2.5">
              <label htmlFor="message" className="text-sm font-medium text-text-primary">
                Message
              </label>
              <textarea
                id="message"
                rows={8}
                placeholder="Share the context, scope, and what success looks like."
                aria-invalid={Boolean(form.formState.errors.message)}
                aria-describedby={form.formState.errors.message ? "message-error" : undefined}
                className={cn(fieldClassName, "min-h-44 resize-y py-3")}
                {...form.register("message")}
              />
              <FieldError id="message-error" message={form.formState.errors.message?.message} />
            </div>

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
            </div>

            <div aria-live="polite" aria-atomic="true">
              {submitState === "success" ? (
                <div className="rounded-md border border-[color-mix(in_srgb,var(--accent-secondary)_42%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] px-4 py-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                    <CheckCircle2 className="h-5 w-5 text-accent-secondary" />
                    <span>Message sent. I&apos;ll reply as soon as I can.</span>
                  </div>
                </div>
              ) : null}

              {submitState === "error" ? (
                <div className="rounded-md border border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-4 py-4">
                  <p className="text-sm font-medium text-text-primary">{submitError}</p>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent-primary"
                    onClick={() => {
                      setSubmitState("idle");
                      setSubmitError("");
                      void form.handleSubmit(onSubmit)();
                    }}
                  >
                    Retry
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text-muted">No CAPTCHA. Just a clean message and a real reply.</p>
              <Button type="submit" size="lg" isLoading={submitState === "submitting"} className="w-full sm:w-auto">
                Send message
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-lg border border-border bg-bg-secondary p-5">
            <p className="field-note-kicker">Direct</p>
            <div className="mt-4 grid gap-3">
              {DIRECT_LINKS.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid gap-1 rounded-md border border-border bg-bg-primary p-4 transition-colors hover:border-border-strong"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Icon className="h-4 w-4 text-accent-primary" />
                    {label}
                  </span>
                  <span className="text-sm text-text-secondary">{value}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-bg-secondary p-5">
            <p className="field-note-kicker">Social</p>
            <div className="mt-4 grid gap-3">
              {SOCIAL_LINKS.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg-primary p-4 transition-colors hover:border-border-strong"
                >
                  <span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Icon className="h-4 w-4 text-accent-primary" />
                      {label}
                    </span>
                    <span className="mt-1 block text-sm text-text-secondary">{value}</span>
                  </span>
                  <AtSign className="h-4 w-4 text-text-muted" />
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-bg-secondary p-5">
            <p className="field-note-kicker">Fit</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-text-secondary">
              <p className="flex items-center gap-2 text-text-primary">
                <Clock3 className="h-4 w-4 text-accent-primary" />
                Best fit for scoped product engineering, Java backend work, and portfolio-quality UI implementation.
              </p>
              <p>
                If the request is early, send the messy version. I can help shape it into milestones.
              </p>
              <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-text-primary hover:text-accent-primary">
                Review work first
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

const fieldClassName = cn(
  "w-full rounded-[var(--radius-md)] border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "placeholder:text-text-muted/80 focus:border-[color-mix(in_srgb,var(--accent-primary)_65%,var(--border))] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-primary)_10%,transparent)]",
  "motion-reduce:transition-none",
);
