import { type GenerateNicknameResponse, type TUser, UserAPI } from "@/entities/user";
import { type DefaultError, useMutation, type UseMutationOptions } from "@tanstack/react-query";

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
