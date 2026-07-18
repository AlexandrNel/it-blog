import { profileFabricKeys } from "@/entities/profile";
import { UserAPI } from "@/entities/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: UserAPI.updateNickname,
    onSuccess: (_d, _v, _m, context) => {
      toast.success("Никнейм изменен");
      context.client.invalidateQueries({ queryKey: profileFabricKeys.settings() });
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });
};
