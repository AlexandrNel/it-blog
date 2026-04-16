import { BaseAPI } from "@/shared/api/base-api";
import type { Comment } from "../model/comment";

export class CommentAPI extends BaseAPI {
  static getPostComments(postId: string): Promise<Comment[]> {
    return BaseAPI.get<Comment[]>(`/comments/post/${postId}`);
  }
}
