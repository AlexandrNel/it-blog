import { queryOptions } from "@tanstack/react-query";
import { PostAPI } from "./http";
import { postFabricKeys } from "../model/consts";

export class PostQueries {
  static byId(id: string) {
    return queryOptions({
      queryFn: () => PostAPI.getPostById(id),
      queryKey: postFabricKeys.detail(id),
    });
  }

  static byUser(userId: string) {
    return queryOptions({
      queryFn: () => PostAPI.getPostsByUser(userId),
      queryKey: postFabricKeys.byUser(userId),
    });
  }
}
