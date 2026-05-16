"use client";

import { useEditorStore } from "../../../model/use-editor-store";
import { EditorPreviewImage } from "./editor-preview-image";

export const EditorPreviewImageWrapper = () => {
	const setData = useEditorStore((state) => state.setData);
	const previewImage = useEditorStore((state) => state.previewImage);

	return (
		<EditorPreviewImage
			value={previewImage}
			onChange={(data, file) => setData({ previewImage: file ? null : data, file })}
		/>
	);
};
