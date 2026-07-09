import { type Post, type Statistic } from "@/entities/article";
import { type PostRequest } from "./types";
import { BaseAPI } from "@/shared/api/base-api";

export class PostAPI extends BaseAPI {
  static createPost(data: PostRequest): Promise<Post> {
    return BaseAPI.post<Post>("/posts", { data });
  }
  static updatePost(data: PostRequest, id: string): Promise<Post> {
    return BaseAPI.patch<Post>(`/posts/${id}`, { data });
  }
  static deletePost(id: string): Promise<Post> {
    return BaseAPI.delete<Post>(`/posts/${id}`);
  }
  static getPostById(id: string) {
    return BaseAPI.get(`/posts/id/${id}`);
  }
  static getPostsByUser(_userId: string): Promise<[]> {
    return new Promise((res) => res([]));
    // return BaseAPI.get(`/posts/user/${userId}`);
  }
  static getStatistic(postId: string): Promise<Statistic> {
    return BaseAPI.get<Statistic>(`/posts/${postId}/statistic`);
  }
  static sendLike(postId: string) {
    return BaseAPI.post(`/posts/${postId}/like`);
  }
  static sendDislike(postId: string) {
    return BaseAPI.post(`/posts/${postId}/dislike`);
  }
}
