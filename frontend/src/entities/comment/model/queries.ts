import { useQuery } from "@tanstack/react-query";
import { CommentAPI } from "../api/http";
import { type Comment } from "./comment";

export const usePostComments = (slug: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: () => CommentAPI.getPostCommentsByPostSlug(slug),
  });
};
