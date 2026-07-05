import { TagsPage } from "@/views/tags";
import { type Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(props: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await props.params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Тег: ${decodedTag}`,
    description: `Подборка статей IT Blog по тегу ${decodedTag}.`,
    alternates: {
      canonical: `/tags/${tag}`,
    },
    openGraph: {
      title: `Тег: ${decodedTag}`,
      description: `Подборка статей IT Blog по тегу ${decodedTag}.`,
      url: `/tags/${tag}`,
    },
  };
}

export default async function Page({ params }: PageProps<"/tags/[tag]">) {
  return (
    <Suspense>
      <TagsPage params={params} />
    </Suspense>
  );
}
