import type { User } from "~/generated/prisma/client.js";

export class UserDto {
    name;
    email;
    id;
    avatar;
    role
    createdAt
    updatedAt

    constructor(model: User) {
        this.email = model.email
        this.id = model.id
        this.name = model.name
        this.avatar = model.avatar
        this.role = model.role
        this.createdAt = model.createdAt
        this.updatedAt = model.updatedAt
    }
}