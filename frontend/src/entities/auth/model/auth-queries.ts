import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../api/client";

export const useLogout = () => {
  return useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: () => {
      window.location.reload();
    },
  });
};
