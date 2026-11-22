import SearchForm from "./components/SearchForm";
import { Suspense } from "react";
import SearchResults from "./components/SearchResults";
import CompareButton from "./components/CompareButton";
export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
    <>
      <SearchForm />
      <CompareButton/>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}
