import { getPostById } from "@/entities/article/api";
import { EditorPage } from "@/views/editor";
import { notFound } from "next/navigation";

export default async function Page({ params }: PageProps<"/editor/[id]">) {
	const id = (await params).id;
	const post = await getPostById(id);
	if (!post) return notFound();
	return <EditorPage post={post} />;
}
