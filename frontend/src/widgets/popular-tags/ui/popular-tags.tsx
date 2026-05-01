import { getTagList, TagList } from "@/entities/tag";
import { Column, Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { getHeadersWithCookies } from "@/shared/lib/api";

async function PopularTagsFetch() {
	const cookie = await cookies();
	const headers = getHeadersWithCookies(cookie);
	const list = await getTagList({ headers });
	return (
		<div className="bg-card rounded-lg p-3">
			<h2 className="text-lg font-bold mb-3">Популярные теги</h2>
			{!list.length ? (
				<Column align={"center"} className="md:text-center md:px-4">
					<h3 className="font-medium">Тегов пока нет</h3>
					<p className="text-sm text-muted-foreground">
						Первые темы и обсуждения появятся вместе с новыми публикациями авторов.
					</p>
				</Column>
			) : (
				<TagList list={list} />
			)}
		</div>
	);
}

export async function PopularTags() {
	return (
		<Suspense fallback={<PopularTagsFallback />}>
			<PopularTagsFetch />
		</Suspense>
	);
}

async function PopularTagsFallback() {
	"use cache";
	return (
		<div className="rounded-lg p-3 bg-card">
			<Skeleton className="h-6 w-[60%] mb-3" />
			<Row className="flex-wrap">
				<Skeleton className="rounded-sm h-6 w-20" />
				<Skeleton className="rounded-sm h-6 w-16" />
				<Skeleton className="rounded-sm h-6 w-18" />
				<Skeleton className="rounded-sm h-6 w-14" />
				<Skeleton className="rounded-sm h-6 w-24" />
			</Row>
		</div>
	);
}
