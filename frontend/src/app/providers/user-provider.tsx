"use client";
import { UserContext, UserQueries } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export function UserProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useQuery(UserQueries.getMe());
  return <UserContext.Provider value={{ data, isLoading }}>{children}</UserContext.Provider>;
}
