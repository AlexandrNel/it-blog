import { useMutation } from "@tanstack/react-query";
import { SecuritySettingsAPI } from "../api/security-api";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: SecuritySettingsAPI.updatePassword,
  });
};
