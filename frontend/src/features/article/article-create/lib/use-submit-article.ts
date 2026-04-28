"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

import { Post, PostAPI } from "@/entities/article";
import { queryTags } from "@/entities/tag/api/query";
import { isApiError } from "@/shared/lib/api/api-error";
import { useEditorStore } from "../model/use-editor-store";
import type { FormSchemaType } from "../model/schema";
import { uploadImage } from "@/shared/api/uploadImage";

export function useSubmitArticle() {
	const { id } = useParams();
	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: tagData = [] } = useQuery(queryTags());

	const { content, previewContent, previewImage, file, setData } = useEditorStore(
		useShallow((state) => ({
			setData: state.setData,
			file: state.file,
			content: state.content,
			previewContent: state.previewContent,
			previewImage: state.previewImage,
		})),
	);

	const tagsMap = Object.fromEntries(tagData.map((tag) => [tag.name, tag.id]));
	const hasId = typeof id === "string";

	const clearFile = () => {
		setData({ file: null });
	};

	const submit = async (data: FormSchemaType) => {
		const { category, tags, ...rest } = data;
		let newImage: Post["previewImage"] | null = null;
		if (file) {
			try {
				const formData = new FormData();
				formData.set("image", file);
				const res = await uploadImage(formData);
				newImage = { url: res.url, position: previewImage?.position ?? { x: 0.5, y: 0.5 } };
			} catch {
				newImage = null;
			}
		}
		console.log(newImage, previewImage);

		const fetchData = {
			...rest,
			tagIds: tags.map((tag) => tagsMap[tag]),
			categoryId: category.id,
			content: JSON.stringify(content),
			previewContent: JSON.stringify(previewContent),
			previewImage: newImage ?? previewImage,
		};
		// return console.log(fetchData);

		setIsSubmitting(true);

		try {
			if (hasId) {
				await PostAPI.updatePost(fetchData, id);
				await fetch(`/api/posts/${id}/revalidate`, { method: "POST" });
				toast.success("Статья обновлена");
			} else {
				const post = await PostAPI.createPost(fetchData);
				toast.success("Статья создана");
				router.push(`/articles/${post.slug}`);
			}
			clearFile();
		} catch (error) {
			if (isApiError(error)) {
				toast.error(error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return { isSubmitting, submit };
}
