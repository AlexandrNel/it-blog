import {
	ArticlePreview,
	ArticleStatistic,
	ArticleTime,
	type PostWithStatistic,
} from "@/entities/article";
import { UserAvatar } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import Link from "next/link";

export function ProfilePostCard({ post }: { post: PostWithStatistic }) {
	return (
		<Card>
			<Column className="gap-1">
				<Row>
					<UserAvatar name={post.author.username}></UserAvatar>
					<span className="text-sm">{post.author.username}</span>
					<ArticleTime value={post.createdAt} />
				</Row>
				<h3 className="text-lg font-medium">
					<Link target="_blank" href={`/articles/${post.slug}`}>
						{post.title}
					</Link>
				</h3>
				<Row>
					{post.tags.map((t) => (
						<Link key={t.key} target="_blank" href={`/tags/${t.key}`}>
							<span className="text-sm block text-muted-foreground hover:text-secondary-foreground transition-colors ">
								{t.name}
							</span>
						</Link>
					))}
				</Row>
				<ArticlePreview imageUrl={post.previewImageUrl} previewContent={post.previewContent} />
				<Button asChild className=" self-start" variant={"secondary"}>
					<Link href={`/articles/${post.slug}`}>Читать далее</Link>
				</Button>
			</Column>
			<ArticleStatistic statistic={post.statistic} />
		</Card>
	);
}
