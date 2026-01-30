import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import React from "react";
import { Tag } from "../Tag/Tag";

interface Props {
  className?: string;
  list: string[];
}

export const TagList: React.FC<Props> = ({ className, list }) => {
  return (
    <ul className={cn(className, "flex gap-2")}>
      {list.map((value, i) => (
        <li key={String(value + i)}>
          <Link href={`/tags/${value}`}>
            <Tag value={value} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
