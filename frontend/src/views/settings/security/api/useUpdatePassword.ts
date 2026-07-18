import { UserAPI } from "@/entities/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: UserAPI.updatePassword,
  });
};
