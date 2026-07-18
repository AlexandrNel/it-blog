import { CommentAPI, commentFabricKeys } from "@/entities/comment";
import {
  type DefaultError,
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type UseDeleteCommentOptions = Omit<
  UseMutationOptions<unknown, DefaultError, string>,
  "mutationFn"
>;

export const useDeleteComment = ({ onSuccess, ...rest }: UseDeleteCommentOptions = {}) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, DefaultError, string>({
    mutationFn: CommentAPI.deleteComment,
    onSuccess: (data, variables, context, options) => {
      onSuccess?.(data, variables, context, options);
      queryClient.invalidateQueries({ queryKey: commentFabricKeys.list() });
    },
    ...rest,
  });
};
