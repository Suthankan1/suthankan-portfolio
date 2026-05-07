import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";
import { AnimatedText } from "../ui/AnimatedText";

const AVAILABILITY_STATUS = "Currently open to internship & freelance opportunities";

export function CTASection() {
  return (
    <SectionWrapper className="bg-bg-secondary py-0">
      <div className="rounded-xl border border-border bg-bg-secondary px-6 py-14 text-center sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            <AnimatedText text="Ready to build something great?" />
          </h2>

          <div className="inline-flex items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_40%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] px-4 py-2 text-sm text-text-primary">
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-secondary">
              <span className="absolute inset-0 rounded-full bg-accent-secondary opacity-60 motion-safe:animate-ping" />
            </span>
            <span className="font-medium">{AVAILABILITY_STATUS}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="lg" variant="primary">
              <Link href="/contact">
                Let's Work Together
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="ghost">
              <a href="/cv.pdf" download>
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
