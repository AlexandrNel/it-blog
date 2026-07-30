"use client";

import type { Post } from "@/entities/post";
import { useEditorStore } from "../model/use-editor-store";
import { EditoWritePage } from "./step1/editor-write";
import { EditorSettingsPage } from "./step2/editor-settings";
import { FormProvider } from "react-hook-form";
import { usePostEditForm } from "../model/usePostEditForm";

const editorSteps = [EditoWritePage, EditorSettingsPage];

export function PostEditor({ post }: { post?: Post }) {
  const page = useEditorStore((state) => state.page);
  const form = usePostEditForm(post);
  const Component = editorSteps[page];

  return (
    <FormProvider {...form}>
      <Component />
    </FormProvider>
  );
}
