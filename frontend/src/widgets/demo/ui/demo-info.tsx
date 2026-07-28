"use client";

import { Button, Card, CardContent } from "@/shared/ui";
import { Clock5, LockKeyholeOpen } from "lucide-react";
import { useUser } from "@/entities/user";
import { useCreateDemoUser } from "../api/useCreateDemoUser";

export function DemoInfo() {
  const { data: user, isLoading } = useUser();
  const { mutateAsync, isPending } = useCreateDemoUser();

  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          {/* <div className="rounded-lg p-2  text-blue-100 bg-blue-900">
            <Rocket size={16} />
          </div> */}
          <p className="text-base text-foreground font-medium">Демо-режим</p>
        </div>
        <p className="text-sm  text-muted-foreground">
          Готовый аккаунт с тестовыми статьями и комментариями. Без регистрации.
        </p>
        <p className="text-sm  text-muted-foreground flex gap-2 items-center">
          <Clock5 size={14} />
          <span>Данные хранятся 24 часа</span>
        </p>
        <p className="text-sm  text-muted-foreground flex gap-2 items-center">
          <LockKeyholeOpen size={14} />
          <span>Доступны все функции</span>
        </p>
        <Button
          onClick={() => {
            mutateAsync();
          }}
          disabled={isLoading || isPending || !!user}
        >
          Попробовать демо
        </Button>
      </CardContent>
    </Card>
  );
}
