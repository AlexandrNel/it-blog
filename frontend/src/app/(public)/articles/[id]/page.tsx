import { getPostBySlug } from "@/entities/article/index.server";
import { PostPage } from "@/views/articles";
import type { Metadata } from "next";

export async function generateMetadata(props: PageProps<"/articles/[id]">): Promise<Metadata> {
	const { id } = await props.params;
	const post = await getPostBySlug(id);
	if (!post) return {};

	return {
		title: post.title,
		description: post.desc,
		publisher: post.author.username,
		alternates: {
			canonical: `/articles/${id}`,
		},
		openGraph: {
			images: post.previewImage?.url,
			type: "article",
			title: post.title,
			description: post.desc,
			url: `/articles/${id}`,
			publishedTime: new Date(post.createdAt).toISOString(),
			authors: [post.author.username],
		},
		twitter: {
			images: post.previewImage?.url,
			title: post.title,
			description: post.desc,
		},
		other: {
			date: new Date(post.createdAt).toUTCString(),
		},
	};
}

export default PostPage;
