"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Compass, Mail, Newspaper, PenLine, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { cn } from "../../../lib/utils";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const DISPATCH_ITEMS = [
  {
    title: "Monthly tech writing",
    description: "Practical notes from frontend, backend, performance, and product engineering.",
    icon: PenLine,
  },
  {
    title: "Travel journals",
    description: "Field notes from places, people, routines, and creative resets beyond the screen.",
    icon: Compass,
  },
  {
    title: "Project updates",
    description: "What I am building, why it matters, and the lessons behind the shipped work.",
    icon: Sparkles,
  },
] as const;

type SubscribeResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export function NewsletterPageContent() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: NewsletterFormValues) {
    setFormMessage(null);

    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as SubscribeResponse;

    if (!response.ok || !payload.success) {
      setFormMessage(payload.error ?? "Unable to subscribe right now.");
      return;
    }

    setStatus("success");
    setFormMessage(payload.message ?? "You're in. Welcome to the list.");
    reset();
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(120deg,color-mix(in_srgb,var(--accent-primary)_13%,var(--bg-secondary))_0%,var(--bg-primary)_48%,var(--bg-secondary)_100%)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:px-12 lg:py-28">
          <motion.div
            className="space-y-7"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-accent-label text-accent-primary">NEWSLETTER</p>
            <h1 className="max-w-4xl text-balance font-display text-[clamp(3.4rem,9vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
              Stories from code and beyond
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
              A calm monthly dispatch on building better software, documenting lessons, and seeing the world with a developer's eye.
            </p>
          </motion.div>

          <motion.form
            className="rounded-xl border border-border bg-bg-primary p-5 shadow-lg sm:p-6"
            onSubmit={handleSubmit(onSubmit)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent-primary text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">Join the dispatch</h2>
                <p className="text-sm text-text-muted">No spam. Just considered notes.</p>
              </div>
            </div>

            <label className="text-sm font-medium text-text-secondary" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={cn(
                  "min-h-12 flex-1 rounded-full border border-border bg-bg-secondary px-4 text-sm text-text-primary shadow-sm outline-none transition focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/25",
                  errors.email ? "border-[color-mix(in_srgb,var(--accent-primary)_70%,red)]" : null,
                )}
                {...register("email")}
              />
              <Button className="shrink-0" isLoading={isSubmitting} type="submit">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {errors.email ? <p className="mt-2 text-sm text-accent-primary">{errors.email.message}</p> : null}
            {formMessage ? (
              <motion.p
                className={cn("mt-4 text-sm", status === "success" ? "text-text-secondary" : "text-accent-primary")}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              >
                {formMessage}
              </motion.p>
            ) : null}

            {status === "success" ? (
              <motion.div
                className="mt-5 flex items-center gap-2 rounded-lg border border-[color-mix(in_srgb,var(--accent-secondary)_42%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] px-4 py-3 text-sm font-medium text-text-primary"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <CheckCircle2 className="h-4 w-4 text-accent-secondary" />
                Subscription confirmed
              </motion.div>
            ) : null}
          </motion.form>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="type-accent-label text-accent-primary">WHAT YOU GET</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Useful notes, not inbox noise
            </h2>
          </div>
          <Newspaper className="hidden h-9 w-9 text-accent-primary sm:block" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {DISPATCH_ITEMS.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-lg border border-border bg-bg-secondary p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.06 }}
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg-primary text-accent-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
