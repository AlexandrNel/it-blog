import { PostListSkeleton } from "@/entities/article";
import { Suspense } from "react";
import { PostSection } from "./post-section";
import { PageLayout } from "@/shared/layouts/page-layout";
import { FeedSidebar } from "./feed-sidebar";
import { SortToolbar, SortToolbarSkeleton } from "@/features/article/article-sort";

export default async function Page({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  return (
    <PageLayout className="pb-2" sidebar={<FeedSidebar />}>
      <Suspense fallback={<SortToolbarSkeleton />}>
        <SortToolbar className="mb-2" />
      </Suspense>
      <Suspense fallback={<PostListSkeleton />}>
        <PostSection searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  );
}
