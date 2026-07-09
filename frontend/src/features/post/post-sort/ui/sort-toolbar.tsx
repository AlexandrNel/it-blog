"use client";

import { cn } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types/components";
import { Row } from "@/shared/ui/layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type SortItem = { slug: "new" | "top" | "popular"; name: string };

const SORT_LIST: SortItem[] = [
  {
    slug: "new",
    name: "Новые",
  },
  {
    slug: "top",
    name: "Топ",
  },
  {
    slug: "popular",
    name: "Популярные",
  },
];

export const SortToolbar = ({ className }: BaseProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = (searchParams.get("sort") as SortItem["slug"]) ?? "new";
  const [activeSort, setActiveSort] = useState<SortItem["slug"]>(sort);

  const setSort = (slug: SortItem["slug"]) => {
    setActiveSort(slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", slug);
    router.push(`?${params.toString()}`);
  };

  return (
    <Row className={cn(className)}>
      {SORT_LIST.map((f) => (
        <SortButton
          onClick={() => setSort(f.slug)}
          isActive={activeSort === f.slug}
          key={f.slug}
          name={f.name}
          slug={f.slug}
        />
      ))}
    </Row>
  );
};

const SortButton = ({
  name,
  isActive,
  onClick,
}: SortItem & { isActive: boolean; onClick: () => void }) => {
  return (
    <button
      type="button"
      className={cn(
        " cursor-pointer text-muted-foreground h-10  border-gray-300 px-4 rounded-full transition-colors",
        "hover:text-foreground hover:border-gray-300 active:text-foreground active:bg-card active:border-gray-300",
        { "bg-card text-foreground border-gray-500": isActive },
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export const SortToolbarSkeleton = () => {
  return (
    <Row>
      {SORT_LIST.map((f) => (
        <SortButton
          isActive={f.slug === "new"}
          onClick={() => {}}
          key={f.slug}
          name={f.name}
          slug={f.slug}
        />
      ))}
    </Row>
  );
};
