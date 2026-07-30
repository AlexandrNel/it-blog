"use client";

import { cn } from "@/shared/lib/utils";
import { Tag } from "./Tag";
import type { Tag as TypeTag } from "../model/types";
import { HoverPrefetchLink } from "@/shared/ui";
import type { Route } from "next";

interface Props {
  className?: string;
  list: TypeTag[];
}

export function TagList({ className, list }: Props) {
  return (
    <ul className={cn(className, "flex flex-wrap gap-x-1 relative z-10")}>
      {list.map((tag) => (
        <li key={tag.key}>
          <HoverPrefetchLink href={`/tags/${tag.key}` as Route}>
            <Tag value={tag.name} />
          </HoverPrefetchLink>
        </li>
      ))}
    </ul>
  );
}
