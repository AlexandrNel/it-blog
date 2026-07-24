import type { ComboboxRoot } from "@base-ui/react";
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
import React, { ComponentProps } from "react";

type ComboboxMultipleProps = {
  combobox: ComponentProps<typeof Combobox>;
  input: ComponentProps<typeof ComboboxChipsInput>;
};

export function ComboboxMultiple({ combobox, input }: ComboboxMultipleProps) {
  const { value, items, onValueChange, id, ...comboboxProps } = combobox;

  const anchor = useComboboxAnchor();
  const [open, setOpen] = React.useState(false);
  const height = React.useRef<number>(undefined);

  React.useLayoutEffect(() => {
    const newHeight = anchor.current?.getClientRects()[0].height;
    if (newHeight) {
      height.current = newHeight;
    }
  }, [anchor]);

  return (
    <Combobox
      id={id}
      multiple
      value={value}
      onValueChange={onValueChange}
      autoHighlight
      items={items}
      onOpenChange={setOpen}
      open={open}
      {...comboboxProps}
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
        <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
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
