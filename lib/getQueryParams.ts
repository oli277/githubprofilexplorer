import { Repo, User } from "./types";

export function cleanQuery({ query }: { query: string }) {
  const cleanedQuery = query.trim();
  return cleanedQuery;
}

export function getRepoUrl({ query }: { query: string }) {
  const cleanedQuery = cleanQuery({ query });
  const updatedQuery = `https://api.github.com/users/${encodeURIComponent(cleanedQuery)}/repos?per_page=100&sort=updated`;

  return updatedQuery;
}

export function getUserUrl({ query }: { query: string }) {
  const cleanedQuery = cleanQuery({ query });
  const updatedQuery = `https://api.github.com/users/${encodeURIComponent(cleanedQuery)}`;

  return updatedQuery;
}

export async function fetchAllRepos({
  reposUrl,
}: {
  reposUrl: string;
}): Promise<Repo[]> {
  const all: Repo[] = [];

  for (let page = 1; page <= 10; page++) {
    const response = await fetch(
      `${reposUrl}?per_page=100&page=${page}&sort=updated`,
    );
    if (!response.ok) break;

    const repos: Repo[] = await response.json();
    all.push(...repos);

    if (repos.length < 100) break;
  }

  return all;
}

export async function fetchUser({
  userUrl,
}: {
  userUrl: string;
}): Promise<User | null> {
  const response = await fetch(userUrl);
  if (!response.ok) return null;

  return await response.json();
}

function formatDuration(from: Date, to: Date): string {
  let years = to.getUTCFullYear() - from.getUTCFullYear();
  let months = to.getUTCMonth() - from.getUTCMonth();
  let days = to.getUTCDate() - from.getUTCDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(
      Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0),
    );
    days += prevMonth.getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (months) parts.push(`${months} month${months === 1 ? "" : "s"}`);
  if (!years && !months && days)
    parts.push(`${days} day${days === 1 ? "" : "s"}`);
  return parts.join(", ") || "today";
}

export async function getReposArray({ user }: { user: User }) {
  const reposUrl = getRepoUrl({ query: user.login });
  const repos: Repo[] = await fetchAllRepos({ reposUrl });
  return repos;
}

export function getRepoValues({ repos }: { repos: Repo[] }) {
  const originalRepos: Repo[] = [];
  const forks: Repo[] = [];

  for (let repo of repos) {
    repo.fork ? forks.push(repo) : originalRepos.push(repo);
  }

  let ogStarsCount = 0;

  for (let repo of originalRepos) {
    ogStarsCount += repo.stargazers_count;
  }


  const repoObject = {
    ogStarsCount: ogStarsCount,
  };

  return repoObject;
}

function mode(arr: string[]): string | null {
  if (arr.length === 0) return null;

  const counts = new Map<string, number>();
  for (const item of arr) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  let best = arr[0];
  let bestCount = 0;
  for (const [item, count] of counts) {
    if (count > bestCount) {
      best = item;
      bestCount = count;
    }
  }
  return best;
}

export function getLastActive(repos: Repo[]): number | null {
  const MS_PER_DAY = 86_400_000
  if (repos.length === 0) return null;

  const now = Date.now();
  let latestMs = -Infinity;

  for (const repo of repos) {
    const ms = new Date(repo.updated_at).getTime();
    if (ms > latestMs) latestMs = ms;
  }

  return Math.floor((now - latestMs) / MS_PER_DAY);
}

export function getUserValues({ user, repos }: { user: User; repos: Repo[] }) {
  const accDate = new Date(user.created_at);
  const today = new Date();

  const accountAgeInDays = Math.floor(
    (today.getTime() - accDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const accountAgeInYears = Math.floor(accountAgeInDays / 365);

  const accountAge = formatDuration(accDate, today);

  const joined = accDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  const reposObject = getRepoValues({ repos });

  const { ogStarsCount } = reposObject;

  const langs: string[] = []

  for(let repo of repos){
    if(repo.language) langs.push(repo.language)
  }

  const modeLang = mode(langs)

  const lastActive = getLastActive(repos) ? getLastActive(repos) : 0

  
  const userObject = {
    name: user.name ?? user.login,
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    created_at: user.created_at,
    accountAge: accountAge,
    joined: joined,
    accountAgeInYears: accountAgeInYears,
    accountAgeInDays: accountAgeInDays,
    accDate: accDate,
    ogStarsCount: ogStarsCount,
    modeLang: modeLang,
    lastActive: lastActive
  };

  return userObject;
}
