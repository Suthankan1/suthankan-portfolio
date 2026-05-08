import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "Suthankan1";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CACHE_HEADERS = {
  "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
};

const CONTRIBUTIONS_QUERY = `
  query Contributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
};

type GitHubContributionsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: GitHubContributionDay[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionsPayload = {
  configured: boolean;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeks: ContributionWeek[];
  error?: string;
};

const levelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const satisfies Record<GitHubContributionLevel, ContributionDay["level"]>;

function emptyPayload(configured: boolean, error?: string): ContributionsPayload {
  return {
    configured,
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeks: [],
    error,
  };
}

function computeStreaks(days: ContributionDay[]): Pick<ContributionsPayload, "currentStreak" | "longestStreak"> {
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let longestStreak = 0;
  let activeStreak = 0;

  for (const day of sortedDays) {
    if (day.contributionCount > 0) {
      activeStreak += 1;
      longestStreak = Math.max(longestStreak, activeStreak);
    } else {
      activeStreak = 0;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const currentDays = sortedDays.filter((day) => day.date <= today);
  let currentStreak = 0;

  for (let index = currentDays.length - 1; index >= 0; index -= 1) {
    if (currentDays[index].contributionCount === 0) {
      break;
    }

    currentStreak += 1;
  }

  return {
    currentStreak,
    longestStreak,
  };
}

function json(payload: ContributionsPayload, init?: ResponseInit) {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      ...CACHE_HEADERS,
      ...init?.headers,
    },
  });
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return json(emptyPayload(false, "GitHub token is not configured."));
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "suthankan-portfolio",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: {
          username: GITHUB_USERNAME,
        },
      }),
      next: {
        revalidate: 60 * 60,
      },
    });

    if (!response.ok) {
      return json(emptyPayload(true, "GitHub contributions are temporarily unavailable."), { status: 200 });
    }

    const payload = (await response.json()) as GitHubContributionsResponse;
    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar || payload.errors?.length) {
      return json(emptyPayload(true, payload.errors?.[0]?.message ?? "GitHub contributions are unavailable."), {
        status: 200,
      });
    }

    const weeks = calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: day.contributionCount,
        level: levelMap[day.contributionLevel],
      })),
    }));
    const days = weeks.flatMap((week) => week.contributionDays);
    const streaks = computeStreaks(days);

    return json({
      configured: true,
      totalContributions: calendar.totalContributions,
      currentStreak: streaks.currentStreak,
      longestStreak: streaks.longestStreak,
      weeks,
    });
  } catch (error) {
    console.error("GitHub contributions route error:", error);
    return json(emptyPayload(true, "GitHub contributions are temporarily unavailable."), { status: 500 });
  }
}
