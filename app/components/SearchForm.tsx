import Form from "next/form";

export default function SearchForm() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Explore{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          GitHub
        </span>{" "}
        repositories
      </h1>
      <p className="mt-3 text-base text-gray-500">
        Enter a GitHub username to browse their public projects.
      </p>

      <Form action="/" className="mt-8">
        <label htmlFor="query" className="sr-only">
          GitHub username
        </label>

        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-indigo-500 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-indigo-100">
          <svg
            className="ml-3 h-5 w-5 shrink-0 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>

          <input
            id="query"
            name="query"
            type="text"
            required
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. torvalds"
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-base text-gray-900 placeholder-gray-400 outline-none"
          />

          <button
            type="submit"
            className="shrink-0 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>
      </Form>
    </div>
  );
}