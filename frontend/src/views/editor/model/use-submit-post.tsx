"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

import type { Post, PostRequest } from "@/entities/post";
import { useEditorStore } from "./use-editor-store";
import type { CreatePostValues, EditPostValues } from "./schema";
import { uploadImage } from "@/shared/api/uploadImage";
import { routes } from "@/shared/config";
import { useCreatePost } from "../api/use-create-post";
import { useUpdatePost } from "../api/use-update-post";
import { applyApiFieldErrors } from "@/shared/lib/zod";
import { useFormContext, useFormState } from "react-hook-form";
import type { PostUpdateRequest } from "@/entities/post/model/types";

export function useSubmitPost() {
  const router = useRouter();
  const update = useUpdatePost();
  const create = useCreatePost();

  const { id, slug, setPost, context } = useEditorStore(
    useShallow((s) => ({ context: s.context, id: s.postId, slug: s.postSlug, setPost: s.setPost })),
  );

  const form = useFormContext<CreatePostValues | EditPostValues>();

  const { trigger, control, getValues, reset, setError } = form;

  const formState = useFormState({ control });

  const { dirtyFields, isDirty, errors } = formState;

  const submit = async () => {
    const isFormValid = await trigger();
    console.log("submit");
    console.log(isFormValid, isDirty, errors);

    if (!isFormValid || !isDirty) return;
    const data = getValues();

    let newImage: Post["previewImage"] | null = null;

    if (data.file) {
      try {
        const formData = new FormData();
        formData.set("image", data.file);
        const res = await uploadImage(formData);
        newImage = { url: res.url, position: data.previewImage?.position ?? { x: 0.5, y: 0.5 } };
      } catch {
        newImage = null;
        toast.error("Не удалось загрузить изображение");
      }
    }

    const { category, content, description, tags, title, previewContent, previewImage } =
      dirtyFields;

    if (context === "edit") {
      const body: PostUpdateRequest = {
        ...(title && { title: data.title }),
        ...(category && { categoryId: data.category?.id }),
        ...(content && { content: JSON.stringify(data.content) }),
        ...(description && { desc: data.description }),
        ...(previewContent && { previewContent: JSON.stringify(data.previewContent) }),
        ...(previewImage && { previewImage: data.file ? newImage : data.previewImage }),
        ...(tags && { tagIds: data.tags?.map((t) => t.id) }),
      };

      update.mutate(
        { body, postId: id!, postSlug: slug! },
        {
          onSuccess: (data) => {
            toast.success("Статья обновлена");
            setPost({ postId: data.id, postSlug: data.slug });
            reset(getValues());
            if (slug !== data.slug) {
              window.history.replaceState(null, "", routes.editor.post(data.slug));
            }
          },
          onError: (error) => {
            applyApiFieldErrors(error, setError);
          },
        },
      );
    } else {
      const createData = data as CreatePostValues;
      const body: PostRequest = {
        categoryId: createData.category.id,
        content: JSON.stringify(createData.content),
        desc: createData.description,
        previewContent: JSON.stringify(createData.previewContent),
        previewImage: newImage,
        tagIds: createData.tags.map((t) => t.id),
        title: createData.title,
      };

      create.mutate(body, {
        onSuccess: (data) => {
          toast.success("Статья создана");
          router.push(routes.post(data.slug));
        },
        onError: (error) => {
          applyApiFieldErrors(error, setError);
        },
      });
    }
  };

  return {
    disabled: !isDirty || update.isPending || create.isPending,
    submit,
    id,
    form,
    formState,
  };
}
