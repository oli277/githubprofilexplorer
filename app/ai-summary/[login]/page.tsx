import { Suspense } from "react";
// import { AIProfileReview } from "@/app/components/AIProfileReview";
import { fetchUserforAI, getUserUrl } from "@/lib/getQueryParams";
import { GithubUser } from "@/lib/typesforAI";
import { notFound } from "next/navigation";


export default async function ProfilePage({
  params,
}: {
  params: Promise<{ login: string }>;
}) {

  const { login } = await params;
  const userUrl = getUserUrl({query: login})

  const user = await fetchUserforAI({userUrl}) 

    if (!user) notFound()


  
 
  return (
   <>
     <h1>what {login}</h1>
   </>
  
  );
}