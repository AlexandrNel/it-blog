"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/tiptap-editor/components/tiptap-ui-primitive/button";
import { Spacer } from "@/shared/ui/tiptap-editor/components/tiptap-ui-primitive/spacer";
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
} from "@/shared/ui/tiptap-editor/components/tiptap-ui-primitive/toolbar";

// --- Tiptap UI ---

import { HeadingDropdownMenu } from "@/shared/ui/tiptap-editor/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/shared/ui/tiptap-editor/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/shared/ui/tiptap-editor/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/shared/ui/tiptap-editor/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/shared/ui/tiptap-editor/components/tiptap-ui/code-block-button";
import {
	ColorHighlightPopover,
	ColorHighlightPopoverContent,
	ColorHighlightPopoverButton,
} from "@/shared/ui/tiptap-editor/components/tiptap-ui/color-highlight-popover";
import {
	LinkPopover,
	LinkContent,
	LinkButton,
} from "@/shared/ui/tiptap-editor/components/tiptap-ui/link-popover";
import { MarkButton } from "@/shared/ui/tiptap-editor/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/shared/ui/tiptap-editor/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/shared/ui/tiptap-editor/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/shared/ui/tiptap-editor/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/shared/ui/tiptap-editor/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/shared/ui/tiptap-editor/components/tiptap-icons/link-icon";

// Hooks
import { useIsBreakpoint } from "@/shared/ui/tiptap-editor/lib/use-is-breakpoint";
import { useWindowSize } from "@/shared/ui/tiptap-editor/lib/use-window-size";
import { useCursorVisibility } from "@/shared/ui/tiptap-editor/lib/use-cursor-visibility";
import { useCurrentEditor } from "@tiptap/react";
import type { ToolType } from "@/shared/ui/tiptap-editor/model/extentions";

type ToolAvailableForExclusion = Exclude<
	ToolType,
	| "blockquote"
	| "bold"
	| "bulletList"
	| "code"
	| "codeBlock"
	| "italic"
	| "link"
	| "orderedList"
	| "strike"
	| "underline"
	| "tasklist"
	| "textAlign"
>;
export type ToolbarOptions = {
	disabled?: Partial<Record<ToolAvailableForExclusion, true>>;
	heading?: { levels: (2 | 3 | 4 | 5 | 6)[] };
};

const defaultOptions: ToolbarOptions = { heading: { levels: [2, 3, 4] } };

const MainToolbarContent = ({
	onHighlighterClick,
	onLinkClick,
	isMobile,
	options = defaultOptions,
}: {
	options?: ToolbarOptions;
	onHighlighterClick: () => void;
	onLinkClick: () => void;
	isMobile: boolean;
}) => {
	const mergeOptions = { ...defaultOptions, ...options };

	return (
		<>
			<Spacer />
			{!mergeOptions?.disabled?.undoRedo && (
				<>
					<ToolbarGroup>
						<UndoRedoButton action="undo" />
						<UndoRedoButton action="redo" />
					</ToolbarGroup>
					<ToolbarSeparator />
				</>
			)}

			<ToolbarGroup>
				{!mergeOptions?.disabled?.heading && (
					<HeadingDropdownMenu levels={mergeOptions.heading?.levels} portal={isMobile} />
				)}
				<ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} portal={isMobile} />
				<BlockquoteButton />
				<CodeBlockButton />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="bold" />
				<MarkButton type="italic" />
				<MarkButton type="strike" />
				<MarkButton type="code" />
				<MarkButton type="underline" />
				{!mergeOptions?.disabled?.highlight && (
					<>
						{!isMobile ? (
							<ColorHighlightPopover />
						) : (
							<ColorHighlightPopoverButton onClick={onHighlighterClick} />
						)}
						{!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
					</>
				)}
			</ToolbarGroup>

			{!mergeOptions?.disabled?.subscript && !mergeOptions?.disabled?.superscript && (
				<>
					<ToolbarSeparator />
					<ToolbarGroup>
						{!mergeOptions?.disabled?.subscript && <MarkButton type="superscript" />}
						{!mergeOptions?.disabled?.superscript && <MarkButton type="subscript" />}
					</ToolbarGroup>
				</>
			)}

			<ToolbarSeparator />

			<ToolbarGroup>
				<TextAlignButton align="left" />
				<TextAlignButton align="center" />
				<TextAlignButton align="right" />
				<TextAlignButton align="justify" />
			</ToolbarGroup>

			{!mergeOptions?.disabled?.image && (
				<>
					<ToolbarSeparator />

					<ToolbarGroup>
						<ImageUploadButton text="Add" />
					</ToolbarGroup>
				</>
			)}

			<Spacer />

			{isMobile && <ToolbarSeparator />}
		</>
	);
};

const MobileToolbarContent = ({
	type,
	onBack,
}: {
	type: "highlighter" | "link";
	onBack: () => void;
}) => (
	<>
		<ToolbarGroup>
			<Button data-style="ghost" onClick={onBack}>
				<ArrowLeftIcon className="tiptap-button-icon" />
				{type === "highlighter" ? (
					<HighlighterIcon className="tiptap-button-icon" />
				) : (
					<LinkIcon className="tiptap-button-icon" />
				)}
			</Button>
		</ToolbarGroup>

		<ToolbarSeparator />

		{type === "highlighter" ? <ColorHighlightPopoverContent /> : <LinkContent />}
	</>
);

export function EditorToolbar({ options }: { options?: ToolbarOptions }) {
	const { editor } = useCurrentEditor();
	const isMobile = useIsBreakpoint();
	const { height } = useWindowSize();
	const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">("main");
	const toolbarRef = useRef<HTMLDivElement>(null);
	const rect = useCursorVisibility({
		editor,
		overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
	});

	useEffect(() => {
		if (!isMobile && mobileView !== "main") {
			setMobileView("main");
		}
	}, [isMobile, mobileView]);
	return (
		<Toolbar
			ref={toolbarRef}
			style={{
				...(isMobile
					? {
							bottom: `calc(100% - ${height - rect.y}px)`,
						}
					: {}),
			}}
		>
			{mobileView === "main" ? (
				<MainToolbarContent
					options={options}
					onHighlighterClick={() => setMobileView("highlighter")}
					onLinkClick={() => setMobileView("link")}
					isMobile={isMobile}
				/>
			) : (
				<MobileToolbarContent
					type={mobileView === "highlighter" ? "highlighter" : "link"}
					onBack={() => setMobileView("main")}
				/>
			)}
		</Toolbar>
	);
}
