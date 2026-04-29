"use client";
import type { Comment } from "@/entities/comment";
import { CommentCard } from "@/entities/comment";
import { CommentBranch } from "@/entities/comment/";
import { CommentButton } from "@/entities/comment/";
import { WriteCommentEditor } from "@/features/comments/write-comment";
import { Row } from "@/shared/ui/layout";
import { Button } from "@/shared/ui/button";
import { Activity, memo, type PropsWithChildren } from "react";
import { DeleteCommentButton } from "@/features/comments/delete-comment";
import { useCommentLifecycle } from "../model/useCommentLifecycle";
import { EditComment } from "@/features/comments/edit-comment";
import { useAuthStore } from "@/entities/auth";

type Props = {
	level?: number;
	comment: Comment;
};

export const WrappedCommentCard = memo(({ comment, level = 0 }: PropsWithChildren<Props>) => {
	const user = useAuthStore((state) => state.user);
	const {
		isRepliesShowed,
		editorMode,
		isEditorShowed,
		handleHideOrShowTree,
		showRepliesAndEditor,
		hideEditor,
		commentLength,
	} = useCommentLifecycle(comment);
	const isCommentAuthor = comment.author.id === user?.id;
	return (
		<CommentCard comment={comment}>
			<Row>
				{commentLength > 0 && (
					<CommentButton variant={"primary"} onClick={handleHideOrShowTree}>
						{isRepliesShowed ? "Скрыть" : `${commentLength} ответа`}
					</CommentButton>
				)}
				<CommentButton onClick={() => showRepliesAndEditor("write")}>Ответить</CommentButton>
				{isCommentAuthor && (
					<CommentButton onClick={() => showRepliesAndEditor("edit")}>Изменить</CommentButton>
				)}
				<DeleteCommentButton userId={comment.author.id} commentId={comment.id} />
			</Row>

			<CommentEditor
				editorMode={editorMode}
				hideEditor={hideEditor}
				isEditorShowed={isEditorShowed}
				length={commentLength}
				comment={comment}
			/>

			<CommentReplies comment={comment} level={level} isRepliesShowed={isRepliesShowed} />
		</CommentCard>
	);
});

type CommentEditorProps = Pick<Props, "comment"> & {
	length: number;
	isEditorShowed: boolean;
	editorMode: "edit" | "write";
	hideEditor: () => void;
};

// Компонент с редактором и кнопками

const CommentEditor = memo(
	({ comment, isEditorShowed, length, editorMode, hideEditor }: CommentEditorProps) => {
		if (!isEditorShowed) return null;
		return (
			<div className="flex">
				<CommentBranch isLast={!length} />
				{editorMode === "write" ? (
					<WriteCommentEditor
						entityId={comment.id}
						entityType="comment"
						className="pt-2 pb-1"
						onSuccess={hideEditor}
					>
						<Button variant={"secondary"} onClick={hideEditor}>
							Отмена
						</Button>
					</WriteCommentEditor>
				) : (
					<EditComment
						content={comment.content}
						entityId={comment.id}
						className="pt-2 pb-1"
						onSuccess={hideEditor}
					>
						<Button variant={"secondary"} onClick={hideEditor}>
							Отмена
						</Button>
					</EditComment>
				)}
			</div>
		);
	},
);

type CommentRepliesProps = Required<Pick<Props, "comment" | "level">> & {
	isRepliesShowed: boolean;
};

// Компонент с рекурсивной отрисовкой вложенных комментариев (ответов к комментарию)

const CommentReplies = memo(({ comment, level, isRepliesShowed }: CommentRepliesProps) => {
	return (
		<Activity mode={isRepliesShowed ? "visible" : "hidden"}>
			{comment.replies.map((c, i, arr) => {
				const isLast = i === arr.length - 1;
				return (
					<div className="flex" key={c.id}>
						<CommentBranch isLast={isLast} />
						<WrappedCommentCard comment={c} level={level + 1} />
					</div>
				);
			})}
		</Activity>
	);
});
