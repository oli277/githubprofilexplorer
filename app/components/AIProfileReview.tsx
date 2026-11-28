// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { GithubUser } from "@/lib/typesforAI";
// import { reviewGithubProfile } from "@/lib/ai-summary";
// import { getUserRepos } from "@/lib/getQueryParams";
// import Image from "next/image";

// export async function AIProfileReview({ user }: { user: GithubUser }) {
  
//   const repos = await getUserRepos(user.login);
//   const summary = await reviewGithubProfile(user, repos);

//   const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
//   const originalRepos = repos.filter((r) => !r.fork).length;

//   return (
//     <Card className="w-full max-w-prose p-10 grid gap-10">
//       <CardHeader className="items-center space-y-0 gap-4 p-0">
//         <div className="grid gap-1 text-center">
//           <CardTitle className="text-lg">AI Profile Review</CardTitle>
//           <p className="text-xs text-muted-foreground">
//             Based on {originalRepos} public{" "}
//             {originalRepos === 1 ? "repository" : "repositories"}
//           </p>
//         </div>
//         <div className="bg-gray-100 px-4 rounded-full flex items-center gap-3 py-2 dark:bg-gray-800">
//           <Image
//             src={user.avatar_url}
//             alt={`${user.login}'s avatar`}
//             width={28}
//             height={28}
//             className="rounded-full"
//           />
//           <span className="text-sm font-medium">{user.login}</span>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {totalStars.toLocaleString()} stars ·{" "}
//             {user.followers.toLocaleString()} followers
//           </span>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0 grid gap-4">
//         <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
//           {summary}
//         </p>
//       </CardContent>
//     </Card>
//   );
// }