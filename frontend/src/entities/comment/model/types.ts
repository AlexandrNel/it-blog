import { type Post } from "@/entities/post";
import { type Author } from "@/entities/user";

export type Comment = {
  id: string;
  postId: string;
  author: Author;
  content: string;
  parentId: string | null;
  replies: Comment[];
};

export type ProfileComment = Comment & {
  post: Pick<Post, "id" | "slug" | "title">;
};

export type CommentListResponse = Comment[];

export type ProfileCommentListResponse = ProfileComment[];
