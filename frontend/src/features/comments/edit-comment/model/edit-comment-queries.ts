import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditCommentAPI } from "../api/client";

export const useEditPostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EditCommentAPI.editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};
