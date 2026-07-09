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

export type PostRequest = {
  content: string;
  previewContent: string;
  previewImage: Post["previewImage"];
  title: string;
  desc: string;
  tagIds: string[];
  categoryId: string;
};

export type ResponsePaginationDto<T> = {
  data: T;
  pages: number;
};

export type PostDto = Post;

export type PostWithStatisticDto = PostDto & { statistic: Statistic };
