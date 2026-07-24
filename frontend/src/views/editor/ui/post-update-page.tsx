import { getPostBySlug } from "@/entities/post/server";
import { notFound } from "next/navigation";
import { PostEditor } from "./post-editor";

export async function PostUpdatePage({ params }: PageProps<"/editor/[slug]">) {
  const slug = (await params)?.slug;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  return <PostEditor post={post} />;
}
