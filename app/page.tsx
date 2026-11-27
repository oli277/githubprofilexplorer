import SearchForm from "./components/SearchForm";
import { Suspense } from "react";
import SearchResults from "./components/SearchResults";
import CompareButton from "./components/CompareButton";
import Loading from "./loading";
export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
    <>
      <SearchForm />
      <CompareButton/>
      <Suspense fallback={<Loading/>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}
