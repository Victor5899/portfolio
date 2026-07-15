import type { GitHubStats, LeetCodeStats } from "@/types";
import { stats } from "@/content/stats";

/**
 * Server-side stat fetchers for the GitHub/LeetCode sections (SRS FR-GH-2,
 * FR-LC-2, RC-4). Both cache for an hour and return `null` on any failure so
 * the UI can degrade gracefully to a static call-to-visit card (FR-GH-3).
 */

const REVALIDATE_SECONDS = 60 * 60;

export async function getGitHubStats(): Promise<GitHubStats | null> {
  const { username } = stats.github;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (typeof data !== "object" || data === null) return null;
    const user = data as Record<string, unknown>;

    return {
      publicRepos: toNumber(user.public_repos),
      followers: toNumber(user.followers),
      following: toNumber(user.following),
    };
  } catch {
    return null;
  }
}

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  const { username } = stats.leetcode;
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
        profile { ranking }
      }
    }
  `;
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    const json: unknown = await res.json();
    const matched = extractMatchedUser(json);
    if (!matched) return null;

    const counts = new Map<string, number>();
    for (const entry of matched.acSubmissionNum) {
      counts.set(entry.difficulty, entry.count);
    }

    return {
      totalSolved: counts.get("All") ?? 0,
      easySolved: counts.get("Easy") ?? 0,
      mediumSolved: counts.get("Medium") ?? 0,
      hardSolved: counts.get("Hard") ?? 0,
      ranking: matched.ranking,
    };
  } catch {
    return null;
  }
}

function toNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

interface MatchedUser {
  acSubmissionNum: { difficulty: string; count: number }[];
  ranking?: number;
}

function extractMatchedUser(json: unknown): MatchedUser | null {
  if (typeof json !== "object" || json === null) return null;
  const data = (json as Record<string, unknown>).data;
  if (typeof data !== "object" || data === null) return null;
  const matchedUser = (data as Record<string, unknown>).matchedUser;
  if (typeof matchedUser !== "object" || matchedUser === null) return null;

  const submitStats = (matchedUser as Record<string, unknown>).submitStatsGlobal;
  const profile = (matchedUser as Record<string, unknown>).profile;
  if (typeof submitStats !== "object" || submitStats === null) return null;

  const rawList = (submitStats as Record<string, unknown>).acSubmissionNum;
  if (!Array.isArray(rawList)) return null;

  const acSubmissionNum = rawList.flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];
    const difficulty = (item as Record<string, unknown>).difficulty;
    const count = (item as Record<string, unknown>).count;
    if (typeof difficulty !== "string" || typeof count !== "number") return [];
    return [{ difficulty, count }];
  });

  const ranking =
    typeof profile === "object" && profile !== null
      ? (profile as Record<string, unknown>).ranking
      : undefined;

  return {
    acSubmissionNum,
    ranking: typeof ranking === "number" ? ranking : undefined,
  };
}
