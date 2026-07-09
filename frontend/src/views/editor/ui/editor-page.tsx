import { getPostBySlug } from "@/entities/article/server";
import { notFound } from "next/navigation";
import { ArticleCreate } from "./article-create";

export default async function Page({ params }: PageProps<"/editor/[slug]">) {
  const slug = (await params)?.slug;
  if (!slug) {
    return <ArticleCreate />;
  } else {
    const post = await getPostBySlug(slug);
    if (!post) return notFound();
    return <ArticleCreate post={post} />;
  }
}
