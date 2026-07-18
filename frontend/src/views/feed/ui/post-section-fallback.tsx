"use client";
import { Button, Card, Column, HoverPrefetchLink } from "@/shared/ui";
import { Newspaper } from "lucide-react";

export function PostSectionFallback() {
  return (
    <Card className="py-10">
      <Column gap={"lg"} align={"center"} className="text-center">
        <Column align={"center"} justify={"center"} className="rounded-xl size-16 bg-muted">
          <Newspaper />
        </Column>
        <p className="text-xl font-bold">В ленте пока нет статей</p>
        <p className="text text-muted-foreground md:px-10">
          Здесь будут появляться материалы от авторов и по тегам, на которые вы подписаны. Начните
          читать интересные публикации или поделитесь своим опытом!
        </p>
        <Button asChild>
          <HoverPrefetchLink href={"/editor"}>Написать статью</HoverPrefetchLink>
        </Button>
      </Column>
    </Card>
  );
}
