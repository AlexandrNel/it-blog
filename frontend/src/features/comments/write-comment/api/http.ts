import { BaseAPI } from "@/shared/api/base-api";
import { type SendCommentAnswer, type SendPostCommentRequest } from "./types";
import { type Comment } from "@/entities/comment";

export class WriteCommentAPI extends BaseAPI {
  static sendPostComment(data: SendPostCommentRequest): Promise<Comment> {
    return BaseAPI.post(`/comments/post/${data.slug}`, {
      content: data.text,
    });
  }
  static sendCommentAnswer(data: SendCommentAnswer): Promise<Comment> {
    return BaseAPI.post(`/comments/${data.commentId}/reply`, {
      content: data.text,
    });
  }
}
