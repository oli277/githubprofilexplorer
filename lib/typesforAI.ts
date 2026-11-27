import { z } from "zod";

export const UserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string().nullable().transform(v => (v?.trim() ? v : null)),
  email: z.string().nullable(),
  twitter_username: z.string().nullable(),
  html_url: z.string().url(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
  public_gists: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  type: z.enum(["User", "Organization"]),
  hireable: z.boolean().nullable(),
});

export const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  fork: z.boolean(),
  archived: z.boolean(),
  topics: z.array(z.string()),
  license: z.object({ spdx_id: z.string().nullable() }).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  pushed_at: z.string().datetime().nullable(),
});

export type GithubUser = z.infer<typeof UserSchema>;
export type GithubRepo = z.infer<typeof RepoSchema>;