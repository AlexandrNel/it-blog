"use client";

import { Activity, useEffect } from "react";

import { type Post } from "@/entities/article/";
import { useEditorStore } from "../model/use-editor-store";
import { EditorSettingsPage } from "./editor-settings";
import { EditoWritePage } from "./editor-write";

export function ArticleCreate({ post }: { post?: Post }) {
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
