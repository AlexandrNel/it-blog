import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { UserAPI } from "./http";
import { userFabricKeys } from "../model/consts";

export class UserQueries {
  static getMe() {
    return queryOptions({
      queryFn: ({ signal }) => UserAPI.getMe(signal),
      queryKey: userFabricKeys.me(),
      staleTime: 60_000,
    });
  }

  static checkNickname(nickname: string) {
    return queryOptions({
      queryFn: () => UserAPI.checkNickname(nickname),
      staleTime: 300,
      queryKey: userFabricKeys.nickname(nickname),
      retry: false,
      meta: {
        skipGlobalValidationToast: true,
      },
    });
  }
}
