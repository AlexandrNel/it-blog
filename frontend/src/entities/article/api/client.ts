import type { Post } from "@/entities/article";
import type { PostRequest } from "./types";
import { BaseAPI } from "@/shared/api/base-api";

export class PostAPI extends BaseAPI {
	static createPost(postData: PostRequest): Promise<Post> {
		return BaseAPI.post<Post>("/posts", postData);
	}
	static updatePost(postData: PostRequest, id: string): Promise<Post> {
		return BaseAPI.patch<Post>(`/posts/${id}`, postData);
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
}
