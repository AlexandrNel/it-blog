"use client";

import { SortSelect } from "./select/sort-select";
import { DateSelect } from "./select/date-select";
import { FilterAdditional } from "./filter-additional";

export const FilterToolbar = () => {
  return (
    <div className="flex flex-col gap-2">
      <SortSelect />
      <DateSelect />
      <FilterAdditional />
    </div>
  );
};
