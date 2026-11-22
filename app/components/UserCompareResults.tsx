import { getUserValues } from "@/lib/getQueryParams";
import { User } from "@/lib/types";

export default function UserCompareResults({
  user1,
  user2,
}: {
  user1: User;
  user2: User;
}) {
  const userOneValues = getUserValues({ user: user1 });
  const userTwoValues = getUserValues({ user: user2 });

  return (
    <div className="space-y-6">
     
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Followers</h2>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="truncate text-sm font-medium text-slate-500">
              {userOneValues.name }
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {userOneValues.followers}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="truncate text-sm font-medium text-slate-500">
              {userTwoValues.name }
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {userTwoValues.followers}
            </p>
          </div>
        </div>

        {userOneValues.followers > userTwoValues.followers ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
            <span className="font-semibold">{userOneValues.name}</span> has{" "}
            <span className="font-bold">
              {userOneValues.followers - userTwoValues.followers}
            </span>{" "}
            more followers than{" "}
            <span className="font-semibold">{userTwoValues.name}</span>
          </p>
        ) : userTwoValues.followers > userOneValues.followers ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
            <span className="font-semibold">{userTwoValues.name }</span> has{" "}
            <span className="font-bold">
              {userTwoValues.followers - userOneValues.followers}
            </span>{" "}
            more followers than{" "}
            <span className="font-semibold">{userOneValues.name }</span>
          </p>
        ) : (
          <p className="rounded-lg bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-700 ring-1 ring-emerald-100">
            Both <span className="font-semibold">{userOneValues.name }</span> and{" "}
            <span className="font-semibold">{userTwoValues.name }</span> have the
            same number of followers
          </p>
        )}
      </section>

    
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Public Repositories
        </h2>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="truncate text-sm font-medium text-slate-500">
              {userOneValues.name}
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {userOneValues.public_repos}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="truncate text-sm font-medium text-slate-500">
              {userTwoValues.name }
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {userTwoValues.public_repos}
            </p>
          </div>
        </div>

        {userOneValues.public_repos > userTwoValues.public_repos ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
            <span className="font-semibold">{userOneValues.name }</span> has{" "}
            <span className="font-bold">
              {userOneValues.public_repos - userTwoValues.public_repos}
            </span>{" "}
            more public repos than{" "}
            <span className="font-semibold">{userTwoValues.name }</span>
          </p>
        ) : userTwoValues.public_repos > userOneValues.public_repos ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
            <span className="font-semibold">{userTwoValues.name }</span> has{" "}
            <span className="font-bold">
              {userTwoValues.public_repos - userOneValues.public_repos}
            </span>{" "}
            more public repos than{" "}
            <span className="font-semibold">{userOneValues.name }</span>
          </p>
        ) : (
          <p className="rounded-lg bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-700 ring-1 ring-emerald-100">
            Both <span className="font-semibold">{userOneValues.name }</span> and{" "}
            <span className="font-semibold">{userTwoValues.name }</span> have the
            same number of public repos
          </p>
        )}
      </section>

     
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Account Age</h2>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="truncate text-sm font-medium text-slate-500">
              {userOneValues.name }
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {userOneValues.accountAge}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="truncate text-sm font-medium text-slate-500">
              {userTwoValues.name }
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {userTwoValues.accountAge}
            </p>
          </div>
        </div>

        {userOneValues.accountAgeInDays > userTwoValues.accountAgeInDays ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
            <span className="font-semibold">{userOneValues.name }</span>
            &apos;s account is{" "}
            <span className="font-bold">
              {userOneValues.accountAgeInDays - userTwoValues.accountAgeInDays}
            </span>{" "}
            days older than{" "}
            <span className="font-semibold">{userTwoValues.name }</span>
            &apos;s account
          </p>
        ) : userTwoValues.accountAgeInDays > userOneValues.accountAgeInDays ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
            <span className="font-semibold">{userTwoValues.name }</span>
            &apos;s account is{" "}
            <span className="font-bold">
              {userTwoValues.accountAgeInDays - userOneValues.accountAgeInDays}
            </span>{" "}
            days older than{" "}
            <span className="font-semibold">{userOneValues.name }</span>
            &apos;s account
          </p>
        ) : (
          <p className="rounded-lg bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-700 ring-1 ring-emerald-100">
            Both <span className="font-semibold">{userOneValues.name }</span> and{" "}
            <span className="font-semibold">{userTwoValues.name }</span> have
            accounts of the same age
          </p>
        )}
      </section>
    </div>
  );
}