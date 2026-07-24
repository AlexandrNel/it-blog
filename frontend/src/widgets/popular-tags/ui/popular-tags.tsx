import { TagList } from "@/entities/tag";
import { getTagList } from "@/entities/tag/server";
import { Column, Row } from "@/shared/ui/layout";
import { Skeleton } from "@/shared/ui/skeleton";
import { Suspense } from "react";
import { PopularTagsSkeleton } from "./popular-tags-skeleton";
import { ErrorBoundary } from "@/shared/layouts";
import { PopularTagsError } from "./popuular-tags-error";

async function PopularTagsFetch() {
  const list = await getTagList();
  return (
    <div className="bg-card rounded-lg p-3">
      <h2 className="text-base font-bold mb-3">Популярные теги</h2>
      {list.length === 0 ? (
        <Column align={"center"} gap={"sm"} className="md:text-center md:px-4">
          <p className="font-medium">Тегов пока нет</p>
          <p className="text-sm text-muted-foreground">
            Первые темы и обсуждения появятся вместе с новыми публикациями авторов.
          </p>
        </Column>
      ) : (
        <TagList list={list} />
      )}
    </div>
  );
}

export async function PopularTags() {
  return (
    <ErrorBoundary fallback={<PopularTagsError />}>
      <Suspense fallback={<PopularTagsSkeleton />}>
        <PopularTagsFetch />
      </Suspense>
    </ErrorBoundary>
  );
}
