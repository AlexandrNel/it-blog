import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useQueryState } from "nuqs";
import { memo } from "react";
import { FilterLabel } from "../label/filter-label";
import { DATE_OPTIONS } from "../../lib/consts";

export const DateSelect = memo(() => {
  const [date, setDate] = useQueryState("date", { defaultValue: "all" });
  return (
    <>
      <FilterLabel>Дата написания</FilterLabel>
      <Select value={date} onValueChange={(value) => setDate(value)} defaultValue="all">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите дату написания" />
        </SelectTrigger>
        <SelectContent position="popper">
          {DATE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
});
