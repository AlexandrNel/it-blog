import { type ApiError } from "@/shared/api";
import { type TPost, PostAPI } from "@/entities/post";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { revalidatePost } from "@/shared/actions/revalidate-post";

export type UseCreatePostOptions = Omit<
  UseMutationOptions<TPost.Post, ApiError, TPost.PostRequest>,
  "mutationFn"
>;

export const useCreatePost = ({ onSuccess, ...options }: UseCreatePostOptions = {}) => {
  return useMutation({
    mutationFn: PostAPI.createPost,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
      revalidatePost(data.slug);
    },
    ...options,
  });
};
