import type { PropsWithChildren } from "react";
import { FormField, type FormFieldProps } from "../form-field";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "../../combobox";

type ValueType = { value: string; label: string } & Partial<Record<string, unknown>>;

type Props = {
	items: ValueType[];
	value: ValueType;
	onChange: (v: ValueType | null) => void;
} & FormFieldProps;

export const FormCombobox = ({
	id,
	label,
	error,
	value,
	items,
	onChange,
}: PropsWithChildren<Props>) => {
	console.log(items);

	return (
		<FormField id={id} label={label} error={error}>
			<Combobox
				id="form-category"
				value={value}
				onValueChange={onChange}
				items={items.map((item) => item.value)}
			>
				<ComboboxInput placeholder="Выберите категорию" />
				<ComboboxContent>
					<ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
					<ComboboxList>
						{(item: ValueType) => {
							<ComboboxItem key={item.value} value={item.value}>
								{item.label}
							</ComboboxItem>;
						}}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</FormField>
	);
};
