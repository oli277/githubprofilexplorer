import type { User } from "@/lib/types";
import { getUserUrl } from "@/lib/getQueryParams";
import UserView from "./UserView";
import Link from "next/link";

export default async function UserSearchResults({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  if (!query) return null;

  const usersUrl = getUserUrl({ query });

  const response = await fetch(usersUrl);

  if (!response.ok) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-4xl">🕵️</p>
        <h2 className="mt-3 text-lg font-semibold text-red-700">
          User not found
        </h2>
        <p className="mt-1 text-sm text-red-600">
          We couldn&apos;t find a GitHub user named &quot;{query}&quot;. Check
          the spelling and try again.
        </p>
      </div>
    );
  }

  const user: User = await response.json();

  return (
    <>
      <UserView user={user} />
    </>
  );
}
