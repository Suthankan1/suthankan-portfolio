"use client";

import Script from "next/script";
import { cn } from "../../lib/utils";

type CalendlyInlineWidgetProps = {
  url?: string;
  className?: string;
};

export const CALENDLY_URL = "https://calendly.com/suthankanbala2019/30min";

export function CalendlyInlineWidget({ url = CALENDLY_URL, className }: CalendlyInlineWidgetProps) {
  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-secondary", className)}>
      <div
        className="calendly-inline-widget min-w-80"
        data-url={url}
        style={{ height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
