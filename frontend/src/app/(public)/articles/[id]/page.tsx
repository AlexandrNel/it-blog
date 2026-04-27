import { getPostBySlug } from "@/entities/article";
import { PostPage } from "@/views/articles";
import type { Metadata } from "next";

export async function generateMetadata(props: PageProps<"/articles/[id]">): Promise<Metadata> {
	"use cache";
	const { id } = await props.params;
	const post = await getPostBySlug(id);
	if (!post) return {};

	return {
		title: post.title,
		description: post.desc,
		publisher: post.author.username,
		other: {
			date: new Date(post.createdAt).toUTCString(),
		},
	};
}

export default PostPage;
