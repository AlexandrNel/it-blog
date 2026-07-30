import { CommentAPI, commentFabricKeys, type TComment } from "@/entities/comment";
import {
  type DefaultError,
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type UseSendPostCommentOptions = Omit<
  UseMutationOptions<TComment.Comment, DefaultError, TComment.SendPostCommentRequest>,
  "mutationFn"
>;

export const useSendPostComment = ({ onSuccess, ...rest }: UseSendPostCommentOptions = {}) => {
  const queryClient = useQueryClient();
  return useMutation<TComment.Comment, DefaultError, TComment.SendPostCommentRequest>({
    mutationFn: CommentAPI.sendPostComment,
    onSuccess: (data, variables, context, options) => {
      onSuccess?.(data, variables, context, options);
      queryClient.invalidateQueries({ queryKey: commentFabricKeys.list() });
    },
    ...rest,
  });
};

export type UseSendCommentAnswerOptions = Omit<
  UseMutationOptions<TComment.Comment, DefaultError, TComment.SendCommentAnswerRequest>,
  "mutationFn"
>;

export const useSendCommentAnswer = ({ onSuccess, ...rest }: UseSendCommentAnswerOptions = {}) => {
  const queryClient = useQueryClient();
  return useMutation<TComment.Comment, DefaultError, TComment.SendCommentAnswerRequest>({
    mutationFn: CommentAPI.sendCommentAnswer,
    onSuccess: (data, variables, context, options) => {
      onSuccess?.(data, variables, context, options);
      queryClient.invalidateQueries({ queryKey: commentFabricKeys.list() });
    },
    ...rest,
  });
};
