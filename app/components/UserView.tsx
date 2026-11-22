import Image from "next/image";
import type { ReactNode } from "react";
import type { User } from "@/lib/types";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center py-4">
      <span className="text-xl font-bold text-gray-900">{value.toLocaleString("en-US")}</span>
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
    </div>
  );
}
 
function InfoItem({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-600">
      <span aria-hidden="true">{icon}</span>
      {children}
    </li>
  );
}

export default function UserView({ user }: { user: User }) {
  const blogUrl = user.blog
    ? user.blog.startsWith("http")
      ? user.blog
      : `https://${user.blog}`
    : null;

  const joined = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <article className="mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Banner */}
      <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="px-6 pb-6">
        {/* Avatar + name (avatar overlaps the banner) */}
        <div className="-mt-14 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={112}
            height={112}
            className="h-28 w-28 shrink-0 rounded-full border-4 border-white bg-gray-100 object-cover shadow-md"
          />

          <div className="min-w-0 text-center sm:pb-1 sm:text-left">
            <h2 className="truncate text-2xl font-bold text-gray-900">
              {user.name ?? user.login}
            </h2>
            <p className="text-sm font-medium text-gray-500">@{user.login}</p>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 active:scale-95 sm:ml-auto"
          >
            View on GitHub
          </a>
        </div>

        {/* Bio */}
        <p className="mt-5 text-center leading-relaxed text-gray-700 sm:text-left">
          {user.bio ?? <span className="italic text-gray-400">No bio provided</span>}
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200 rounded-2xl border border-gray-100 bg-gray-50">
          <Stat label="Repos" value={user.public_repos} />
          <Stat label="Followers" value={user.followers} />
          <Stat label="Following" value={user.following} />
        </div>

        {/* Details */}
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
          {user.location && <InfoItem icon="📍">{user.location}</InfoItem>}
          {user.company && <InfoItem icon="🏢">{user.company}</InfoItem>}
          {blogUrl && (
            <InfoItem icon="🔗">
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {user.blog}
              </a>
            </InfoItem>
          )}
          <InfoItem icon="📅">Joined {joined}</InfoItem>
        </ul>
      </div>
    </article>
  );
}