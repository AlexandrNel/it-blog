import { queryOptions } from "@tanstack/react-query";
import { UserAPI } from "./client";
import { userFabricKeys } from "../model/consts";

export class UserQueries {
  static getMe() {
    return queryOptions({
      queryFn: ({ signal }) => UserAPI.getMe(signal),
      queryKey: userFabricKeys.me(),
      staleTime: 60_000,
      retry: 2,
    });
  }
}
