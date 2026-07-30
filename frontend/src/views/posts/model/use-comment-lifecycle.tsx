"use client";
import { useState } from "react";
import { type EditorMode, useCommentStore } from "./use-comment-store";
import type { Comment } from "@/entities/comment";

export const useCommentLifecycle = (comment: Comment) => {
  const commentId = useCommentStore((state) => state.commentId);
  const currentMode = useCommentStore((state) => state.editorMode);
  const updateCommentState = useCommentStore((state) => state.updateCommentState);
  const [showMore, setIsShowMore] = useState(false);

  const commentLength = comment.replies.length ?? 0;

  const isEditorShowed = commentId === comment.id;
  const isRepliesShowed = commentLength > 0 && showMore;

  const hideEditor = () => updateCommentState(null, "write");
  const showEditor = (mode: EditorMode) => updateCommentState(comment.id, mode);

  const showRepliesAndEditor = (mode: EditorMode) => {
    setIsShowMore(true);
    showEditor(mode);
  };
  const handleHideOrShowTree = () => {
    const nextShowMore = !showMore;
    if (showMore) {
      hideEditor();
    }
    setIsShowMore(nextShowMore);
  };

  return {
    editorMode: currentMode,
    showEditor,
    isEditorShowed,
    isRepliesShowed,
    showRepliesAndEditor,
    handleHideOrShowTree,
    hideEditor,
    commentLength,
  };
};
