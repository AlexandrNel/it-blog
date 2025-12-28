import jwt from "jsonwebtoken";
import { config } from "~/config/index.js";
import type { User } from "~/generated/prisma/client.js";
import type { TokenPayload } from "~/types/jwt.js";

export const signToken = (payload: TokenPayload) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

export const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(token, config.jwt.secret);
        if (!payload) {
            return null
        }
        return payload as jwt.JwtPayload & TokenPayload
    } catch (err) {
        return null;
    }
};