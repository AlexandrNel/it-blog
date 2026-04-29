import { PostListSkeleton } from "@/entities/article";
import { Suspense } from "react";
import { ArticleSection } from "./article-section";
import { PageLayout } from "@/shared/layouts/PageLayout";
import { FeedSidebar } from "./feed-sidebar";
import { SortToolbar, SortToolbarSkeleton } from "@/features/article/article-sort";

export default async function Page({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
	return (
		<PageLayout className="pb-2" sidebar={<FeedSidebar />}>
			<Suspense fallback={<SortToolbarSkeleton />}>
				<SortToolbar className="mb-2" />
			</Suspense>
			<Suspense fallback={<PostListSkeleton />}>
				<ArticleSection searchParams={searchParams} />
			</Suspense>
		</PageLayout>
	);
}
