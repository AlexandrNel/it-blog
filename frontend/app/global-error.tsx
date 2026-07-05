"use client";
import { isApiError } from "@/shared/lib/api/api-error";
import { type ErrorProps } from "@/views/error";
import { Container } from "@/shared/ui/container";
import { Error500, UnknownError } from "@/views/error";

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen flex">
      <Container className="flex items-center justify-center">
        {isApiError(error) ? <Error500 reset={reset} error={error} /> : <UnknownError />}
      </Container>
    </main>
  );
}
