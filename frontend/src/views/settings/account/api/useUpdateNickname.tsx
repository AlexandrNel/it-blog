import { profileFabricKeys } from "@/entities/profile";
import { UserAPI, userFabricKeys } from "@/entities/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: UserAPI.updateNickname,
    onSuccess: async (_d, _v, _m, context) => {
      toast.success("Никнейм изменен");
      await Promise.all([
        context.client.invalidateQueries({ queryKey: profileFabricKeys.settings() }),
        context.client.invalidateQueries({ queryKey: userFabricKeys.me() }),
      ]);
    },
    meta: {
      skipGlobalValidationToast: true,
    },
  });
};
