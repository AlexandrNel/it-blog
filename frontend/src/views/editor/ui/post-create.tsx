"use client";

import { Activity, useEffect } from "react";

import type { Post } from "@/entities/post";
import { useEditorStore } from "../model/use-editor-store";
import { EditoWritePage } from "./editor-write";
import { EditorSettingsPage } from "./editor-settings";

export function PostCreate({ post }: { post?: Post }) {
  const page = useEditorStore((state) => state.page);
  const setPost = useEditorStore((state) => state.setPost);
  const reset = useEditorStore((state) => state.reset);

  useEffect(() => {
    if (post) setPost(post);
    return () => reset();
  }, [post, reset, setPost]);

  return (
    <>
      <EditoWritePage className={page === 0 ? "block" : "hidden"} />
      <Activity mode={page === 1 ? "visible" : "hidden"}>
        <EditorSettingsPage />
      </Activity>
    </>
  );
}
