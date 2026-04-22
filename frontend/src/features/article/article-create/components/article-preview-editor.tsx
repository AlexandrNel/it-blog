import { Editor } from "@/shared/ui/tiptap-editor";
import { memo, type CSSProperties } from "react";
import { useEditorStore } from "../model/use-editor-store";
import { EditorPreviewImage } from "./editor-preview-image";

function ArticlePreviewEditor() {
	const content = useEditorStore((state) => state.previewContent);
	const setContent = useEditorStore((state) => state.setPreviewContent);

	return (
		<div className="p-2 border rounded-lg ">
			<Editor
				style={{ "--tt-content-padding": "1rem 3rem 8rem" } as CSSProperties}
				header={<EditorPreviewImage />}
				options={{
					toolbar: { disabled: { image: true }, heading: { levels: [3] } },
				}}
				content={content}
				onMount={(e) => {
					setContent(e.getJSON(), e.getText().length);
				}}
				onChange={(e) => {
					setContent(e.getJSON(), e.getText().length);
				}}
			/>
		</div>
	);
}
const MemoizedArticlePreviewEditor = memo(ArticlePreviewEditor);
export { MemoizedArticlePreviewEditor as ArticlePreviewEditor };
