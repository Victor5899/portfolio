export interface GitHubConfig {
  username: string;
  profileUrl: string;
  showContributions: boolean;
}

export interface LeetCodeConfig {
  username: string;
  profileUrl: string;
}

export interface StatsConfig {
  github: GitHubConfig;
  leetcode: LeetCodeConfig;
}

/** Shape returned by the GitHub fetcher (see lib/stats). */
export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars?: number;
}

/** Shape returned by the LeetCode fetcher (see lib/stats). */
export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number;
}
