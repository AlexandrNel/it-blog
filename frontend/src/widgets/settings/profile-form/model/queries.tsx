import { useMutation } from "@tanstack/react-query";
import { ProfileSettingsAPI } from "../api/profile-api";
import { SETTINGS_KEY } from "@/entities/settings";
import { revalidateProfile } from "@/shared/actions/revalidate-profile";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: ProfileSettingsAPI.updateProfile,
    onSuccess: async (_, vars) => revalidateProfile(vars.userId),
    mutationKey: SETTINGS_KEY.all,
  });
};
