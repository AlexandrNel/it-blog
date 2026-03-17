import type { User } from "~/generated/prisma/client.js";

export class UserDto {
  email;
  id;
  role;
  nickname;
  avatar;
  createdAt;
  updatedAt;
  isBlocked;
  pendingEmail;

  constructor(model: User, avatar?: string | null) {
    this.id = model.id;
    this.avatar = avatar ?? "";
    this.email = model.email;
    this.pendingEmail = model.pendingEmail;
    this.role = model.role;
    this.nickname = model.nickname;
    this.isBlocked = model.isBlocked;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
export class AuthorDto {
  id;
  email;
  nickname;
  avatar;

  constructor(model: User, avatar?: string | null) {
    this.id = model.id;
    this.email = model.email;
    this.nickname = model.nickname;
    this.avatar = avatar ?? "";
  }
}
