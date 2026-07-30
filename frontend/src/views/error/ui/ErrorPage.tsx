import { Container } from "@/shared/ui/container";
import { Error500 } from "./Error500";
import { UnknownError } from "./UnknownError";
import { isAxiosError } from "axios";
import type { ErrorInfo } from "next/error";

export function ErrorPage({ error, ...props }: ErrorInfo) {
  return (
    <Container className="flex items-center justify-center">
      {isAxiosError(error) ? <Error500 error={error} {...props} /> : <UnknownError />}
    </Container>
  );
}
