import { queryOptions, useQuery } from "@tanstack/react-query";
import { SettingsAPI } from "./http";
import { settingsFabricKeys } from "../model/consts";

export class SettingsQueries {
  static all() {
    return queryOptions({
      queryKey: settingsFabricKeys.list(),
      queryFn: () => SettingsAPI.getSettings(),
      retry: false,
      staleTime: 1000 * 60 * 10,
    });
  }
}

export const useSettings = () => {
  return useQuery(SettingsQueries.all());
};
