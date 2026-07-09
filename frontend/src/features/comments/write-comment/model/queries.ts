import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WriteCommentAPI } from "../api/http";

export const useSendCommentAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: WriteCommentAPI.sendCommentAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};
export const useSendPostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: WriteCommentAPI.sendPostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};
