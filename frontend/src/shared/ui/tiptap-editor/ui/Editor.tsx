"use client";

import {
	type Content,
	type UseEditorOptions,
	type Editor,
	EditorContent,
	EditorContext,
	useEditor,
} from "@tiptap/react";

// --- Tiptap Node ---
import "../components/tiptap-node/blockquote-node/blockquote-node.scss";
import "../components/tiptap-node/code-block-node/code-block-node.scss";
import "../components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "../components/tiptap-node/list-node/list-node.scss";
import "../components/tiptap-node/image-node/image-node.scss";
import "../components/tiptap-node/heading-node/heading-node.scss";
import "../components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Styles ---
import "./editor.scss";

import { baseToolbarExtentions } from "../model/extentions";
import type { CSSProperties, ReactNode } from "react";
import { EditorToolbar, type ToolbarOptions } from "./Toolbar";
import { INITIAL_CONTENT } from "../consts";
import { cn } from "../lib/tiptap-utils";

interface EditorProps {
	content?: Content;
	onChange?: (editor: Editor) => void;
	onMount?: (editor: Editor) => void;
	options?: { toolbar?: ToolbarOptions; editor?: UseEditorOptions };
	classNameContentWraper?: string;
	toolbarEnable?: boolean;
	footer?: ReactNode;
	children?: ReactNode;
	header?: ReactNode;
	style?: CSSProperties;
}

export default function EditorUI({
	content = INITIAL_CONTENT,
	options,
	children,
	classNameContentWraper,
	toolbarEnable = true,
	footer,
	header,
	style,
	onChange,
	onMount,
}: EditorProps) {
	const editor = useEditor({
		immediatelyRender: false,
		editorProps: {
			attributes: {
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				"aria-label": "Main content area, start typing to enter text.",
				class: "editor ",
			},
		},
		extensions: baseToolbarExtentions,
		onMount: (e) => {
			onMount?.(e.editor);
		},
		onUpdate: (e) => {
			onChange?.(e.editor);
		},
		content,
		...options?.editor,
	});

	return (
		<div className={"editor-wrapper"}>
			<EditorContext.Provider value={{ editor }}>
				{toolbarEnable && <EditorToolbar options={options?.toolbar} />}
				<div className={cn(classNameContentWraper)}>
					{header}
					<EditorContent
						style={style}
						editor={editor}
						role="presentation"
						className={"editor-content"}
					/>
					{children}
				</div>
				{footer && <div className={cn("mt-2")}>{footer}</div>}
			</EditorContext.Provider>
		</div>
	);
}
