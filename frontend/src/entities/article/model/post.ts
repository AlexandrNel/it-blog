import { type Author } from "@/entities/user";
import { type Category } from "@/entities/category/@x/article";
import { type TypeTag } from "@/entities/tag/@x/article";

export type Comment = {
  id: string;
  autor: Author;
  content: string;
  parentComment: string[];
  createdAt: string;
  updatedAt: string;
};

export type Statistic = {
  votes: {
    likes: number;
    dislikes: number;
    userVote: -1 | 1 | null;
  };
  comments: number;
  views: number;
};

export type Post = {
  id: string;
  tags: TypeTag[];
  category: Category;
  slug: string;
  imageUrl: string;
  previewContent: string;
  previewImage: { url: string; position: { x: number; y: number } } | null;
  content: string;
  desc: string;
  title: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
};

export type SortParams = {
  sort: "newest" | "rating" | "relevance";
};
export type DateParams = {
  date: "all" | "day" | "week" | "month" | "year";
};
export type FilterParams = {
  title: "1" | null;
};

export type PostWithStatistic = Post & { statistic: Statistic };
