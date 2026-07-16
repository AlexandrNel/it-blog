import { PostListSkeleton } from "@/entities/post";
import { Suspense } from "react";
import { PostSection } from "./post-section";
import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { FeedSidebar } from "./feed-sidebar";
import { SortToolbar, SortToolbarSkeleton } from "@/features/post/post-sort";

export default async function Page({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  return (
    <PageLayout className="pb-2" sidebar={<FeedSidebar />}>
      <div className="flex flex-col gap-2">
        <Suspense fallback={<SortToolbarSkeleton />}>
          <SortToolbar />
        </Suspense>
        <Suspense fallback={<PostListSkeleton />}>
          <PostSection searchParams={searchParams} />
        </Suspense>
      </div>
    </PageLayout>
  );
}
