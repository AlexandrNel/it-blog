import type { User } from "@/entities/user";

export type Author = Pick<User, "id" | "email" | "username" | "avatar" | "displayName">;
