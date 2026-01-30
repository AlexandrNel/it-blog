import { PostList, PostListSkeleton, type TPost } from "@/entities/articles";
import { Suspense } from "react";

export function MainPage() {
	return (
		<div className=" p-3 py-0 rounded-lg">
			<Suspense fallback={<PostListSkeleton />}>
				<FetchArticles />
			</Suspense>
		</div>
	);
}

async function FetchArticles() {
	const posts: TPost[] = [
		{
			id: "1",
			tags: [
				{
					tag: { id: "1", name: "react" },
				},
				{ tag: { id: "2", name: "frontend" } },
			],
			slug: "introduction-to-react",
			imageUrl: "https://example.com/react.jpg",
			content: "This is the full content of the first article about React...",
			desc: "A beginner's guide to React",
			title: "Introduction to React",
			author: {
				id: "author1",
				email: "author1@example.com",
				name: "John Doe",
				avatar: "https://example.com/avatar1.jpg",
			},
			likesCount: 25,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "2",
			tags: [{ tag: { id: "3", name: "design" } }, { tag: { id: "4", name: "ui" } }],
			slug: "ui-design-principles",
			imageUrl: "https://example.com/design.jpg",
			content: "This is the full content of the second article about UI design...",
			desc: "Essential principles for UI design",
			title: "UI Design Principles",
			author: {
				id: "author2",
				email: "author2@example.com",
				name: "Jane Smith",
				avatar: "https://example.com/avatar2.jpg",
			},
			likesCount: 15,
			createdAt: "2023-01-02T00:00:00Z",
			updatedAt: "2023-01-02T00:00:00Z",
		},
		{
			id: "3",
			tags: [{ tag: { id: "5", name: "backend" } }, { tag: { id: "6", name: "nodejs" } }],
			slug: "building-apis-with-nodejs",
			imageUrl: "https://example.com/nodejs.jpg",
			content: "This is the full content of the third article about Node.js...",
			desc: "How to build REST APIs with Node.js",
			title: "Building APIs with Node.js",
			author: {
				id: "author3",
				email: "author3@example.com",
				name: "Bob Johnson",
				avatar: "https://example.com/avatar3.jpg",
			},
			likesCount: 30,
			createdAt: "2023-01-03T00:00:00Z",
			updatedAt: "2023-01-03T00:00:00Z",
		},
	];
	return <PostList postList={posts} />;
}
