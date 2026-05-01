import type { PostWithStatistic } from "../model/post";
import { cn } from "@/shared/lib/utils";
import { ArticleInfo } from "./ArticleInfo";
import { ArticlePreview } from "./ArticlePreview";
import { TagList } from "@/entities/tag/@x/article";
import Link from "next/link";
import { ArticleStatistic } from "./ArticleStatistic";
import type { ReactNode } from "react";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

interface Props {
	className?: string;
	post: PostWithStatistic;
	header?: ReactNode;
}

export const PostCard = ({ className, post, header }: Props) => {
	const cardClasses = cn(
		`h-full flex flex-col transition-all bg-card text-foreground  rounded-lg  relative group`,
		className,
	);
	return (
		<div className={cardClasses}>
			{header}
			<div className="md:p-5 p-2  mt-auto  rounded-lg">
				<ArticleInfo author={post.author} createdAt={post.createdAt} />
				<h2 className="font-bold md:text-xl text-lg transition-all hover:underline w-max my-2">
					<Link
						className={cn(
							"max-md:before:absolute max-md:before:content-[''] max-md:before:inset-0 max-md:before:z-1 max-md:before:block max-md:before:w-full max-md:before:h-full",
						)}
						href={`/articles/${post.slug}`}
					>
						{post.title}
					</Link>
				</h2>
				<ArticlePreview previewContent={post.previewContent} image={post.previewImage} />
				<Button asChild className="my-1 mt-2 text-sm max-md:hidden" size={"xs"} variant={"outline"}>
					<Link href={`/articles/${post.slug}`}>Читать далее</Link>
				</Button>
				<TagList className="w-max" list={post.tags} />
				<Separator className="mt-2" />
				<ArticleStatistic className="mt-2" statistic={post.statistic} />
			</div>
		</div>
	);
};
