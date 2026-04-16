"use client";
import { UserAvatar } from "@/entities/user";
import type { Comment } from "../model/comment";
import { Column, Row } from "@/shared/ui/layout";
import type { PropsWithChildren } from "react";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { EditorContent } from "@/shared/ui/tiptap-editor";

type Props = {
  comment: Comment;
};

export function CommentCard({
  comment,
  className,
  children,
}: PropsWithChildren<BaseProps & Props>) {
  return (
    <div id={comment.id} className={cn("pb-1 pt-2 flex-1", className)}>
      <div className="grid grid-cols-[min-content_auto] gap-x-2">
        <UserAvatar name={comment.author.displayName}></UserAvatar>
        <Column className="gap-0">
          <p className="text-[15px] font-medium">
            {comment.author.displayName}
          </p>
          <p className="text-[13px] text-muted-foreground">
            @{comment.author.username}
          </p>
        </Column>
        <EditorContent content={comment.content} className="pb-1 col-start-2" />
      </div>
      {children}
    </div>
  );
}
