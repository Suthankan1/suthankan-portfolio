import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageIntro({ eyebrow, title, description, aside, className }: PageIntroProps) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 sm:py-18 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.36fr)] lg:items-end lg:px-12 lg:py-22">
        <div>
          <p className="field-note-kicker">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-balance font-display text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[0.9] tracking-normal">
            {title}
          </h1>
          <div className="mt-7 max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">{description}</div>
        </div>
        {aside ? <aside className="field-note-rule pt-5 text-sm leading-6 text-text-secondary">{aside}</aside> : null}
      </div>
    </section>
  );
}
