// --- Статические роуты ---

export const HOME = "/";
export const SEARCH = "/search";
export const PROFILE = "/profile";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const EDITOR = "/editor";
export const SETTINGS = "/settings";
export const SETTINGS_ACCOUNT = `${SETTINGS}/account`;
export const SETTINGS_NOTIFICATIONS = `${SETTINGS}/notifications`;
export const SETTINGS_SECURITY = `${SETTINGS}/security`;

// --- Динамические роуты ---

export const PROFILE_USER = (username: string) => `${PROFILE}/${username}`;
export const PROFILE_USER_ABOUT = (username: string) => `${PROFILE_USER(username)}/about`;
export const PROFILE_USER_COMMENTS = (username: string) => `${PROFILE_USER(username)}/comments`;

export const ARTICLE = (slug: string) => `/articles/${slug}`;

export const TAG = (tagKey: string) => `/tags/${tagKey}`;

export const EDITOR_POST = (slug: string) => `${EDITOR}/${slug}`;

export const API_POST_REVALIDATE = (postId: string) => `/api/posts/${postId}/revalidate`;

export const HOME_PAGE = (page: number) => (page <= 1 ? HOME : `${HOME}?page=${page}`);

// --- Сводный объект ---

export const ROUTES = {
  home: HOME,
  search: SEARCH,
  profile: {
    root: PROFILE,
    user: PROFILE_USER,
    about: PROFILE_USER_ABOUT,
    comments: PROFILE_USER_COMMENTS,
  },
  article: ARTICLE,
  tag: TAG,
  auth: {
    login: LOGIN,
    register: REGISTER,
  },
  editor: {
    root: EDITOR,
    post: EDITOR_POST,
  },
  settings: {
    root: SETTINGS,
    account: SETTINGS_ACCOUNT,
    notifications: SETTINGS_NOTIFICATIONS,
    security: SETTINGS_SECURITY,
  },
  api: {
    postRevalidate: API_POST_REVALIDATE,
  },
  feed: {
    page: HOME_PAGE,
  },
} as const;
