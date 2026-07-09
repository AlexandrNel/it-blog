"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

import { type Post } from "@/entities/post";
import { queryTags } from "@/entities/tag/api/query";
import { isApiError } from "@/shared/api/api-error";
import { useEditorStore } from "./use-editor-store";
import { type FormSchemaType } from "./schema";
import { uploadImage } from "@/shared/api/uploadImage";
import { routes } from "@/shared/config";
import { useCreatePost } from "../api/use-create-post";
import { useUpdatePost } from "../api/use-update-post";

export function useSubmitPost() {
  const router = useRouter();
  const { data: tagData = [] } = useQuery(queryTags());
  const update = useUpdatePost();
  const create = useCreatePost();

  const { content, previewContent, previewImage, file, id, slug, setData } = useEditorStore(
    useShallow((state) => ({
      setData: state.setData,
      slug: state.post?.slug,
      id: state.post?.id,
      file: state.file,
      content: state.content,
      previewContent: state.previewContent,
      previewImage: state.previewImage,
    })),
  );

  const tagsMap = Object.fromEntries(tagData.map((tag) => [tag.name, tag.id]));

  const hasId = typeof id === "string" && typeof slug === "string";

  const submit = async (data: FormSchemaType) => {
    const { category, tags, ...rest } = data;

    let newImage: Post["previewImage"] | null = null;

    if (file) {
      try {
        const formData = new FormData();
        formData.set("image", file);
        const res = await uploadImage(formData);
        newImage = { url: res.url, position: previewImage?.position ?? { x: 0.5, y: 0.5 } };
      } catch {
        newImage = null;
        toast.error("Не удалось загрузить изображение");
      }
    }

    const fetchData = {
      ...rest,
      tagIds: tags.map((tag) => tagsMap[tag]),
      categoryId: category.id,
      content: JSON.stringify(content),
      previewContent: JSON.stringify(previewContent),
      previewImage: newImage ?? previewImage,
    };

    if (hasId) {
      update.mutate(
        { body: fetchData, postId: id, postSlug: slug },
        {
          onSuccess: (data) => {
            toast.success("Статья обновлена");
            setData({ post: data });
            window.history.replaceState(null, "", `/editor/${data.slug}`);
          },
          onError: (err) => {
            if (isApiError(err)) {
              toast.error(err.message);
            }
          },
        },
      );
    } else {
      create.mutate(fetchData, {
        onSuccess: (data) => {
          toast.success("Статья создана");
          router.push(routes.post(data.slug));
        },
        onError: (err) => {
          if (isApiError(err)) {
            toast.error(err.message);
          }
        },
      });
    }
  };

  return { isSubmitting: update.isPending || create.isPending, submit };
}
