import type React from "react";
import type { TPost } from "../model/post";
import { cn } from "@/shared/lib/utils";
import { PostCard } from "./PostCard";

interface Props {
	classNamePost?: string;
	classNameWrapper?: string;
	postList: TPost[];
}

export const PostList: React.FC<Props> = ({ classNamePost, classNameWrapper, postList }) => {
	return (
		<ul className={cn(classNameWrapper)}>
			{postList.map((post) => (
				<li className={cn("mb-4 last:mb-0", classNamePost)} key={post.id}>
					<PostCard post={post} />
				</li>
			))}
		</ul>
	);
};
