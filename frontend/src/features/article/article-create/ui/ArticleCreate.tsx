"use client";

import { useEditorStore } from "../model/use-editor-store";
import { EditoWritePage } from "./EditorWritePage";
import { EditorSettingsPage } from "./EditorSettingsPage";
import type { Post } from "@/entities/article/";
import { Activity, type ReactNode, useEffect } from "react";

export function ArticleCreate({ post, deleteButton }: { post?: Post; deleteButton: ReactNode }) {
	const page = useEditorStore((state) => state.page);
	const setPost = useEditorStore((state) => state.setPost);
	const reset = useEditorStore((state) => state.reset);

	useEffect(() => {
		if (post) setPost(post);
		return () => reset();
	}, [post, reset, setPost]);

	return (
		<>
			<EditoWritePage className={page === 0 ? "block" : "hidden"} />
			<Activity mode={page === 1 ? "visible" : "hidden"}>
				<EditorSettingsPage deleteButton={deleteButton} />
			</Activity>
		</>
	);
}
