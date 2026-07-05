"use client";
import { type JSONContent } from "@tiptap/core";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type Post } from "@/entities/article";

type EditorStoreStates = {
  file?: File | null;
  previewContent: JSONContent;
  previewImage: Post["previewImage"];
  content: JSONContent;
  title: string;
  description: string;
  length: number;
  previewLength: number;
  page: number;
  category: Post["category"] | null;
  tags: string[];
  post: Post | null;
};

type EditorStoreActions = {
  setData: <T extends keyof EditorStoreStates>(data: Record<T, EditorStoreStates[T]>) => void;
  setLength: (length: number, key?: keyof Pick<EditorStore, "length" | "previewLength">) => void;
  setPost: (post: Post | null) => void;
  setPreviewContent: (content: JSONContent, length: number) => void;
  reset: () => void;
};

type EditorStore = EditorStoreStates & EditorStoreActions;

const INITIAL_CONTENT: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
    },
  ],
};

const initialState = {
  content: INITIAL_CONTENT,
  previewContent: INITIAL_CONTENT,
  previewImage: null,
  previewLength: 0,
  title: "",
  description: "",
  length: 0,
  page: 0,
  category: null,
  tags: [],
  post: null,
};

export const useEditorStore = create<EditorStore>()(
  devtools(
    immer((set) => ({
      ...initialState,
      setData(data) {
        set(data);
      },
      setLength(length, key = "length") {
        set({ [key]: length });
      },
      setPreviewContent(content, length) {
        set({ previewContent: content, previewLength: length });
      },
      reset() {
        set(initialState);
      },
      setPost(post) {
        if (post === null) {
          set({ post: null });
        } else {
          const content = JSON.parse(post.content) as JSONContent;
          const previewContent = JSON.parse(post.previewContent) as JSONContent;
          const { category, desc, tags, title, previewImage } = post;
          const tagsData = tags.map((t) => t.name);
          set({
            previewImage,
            previewContent: previewContent,
            description: desc,
            title,
            category,
            content,
            tags: tagsData,
            length: title.length,
            post,
          });
        }
      },
    })),
  ),
);
