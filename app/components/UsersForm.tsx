import Form from "next/form";

export default function UsersForm() {
  return (
    <>
      <div className="mx-auto w-full max-w-md px-4 pt-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Compare{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            users
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500">
          Enter two users to compare.
        </p>

        <Form action="/compare" className="mt-8 text-left">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition focus-within:border-indigo-500 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-indigo-100">
            <div className="flex items-center">
              <svg
                className="ml-4 h-5 w-5 shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                />
              </svg>
              <label htmlFor="user1" className="sr-only">
                User 1
              </label>
              <input
                id="user1"
                name="user1"
                type="text"
                required
                autoComplete="user1"
                spellCheck={false}
                placeholder="User 1"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-gray-900 placeholder-gray-400 outline-none"
              />
            </div>

            
            <div className="border-t border-gray-100" />
            <div className="flex items-center">
              <svg
                className="ml-4 h-5 w-5 shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                />
              </svg>
              <label htmlFor="user2" className="sr-only">
                User 2
              </label>
              <input
                id="user2"
                name="user2"
                type="text"
                required
                autoComplete="user2"
                spellCheck={false}
                placeholder="User 2"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-gray-900 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Compare
          </button>
        </Form>
      </div>
    </>
  );
}
