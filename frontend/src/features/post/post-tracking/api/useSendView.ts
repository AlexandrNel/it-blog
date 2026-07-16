import { PostAPI, TPost } from "@/entities/post";
import { DefaultError, useMutation, type UseMutationOptions } from "@tanstack/react-query";

export type UseSendViewOptions = Omit<UseMutationOptions<TPost.SendViewResponse, DefaultError, string>, "mutationFn">;

export const useSendView = ({ ...options }: UseSendViewOptions = {}) => {
  return useMutation({
    mutationFn: PostAPI.sendView,
    ...options,
  });
};
