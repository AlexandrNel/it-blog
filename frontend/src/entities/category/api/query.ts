import { queryOptions } from "@tanstack/react-query";
import { getAllCategories } from "./client";
export function queryCategories() {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}
