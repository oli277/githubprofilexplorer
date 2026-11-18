import { getRepoUrl } from "@/lib/getQueryParams";
import type { Repo } from "@/lib/types";


const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-amber-700",
};

function timeAgo(date: string) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default async function ReposSearchResults({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  if (!query) return null;

  const reposUrl = getRepoUrl({ query })
  const response = await fetch(reposUrl);

  if (!response.ok) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-4xl">🕵️</p>
        <h2 className="mt-3 text-lg font-semibold text-red-700">User not found</h2>
        <p className="mt-1 text-sm text-red-600">
          We couldn&apos;t find a GitHub user named &quot;{query}&quot;. Check the spelling and try again.
        </p>
      </div>
    );
  }

  const repos: Repo[] = await response.json();

  if (repos.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500">
        <span className="font-semibold text-gray-700">{query}</span> has no public repositories yet.
      </p>
    );
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl px-4">
      <div className="mb-6 flex items-baseline justify-between border-b border-gray-200 pb-3">
        <h2 className="text-xl font-bold text-gray-900">
          Repositories by <span className="text-indigo-600">{query}</span>
        </h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          {repos.length} {repos.length === 1 ? "repo" : "repos"}
        </span>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <li key={repo.id}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-base font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
                  {repo.name}
                </h3>
                {repo.fork && (
                  <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    Fork
                  </span>
                )}
              </div>

              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                {repo.description ?? <span className="italic text-gray-400">No description provided</span>}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language] ?? "bg-gray-400"}`} />
                      {repo.language}
                    </span>
                  )}
                  <span title="Stars">⭐ {repo.stargazers_count}</span>
                  <span title="Forks">🍴 {repo.forks_count}</span>
                </div>
                <span>{timeAgo(repo.updated_at)}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}