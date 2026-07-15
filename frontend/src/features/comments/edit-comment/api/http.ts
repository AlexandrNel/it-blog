import { type Comment } from "@/entities/comment";
import { BaseAPI } from "@/shared/api/http";

export class EditCommentAPI extends BaseAPI {
  static editComment(data: { commentId: string; text: string }): Promise<Pick<Comment, "content" | "id">> {
    return BaseAPI.post(`/comments/${data.commentId}/edit`, {
      content: data.text,
    });
  }
}
