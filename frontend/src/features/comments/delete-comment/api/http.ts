import { BaseAPI } from "@/shared/api/http";

export class DeleteCommentAPI extends BaseAPI {
  static deleteComment(commentId: string) {
    return BaseAPI.delete(`/comments/${commentId}`);
  }
}
