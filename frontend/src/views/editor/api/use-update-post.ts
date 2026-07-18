import { PostAPI, type TPost } from "@/entities/post";
import { revalidatePost } from "@/shared/actions/revalidate-post";
import { type DefaultError, useMutation, type UseMutationOptions } from "@tanstack/react-query";

type CreatePostVariables = {
  postId: string;
  postSlug: string;
  body: TPost.PostRequest;
};

export type UseCreatePostOptions = Omit<
  UseMutationOptions<TPost.Post, DefaultError, CreatePostVariables>,
  "mutationFn"
>;

export const useUpdatePost = () => {
  return useMutation<TPost.Post, DefaultError, CreatePostVariables>({
    mutationFn: ({ postId, body }) => PostAPI.updatePost(postId, body),
    onSuccess: (_, vars) => {
      revalidatePost(vars.postSlug);
    },
  });
};
