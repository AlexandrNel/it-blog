"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "@/entities/post";
import type { JSONContent } from "@tiptap/core";
import { useEffect } from "react";
import { useEditorStore } from "./use-editor-store";
import { CreatePostSchema, type CreatePostValues } from "./schema";

function getDefaultValues(post?: Post) {
  return {
    previewContentSize: 0,
    contentSize: 0,
    category: post?.category ?? {
      id: "",
      key: "",
      value: "",
    },
    content: post?.content ? JSON.parse(post.content) : INITIAL_CONTENT,
    description: post?.desc ?? "",
    previewContent: post?.previewContent ? JSON.parse(post.previewContent) : INITIAL_CONTENT,
    tags: post?.tags ?? [],
    title: post?.title ?? "",
    previewImage: post?.previewImage ?? null,
    file: null,
  };
}

const INITIAL_CONTENT: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
    },
  ],
};

export function usePostEditForm(post?: Post) {
  const reset = useEditorStore((s) => s.reset);
  const setPost = useEditorStore((s) => s.setPost);

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(CreatePostSchema),
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: getDefaultValues(post),
  });

  useEffect(() => {
    if (post) {
      setPost({ postId: post.id, postSlug: post.slug });
    }
    return () => {
      reset();
    };
  }, [reset, setPost, post]);

  return form;
}
