import { create } from "zustand";

interface CommentStore {
  commentId: string | null;
  editorMode: EditorMode;
  updateCommentState: (commentId: string | null, editorMode: EditorMode) => void;
}

export type EditorMode = "edit" | "write";

export const useCommentStore = create<CommentStore>()((set) => ({
  commentId: null,
  editorMode: "write",
  updateCommentState: (commentId, editorMode) => {
    set({ commentId, editorMode });
  },
}));
