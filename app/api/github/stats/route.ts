import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "Suthankan1";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CACHE_HEADERS = {
  "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
};

type GitHubUser = {
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  stargazers_count: number;
};

type GitHubStats = {
  repos: number;
  totalStars: number;
  followers: number;
  error?: string;
};

const githubFetchOptions = {
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "suthankan-portfolio",
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  },
  next: {
    revalidate: 60 * 60,
  },
};

function emptyStats(error: string): GitHubStats {
  return {
    repos: 0,
    totalStars: 0,
    followers: 0,
    error,
  };
}

function isRateLimited(response: Response): boolean {
  return response.status === 403 || response.status === 429;
}

export async function GET() {
  try {
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, githubFetchOptions);

    if (!userResponse.ok) {
      const error = isRateLimited(userResponse)
        ? "GitHub API rate limit reached. Showing cached or fallback stats."
        : "GitHub stats are temporarily unavailable.";

      return NextResponse.json(emptyStats(error), {
        status: 200,
        headers: CACHE_HEADERS,
      });
    }

    const user = (await userResponse.json()) as GitHubUser;
    const pages = Math.max(1, Math.ceil(user.public_repos / 100));
    const repos: GitHubRepo[] = [];

    for (let page = 1; page <= pages; page += 1) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
        githubFetchOptions,
      );

      if (!reposResponse.ok) {
        const error = isRateLimited(reposResponse)
          ? "GitHub API rate limit reached before all repositories could be counted."
          : "Repository star count is temporarily unavailable.";

        return NextResponse.json(
          {
            repos: user.public_repos,
            totalStars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
            followers: user.followers,
            error,
          } satisfies GitHubStats,
          {
            status: 200,
            headers: CACHE_HEADERS,
          },
        );
      }

      const pageRepos = (await reposResponse.json()) as GitHubRepo[];
      repos.push(...pageRepos);
    }

    const stats: GitHubStats = {
      repos: user.public_repos,
      totalStars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
      followers: user.followers,
    };

    return NextResponse.json(stats, {
      headers: CACHE_HEADERS,
    });
  } catch {
    return NextResponse.json(emptyStats("GitHub stats are temporarily unavailable."), {
      status: 200,
      headers: CACHE_HEADERS,
    });
  }
}
