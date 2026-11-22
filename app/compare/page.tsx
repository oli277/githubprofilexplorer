import UsersForm from "../components/UsersForm";
import UsersCompare from "../components/UsersCompare";
import { Suspense } from "react";

export default function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ user1?: string; user2?: string }>;
}) {
  return (
    <>
      <Suspense fallback={"/"}>
        <UsersForm />
        <UsersCompare searchParams={searchParams} />{" "}
      </Suspense>
    </>
  );
}
