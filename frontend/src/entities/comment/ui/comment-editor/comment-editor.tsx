"use client";

import "./comment-editor.scss";
import { memo, type PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";
import { type Content, type Editor, EditorContent, useEditor } from "@tiptap/react";
import { Placeholder, UndoRedo, Focus, Dropcursor } from "@tiptap/extensions";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Document } from "@tiptap/extension-document";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Underline } from "@tiptap/extension-underline";
import { Text } from "@tiptap/extension-text";
import { safeParseJson } from "@/shared/lib/utils/safeParseJson";

type Props = {
  content?: string;
  onChange?: (obj: Content, text: string) => void;
  onMount?: (e: Editor) => void;
};

export const CommentEditor = memo(({ children, content = "", onChange, onMount }: PropsWithChildren<Props>) => {
  const parsedContent = content ? safeParseJson<Content>(content) : "";
  const editor = useEditor({
    content: parsedContent,
    onMount: (e) => {
      onMount?.(e.editor);
    },
    onUpdate: (e) => {
      onChange?.(e.editor.getJSON(), e.editor.getText());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "p-2 " },
    },
    extensions: [
      Placeholder.configure({
        placeholder: "Комментарий...",
      }),
      UndoRedo,
      Focus,
      Dropcursor,
      Blockquote,
      Bold,
      CodeBlock,
      Document,
      Text,
      Paragraph,
      Italic,
      Link,
      Strike,
      Underline,
      ListItem,
      OrderedList.configure({
        HTMLAttributes: { class: "comment-list" },
      }),
      BulletList.configure({
        HTMLAttributes: { class: "comment-list" },
      }),
      Paragraph.configure({
        HTMLAttributes: { class: "comment-paragraph" },
      }),
    ],
  });
  return (
    <div
      className={cn(
        "bg-background relative cursor-text rounded-lg transition-all border border-transparent shadow-primary/20",
        "hover:shadow-[0_0_0_3px] hover:bg-card  hover:border-primary/50",
        "focus-within:shadow-[0_0_0_3px] focus-within:bg-card  focus-within:border-primary/50",
      )}
    >
      <EditorContent className="min-h-10" editor={editor} />
      {children}
    </div>
  );
});
