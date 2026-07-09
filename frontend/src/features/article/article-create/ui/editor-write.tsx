"use client";

import { Container } from "@/shared/ui/container";
import { ButtonNext } from "../components/button-next";
import { useEditorStore } from "../model/use-editor-store";
import dynamic from "next/dynamic";
import { Title } from "../components/title";
import { type Editor as EditorType, type JSONContent } from "@tiptap/core";
import { safeParseJson } from "@/shared/lib/utils/safe-parse-json";
import { type BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
const Editor = dynamic(() => import("@/features/article/article-create/components/article-editor/editor"), {
  ssr: false,
  loading: () => "Loading editor",
});

interface Props extends BaseProps {
  content?: string;
}

export function EditoWritePage({ className }: Props) {
  const setData = useEditorStore((state) => state.setData);
  const post = useEditorStore((state) => state.post);
  const content = safeParseJson<JSONContent>(post?.content);
  const updateStore = (editor: EditorType) => {
    const content = editor.getJSON();
    const length = editor.getText().length;
    setData({ content, length });
  };
  return (
    <Container className={cn(className)}>
      <Editor
        key={post?.id}
        classNameContentWraper="bg-card rounded-lg"
        content={content}
        header={<Title />}
        onMount={updateStore}
        onChange={updateStore}
      >
        <div className="p-4">
          <ButtonNext />
        </div>
      </Editor>
    </Container>
  );
}
