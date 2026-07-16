import { Container } from "@/shared/ui/container";
import { type ErrorProps } from "../types/error";
import { Error500 } from "./Error500";
import { UnknownError } from "./UnknownError";
import { isAxiosError } from "axios";

export function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <Container className="flex items-center justify-center">
      {isAxiosError(error) ? <Error500 reset={reset} error={error} /> : <UnknownError />}
    </Container>
  );
}
