import { useQuery } from "@tanstack/react-query";
import { SettingsAPI } from "../api/http";

export const SETTINGS_KEY = {
  all: ["settings"],
};

export const useSettings = () => {
  return useQuery({
    queryKey: SETTINGS_KEY.all,
    queryFn: SettingsAPI.getSettings,
    retry: false,
    staleTime: 1000 * 60 * 10000,
  });
};
