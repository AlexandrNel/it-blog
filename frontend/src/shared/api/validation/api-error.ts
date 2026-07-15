import { GlobalError } from "../types";

export const ERROR_CODES = {
  API_ERROR: "API_ERROR",
  UPLOAD_ERROR: "UPLOAD_ERROR",
  REDIS_ERROR: "REDIS_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  VALIDATION_FAILED: "VALIDATION_FAILED",
} as const;

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public rawResponse?: GlobalError | null,
  ) {
    super(message);
    this.name = `ApiError(${status})`;
  }
}

export class ApiParseError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = `ApiParseError`;
  }
}

export const isApiError = (error: unknown) => {
  return error instanceof ApiError;
};
