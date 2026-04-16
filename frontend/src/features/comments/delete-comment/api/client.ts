import { BaseAPI } from "@/shared/api/base-api";

export class DeleteCommentAPI extends BaseAPI {
  static deleteComment(commentId: string) {
    return BaseAPI.delete(`/comments/${commentId}`);
  }
}
