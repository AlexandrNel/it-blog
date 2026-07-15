import { isAxiosError } from "axios";
import { GlobalError } from "../types";

export type FieldErrors = GlobalError["errors"];

export function getFieldErrors(error: unknown): FieldErrors | null {
  if (isAxiosError<GlobalError>(error) && error.response?.data.errors) {
    return error.response?.data.errors;
  }
  return null;
}
