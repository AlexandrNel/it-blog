"use client";
import { createContext } from "react";
import type { UserResponse } from "./types";

export const UserContext = createContext<
  | {
      data?: UserResponse;
      isLoading: boolean;
    }
  | null
  | undefined
>(null);
