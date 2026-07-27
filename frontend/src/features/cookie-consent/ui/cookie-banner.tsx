"use client";

import { Button, Card, CardAction, CardContent } from "@/shared/ui";
import { useEffect, useState } from "react";

import { classNames } from "@/shared/lib/utils";

const STORAGE_KEY = "cookie-accepted";

export function CookieBanner() {
  const [isAccepted, setAccepted] = useState<null | boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccept = () => {
    setIsOpen(false);
    window.localStorage.setItem(STORAGE_KEY, "true");
  };

  useEffect(() => {
    const accepted = window.localStorage.getItem(STORAGE_KEY);
    setAccepted(accepted === "true");
    if (!accepted || accepted !== "true") {
      setIsOpen(true);
    }
  }, []);

  if (isAccepted) return null;

  return (
    <Card
      className={classNames(
        "fixed max-w-lg bottom-4 z-20 left-[50%] border border-border -translate-x-[50%] bg-card/80 opacity-0 invisible transition-all duration-300 ease-out translate-y-full",
        { "translate-y-0 opacity-100 backdrop-blur-xl visible": isOpen },
      )}
    >
      <CardContent className="flex gap-2 items-center">
        <p className="text-sm">
          Продолжая использовать сервис, вы соглашаетесь на использование файлов cookie
        </p>
        <CardAction>
          <Button onClick={handleAccept} size={"sm"}>
            Понятно
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}
