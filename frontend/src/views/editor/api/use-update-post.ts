import { PostAPI, type TArticle } from "@/entities/article";
import { revalidatePost } from "@/shared/actions/revalidate-post";
import { type ApiError } from "@/shared/api";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type CreatePostVariables = {
  postId: string;
  postSlug: string;
  body: TArticle.PostRequest;
};

export type UseCreatePostOptions = Omit<
  UseMutationOptions<TArticle.Post, ApiError, CreatePostVariables>,
  "mutationFn"
>;

export const useUpdatePost = () => {
  return useMutation<TArticle.Post, ApiError, CreatePostVariables>({
    mutationFn: ({ postId, body }) => PostAPI.updatePost(postId, body),
    onSuccess: (_, vars) => {
      revalidatePost(vars.postSlug);
    },
  });
};
