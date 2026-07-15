import { ERROR_CODES } from "./validation/api-error";

type ApiErrorCode = keyof typeof ERROR_CODES;

export type GlobalError = {
  message: string;
  code: ApiErrorCode;
  errors?: Record<string, Array<string>>;
};
