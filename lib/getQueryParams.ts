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
    const prevMonth = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0));
    days += prevMonth.getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (months) parts.push(`${months} month${months === 1 ? "" : "s"}`);
  if (!years && !months && days) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  return parts.join(", ") || "today";
}

export function getUserValues({ user }: { user: User }) {

    const accDate = new Date(user.created_at)
    const today = new Date()

      const accountAgeInDays = Math.floor(
    (today.getTime() - accDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const accountAgeInYears = Math.floor(accountAgeInDays / 365);

  
  const accountAge = formatDuration(accDate, today);

  const joined = accDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });



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
    accDate: accDate
  };

  return userObject
}
