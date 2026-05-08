import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600;

type WakaTimeLanguage = {
  name: string;
  percent: number;
  text?: string;
};

type WakaTimeStatsResponse = {
  data?: {
    human_readable_total?: string;
    languages?: WakaTimeLanguage[];
  };
};

type WakaTimePayload = {
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

function json(payload: WakaTimePayload, init?: ResponseInit) {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      ...init?.headers,
    },
  });
}

async function fetchStats(username: string, range: "last_7_days" | "last_30_days", apiKey?: string) {
  const response = await fetch(`https://wakatime.com/api/v1/users/${username}/stats/${range}?is_including_today=true`, {
    headers: apiKey
      ? {
          Authorization: `Basic ${btoa(apiKey)}`,
        }
      : undefined,
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`WakaTime stats failed for ${range}`);
  }

  return (await response.json()) as WakaTimeStatsResponse;
}

export async function GET() {
  const username = process.env.WAKATIME_USERNAME;
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!username) {
    return json({
      configured: false,
      week: {
        total: "0 hrs",
        languages: [],
      },
      month: {
        total: "0 hrs",
      },
      error: "WakaTime username is not configured.",
    });
  }

  try {
    const [weekStats, monthStats] = await Promise.all([
      fetchStats(username, "last_7_days", apiKey),
      fetchStats(username, "last_30_days", apiKey),
    ]);

    return json({
      configured: true,
      week: {
        total: weekStats.data?.human_readable_total ?? "0 hrs",
        languages: (weekStats.data?.languages ?? []).slice(0, 5),
      },
      month: {
        total: monthStats.data?.human_readable_total ?? "0 hrs",
      },
    });
  } catch (error) {
    console.error("WakaTime route error:", error);
    return json(
      {
        configured: true,
        week: {
          total: "0 hrs",
          languages: [],
        },
        month: {
          total: "0 hrs",
        },
        error: "Unable to load WakaTime stats.",
      },
      { status: 500 },
    );
  }
}
