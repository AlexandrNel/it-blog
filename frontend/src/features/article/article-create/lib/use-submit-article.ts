"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

import { PostAPI } from "@/entities/article";
import { queryTags } from "@/entities/tag/api/query";
import { isApiError } from "@/shared/lib/api/api-error";
import { useEditorStore } from "../model/use-editor-store";
import type { FormSchemaType } from "../model/schema";

export function useSubmitArticle() {
  const { id } = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: tagData = [] } = useQuery(queryTags());

  const { content, previewContent, previewImage } = useEditorStore(
    useShallow((state) => ({
      content: state.content,
      previewContent: state.previewContent,
      previewImage: state.previewImage,
    })),
  );

  const tagsMap = Object.fromEntries(tagData.map((tag) => [tag.name, tag.id]));
  const hasId = typeof id === "string";

  const submit = async (data: FormSchemaType) => {
    const { category, tags, ...rest } = data;
    const fetchData = {
      ...rest,
      tagIds: tags.map((tag) => tagsMap[tag]),
      categoryId: category.id,
      content: JSON.stringify(content),
      previewContent: JSON.stringify(previewContent),
      previewImageUrl: previewImage,
    };

    setIsSubmitting(true);

    try {
      if (hasId) {
        await PostAPI.updatePost(fetchData, id);
        await fetch(`/api/posts/${id}/revalidate`, { method: "POST" });
        toast.success("Статья обновлена");
      } else {
        const post = await PostAPI.createPost(fetchData);
        toast.success("Статья создана");
        router.push(`/articles/${post.slug}`);
      }
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submit };
}
