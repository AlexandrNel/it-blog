export type Author = Pick<UserResponse, "id" | "email" | "username" | "avatar" | "displayName">;

export type UserResponse = {
  id: string;
  email: string;
  avatar?: string;
  displayName: string;
  username: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  createdAt: string;
  updatedAt: string;
};

export type GenerateNicknameResponse = { username: string };
export type CheckNicknameResponse = { isAvailable: boolean };

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateUsernameRequest = {
  username: string;
};
