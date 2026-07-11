import { type ProfileConnectionKind } from "@/entities/profile";

export const modalLables: Record<
  ProfileConnectionKind,
  { title: string; empty: string; description: string }
> = {
  followers: {
    title: "Подписчики",
    empty: "Нет подписчиков",
    description: "Люди, которые подписаны на этот профиль.",
  },
  following: {
    title: "Подписки",
    empty: "Нет подписок",
    description: "Профили, на которые подписан этот пользователь.",
  },
};
