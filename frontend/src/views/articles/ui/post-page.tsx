import { PostSection } from "./post-section";
import { PostComments } from "@/widgets/post/post-comments/";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/articles/[id]">) {
  return (
    <>
      <Suspense fallback={"loading article"}>
        <PostSection searchParams={searchParams} params={params} />
      </Suspense>
      <Suspense fallback={"loading comments"}>
        <PostComments searchParams={searchParams} params={params} />
      </Suspense>
    </>
  );
}
