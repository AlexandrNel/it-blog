import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("fullName").isLength({ min: 3 }),
  body("password").isLength({ min: 5 }),
  body("imageUrl").optional().isURL(),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const createPostValidation = [
  body("title").isLength({ min: 3 }).isString(),
  body("text").isLength({ min: 3 }).isString(),
  body("tags").optional().isArray(),
  body("imageUrl").optional().isString(),
];
export const createComment = [body("comments").optional().isArray()];
