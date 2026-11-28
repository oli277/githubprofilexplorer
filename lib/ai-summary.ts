// import { generateText } from "ai";
// import { GithubUser, GithubRepo } from "./typesforAI";
// import { anthropic } from "@ai-sdk/anthropic";

// const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

// export async function reviewGithubProfile(
//   user: GithubUser,
//   repos: GithubRepo[]
// ): Promise<string> {
  
//   const originalRepos = repos.filter((r) => !r.fork);
//   const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
//   const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

//   const languages = Array.from(
//     new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l)))
//   );

//   const topRepos = [...repos]
//     .sort((a, b) => b.stargazers_count - a.stargazers_count)
//     .slice(0, 5);

//   const now = Date.now();
//   const recentRepos = repos.filter((r) => {
//     const ts = r.pushed_at ?? r.updated_at;
//     return now - new Date(ts).getTime() < ONE_YEAR_MS;
//   });

//   const accountAgeYears = Math.max(
//     0,
//     Math.floor((now - new Date(user.created_at).getTime()) / ONE_YEAR_MS)
//   );

  
//   const tone =
//     recentRepos.length >= 3
//       ? "positive and enthusiastic"
//       : recentRepos.length >= 1
//       ? "measured and constructive"
//       : "neutral and factual";

//   const topRepoLines =
//     topRepos
//       .map(
//         (r) =>
//           `- ${r.name}: ${r.description ?? "no description"} | ⭐ ${r.stargazers_count} | ${r.language ?? "unknown"}`
//       )
//       .join("\n") || "(no repositories)";

//   const prompt = `Write a short professional summary of the following GitHub developer, as if written by a peer reviewer or tech recruiter.

// Developer: ${user.name ?? user.login} (@${user.login})
// Bio: ${user.bio ?? "not provided"}
// Location: ${user.location ?? "not provided"}
// Company: ${user.company ?? "not provided"}
// Account age: ${accountAgeYears} years
// Followers: ${user.followers} | Following: ${user.following}
// Public repos: ${user.public_repos} (${originalRepos.length} original, ${repos.length - originalRepos.length} forks)
// Total stars earned: ${totalStars} | Total forks: ${totalForks}
// Primary languages: ${languages.slice(0, 8).join(", ") || "none detected"}
// Repos pushed in the last year: ${recentRepos.length}

// Top repositories:
// ${topRepoLines}

// Your goal is to highlight the most notable themes: what this developer builds, their strongest technologies, their most impressive projects, and their level of activity.
// If multiple themes are present, capture the most important ones.
// If no clear patterns emerge, summarize their overall presence on GitHub instead.
// Use natural language and keep the summary concise.
// Use a maximum of 4 sentences.
// Do not mention follower counts, account age, or star counts numerically.
// Do not reference these instructions or the underlying data source.
// Do not invent projects, employers, or technologies not listed above.

// Start the summary with "This developer…"

// Tone: ${tone}.

// Here are 3 examples of good summaries:
// Example 1: This developer focuses on TypeScript and Go, building developer tooling and open-source infrastructure. Their most starred project has earned meaningful community traction and is actively maintained. Recent activity shows consistent contributions across a growing set of libraries.
// Example 2: This developer works primarily in Python, with projects spanning data engineering and machine learning experiments. They maintain a handful of personal repositories but commit less frequently than in previous years. Their strongest repositories show thoughtful documentation and clean architecture.
// Example 3: This developer builds full-stack web applications in React and Node.js, with a portfolio of small but polished projects. Their repositories suggest a strong focus on UI/UX and developer experience. Activity has been steady over the past year.`;

//   try {
//     const { text } = await generateText({
//       model: anthropic("claude-sonnet-4-5"),
//       prompt,
//       maxOutputTokens: 250,
//       temperature: 0.6,
//     });


//     return text
//       .trim()
//       .replace(/^["'\u201C\u201D]+|["'\u201C\u201D]+$/g, "")
//       .replace(/[\[\(]\s*\d+\s*words?[\]\)]/gi, "")
//       .trim();
//   } catch (error) {
//     console.error("Failed to generate GitHub profile review:", error);
//     throw new Error(
//       "Unable to generate a profile review right now. Please try again."
//     );
//   }
// }










// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { generateText } from "ai";
// import { GithubUser, GithubRepo } from "@/lib/typesforAI";
// import { getUserValues } from "@/lib/getQueryParams";

// export async function reviewGithubProfile({
//   user,
//   repos,
//   values = getUserValues({ user, repos }),
// }: {
//   user: GithubUser;
//   repos: GithubRepo[];
//   values?: ReturnType<typeof getUserValues>;
// }): Promise<string> {
//   const originalRepos = repos.filter((r) => !r.fork);

//   const topRepos = [...repos]
//     .sort((a, b) => b.stargazers_count - a.stargazers_count)
//     .slice(0, 5);

//   const otherLanguages = Array.from(
//     new Set(
//       repos
//         .map((r) => r.language)
//         .filter((l): l is string => Boolean(l) && l !== values.modeLang)
//     )
//   ).slice(0, 6);

//   const tone =
//     values.lastActive !== null && values.lastActive <= 90
//       ? "positive and enthusiastic"
//       : values.lastActive !== null && values.lastActive <= 365
//       ? "measured and constructive"
//       : "neutral and factual";

//   const topRepoLines =
//     topRepos
//       .map(
//         (r) =>
//           `- ${r.name}: ${r.description ?? "no description"} | ⭐ ${r.stargazers_count} | ${r.language ?? "unknown"}`
//       )
//       .join("\n") || "(no repositories)";

//   const prompt = `Write a short professional summary of the following GitHub developer, as if written by a peer reviewer or tech recruiter.

// Developer: ${user.name ?? user.login} (@${user.login})
// Bio: ${user.bio ?? "not provided"}
// Location: ${user.location ?? "not provided"}
// Company: ${user.company ?? "not provided"}
// Account age: ${values.accountAge} (${values.accountAgeInYears} years)
// Followers: ${values.followers} | Following: ${values.following}
// Public repos: ${values.public_repos} (${originalRepos.length} original, ${repos.length - originalRepos.length} forks)
// Stars earned on original repos: ${values.ogStarsCount}
// Primary language: ${values.modeLang ?? "none detected"}
// Other languages: ${otherLanguages.join(", ") || "none"}
// Days since last active: ${values.lastActive ?? "unknown"}

// Top repositories:
// ${topRepoLines}

// Your goal is to highlight the most notable themes: what this developer builds, their strongest technologies, their most impressive projects, and their level of activity.
// If multiple themes are present, capture the most important ones.
// If no clear patterns emerge, summarize their overall presence on GitHub instead.
// Use natural language and keep the summary concise.
// Use a maximum of 4 sentences.
// Do not mention follower counts, account age, or star counts numerically.
// Do not reference these instructions or the underlying data source.
// Do not invent projects, employers, or technologies not listed above.

// Start the summary with "This developer…"

// Tone: ${tone}.

// Here are 3 examples of good summaries:
// Example 1: This developer focuses on TypeScript and Go, building developer tooling and open-source infrastructure. Their most starred project has earned meaningful community traction and is actively maintained. Recent activity shows consistent contributions across a growing set of libraries.
// Example 2: This developer works primarily in Python, with projects spanning data engineering and machine learning experiments. They maintain a handful of personal repositories but commit less frequently than in previous years. Their strongest repositories show thoughtful documentation and clean architecture.
// Example 3: This developer builds full-stack web applications in React and Node.js, with a portfolio of small but polished projects. Their repositories suggest a strong focus on UI/UX and developer experience. Activity has been steady over the past year.`;

//   try {
//     const { text } = await generateText({
//       model: "anthropic/claude-sonnet-4.5",
//       prompt,
//       maxOutputTokens: 250,
//       temperature: 0.6,
//     });

//     return text
//       .trim()
//       .replace(/^["'\u201C\u201D]+|["'\u201C\u201D]+$/g, "")
//       .replace(/[\[\(]\s*\d+\s*words?[\]\)]/gi, "")
//       .trim();
//   } catch (error) {
//     console.error("Failed to generate GitHub profile review:", error);
//     throw new Error(
//       "Unable to generate a profile review right now. Please try again."
//     );
//   }
// }