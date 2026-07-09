import { queryOptions } from "@tanstack/react-query";
import { getAllCategories } from "./http";
export function queryCategories() {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}
