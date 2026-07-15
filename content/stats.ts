import type { StatsConfig } from "@/types";
import { socialByPlatform } from "./socials";

const githubLink = socialByPlatform.github;
const leetcodeLink = socialByPlatform.leetcode;

/**
 * Config for the GitHub/LeetCode sections (SRS §7.9–7.10). Usernames derive
 * from `content/socials` so identity stays single-sourced. Live stats are
 * fetched server-side by `lib/stats` with graceful fallback.
 */
export const stats: StatsConfig = {
  github: {
    username: githubLink?.username ?? "victorsoren",
    profileUrl: githubLink?.href ?? "https://github.com/victorsoren",
    showContributions: true,
  },
  leetcode: {
    username: leetcodeLink?.username ?? "victorsoren",
    profileUrl: leetcodeLink?.href ?? "https://leetcode.com/u/victorsoren",
  },
};
