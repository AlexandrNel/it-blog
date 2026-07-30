import { getPostBySlug } from "@/entities/post/server";
import { routes } from "@/shared/config/";
import { PostPage } from "@/views/posts";
import type { Metadata } from "next";

export async function generateMetadata(props: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.desc,
    publisher: post.author.username,
    alternates: {
      canonical: routes.post(post.slug),
    },
    openGraph: {
      images: post.previewImage?.url,
      type: "article",
      title: post.title,
      description: post.desc,
      url: routes.post(post.slug),
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
