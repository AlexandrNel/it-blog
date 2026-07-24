"use client";

import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/shared/ui";
import { CircleAlert } from "lucide-react";

export function PostSectionErrorFallback() {
  return (
    <Item className="bg-card gap-2">
      <ItemHeader className=" justify-center flex">
        <ItemMedia variant={"default"}>
          <CircleAlert />
        </ItemMedia>
      </ItemHeader>
      <ItemContent className="text-center">
        <ItemTitle className="block w-full">Произошла ошибка</ItemTitle>
        <ItemDescription>Не удалось получить список статей</ItemDescription>
      </ItemContent>
    </Item>
  );
}
