import jwt from "jsonwebtoken";
import { config } from "~/config/index.js";
import type { TokenPayload } from "~/types/jwt.js";

export const signToken = (payload: TokenPayload) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

export const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(token, config.jwt.secret);
        if (payload && typeof payload === "object" && "id" in payload) {
            return { id: payload.id as string }
        }
        return null
    } catch (err) {
        return null;
    }
};