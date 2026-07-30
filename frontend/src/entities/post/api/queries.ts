import { queryOptions } from "@tanstack/react-query";
import { PostAPI } from "./http";
import { postFabricKeys } from "../model/consts";

export class PostQueries {
  static getPostById(userId: string) {
    return queryOptions({
      queryFn: () => PostAPI.getPostById(userId),
      queryKey: postFabricKeys.detail(userId),
    });
  }

  static getPostsByUser(userId: string) {
    return queryOptions({
      queryFn: () => PostAPI.getPostsByUser(userId),
      queryKey: postFabricKeys.byUser(userId),
    });
  }
}
