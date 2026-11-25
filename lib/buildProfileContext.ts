import type { Repo, User } from "@/lib/types"

const LIMITS = {
  name: 60,
  bio: 200,
  location: 60,
  company: 60,
  repoName: 60,
  repoDescription: 120,
  topic: 40,
} as const

const MAX_SELECTED_REPOS = 6 
const MAX_STARRED_PICKS = 4 
const MAX_LANGUAGES = 6
const MAX_TOPICS = 8
const RECENT_PUSH_WINDOW_DAYS = 90


export type GitHubAccountType = "User" | "Organization" | "Bot" | "Unknown"

export type ProfileContext = {
  contextVersion: 1 

  identity: {
    login: string
    displayName: string | null
    accountType: GitHubAccountType
    accountAgeMonths: number | null 
    bio: string | null
    company: string | null
    location: string | null
    hasWebsite: boolean 
    followers: number
    openToWork: boolean | null 
  }

  repoStats: {
    publicRepoCount: number 
    originalRepoCount: number 
    forkedRepoCount: number 
    archivedOriginalRepoCount: number 
    totalStarsOnOriginals: number
    totalForksOnOriginals: number
  }

  techUsage: {
    topLanguagesByRepoCount: Array<{ language: string; repoCount: number }>
    topTopicsByRepoCount: Array<{ topic: string; repoCount: number }>
    basis: "counts of original repos by primary language and topic, not lines of code"
  }

  selectedRepos: Array<{
    name: string
    description: string | null
    stars: number
    forks: number
    lastPushMonthsAgo: number | null
    selectionReason: "most_starred" | "recently_pushed"
  }>

  pushActivity: {
    mostRecentPushMonthsAgo: number | null 
    originalReposPushedInLast90Days: number
  }

  coverage: {
    reposAnalyzed: number 
    isComplete: boolean 
    originalReposNotShown: number 
  }
}


export function truncate(value: string | null | undefined, max: number): string | null {
  if (typeof value !== "string") return null

  const clean = value.replace(/\p{Cc}/gu, " ").replace(/\s+/g, " ").trim()
  if (clean.length === 0) return null
  if (clean.length <= max) return clean

  let slice = clean.slice(0, max - 1) 
  const lastSpace = slice.lastIndexOf(" ")
  if (lastSpace > max * 0.6) slice = slice.slice(0, lastSpace)

  const lastCode = slice.charCodeAt(slice.length - 1)
  if (lastCode >= 0xd800 && lastCode <= 0xdbff) slice = slice.slice(0, -1)

  return slice.trimEnd() + "…"
}

export function monthsSince(iso: string | null | undefined, now: Date): number | null {
  if (!iso) return null
  const then = new Date(iso)
  if (Number.isNaN(then.getTime())) return null

  let months =
    (now.getUTCFullYear() - then.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - then.getUTCMonth())
  if (now.getUTCDate() < then.getUTCDate()) months -= 1
  return Math.max(0, months)
}

function isWithinDays(iso: string | null | undefined, days: number, now: Date): boolean {
  if (!iso) return false
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return false
  return now.getTime() - then <= days * 24 * 60 * 60 * 1000
}

export function topCounts(items: string[], limit: number): Array<{ key: string; count: number }> {
  const counts = new Map<string, number>()
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1)

  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit)
}

function safeCount(n: unknown): number {
  return typeof n === "number" && Number.isFinite(n) ? n : 0
}

function pushedMs(repo: Repo): number {
  if (!repo.pushed_at) return -Infinity
  const ms = Date.parse(repo.pushed_at)
  return Number.isNaN(ms) ? -Infinity : ms
}

function byRecency(a: Repo, b: Repo): number {
  return pushedMs(b) - pushedMs(a) || a.name.localeCompare(b.name)
}


function pickRepos(candidates: Repo[]) {
  const starred = candidates
    .filter((r) => safeCount(r.stargazers_count) > 0)
    .sort((a, b) => safeCount(b.stargazers_count) - safeCount(a.stargazers_count) || byRecency(a, b))
    .slice(0, MAX_STARRED_PICKS)

  const taken = new Set(starred)
  const recent = candidates
    .filter((r) => !taken.has(r))
    .sort(byRecency)
    .slice(0, MAX_SELECTED_REPOS - starred.length)

  return [
    ...starred.map((repo) => ({ repo, reason: "most_starred" as const })),
    ...recent.map((repo) => ({ repo, reason: "recently_pushed" as const })),
  ]
}

function normalizeAccountType(type: string | null | undefined): GitHubAccountType {
  return type === "User" || type === "Organization" || type === "Bot" ? type : "Unknown"
}


export function buildProfileContext(
  user: User,
  repos: Repo[],
  now: Date = new Date(), 
): ProfileContext {
  const originals = repos.filter((r) => !r.fork)
  const forkedRepoCount = repos.length - originals.length
  const candidates = originals.filter((r) => !r.archived)
  const picks = pickRepos(candidates)

  const languages = originals
    .map((repo) => repo.language)
    .filter((lang): lang is string => typeof lang === "string" && lang.length > 0)

  const topics = originals.flatMap((repo) => {
    const unique = new Set<string>()
    for (const topic of repo.topics ?? []) {
      const cleaned = truncate(topic, LIMITS.topic)
      if (cleaned) unique.add(cleaned) 
    }
    return [...unique]
  })

  let mostRecentPushMonthsAgo: number | null = null
  for (const r of originals) {
    const m = monthsSince(r.pushed_at, now)
    if (m !== null && (mostRecentPushMonthsAgo === null || m < mostRecentPushMonthsAgo)) {
      mostRecentPushMonthsAgo = m
    }
  }

  return {
    contextVersion: 1,

    identity: {
      login: user.login,
      displayName: truncate(user.name, LIMITS.name),
      accountType: normalizeAccountType(user.type),
      accountAgeMonths: monthsSince(user.created_at, now),
      bio: truncate(user.bio, LIMITS.bio),
      company: truncate(user.company?.replace(/(^|\s)@/g, "$1"), LIMITS.company),
      location: truncate(user.location, LIMITS.location),
      hasWebsite: typeof user.blog === "string" && user.blog.trim().length > 0,
      followers: safeCount(user.followers),
      openToWork: typeof user.hireable === "boolean" ? user.hireable : null,
    },

    repoStats: {
      publicRepoCount: safeCount(user.public_repos),
      originalRepoCount: originals.length,
      forkedRepoCount,
      archivedOriginalRepoCount: originals.filter((r) => r.archived).length,
      totalStarsOnOriginals: originals.reduce((sum, r) => sum + safeCount(r.stargazers_count), 0),
      totalForksOnOriginals: originals.reduce((sum, r) => sum + safeCount(r.forks_count), 0),
    },

    techUsage: {
      topLanguagesByRepoCount: topCounts(languages, MAX_LANGUAGES).map(({ key, count }) => ({
        language: key,
        repoCount: count,
      })),
      topTopicsByRepoCount: topCounts(topics, MAX_TOPICS).map(({ key, count }) => ({
        topic: key,
        repoCount: count,
      })),
      basis: "counts of original repos by primary language and topic, not lines of code",
    },

    selectedRepos: picks.map(({ repo, reason }) => ({
      name: truncate(repo.name, LIMITS.repoName) ?? repo.name,
      description: truncate(repo.description, LIMITS.repoDescription),
      stars: safeCount(repo.stargazers_count),
      forks: safeCount(repo.forks_count),
      lastPushMonthsAgo: monthsSince(repo.pushed_at, now),
      selectionReason: reason,
    })),

    pushActivity: {
      mostRecentPushMonthsAgo,
      originalReposPushedInLast90Days: originals.filter((r) =>
        isWithinDays(r.pushed_at, RECENT_PUSH_WINDOW_DAYS, now),
      ).length,
    },

    coverage: {
      reposAnalyzed: repos.length,
      isComplete: repos.length >= safeCount(user.public_repos),
      originalReposNotShown: originals.length - picks.length,
    },
  }
}