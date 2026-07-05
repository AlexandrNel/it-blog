import { type ApiError } from "@/shared/lib/api/api-error";

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type ApiErrorProps = {
  error: ApiError;
  reset: () => void;
};
