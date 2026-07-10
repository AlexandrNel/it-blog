import { queryOptions } from "@tanstack/react-query";
import { CategoryAPI } from "./http";
import { categoryFabricKeys } from "../model/consts";

export class CategoryQueries {
  static all() {
    return queryOptions({
      queryKey: categoryFabricKeys.list(),
      queryFn: () => CategoryAPI.getAll(),
    });
  }
}
