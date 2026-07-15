import { type ApiError } from "@/shared/api";

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type ApiErrorProps = {
  error: ApiError;
  reset: () => void;
};
