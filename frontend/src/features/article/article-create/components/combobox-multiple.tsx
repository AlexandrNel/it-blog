import { type ComboboxRoot } from "@base-ui/react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/shared/ui/combobox";
import React from "react";

export function ComboboxMultiple({
  value,
  items,
  onChange,
  id,
  ...props
}: {
  value: string[];
  items: unknown[];
  onChange: (v: string[], eventDetails: ComboboxRoot.ChangeEventDetails) => void;
  id: string;
}) {
  const isMax = value.length >= 5;
  const anchor = useComboboxAnchor();
  const [open, setOpen] = React.useState(isMax);
  const height = React.useRef<number>(undefined);

  React.useLayoutEffect(() => {
    const newHeight = anchor.current?.getClientRects()[0].height;
    if (newHeight) {
      height.current = newHeight;
    }
  }, [anchor]);

  return (
    <Combobox
      {...props}
      id={id}
      multiple
      value={value}
      onValueChange={(v, event) => onChange(v, event)}
      autoHighlight
      items={items}
      onOpenChange={setOpen}
      open={open && !isMax}
    >
      <ComboboxChips ref={anchor} className="w-full px-3 py-0">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput style={{ height: height.current }} className={"h-8"} />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
