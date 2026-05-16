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
import "@/shared/ui/tiptap-editor/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/shared/ui/tiptap-editor/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/shared/ui/tiptap-editor/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/shared/ui/tiptap-editor/components/tiptap-node/list-node/list-node.scss";
import "@/shared/ui/tiptap-editor/components/tiptap-node/image-node/image-node.scss";
import "@/shared/ui/tiptap-editor/components/tiptap-node/heading-node/heading-node.scss";
import "@/shared/ui/tiptap-editor/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Styles ---
import "./editor.scss";

import { baseToolbarExtentions } from "@/shared/ui/tiptap-editor/model/extentions";
import { CharacterCount as CharacterCountComponent } from "@/shared/ui/tiptap-editor";
import { CharacterCount } from "@tiptap/extensions";
import type { CSSProperties, ReactNode } from "react";
import { EditorToolbar, type ToolbarOptions } from "./toolbar";
import { INITIAL_CONTENT } from "@/shared/ui/tiptap-editor/consts";
import { cn } from "@/shared/lib/utils";

interface EditorProps {
	content?: Content;
	onChange?: (editor: Editor) => void;
	onMount?: (editor: Editor) => void;
	options?: { toolbar?: ToolbarOptions; limit?: number; editor?: UseEditorOptions };
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
		extensions: [...baseToolbarExtentions, CharacterCount],
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
					<CharacterCountComponent editor={editor} limit={options?.limit} />
					{children}
				</div>
				{footer && <div className={cn("mt-2")}>{footer}</div>}
			</EditorContext.Provider>
		</div>
	);
}
