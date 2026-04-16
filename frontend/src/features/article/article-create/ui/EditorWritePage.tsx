"use client";

import { Container } from "@/shared/ui/container";
import { ButtonToSettings } from "./ButtonToSettings";
import { useEditorStore } from "../model/use-editor-store";
import dynamic from "next/dynamic";
import { HeadingInput } from "./HeadingInput";
import type { JSONContent } from "@tiptap/core";
import { safeParseJson } from "@/shared/lib/utils/safeParseJson";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { baseToolbarExtentions } from "@/shared/ui/tiptap-editor/model/extentions";
const Editor = dynamic(() => import("@/shared/ui/tiptap-editor/ui/Editor"), {
	ssr: false,
});

interface Props extends BaseProps {
	content?: string;
}

export function EditoWritePage({ className }: Props) {
	const setContent = useEditorStore((state) => state.setContent);
	const setLength = useEditorStore((state) => state.setLength);
	const post = useEditorStore((state) => state.post);
	const content = safeParseJson<JSONContent>(post?.content);

	return (
		<Container className={cn(className)}>
			<Editor
				key={post?.id}
				classNameContentWraper="bg-card rounded-lg"
				content={content}
				onChange={(editor) => {
					setContent(editor.getJSON());
					setLength(editor.getText().length);
				}}
				header={<HeadingInput />}
			>
				<div className="p-4">
					<ButtonToSettings />
				</div>
			</Editor>
		</Container>
	);
}
