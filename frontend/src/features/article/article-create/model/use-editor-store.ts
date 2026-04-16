"use client";
import type { JSONContent } from "@tiptap/core";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Post } from "@/entities/article";

interface EditorStore {
	previewContent: JSONContent;
	previewImage: string | null;
	content: JSONContent;
	title: string;
	description: string;
	length: number;
	previewLength: number;
	page: number;
	category: string | null;
	tags: string[];
	post: Post | null;
	setLength: (length: number, key?: keyof Pick<EditorStore, "length" | "previewLength">) => void;
	setPage: (page: number) => void;
	setTitle: (newTitle: string) => void;
	setDescription: (value: string) => void;
	setCategory: (value: string | null) => void;
	setTags: (values: string[]) => void;
	setContent: (content: JSONContent) => void;
	setPreviewContent: (content: JSONContent, length: number) => void;
	setPreviewImage: (value: string | null) => void;
	setPost: (post: Post | null) => void;
	reset: () => void;
}

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
			setContent(content) {
				set({ content });
			},

			setTitle(title) {
				set({ title });
			},

			setLength(length, key = "length") {
				set({ [key]: length });
			},

			setPage(page) {
				set({ page });
			},

			setCategory(value) {
				set({ category: value });
			},
			setDescription(value) {
				set({ description: value });
			},
			setTags(values) {
				set({ tags: values });
			},
			setPreviewContent(content, length) {
				set({ previewContent: content, previewLength: length });
			},
			reset() {
				set(initialState);
			},
			setPreviewImage(value) {
				set({ previewImage: value });
			},
			setPost(post) {
				if (post === null) {
					set({ post: null });
				} else {
					const content = JSON.parse(post.content) as JSONContent;
					const previewContent = JSON.parse(post.previewContent) as JSONContent;
					const { category, desc, tags, title, previewImageUrl } = post;
					const tagsData = tags.map((t) => t.name);
					set({
						category: category.value,
						previewImage: previewImageUrl,
						previewContent: previewContent,
						description: desc,
						title,
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
