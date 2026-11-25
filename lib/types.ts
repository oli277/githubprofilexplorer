
export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;

  archived: boolean;
  topics: string[];
  pushed_at: string | null;
  created_at: string;
};

export type User = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null; 
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;


  type: string; 
  hireable: boolean | null;
};