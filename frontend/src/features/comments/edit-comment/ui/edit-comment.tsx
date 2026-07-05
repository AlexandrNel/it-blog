"use client";
import { Column } from "@/shared/ui/layout";
import { cn } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types/components";
import { useRef, type PropsWithChildren } from "react";
import { Button } from "@/shared/ui/button";
import { CommentEditor } from "@/entities/comment";
import { Row } from "@/shared/ui/layout";
import { type Content, type Editor } from "@tiptap/core";
import { toast } from "sonner";
import { useEditPostComment } from "../model/edit-comment-queries";

type Props = {
  content?: string;
  entityId: string;
  onSuccess?: () => void;
};

export const EditComment = ({
  className,
  children,
  content,
  entityId,
  onSuccess,
}: PropsWithChildren<BaseProps> & Props) => {
  const refJson = useRef<Content>("");
  const refText = useRef("");
  const editor = useRef<Editor>(null);

  const edit = useEditPostComment();
  const isLoading = edit.isPending;

  const handleOnSuccess = () => {
    onSuccess?.();
    editor.current?.commands.clearContent();
    toast.success("Комментарий изменен");
  };
  const handleError = () => {
    toast.error("Не удалось изменить комментарий");
  };

  const handleSubmit = () => {
    if (!refText.current.trim()) {
      editor.current?.commands.focus("start");
      return;
    }
    const text = JSON.stringify(refJson.current);
    const payload = { text, commentId: entityId };
    edit.mutate(payload, { onSuccess: handleOnSuccess, onError: handleError });
  };

  return (
    <Column className={cn("w-full", className)}>
      <CommentEditor
        onMount={(e) => {
          editor.current = e;
          refText.current = e.getText();
          refJson.current = e.getJSON();
        }}
        onChange={(json, text) => {
          refJson.current = json;
          refText.current = text;
        }}
        content={content}
      >
        <Row className="pb-2 px-2">
          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            Сохранить
          </Button>
          {children}
        </Row>
      </CommentEditor>
    </Column>
  );
};
