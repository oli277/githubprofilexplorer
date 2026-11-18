import SearchForm from "./components/SearchForm";
import { Suspense } from "react";
import SearchResults from "./components/SearchResults";


export default  function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {


  return (
    <> 
    <SearchForm />
    <Suspense fallback={<p>Loading...</p>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
 

  )
}
