import { CommentAPI, commentFabricKeys, type TComment } from "@/entities/comment";
import {
  type DefaultError,
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type UseEditPostCommentOptions = Omit<
  UseMutationOptions<
    Pick<TComment.Comment, "content" | "id">,
    DefaultError,
    TComment.EditCommentRequest
  >,
  "mutationFn"
>;

export const useEditPostComment = ({ onSuccess, ...rest }: UseEditPostCommentOptions = {}) => {
  const queryClient = useQueryClient();
  return useMutation<
    Pick<TComment.Comment, "content" | "id">,
    DefaultError,
    TComment.EditCommentRequest
  >({
    mutationFn: CommentAPI.editComment,
    onSuccess: (data, variables, context, options) => {
      onSuccess?.(data, variables, context, options);
      queryClient.invalidateQueries({ queryKey: commentFabricKeys.list() });
    },
    ...rest,
  });
};
