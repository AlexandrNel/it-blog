"use client";

import { Container } from "@/shared/ui/container";
import { type ApiErrorProps, ErrorTemplate, type ErrorProps } from "@/views/error";

export default function ErrorView({ error }: ErrorProps | ApiErrorProps) {
  return (
    <Container className="flex items justify-center">
      <ErrorTemplate title={error.message} text={""} />
    </Container>
  );
}
