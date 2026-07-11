import { queryOptions } from "@tanstack/react-query";
import { TagAPI } from "./http";
import { tagFabricKeys } from "../model/consts";

export class TagQueries {
  static all() {
    return queryOptions({
      queryKey: tagFabricKeys.list(),
      queryFn: () => TagAPI.getAll(),
    });
  }
}
