import { BaseAPI } from "@/shared/api/base-api";
import { type CommentListResponse } from "../model/types";

export class CommentAPI extends BaseAPI {
  static getComments(slug: string) {
    return BaseAPI.get<CommentListResponse>(`/comments/post/${slug}`);
  }
}
