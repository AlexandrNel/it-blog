import { getComments } from "@/entities/comment/index.server";
import { WriteCommentEditor } from "@/features/comments/write-comment";
import { PostWithQuery } from "./post-comments-with-query";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ScrollToComment } from "./scroll-to-comment";
import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Card } from "@/shared/ui/card";

async function _PostComments({ params }: Pick<PageProps<"/articles/[slug]">, "params">) {
	const queryClient = new QueryClient();

	const slug = (await params).slug;

	await queryClient.prefetchQuery({
		queryKey: ["comments"],
		queryFn: () => getComments(slug),
	});

	return (
		<section id="comments" className="card">
			<h3 className="mb-4">Комментарии</h3>
			<WriteCommentEditor entityType="post" entityId={slug} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PostWithQuery slug={slug} />
			</HydrationBoundary>
			<ScrollToComment />
		</section>
	);
}

export const PostComments = ({ params }: Pick<PageProps<"/articles/[slug]">, "params">) => {
	return (
		<Suspense fallback={<PostCommentsSkeleton />}>
			<_PostComments params={params} />
		</Suspense>
	);
};

const PostCommentsSkeleton = () => {
	return (
		<Card>
			<h3 className="mb-4">Комментарии</h3>
			<Skeleton className="w-full h-20 rounded-lg my-2" />
			<Skeleton className="w-full h-20 rounded-lg my-2" />
			<Skeleton className="w-full h-20 rounded-lg my-2" />
		</Card>
	);
};
