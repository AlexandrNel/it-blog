import { queryOptions } from "@tanstack/react-query";
import { getTagListClient } from "./http";
export function queryTags() {
  return queryOptions({
    queryKey: ["tags"],
    queryFn: getTagListClient,
  });
}
