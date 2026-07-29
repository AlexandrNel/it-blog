import { ProfileAPI, profileFabricKeys, type TProfile } from "@/entities/profile";
import { userFabricKeys } from "@/entities/user";
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
    onSuccess: async (d, vars, m, context) => {
      onSuccess?.(d, vars, m, context);
      await revalidateProfile(vars.userId);
      await Promise.all([
        context.client.invalidateQueries({ queryKey: profileFabricKeys.settings() }),
        context.client.invalidateQueries({ queryKey: userFabricKeys.me() }),
      ]);
    },
    ...options,
  });
};
