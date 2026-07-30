import { isAxiosError } from "axios";
import type { GlobalError } from "../types";
import { ERROR_CODES } from "./api-error";

export type FieldErrors = GlobalError["errors"];

export function getFieldErrors(error: unknown): FieldErrors | null {
  if (isAxiosError<GlobalError>(error) && error.response?.data.errors) {
    return error.response?.data.errors;
  }
  return null;
}

export function getErrorMessage(error: unknown) {
  if (
    isAxiosError<GlobalError>(error) &&
    error.response?.data.code === ERROR_CODES.API_ERROR &&
    error.response?.data.message
  ) {
    return error.response?.data.message;
  }
  return undefined;
}
