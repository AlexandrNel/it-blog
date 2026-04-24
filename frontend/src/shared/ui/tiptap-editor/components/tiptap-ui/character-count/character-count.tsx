"use client";
import "./styles.scss";
import type { Editor } from "@tiptap/react";
import { useTiptapEditor } from "../../../lib/use-tiptap-editor";

export const CharacterCount = ({
	editor: providedEditor,
	limit = Infinity,
}: {
	editor: Editor | null;
	limit?: number;
}) => {
	const { editor } = useTiptapEditor(providedEditor);

	if (!editor) {
		return null;
	}

	const charactersCount = editor.storage.characterCount.characters();
	const wordsCount = editor.storage.characterCount.words();
	const isFiniteLimit = Number.isFinite(limit);
	const percentage = editor ? Math.round((100 / limit) * charactersCount) : 0;

	return (
		<div
			className={`character-count ${charactersCount === limit ? "character-count--warning" : ""}`}
		>
			{isFiniteLimit && (
				<svg height="20" width="20" viewBox="0 0 20 20">
					<title>Character Count</title>
					<circle r="10" cx="10" cy="10" fill="#e9ecef" />
					<circle
						r="5"
						cx="10"
						cy="10"
						fill="transparent"
						stroke="currentColor"
						strokeWidth="10"
						strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
						transform="rotate(-90) translate(-20)"
					/>
					<circle r="6" cx="10" cy="10" fill="white" />
				</svg>
			)}
			<div className="character-count__text">
				<span>
					{charactersCount} {isFiniteLimit && `/ ${limit}`} символов
				</span>
				<span> - </span>
				<span>{wordsCount} слов</span>
			</div>
		</div>
	);
};
