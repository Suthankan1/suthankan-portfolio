"use client";

import { useEffect, useMemo, useState } from "react";
import { GitBranch, GitPullRequestArrow } from "lucide-react";
import { GithubIcon } from "../../icons/GithubIcon";
import { cn } from "../../../lib/utils";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionDay = {
  date: string;
  contributionCount: number;
  level: ContributionLevel;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionsPayload = {
  configured: boolean;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeks: ContributionWeek[];
  error?: string;
};

type GridDay = ContributionDay | null;

const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-bg-tertiary",
  1: "bg-[color-mix(in_srgb,var(--accent-primary)_15%,var(--bg-tertiary))]",
  2: "bg-[color-mix(in_srgb,var(--accent-primary)_35%,var(--bg-tertiary))]",
  3: "bg-[color-mix(in_srgb,var(--accent-primary)_60%,var(--bg-tertiary))]",
  4: "bg-[color-mix(in_srgb,var(--accent-primary)_90%,var(--bg-tertiary))]",
};

function weekToMondayFirstDays(week: ContributionWeek): GridDay[] {
  const days: GridDay[] = Array.from({ length: 7 }, () => null);

  for (const day of week.contributionDays) {
    const date = new Date(`${day.date}T00:00:00`);
    const mondayFirstIndex = (date.getDay() + 6) % 7;
    days[mondayFirstIndex] = day;
  }

  return days;
}

function normalizeWeeks(weeks: ContributionWeek[]): GridDay[][] {
  const visibleWeeks = weeks.slice(-53).map(weekToMondayFirstDays);
  const emptyWeeks = Array.from({ length: Math.max(0, 53 - visibleWeeks.length) }, () =>
    Array.from({ length: 7 }, () => null),
  );

  return [...emptyWeeks, ...visibleWeeks];
}

function formatTitle(day: ContributionDay | null): string {
  if (!day) {
    return "No contribution data";
  }

  const label = day.contributionCount === 1 ? "contribution" : "contributions";
  return `${day.date}: ${day.contributionCount} ${label}`;
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-full border border-border bg-bg-primary px-4 py-2">
      <span className="font-mono text-sm font-semibold text-text-primary">{value.toLocaleString()}</span>
      <span className="ml-2 text-xs font-medium uppercase tracking-[0.12em] text-text-muted">{label}</span>
    </div>
  );
}

function HeatmapSkeleton() {
  return (
    <div
      className="grid w-max gap-0.5 overflow-hidden"
      style={{
        gridTemplateColumns: "repeat(53, 10px)",
        gridTemplateRows: "repeat(7, 10px)",
        gridAutoFlow: "column",
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 53 * 7 }).map((_, index) => (
        <span key={index} className="h-2.5 w-2.5 animate-pulse rounded-[3px] bg-bg-tertiary" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-border bg-bg-primary p-5">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-bg-secondary text-accent-primary">
          <GitBranch className="h-5 w-5" />
        </div>
        <div>
          <span className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-muted">
            Token required
          </span>
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            GitHub contributions unavailable — add a GITHUB_TOKEN to enable this widget
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GitHubContributions() {
  const [data, setData] = useState<ContributionsPayload | null>(null);

  useEffect(() => {
    let active = true;

    async function loadContributions() {
      try {
        const response = await fetch("/api/github/contributions");
        const payload = (await response.json()) as ContributionsPayload;

        if (active) {
          setData(payload);
        }
      } catch {
        if (active) {
          setData({
            configured: false,
            totalContributions: 0,
            currentStreak: 0,
            longestStreak: 0,
            weeks: [],
            error: "Unable to load GitHub contributions.",
          });
        }
      }
    }

    void loadContributions();

    return () => {
      active = false;
    };
  }, []);

  const gridWeeks = useMemo(() => normalizeWeeks(data?.weeks ?? []), [data?.weeks]);
  const isLoading = !data;

  return (
    <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="type-accent-label text-accent-primary">GITHUB</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contribution activity
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            A 52-week view of public GitHub contribution consistency, including streaks and total activity.
          </p>
        </div>
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-bg-primary text-accent-primary">
          <GithubIcon className="h-5 w-5" />
        </div>
      </div>

      {data && !data.configured ? (
        <EmptyState />
      ) : (
        <div className="rounded-lg border border-border bg-bg-primary p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <GitPullRequestArrow className="h-4 w-4 text-accent-primary" />
              Last 52 weeks
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            {isLoading ? (
              <HeatmapSkeleton />
            ) : (
              <div
                className="grid w-max gap-0.5"
                style={{
                  gridTemplateColumns: "repeat(53, 10px)",
                  gridTemplateRows: "repeat(7, 10px)",
                  gridAutoFlow: "column",
                }}
                aria-label="GitHub contribution heatmap"
              >
                {gridWeeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => (
                    <span
                      key={`${weekIndex}-${day?.date ?? dayIndex}`}
                      className={cn(
                        "h-2.5 w-2.5 rounded-[3px] transition-transform duration-150 hover:scale-125",
                        LEVEL_CLASSES[day?.level ?? 0],
                      )}
                      title={formatTitle(day)}
                      aria-label={formatTitle(day)}
                    />
                  )),
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatPill label="Total contributions" value={data?.totalContributions ?? 0} />
            <StatPill label="Longest streak" value={data?.longestStreak ?? 0} />
            <StatPill label="Current streak" value={data?.currentStreak ?? 0} />
          </div>

          {data?.error ? <p className="mt-4 text-xs text-text-muted">{data.error}</p> : null}
        </div>
      )}
    </div>
  );
}
