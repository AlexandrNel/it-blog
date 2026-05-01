import { getAllPosts, PostCard } from "@/entities/article";
import { Pagination } from "./Pagination";
import { EditBlock } from "@/features/article/article-menu";
import { Card } from "@/shared/ui/card";
import { Column } from "@/shared/ui/layout";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export async function ArticleSection({
	searchParams,
}: Pick<PageProps<"/articles/[id]">, "searchParams">) {
	const param = Number((await searchParams).page);
	const sort = (await searchParams).sort;
	const page = Number.isFinite(param) ? param : undefined;
	const posts = await getAllPosts(sort as string, page);
	return (
		<section>
			<ul>
				{!posts || !posts.data.length ? (
					<ArticleSectionFallback />
				) : (
					posts.data.map((p) => (
						<li key={p.id} className="mb-2">
							<PostCard header={<EditBlock postId={p.id} authorId={p.author.id} />} post={p} />
							<PostCard header={<EditBlock postId={p.id} authorId={p.author.id} />} post={p} />
							<PostCard header={<EditBlock postId={p.id} authorId={p.author.id} />} post={p} />
							<PostCard header={<EditBlock postId={p.id} authorId={p.author.id} />} post={p} />
							<PostCard header={<EditBlock postId={p.id} authorId={p.author.id} />} post={p} />
						</li>
					))
				)}
			</ul>
			{posts && <Pagination page={page} pages={posts.pages} />}
		</section>
	);
}

function ArticleSectionFallback() {
	return (
		<Card className="py-10">
			<Column gap={"lg"} align={"center"} className="text-center">
				<Column align={"center"} justify={"center"} className="rounded-xl size-16 bg-muted">
					<Newspaper />
				</Column>
				<h1 className="text-xl font-bold">В ленте пока нет статей</h1>
				<p className="text text-muted-foreground md:px-10">
					Здесь будут появляться материалы от авторов и по тегам, на которые вы подписаны. Начните
					читать интересные публикации или поделитесь своим опытом!
				</p>
				<Button asChild>
					<Link href={"/editor"}>Написать статью</Link>
				</Button>
			</Column>
		</Card>
	);
}
