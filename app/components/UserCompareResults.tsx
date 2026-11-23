import { getUserValues, getReposArray } from "@/lib/getQueryParams";
import { User } from "@/lib/types";
import ComparisonCard from "./ComparisonCard";

type UserValues = ReturnType<typeof getUserValues>;

type Metric = {
  title: string;
  unit?:string;
  displayAccessor: (values: UserValues) => string | number;
  compareAccessor: (values: UserValues) => number;
} & (
  | { noun: string; customMessages?: never }
  | {
      noun?: never;
      customMessages: {
        win: (winner: string, loser: string, diff: number) => React.ReactNode;
        tie: (name1: string, name2: string) => React.ReactNode;
      };
    }
);

const COMPARISON_METRICS: Metric[] = [
  {
    title: "Followers",
    noun: "followers",
    displayAccessor: (values) => values.followers,
    compareAccessor: (values) => values.followers,
  },
  {
    title: "Following",

     customMessages: {
      win: (winner, loser, diff) => (
        <>
          <span className="font-semibold">{winner}</span> is following {" "}
          <span className="font-bold">{diff}</span> more accounts than {" "}
          <span className="font-semibold">{loser}</span> 
        </>
      ),
      tie: (name1, name2) => (
        <>
          Both <span className="font-semibold">{name1}</span> and{" "}
          <span className="font-semibold">{name2}</span> follow the same number of accounts
        </>
      ),
    },
    
    displayAccessor: (values) => values.following,
    compareAccessor: (values) => values.following,
  },
  {
    title: "Public Repositories",
    noun: "public repos",
    displayAccessor: (values) => values.public_repos,
    compareAccessor: (values) => values.public_repos,
  },
  {
    title: "Account Age",
    customMessages: {
      win: (winner, loser, diff) => (
        <>
          <span className="font-semibold">{winner}</span>&apos;s account is{" "}
          <span className="font-bold">{diff}</span> days older than{" "}
          <span className="font-semibold">{loser}</span>&apos;s account
        </>
      ),
      tie: (name1, name2) => (
        <>
          Both <span className="font-semibold">{name1}</span> and{" "}
          <span className="font-semibold">{name2}</span> have accounts of the same age
        </>
      ),
    },
    displayAccessor: (values) => values.accountAge,
    compareAccessor: (values) => values.accountAgeInDays,
  },
  {
    title: "Total stars on original repos",
    noun: "total stars on original repos",
    displayAccessor: (values) => values.ogStarsCount,
    compareAccessor: (values) => values.ogStarsCount,
  },
  {
    title: "What percentage of repos are forks",
    noun: "percent of repos are forks",
    unit: "%",
    displayAccessor: (values) => values.forksPercent,
    compareAccessor: (values) => values.forksPercent,
  },
  {
    title: "Last Active",
    unit: "days ago",
    customMessages: {
      win: (winner, loser, diff) => (
        <>
          <span className="font-semibold">{winner}</span>&apos;s last activity{" "}
          <span className="font-bold">{diff}</span> days older than{" "}
          <span className="font-semibold">{loser}</span>&apos;s last activity
        </>
      ),
      tie: (name1, name2) => (
        <>
          Both <span className="font-semibold">{name1}</span> and{" "}
          <span className="font-semibold">{name2}</span> have same time of last activity
        </>
      ),
    },
    displayAccessor: (values) => values.lastActive ? values.lastActive : 0,
    compareAccessor: (values) => values.lastActive ? values.lastActive : 0,
  },
];

export default async function UserCompareResults({
  user1,
  user2,
}: {
  user1: User;
  user2: User;
}) {

const [userOneRepoArr, userTwoRepoArr] = await Promise.all([
  getReposArray({ user: user1 }),
  getReposArray({ user: user2 }),
]);

  const userOneValues = getUserValues({user: user1, repos:userOneRepoArr});
  const userTwoValues = getUserValues({ user: user2, repos: userTwoRepoArr });

  return (
    <div className="space-y-6">

      {COMPARISON_METRICS.map((metric) => (
        <ComparisonCard
          key={metric.title} 
          title={metric.title}
          unit={metric.unit}
          user1={{
            name: userOneValues.name,
            displayValue: metric.displayAccessor(userOneValues),
            compareValue: metric.compareAccessor(userOneValues),
          }}
          user2={{
            name: userTwoValues.name,
            displayValue: metric.displayAccessor(userTwoValues),
            compareValue: metric.compareAccessor(userTwoValues),
          }}

          {...(metric.customMessages
            ? { customMessages: metric.customMessages }
            : { noun: metric.noun })}
        />
      ))}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Most used language</h2>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
          <p className="truncate text-sm font-medium text-slate-500">{user1.name}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{userOneValues.modeLang}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
          <p className="truncate text-sm font-medium text-slate-500">{user2.name}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{userTwoValues.modeLang}</p>
        </div>
      </div>
      </section>
    </div>
    
  );
}