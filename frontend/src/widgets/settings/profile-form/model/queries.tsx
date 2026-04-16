import { useMutation } from "@tanstack/react-query";
import { ProfileSettingsAPI } from "../api/profile-api";
import { SETTINGS_KEY } from "@/entities/settings";
import { updateProfile } from "@/shared/actions/update-profile";

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: ProfileSettingsAPI.updateProfile,
		onSuccess: async () => updateProfile(),
		mutationKey: SETTINGS_KEY.all,
	});
};
