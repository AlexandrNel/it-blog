import { type Post, type Statistic } from "../model/post";

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
