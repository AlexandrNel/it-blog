export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public rawResponse?: ApiErrorResponse | null,
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

export type ApiErrorType = {
  message: string;
  errors?: Record<string, string | string[]>;
};

export type BackendError = {
  message: string;
};
export type BackendFormsError = BackendError & {
  errors?: Record<string, string | string[]>;
};
export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string | string[]>;
  detail?: string;
  code?: string;
}

export const isApiError = (error: unknown) => {
  return error instanceof ApiError;
};

export function isBackendError<T = unknown>(data: T | BackendError): data is BackendError {
  return !!data && typeof data === "object" && "message" in data;
}
