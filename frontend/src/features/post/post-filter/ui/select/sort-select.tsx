import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useQueryState } from "nuqs";
import { FilterLabel } from "../label/filter-label";
import { SORT_OPTIONS } from "../../lib/consts";
import { memo } from "react";

export const SortSelect = memo(() => {
  const [sort, setSort] = useQueryState("sort", { defaultValue: "relevance" });
  return (
    <>
      <FilterLabel>Сортировка</FilterLabel>
      <Select value={sort} onValueChange={(value) => setSort(value)} defaultValue="relevance">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите порядок" />
        </SelectTrigger>
        <SelectContent position="popper">
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
});
