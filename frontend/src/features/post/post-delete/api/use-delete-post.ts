import { type Post, PostAPI } from "@/entities/post";
import { revalidateSitemap } from "@/shared/actions/revalidate-sitemap";
import { type ApiError } from "@/shared/api";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export type UseDeletePostOptions = Omit<UseMutationOptions<Post, ApiError, string>, "mutationFn">;

export const useDeletePost = ({ onSuccess, ...options }: UseDeletePostOptions = {}) => {
  return useMutation({
    mutationFn: PostAPI.deletePost,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      revalidateSitemap();
    },
    ...options,
  });
};
