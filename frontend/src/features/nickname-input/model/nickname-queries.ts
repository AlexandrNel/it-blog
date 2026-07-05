import { useMutation, useQuery } from "@tanstack/react-query";
import { NicknameAPI } from "../api/nickname-api";
import { type CheckNicknameResponse, type GenerateNicknameResponse } from "../api/types";

export const useCheckNickname = ({
  username = "",
  enabled = false,
  onError,
  onSuccess,
}: {
  username?: string;
  enabled: boolean;
  onError?: (error: unknown) => void;
  onSuccess?: (data: CheckNicknameResponse) => void;
}) => {
  return useQuery<CheckNicknameResponse>({
    queryFn: async () => {
      try {
        const data = await NicknameAPI.checkNickname(username);
        onSuccess?.(data);
        return data;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
    staleTime: 1000,
    enabled: enabled && username.length > 0,
    queryKey: ["username", username],
    retry: false,
  });
};
export const useGenerateNickname = ({
  onSuccess,
}: {
  onSuccess?: (data: GenerateNicknameResponse) => void;
}) => {
  return useMutation<GenerateNicknameResponse>({
    mutationFn: () => NicknameAPI.generateNickname(),
    onSuccess,
    retry: false,
  });
};
