import { PostListSkeleton } from "@/entities/post";
import { Suspense } from "react";
import { PostSection } from "./posts/post-section";
import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { FeedSidebar } from "./feed-sidebar";
import { ErrorBoundary } from "@/shared/layouts";
import dynamic from "next/dynamic";
import { SortToolbarSkeleton } from "./sorting/sort-toolbar-skeleton";
import { PostSectionErrorFallback } from "./posts/post-section-error";

const SortToolbar = dynamic(() => import("./sorting/sort-toolbar").then((mod) => mod.SortToolbar), {
  loading: () => <SortToolbarSkeleton />,
});

export default async function Page({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  return (
    <PageLayout className="pb-2" sidebar={<FeedSidebar />}>
      <div className="flex flex-col gap-2 relative">
        <SortToolbar />

        <ErrorBoundary fallback={<PostSectionErrorFallback />}>
          <Suspense fallback={<PostListSkeleton />}>
            <PostSection searchParams={searchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </PageLayout>
  );
}
