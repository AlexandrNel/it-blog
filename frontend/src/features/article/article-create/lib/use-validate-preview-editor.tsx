"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "../model/use-editor-store";
import z from "zod";

export const MIN_LENGTH = 50;
export const MAX_LENGTH = 3000;

const LengthSchema = z
	.number()
	.min(MIN_LENGTH, { error: `Превью должно содержать не менее ${MIN_LENGTH} символов` })
	.max(MAX_LENGTH, { error: `Превью должно содержать не более ${MAX_LENGTH} символов` });

export const useValidatePreviewEditor = () => {
	const previewLength = useEditorStore((state) => state.previewLength);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (previewLength >= MIN_LENGTH && error !== null) {
			setError(null);
		}
	}, [previewLength, error]);

	const validatePreview = useCallback(() => {
		const result = LengthSchema.safeParse(previewLength);
		if (result.error) {
			setError(result.error.message);
		}
		return result.success;
	}, [previewLength]);

	return { error, validatePreview };
};
