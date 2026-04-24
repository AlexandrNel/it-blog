"use client";

import { useState } from "react";
import { useEditorStore } from "../model/use-editor-store";

export const MIN_LENGTH = 50;

export const useValidatePreviewEditor = () => {
	const previewLength = useEditorStore((state) => state.previewLength);
	const [error, setError] = useState(false);
	const validatePreview = () => {
		const isValid = previewLength >= MIN_LENGTH;
		if (!isValid) {
			setError(true);
		}
	};

	return { error, validatePreview };
};
