import type { Post } from "@/entities/article";
import type { Author } from "@/entities/author";

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
