import { type Route } from "next";

export const routes = {
  home: (): Route => "/",
  search: (): Route => "/search",
  profile: {
    root: (): Route => "/profile",
    user: (username: string): Route => `/profile/${username}` as Route,
    about: (username: string): Route => `/profile/${username}/about` as Route,
    comments: (username: string): Route => `/profile/${username}/comments` as Route,
  },
  post: (slug: string): Route => `/posts/${slug}` as Route,
  tag: (tag: string): Route => `/tags/${tag}` as Route,
  auth: {
    login: (): Route => "/login",
    register: (): Route => "/register",
  },
  editor: {
    root: (): Route => "/editor",
    post: (slug: string): Route => `/editor/${slug}` as Route,
  },
  settings: {
    root: (): Route => "/settings",
    account: (): Route => "/settings/notifications",
    notifications: (): Route => "/settings/notifications",
    security: (): Route => "/settings/security",
  },
  api: {
    postRevalidate: (postId: string) => `/api/posts/${postId}/revalidate`,
  },
} as const;
