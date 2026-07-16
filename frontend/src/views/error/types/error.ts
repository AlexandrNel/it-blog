export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type ApiErrorProps = {
  error: Error;
  reset: () => void;
};
