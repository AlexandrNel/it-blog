"use client";

import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/shared/ui";
import type { ErrorInfo } from "next/error";

export default function ErrorPage({ unstable_retry }: ErrorInfo) {
  return (
    <Item className="bg-card gap-2 ">
      <ItemContent className="text-center">
        <ItemTitle className="w-full block">При загрузке данных прозиошла ошибка</ItemTitle>
        <ItemDescription>Попробуйте перезагрузить страницу или повторить позднее</ItemDescription>
      </ItemContent>
      <ItemFooter className="justify-center">
        <ItemActions>
          <Button onClick={() => unstable_retry()} variant={"outline"} size={"sm"}>
            Попробовать снова
          </Button>
        </ItemActions>
      </ItemFooter>
    </Item>
  );
}
