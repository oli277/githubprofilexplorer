import { Suspense } from "react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ login: string }>;
}) {

  const { login } = await params;
 
  let user;
  
 
  return (
   <p>what {login}</p>
  
  );
}