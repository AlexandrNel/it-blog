import { queryOptions } from "@tanstack/react-query";
import { CommentAPI } from "./http";
import { commentFabricKeys } from "../model/consts";

export class CommentQueries {
  static byPost(slug: string) {
    return queryOptions({
      queryKey: commentFabricKeys.list(slug),
      queryFn: () => CommentAPI.getComments(slug),
    });
  }
}
