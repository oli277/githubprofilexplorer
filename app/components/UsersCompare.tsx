import { getUserUrl, fetchUser } from "@/lib/getQueryParams";
import UserView from "./UserView";
import { User } from "@/lib/types";
import UserCompareResults from "./UserCompareResults";

export default async function UsersCompare({
  searchParams,
}: {
  searchParams: Promise<{ user1?: string; user2?: string }>;
}) {
  const { user1, user2 } = await searchParams;

  if (!user1 || !user2) return <h1>No users</h1>;

  const firstUserUrl = getUserUrl({query: user1})
  const secondUserUrl = getUserUrl({query: user2})

  const firstUser: User | null = await fetchUser({userUrl: firstUserUrl})
  const secondUser: User | null = await fetchUser({userUrl: secondUserUrl})

  if(!firstUser) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-4xl">🕵️</p>
        <h2 className="mt-3 text-lg font-semibold text-red-700">User not found</h2>
        <p className="mt-1 text-sm text-red-600">
          We couldn&apos;t find a GitHub user named &quot;{user1}&quot;. Check the spelling and try again.
        </p>
      </div>
    );
  }
 
   if(!secondUser) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-4xl">🕵️</p>
        <h2 className="mt-3 text-lg font-semibold text-red-700">User not found</h2>
        <p className="mt-1 text-sm text-red-600">
          We couldn&apos;t find a GitHub user named &quot;{user2}&quot;. Check the spelling and try again.
        </p>
      </div>
    );
  }

  return(
    <>
       <UserView user={firstUser}/>
       <UserView user={secondUser}/>
       <UserCompareResults user1={firstUser} user2={secondUser}/>
      
    </>
 
    
  )
}
