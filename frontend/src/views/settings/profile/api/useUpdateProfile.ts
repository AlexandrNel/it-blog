import { ProfileAPI, type TProfile } from "@/entities/profile";
import { revalidateProfile } from "@/shared/actions/revalidate-profile";
import { type DefaultError, useMutation, type UseMutationOptions } from "@tanstack/react-query";

export type UpdateProfileVariables = TProfile.ProfileRequest & { userId: string };

export type UseUpdateProfileOptions = Omit<
  UseMutationOptions<void, DefaultError, UpdateProfileVariables>,
  "mutationFn"
>;

export const useUpdateProfile = ({ onSuccess, ...options }: UseUpdateProfileOptions = {}) => {
  return useMutation({
    mutationFn: ProfileAPI.updateProfile,
    onSuccess: async (_, vars) => revalidateProfile(vars.userId),
    ...options,
  });
};
