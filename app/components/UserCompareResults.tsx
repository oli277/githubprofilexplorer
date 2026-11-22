import { getUserValues } from "@/lib/getQueryParams";
import { User } from "@/lib/types";
import ComparisonCard from "./ComparisonCard";

type UserValues = ReturnType<typeof getUserValues>;

type Metric = {
  title: string;
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
];

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

      {COMPARISON_METRICS.map((metric) => (
        <ComparisonCard
          key={metric.title} 
          title={metric.title}
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
    </div>
  );
}