"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const PAGE_COUNT = 2;

export type EditorStep = "create" | "edit";

type PostContext =
  | {
      context: EditorStep & "edit";
      postId: string;
      postSlug: string;
    }
  | {
      context: EditorStep & "create";
      postId: null;
      postSlug: null;
    };

type EditorStoreStates = {
  page: number;
} & PostContext;

type EditorStoreActions = {
  nextPage: () => void;
  prevPage: () => void;
  setPost: (data: Omit<PostContext, "context">) => void;
  reset: () => void;
};

type EditorStore = EditorStoreStates & EditorStoreActions;

const initialState: EditorStoreStates = {
  page: 0,
  context: "create",
  postId: null,
  postSlug: null,
};

export const useEditorStore = create<EditorStore>()(
  devtools(
    immer((set) => ({
      ...initialState,
      prevPage() {
        set((s) => {
          if (s.page === 0) {
            return s;
          }
          if (s.page > 0) {
            return { ...s, page: s.page - 1 };
          }
        });
      },
      nextPage() {
        set((s) => {
          if (s.page < PAGE_COUNT) {
            return { ...s, page: s.page + 1 };
          }
          if (s.page === PAGE_COUNT) return s;
        });
      },
      reset() {
        set(initialState);
      },
      setPost(post) {
        if (post.postId && post.postSlug) {
          set({ postId: post.postId, postSlug: post.postSlug, context: "edit" });
        } else {
          set({ context: "create", postSlug: null, postId: null });
        }
      },
    })),
  ),
);

export const selectPage = () => useEditorStore((s) => s.page);
