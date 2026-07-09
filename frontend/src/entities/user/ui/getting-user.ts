"use client";
import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "../api/queries";

export function GettingUser() {
  useQuery(UserQueries.getMe());
  return null;
}
