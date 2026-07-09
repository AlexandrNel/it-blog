import { PostAPI, type TPost } from "@/entities/post";
import { revalidatePost } from "@/shared/actions/revalidate-post";
import { type ApiError } from "@/shared/api";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type CreatePostVariables = {
  postId: string;
  postSlug: string;
  body: TPost.PostRequest;
};

export type UseCreatePostOptions = Omit<
  UseMutationOptions<TPost.Post, ApiError, CreatePostVariables>,
  "mutationFn"
>;

export const useUpdatePost = () => {
  return useMutation<TPost.Post, ApiError, CreatePostVariables>({
    mutationFn: ({ postId, body }) => PostAPI.updatePost(postId, body),
    onSuccess: (_, vars) => {
      revalidatePost(vars.postSlug);
    },
  });
};
