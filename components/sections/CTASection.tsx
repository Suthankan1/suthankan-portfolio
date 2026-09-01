import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "../ui/Button";
import { StatusLabel } from "../ui/StatusLabel";

export function CTASection() {
  return (
    <section className="bg-bg-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-8 border-t border-border-strong pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <StatusLabel tone="active">Open to internships and freelance work</StatusLabel>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Have a system that needs clearer flow, stronger backend shape, or better product polish?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">
              Send the rough context. I will respond with how I would break down the problem, what I need to know, and where I can help.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="/cv.pdf" download>
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
