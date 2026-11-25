import { z } from "zod";

export const UserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string().nullable(), 
  html_url: z.string().url(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
  created_at: z.string(),

  type: z.string(),
  hireable: z.boolean().nullable(),
});

export const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  fork: z.boolean(),
  updated_at: z.string(),

  archived: z.boolean(),
  topics: z.array(z.string()),
  pushed_at: z.string().nullable(),
  created_at: z.string(),
});
 

export type Review = z.infer<typeof UserSchema>;
export type Product = z.infer<typeof RepoSchema>;