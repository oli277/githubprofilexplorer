import Link from "next/link";

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "…")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) result.push("…"); 
    result.push(p);
  });
  return result;
}

export default function Pagination({
  query,
  currentPage,
  totalPages,
}: {
  query: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) =>
    `/?${new URLSearchParams({ query, page: String(page) }).toString()}`;

  const base =
    "flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition";
  const idle = "border border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600";
  const disabled = "cursor-not-allowed border border-gray-100 bg-gray-50 text-gray-300";

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link href={href(currentPage - 1)} className={`${base} ${idle}`}>
          ← Prev
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled}`}>← Prev</span>
      )}

      {getPageNumbers(currentPage, totalPages).map((item, i) =>
        item === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-gray-400">…</span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`${base} ${
              item === currentPage ? "bg-indigo-600 text-white shadow-sm" : idle
            }`}
          >
            {item}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={href(currentPage + 1)} className={`${base} ${idle}`}>
          Next →
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled}`}>Next →</span>
      )}
    </nav>
  );
}