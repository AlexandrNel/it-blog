"use client";

import { Button } from "@/shared/ui";
import type { ErrorInfo } from "next/error";

export function ErrorSubPage({ unstable_retry }: ErrorInfo) {
  return (
    <div className="text-center flex flex-col gap-1.5 items-center">
      <h3 className="font-medium leading-tight">Произошла ошибка</h3>
      <p className="text-sm text-muted-foreground">Попробуйте перезагрузить страницу</p>
      <Button onClick={() => unstable_retry()} variant={"secondary"} size={"sm"}>
        Перезагрузить
      </Button>
    </div>
  );
}
