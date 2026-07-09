import { getPostBySlug } from "@/entities/post/server";
import { notFound } from "next/navigation";
import { PostCreate } from "./post-create";

export default async function Page({ params }: PageProps<"/editor/[slug]">) {
  const slug = (await params)?.slug;
  if (!slug) {
    return <PostCreate />;
  } else {
    const post = await getPostBySlug(slug);
    if (!post) return notFound();
    return <PostCreate post={post} />;
  }
}
