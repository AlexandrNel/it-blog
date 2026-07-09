"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import type * as z from "zod";

import { useEditorStore } from "./use-editor-store";
import { formSchema } from "./schema";

export function useEditorSettingsForm() {
  const { title, desc, tags, category, previewLength } = useEditorStore(
    useShallow((state) => ({
      previewLength: state.previewLength,
      title: state.title,
      desc: state.description,
      tags: state.tags,
      category: state.category,
    })),
  );

  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      previewLength,
      title,
      desc,
      tags,
      category: category ?? { id: "", value: "", key: "" },
    },
  });
}
