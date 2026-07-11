"use client";
import { Column } from "@/shared/ui/layout";
import { type BaseProps } from "@/shared/types/components";
import { useRef, type PropsWithChildren } from "react";
import { Button } from "@/shared/ui/button";
import { Row } from "@/shared/ui/layout";
import { type Content, type Editor } from "@tiptap/core";
import { useSendCommentAnswer, useSendPostComment } from "../model/queries";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Skeleton } from "@/shared/ui";
import { classNames } from "@/shared/lib/utils";

const CommentEditor = dynamic(
  () => import("@/entities/comment/ui/comment-editor/comment-editor").then((mod) => mod.CommentEditor),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="w-full h-[90px] rounded-lg p-2 flex items-end justify-start">
        <Skeleton className="h-10 w-[107px] rounded-lg" />
      </Skeleton>
    ),
  },
);

type Props = {
  content?: string;
  entityId: string;
  entityType: "comment" | "post";
  onSuccess?: () => void;
};

export const WriteCommentEditor = ({
  className,
  children,
  content,
  entityType,
  entityId,
  onSuccess,
}: PropsWithChildren<BaseProps> & Props) => {
  const refJson = useRef<Content>("");
  const refText = useRef("");
  const editor = useRef<Editor>(null);

  const comment = useSendCommentAnswer();
  const post = useSendPostComment();

  const isLoading = comment.isPending || post.isPending;
  const mutation = entityType === "comment" ? comment : post;

  const handleOnSuccess = () => {
    onSuccess?.();
    editor.current?.commands.clearContent();
    toast.success("Комментарий добавлен");
  };
  const handleError = () => {
    toast.error("Не удалось оставить комментарий");
  };

  const handleSubmit = () => {
    if (!refText.current.trim()) {
      editor.current?.commands.focus("start");
      return;
    }
    const text = JSON.stringify(refJson.current);
    const payload = { text, commentId: entityId, slug: entityId };
    mutation.mutate(payload, { onSuccess: handleOnSuccess, onError: handleError });
  };

  return (
    <Column className={classNames("w-full", {}, [className])}>
      <CommentEditor
        onMount={(e) => {
          editor.current = e;
        }}
        onChange={(json, text) => {
          refJson.current = json;
          refText.current = text;
        }}
        content={content}
      >
        <Row className="pb-2 px-2">
          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            Отправить
          </Button>
          {children}
        </Row>
      </CommentEditor>
    </Column>
  );
};
