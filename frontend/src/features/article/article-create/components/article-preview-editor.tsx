import Editor from "./article-editor/editor";
import { memo, type CSSProperties } from "react";
import { useEditorStore } from "../model/use-editor-store";
import { EditorPreviewImageWrapper } from "@/features/article/article-create/components/editor-preview-image";
import { cn } from "@/shared/lib/utils";
import { safeParseJson } from "@/shared/lib/utils/safeParseJson";
import type { JSONContent } from "@tiptap/core";

function ArticlePreviewEditor({ error }: { error?: string | null }) {
	const post = useEditorStore((state) => state.post);
	const setData = useEditorStore((state) => state.setData);
	const content = safeParseJson<JSONContent>(post?.previewContent);
	return (
		<div className={cn("p-2 border rounded-lg  ", { "border-red-500": !!error })}>
			<Editor
				style={{ "--tt-content-padding": "1rem 3rem 8rem" } as CSSProperties}
				header={<EditorPreviewImageWrapper />}
				options={{
					toolbar: { disabled: { image: true }, heading: { levels: [3] } },
				}}
				content={content}
				onMount={(editor) => {
					setData({ previewLength: editor.getText().length });
				}}
				onChange={(editor) => {
					const previewContent = editor.getJSON();
					const previewLength = editor.getText().length;
					setData({ previewContent, previewLength });
				}}
			/>
		</div>
	);
}
const MemoizedArticlePreviewEditor = memo(ArticlePreviewEditor);
export { MemoizedArticlePreviewEditor as ArticlePreviewEditor };
