import { BaseAPI } from "@/shared/api/http";
import {
  type Comment,
  type CommentListResponse,
  type SendPostCommentRequest,
  type SendCommentAnswerRequest,
  type EditCommentRequest,
} from "../model/types";

export class CommentAPI extends BaseAPI {
  static getComments(slug: string) {
    return BaseAPI.get<CommentListResponse>(`/comments/post/${slug}`);
  }

  static sendPostComment(data: SendPostCommentRequest): Promise<Comment> {
    return BaseAPI.post(`/comments/post/${data.slug}`, {
      content: data.text,
    });
  }

  static sendCommentAnswer(data: SendCommentAnswerRequest): Promise<Comment> {
    return BaseAPI.post(`/comments/${data.commentId}/reply`, {
      content: data.text,
    });
  }

  static editComment(data: EditCommentRequest): Promise<Pick<Comment, "content" | "id">> {
    return BaseAPI.post(`/comments/${data.commentId}/edit`, {
      content: data.text,
    });
  }

  static deleteComment(commentId: string) {
    return BaseAPI.delete(`/comments/${commentId}`);
  }
}
