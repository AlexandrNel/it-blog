"use client";

import { classNames } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { Row } from "@/shared/ui/layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { defaultSort, SORT_LIST, type SortCategory, type SortItem } from "../../config/sort-list";
import { SortButton } from "./sort-button";

export const SortToolbar = ({ className = "" }: BaseProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = (searchParams.get("sort") as SortCategory) ?? "new";
  const [activeSort, setActiveSort] = useState<SortCategory>(sort);

  const setSort = useCallback(
    (slug: SortItem["slug"]) => {
      setActiveSort(slug);
      const searchParamsRaw = searchParams.toString();
      const params = new URLSearchParams(searchParamsRaw);
      if (slug === defaultSort) {
        params.delete("sort");
      } else {
        params.set("sort", slug);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <Row className={classNames("bg-transparent  backdrop-blur-md", {}, [className])}>
      {SORT_LIST.map(({ name, slug }) => (
        <SortButton onClick={() => setSort(slug)} isActive={activeSort === slug} key={slug}>
          {name}
        </SortButton>
      ))}
    </Row>
  );
};
