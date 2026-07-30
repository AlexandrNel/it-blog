"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/input-group";
import { Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export const SearchInput = () => {
  const [search, setSearch] = useQueryState("q");
  const [localValue, setLocalValue] = useState(search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localValue.trim() || null);
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, setSearch]);
  return (
    <InputGroup>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Искать"
      />
      {localValue && (
        <InputGroupButton
          size={"sm"}
          onClick={() => {
            setLocalValue("");
            setSearch(null);
          }}
        >
          <X size={25} />
        </InputGroupButton>
      )}
    </InputGroup>
  );
};
