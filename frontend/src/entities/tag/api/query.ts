import { queryOptions } from "@tanstack/react-query";
import { getTagListClient } from "./client";
export function queryTags() {
  return queryOptions({
    queryKey: ["tags"],
    queryFn: getTagListClient,
  });
}
