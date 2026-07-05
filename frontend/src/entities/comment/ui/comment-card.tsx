"use client";
import { UserCard } from "@/entities/user";
import { type Comment } from "../model/comment";
import { type PropsWithChildren } from "react";
import { type BaseProps } from "@/shared/types/components";
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
      <UserCard
        className="grid grid-cols-[min-content_auto] gap-x-2"
        asLink
        data={{
          date: "",
          avatarUrl: comment.author.avatar,
          fullName: comment.author.displayName,
          username: comment.author.username,
        }}
      />

      <div className="">
        <EditorContent content={comment.content} className="pb-1 col-start-2" />
        {children}
      </div>
    </div>
  );
}
