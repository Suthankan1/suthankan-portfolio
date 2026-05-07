"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { GithubIcon } from "../../icons/GithubIcon";
import { LinkedinIcon } from "../../icons/LinkedinIcon";
import { Card } from "../../ui/Card";
import { CALENDLY_URL } from "../../shared/CalendlyInlineWidget";
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

const emptyFormValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "" as ContactFormValues["subject"],
  message: "",
  website: "",
};

const socialLinks = [
  {
    label: "GitHub",
    handle: "@Suthankan1",
    href: "https://github.com/Suthankan1",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    handle: "/in/suthankan",
    href: "https://www.linkedin.com/in/suthankan/",
    icon: LinkedinIcon,
  },
  {
    label: "Twitter/X",
    handle: "@B_Suthankan",
    href: "https://x.com/B_Suthankan",
    icon: X,
  },
  {
    label: "Medium",
    handle: "@suthankanbala2019",
    href: "https://medium.com/@suthankanbala2019",
    icon: MediumIcon,
  },
] as const;

type SubmitState = "idle" | "submitting" | "success" | "error";

type SocialIconComponent = (typeof socialLinks)[number]["icon"];

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("h-4 w-4 fill-current", className)}>
      <path d="M5.38 6.13C2.41 6.13 0 8.76 0 12s2.41 5.87 5.38 5.87 5.38-2.63 5.38-5.87-2.41-5.87-5.38-5.87Zm8.56.34c-1.5 0-2.71 2.48-2.71 5.53s1.21 5.53 2.71 5.53 2.71-2.48 2.71-5.53-1.21-5.53-2.71-5.53Zm6.09.58c-.77 0-1.4 2.22-1.4 4.95s.63 4.95 1.4 4.95 1.4-2.22 1.4-4.95-.63-4.95-1.4-4.95Z" />
    </svg>
  );
}

function SocialIcon({ icon: Icon }: { icon: SocialIconComponent }) {
  return <Icon className="h-4 w-4 shrink-0" />;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs leading-5 text-[color-mix(in_srgb,var(--accent-primary)_78%,var(--text-primary))]">{message}</p>;
}

export function ContactPageContent() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const prefersReducedMotion = useReducedMotion() ?? false;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: emptyFormValues,
  });

  const emailParts = useMemo(() => ["Suthankanbala2019", "gmail.com"], []);
  const emailAddress = `${emailParts[0]}@${emailParts[1]}`;
  const phoneNumber = "+94719386979";
  const phoneLabel = "+94 71 938 6979";

  const cardMotionProps = !prefersReducedMotion
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.55 },
      }
    : {};

  const submitMotionProps = !prefersReducedMotion
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
      }
    : {};

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
    <main className="relative min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-136 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--accent-primary)_16%,transparent),transparent_34%),radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent-secondary)_10%,transparent),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-104 -z-10 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--border)_88%,transparent),transparent)]"
      />

      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-10 sm:px-8 lg:px-12 lg:pt-24 lg:pb-14">
        <motion.div {...cardMotionProps}>
          <p className="type-accent-label text-accent-primary">CONTACT</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_42%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-primary">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary">
                <span className="absolute inset-0 rounded-full bg-accent-secondary opacity-50 motion-safe:animate-ping" />
              </span>
              Available for select work
            </span>
            <span className="text-sm text-text-muted">Colombo, Sri Lanka · UTC+5:30</span>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,9vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
            Let&apos;s talk.
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
            Whether it&apos;s a job, a project, or just a hello — my inbox is always open.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:px-12 lg:pb-28">
        <motion.div {...cardMotionProps} className="h-full">
          <Card className="h-full overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-4 border-b border-[color-mix(in_srgb,var(--border)_82%,transparent)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="type-accent-label text-accent-primary">Send a note</p>
                <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
                  Tell me what you are building, what help you need, and what timeline you have in mind.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--border)_86%,transparent)] bg-bg-primary px-3 py-2 text-xs font-medium text-text-secondary">
                <Sparkles className="h-3.5 w-3.5 text-accent-primary" />
                Replies usually land within 24 hours
              </div>
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
                    className={fieldClassName}
                    {...form.register("name")}
                  />
                  <FieldError message={form.formState.errors.name?.message} />
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
                    className={fieldClassName}
                    {...form.register("email")}
                  />
                  <FieldError message={form.formState.errors.email?.message} />
                </div>
              </div>

              <div className="space-y-2.5">
                <label htmlFor="subject" className="text-sm font-medium text-text-primary">
                  Subject
                </label>
                <select id="subject" className={fieldClassName} defaultValue="" {...form.register("subject")}>
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <FieldError message={form.formState.errors.subject?.message} />
              </div>

              <div className="space-y-2.5">
                <label htmlFor="message" className="text-sm font-medium text-text-primary">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={8}
                  placeholder="Share the context, scope, and what success looks like."
                  className={cn(fieldClassName, "min-h-44 resize-y py-3")}
                  {...form.register("message")}
                />
                <FieldError message={form.formState.errors.message?.message} />
              </div>

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
              </div>

              <div aria-live="polite" aria-atomic="true">
                {submitState === "success" ? (
                  <motion.div
                    {...submitMotionProps}
                    className="rounded-md border border-[color-mix(in_srgb,var(--accent-secondary)_42%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] px-4 py-4"
                  >
                    <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent-secondary)_20%,transparent)] text-accent-secondary">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span>Message sent! I&apos;ll reply within 24 hours.</span>
                    </div>
                  </motion.div>
                ) : null}

                {submitState === "error" ? (
                  <motion.div
                    {...submitMotionProps}
                    className="rounded-md border border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-4 py-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{submitError}</p>
                        <p className="mt-1 text-xs text-text-secondary">You can retry with the same message.</p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary transition-opacity hover:opacity-80"
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
                  </motion.div>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-text-muted">No CAPTCHA. Just a clean message and a real reply.</p>
                <Button
                  type="submit"
                  size="lg"
                  isLoading={submitState === "submitting"}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <motion.div {...cardMotionProps}>
            <Card className="p-5">
              <p className="type-accent-label text-accent-primary">Direct email</p>
              <a
                href={`mailto:${emailAddress}`}
                className="mt-4 inline-flex items-center gap-3 text-base font-medium text-text-primary transition-colors hover:text-accent-primary"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_86%,transparent)] bg-bg-primary">
                  <Mail className="h-4 w-4 text-accent-primary" />
                </span>
                <span className="leading-none">
                  <span className="block">{emailParts[0]}</span>
                  <span className="block text-text-secondary">@{emailParts[1]}</span>
                </span>
              </a>
            </Card>
          </motion.div>

          <motion.div {...cardMotionProps}>
            <Card className="p-5">
              <p className="type-accent-label text-accent-primary">Phone</p>
              <a
                href={`tel:${phoneNumber}`}
                className="mt-4 inline-flex items-center gap-3 text-base font-medium text-text-primary transition-colors hover:text-accent-primary"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_86%,transparent)] bg-bg-primary">
                  <Phone className="h-4 w-4 text-accent-primary" />
                </span>
                {phoneLabel}
              </a>
            </Card>
          </motion.div>

          <motion.div {...cardMotionProps}>
            <Card className="p-5">
              <p className="type-accent-label text-accent-primary">Location</p>
              <div className="mt-4 flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_86%,transparent)] bg-bg-primary">
                  <MapPin className="h-4 w-4 text-accent-primary" />
                </span>
                <div>
                  <p className="text-base text-text-primary">Colombo, Sri Lanka 🇱🇰</p>
                  <p className="mt-1">Timezone: UTC+5:30</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...cardMotionProps}>
            <Card className="p-5">
              <p className="type-accent-label text-accent-primary">Response time</p>
              <div className="mt-4 flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_86%,transparent)] bg-bg-primary">
                  <Clock3 className="h-4 w-4 text-accent-primary" />
                </span>
                <div>
                  <p className="text-base text-text-primary">Usually within 24 hours</p>
                  <p className="mt-1">Often much sooner on weekdays.</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...cardMotionProps}>
            <Card className="p-5">
              <p className="type-accent-label text-accent-primary">Social links</p>
              <div className="mt-4 space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md border border-[color-mix(in_srgb,var(--border)_82%,transparent)] bg-bg-primary px-3.5 py-3 text-sm text-text-secondary transition-colors hover:border-[color-mix(in_srgb,var(--accent-primary)_40%,var(--border))] hover:text-text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_86%,transparent)] bg-bg-secondary text-accent-primary">
                        <SocialIcon icon={link.icon} />
                      </span>
                      <span>
                        <span className="block text-text-primary">{link.label}</span>
                        <span className="block text-xs text-text-muted">{link.handle}</span>
                      </span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Open</span>
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div {...cardMotionProps}>
            <Card className="p-5">
              <p className="type-accent-label text-accent-primary">Book a call</p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-between rounded-md border border-[color-mix(in_srgb,var(--accent-primary)_30%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_8%,transparent)] px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-[color-mix(in_srgb,var(--accent-primary)_48%,var(--border))]"
              >
                <span>Open Calendly</span>
                <CalendarDays className="h-4 w-4 text-accent-primary" />
              </a>
            </Card>
          </motion.div>

          <motion.div {...cardMotionProps}>
            <Card
              className="border-[color-mix(in_srgb,var(--accent-secondary)_44%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_11%,transparent)] p-5"
              variant="featured"
            >
              <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-secondary">
                  <span className="absolute inset-0 rounded-full bg-accent-secondary opacity-60 motion-safe:animate-ping" />
                </span>
                Open to internship and freelance opportunities
              </div>
            </Card>
          </motion.div>
        </aside>
      </section>
    </main>
  );
}

const fieldClassName = cn(
  "w-full rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--border)_88%,transparent)] bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "placeholder:text-text-muted/80 focus:border-[color-mix(in_srgb,var(--accent-primary)_65%,var(--border))] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-primary)_10%,transparent)]",
  "motion-reduce:transition-none",
);
