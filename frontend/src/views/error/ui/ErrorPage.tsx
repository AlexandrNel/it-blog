import { isApiError } from "@/shared/api/api-error";
import { Container } from "@/shared/ui/container";
import { type ErrorProps } from "../types/error";
import { Error500 } from "./Error500";
import { UnknownError } from "./UnknownError";

export function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <Container className="flex items-center justify-center">
      {isApiError(error) ? <Error500 reset={reset} error={error} /> : <UnknownError />}
    </Container>
  );
}
