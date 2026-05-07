"use client";

import { useEffect, useState } from "react";
import { Code2, Clock3 } from "lucide-react";
import { cn } from "../../../lib/utils";

type WakaTimeLanguage = {
  name: string;
  percent: number;
  text?: string;
};

type WakaTimeResponse = {
  configured: boolean;
  week: {
    total: string;
    languages: WakaTimeLanguage[];
  };
  month: {
    total: string;
  };
  error?: string;
};

const fallbackLanguages = [
  { name: "Java", percent: 42, text: "Major language" },
  { name: "Spring Boot", percent: 24, text: "Backend focus" },
  { name: "Python", percent: 15, text: "Automation + learning" },
  { name: "TypeScript", percent: 12, text: "Portfolio + UI" },
  { name: "SQL", percent: 7, text: "Data layer" },
] as const satisfies readonly WakaTimeLanguage[];

export function WakaTimeStats() {
  const [data, setData] = useState<WakaTimeResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/wakatime");
        const payload = (await response.json()) as WakaTimeResponse;

        if (active) {
          setData(payload);
        }
      } catch {
        if (active) {
          setData({
            configured: false,
            week: {
              total: "0 hrs",
              languages: [...fallbackLanguages],
            },
            month: {
              total: "0 hrs",
            },
            error: "Unable to load WakaTime stats.",
          });
        }
      }
    }

    void loadStats();

    return () => {
      active = false;
    };
  }, []);

  const languages = data?.week.languages.length ? data.week.languages : fallbackLanguages;
  const usingFallback = !data || !data.configured || data.week.languages.length === 0;

  return (
    <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="type-accent-label text-accent-primary">WAKATIME</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Coding rhythm
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            Java and Spring Boot sit at the centre of my backend work, with Python and TypeScript supporting automation, tooling, and interface craft.
          </p>
        </div>
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-bg-primary text-accent-primary">
          <Code2 className="h-5 w-5" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
          <div className="rounded-lg border border-border bg-bg-primary p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-text-muted">
              <Clock3 className="h-4 w-4 text-accent-primary" />
              This week
            </div>
            <p className="font-display text-3xl font-bold tracking-tight">{data?.week.total ?? "Loading..."}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-primary p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-text-muted">
              <Clock3 className="h-4 w-4 text-accent-primary" />
              Last 30 days
            </div>
            <p className="font-display text-3xl font-bold tracking-tight">{data?.month.total ?? "Loading..."}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-bg-primary p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight">Top languages</h3>
            {usingFallback ? (
              <span className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-muted">
                Preview
              </span>
            ) : null}
          </div>

          <div className="space-y-4">
            {languages.map((language) => (
              <div key={language.name}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-text-primary">{language.name}</span>
                  <span className="text-text-muted">{language.text ?? `${Math.round(language.percent)}%`}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg-tertiary">
                  <div
                    className={cn(
                      "h-full rounded-full bg-[linear-gradient(90deg,var(--accent-primary),var(--accent-secondary))]",
                    )}
                    style={{ width: `${Math.max(4, Math.min(100, language.percent))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {data?.error ? <p className="mt-4 text-xs text-text-muted">{data.error}</p> : null}
        </div>
      </div>
    </div>
  );
}
