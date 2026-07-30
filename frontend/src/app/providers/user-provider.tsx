"use client";
import { UserContext, UserQueries } from "@/entities/user";
import { useLogout } from "@/features/auth/logout";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect, type PropsWithChildren } from "react";

export function UserProvider({ children }: PropsWithChildren) {
  const { data, isLoading, error } = useQuery(UserQueries.getMe());
  const logout = useLogout({
    meta: { skipGlobalErrorToast: true, skipGlobalValidationToast: true },
  });
  useEffect(() => {
    if (isAxiosError(error)) {
      if (error.status && error.status > 403) {
        logout.mutate();
      }
    }
  }, [error, logout.mutate]);
  return <UserContext.Provider value={{ data, isLoading }}>{children}</UserContext.Provider>;
}
