
export type ComparisonUser = {
  name: string;
  displayValue: string | number;
  compareValue: number;
};

type DefaultMessageProps = {
  noun: string;
  customMessages?: never;
};

type CustomMessageProps = {
  noun?: never;
  customMessages: {
    win: (winner: string, loser: string, diff: number) => React.ReactNode;
    tie: (name1: string, name2: string) => React.ReactNode;
  };
};

type ComparisonCardProps = {
  title: string;
  unit?:string;
  user1: ComparisonUser;
  user2: ComparisonUser;
} & (DefaultMessageProps | CustomMessageProps); 

export default function ComparisonCard({
  title,
  noun,
  unit,
  user1,
  user2,
  customMessages,
}: ComparisonCardProps) {
  const isTie = user1.compareValue === user2.compareValue;
  const user1Wins = user1.compareValue > user2.compareValue;
  const difference = Math.abs(user1.compareValue - user2.compareValue);

  const renderWin = customMessages?.win || ((winner: string, loser: string, diff: number) => (
    <>
      <span className="font-semibold">{winner}</span> has{" "}
      <span className="font-bold">{diff}</span> more {noun} than{" "}
      <span className="font-semibold">{loser}</span>
    </>
  ));

  const renderTie = customMessages?.tie || ((name1: string, name2: string) => (
    <>
      Both <span className="font-semibold">{name1}</span> and{" "}
      <span className="font-semibold">{name2}</span> have the same number of {noun}
    </>
  ));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
          <p className="truncate text-sm font-medium text-slate-500">{user1.name}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{user1.displayValue} {unit}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
          <p className="truncate text-sm font-medium text-slate-500">{user2.name}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{user2.displayValue} {unit}</p>
        </div>
      </div>

      {isTie ? (
        <p className="rounded-lg bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-700 ring-1 ring-emerald-100">
          {renderTie(user1.name, user2.name)}
        </p>
      ) : (
        <p className="rounded-lg bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-700 ring-1 ring-indigo-100">
          {user1Wins
            ? renderWin(user1.name, user2.name, difference)
            : renderWin(user2.name, user1.name, difference)}
        </p>
      )}
    </section>
  );
}