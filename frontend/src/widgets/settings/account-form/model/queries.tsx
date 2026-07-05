import { useMutation } from "@tanstack/react-query";
import { AccountAPI } from "../api/account-api";

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: AccountAPI.updateNickname,
    mutationKey: ["settings"],
  });
};
