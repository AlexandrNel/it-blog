import { useQuery } from "@tanstack/react-query";
import { CommentAPI } from "../api/client";
import type { Comment } from "./comment";

export const usePostComments = (postId: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: () => CommentAPI.getPostComments(postId),
  });
};
