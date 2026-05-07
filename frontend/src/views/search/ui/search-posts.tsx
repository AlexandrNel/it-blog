"use client";
import { useQueryState } from "nuqs";
import { PostCard } from "@/entities/article";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchPosts } from "../api/client";
import React from "react";
import { Spinner } from "@/shared/ui/spinner";
import { Card } from "@/shared/ui/card";

export function FetchPosts() {
	const [q] = useQueryState("q");
	const [sort] = useQueryState("sort");
	const [date] = useQueryState("date");
	const [title] = useQueryState("title");
	const { data, fetchNextPage, hasNextPage, isFetching, isSuccess, isLoading } = useInfiniteQuery({
		queryKey: ["posts", q, sort, date, title],
		queryFn: ({ pageParam }) => SearchPosts.search({ q, sort, date, page: pageParam, title }),
		getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
		initialPageParam: 1,
		enabled: !!q?.trim(),
		retry: false,
	});

	const notFound = isSuccess && !data?.pages?.[0].posts.length;

	return (
		<div>
			{isLoading && (
				<div className="flex justify-center items-center">
					<Spinner />
				</div>
			)}
			{notFound && <Card className="text-center">По запросу "{q}" ничего не надено</Card>}

			{data?.pages?.map((group, i) => (
				<React.Fragment key={i}>
					{group.posts.map((p) => (
						<PostCard className="mb-2 last:mb-0" key={p.id} post={p} />
					))}
				</React.Fragment>
			))}
			{hasNextPage && (
				<div className="h-10 flex justify-center items-center">
					<Spinner />
				</div>
			)}
		</div>
	);
}
