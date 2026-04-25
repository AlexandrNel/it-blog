"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "../model/use-editor-store";

export const MIN_LENGTH = 50;

export const useValidatePreviewEditor = () => {
	const previewLength = useEditorStore((state) => state.previewLength);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (previewLength >= MIN_LENGTH && error !== null) {
			setError(null);
		}
	}, [previewLength, error]);

	const validatePreview = useCallback(() => {
		const isValid = previewLength >= MIN_LENGTH;
		if (!isValid) {
			setError(`Превью должно содержать не менее ${MIN_LENGTH} символов`);
		}
		return isValid;
	}, [previewLength]);

	return { error, validatePreview };
};
