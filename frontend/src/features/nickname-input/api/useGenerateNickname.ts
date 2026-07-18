import { GenerateNicknameResponse, TUser, UserAPI } from "@/entities/user";
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query";

export type UseGenerateNicknameOptions = Omit<
  UseMutationOptions<TUser.GenerateNicknameResponse, DefaultError>,
  "mutationFn"
>;

export const useGenerateNickname = (options: UseGenerateNicknameOptions = {}) => {
  return useMutation<GenerateNicknameResponse>({
    mutationFn: UserAPI.generateNickname,
    ...options,
    meta: { skipGlobalValidationToast: true },
  });
};
