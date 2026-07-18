"use client";

import { Container } from "@/shared/ui/container";
import { ErrorTemplate } from "@/views/error";
import { ErrorInfo } from "next/error";

export default function ErrorPage({ error }: ErrorInfo) {
  return (
    <Container className="flex items justify-center">
      <ErrorTemplate title={error.message} text={""} />
    </Container>
  );
}
