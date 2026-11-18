import ReposSearchResults from "./RepoSearchResults";
import UserSearchResults from "./UserSearchResults";


export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  
  return (
    <>
      
    <UserSearchResults searchParams={searchParams}/>
    <ReposSearchResults searchParams={searchParams}/>
    </>
  
  );
}