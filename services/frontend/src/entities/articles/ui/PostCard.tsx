import type React from "react";
import type { TPost } from "../model/post";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";
// import { EditBlock } from "./EditBlock";
import UserAvatar from "@/shared/ui/UserAvatar/UserAvatar";
import { TagList } from "@/shared/ui/TagList/TagList";
import { Time } from "@/shared/ui/Time/Time";

interface Props {
	className?: string;
	post: TPost;
}

export const PostCard: React.FC<Props> = ({ className, post }) => {
	return (
		<div className={cn(className)}>
			<div
				className={cn(
					`transition-all bg-card text-foreground shadow border rounded-lg  relative group`,
				)}
			>
				{/* Edit block */}
				{/* <EditBlock userId={post.author.id} postId={post.id} /> */}

				{/* iImage of post */}
				<div className={cn("overflow-hidden w-full h-50")}>
					{post.imageUrl && (
						<Image
							width={400}
							height={200}
							className="dark:brightness-75 mx-auto h-full w-auto"
							src={post.imageUrl}
							alt=""
						/>
					)}
				</div>

				{/* Text content of post */}
				<div className="px-5 py-3  rounded-lg">
					<div>
						<div className="flex gap-2 items-center ">
							<UserAvatar user={post.author} />
							<div className="flex flex-col ">
								<p className="font-medium">{post.author.name}</p>
								<span className="flex gap-1 text-gray-400 text-xs">
									<Time value={post.createdAt} />
								</span>
							</div>
						</div>
						<Link href={`/articles/${post.slug}`}>
							<h2 className="font-bold text-[25px] mb-2 transition-all hover:underline">
								{post.title}
							</h2>
						</Link>
						<div className=" mb-2">
							<TagList list={post.tags.map((tag) => tag.tag.name)} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
