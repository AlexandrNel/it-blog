"use client";
import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/shared/ui/input-group";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";
import { useEditorStore } from "../model/use-editor-store";
import { useQueries } from "@tanstack/react-query";
import { queryCategories } from "@/entities/category/api/query";
import { queryTags } from "@/entities/tag/api/query";
import type { FormSchemaType } from "../model/schema";
import { ComboboxMultiple } from "@/features/article/article-create/components/combobox-multiple";
import { ArticlePreviewEditor } from "../components/article-preview-editor";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/shared/ui/combobox";

export function ArticleEditorForm({ className }: BaseProps) {
	const setData = useEditorStore((state) => state.setData);

	const [categoriesData, tagsData] = useQueries({
		queries: [queryCategories(), queryTags()],
	});
	const { data: categoryData = [] } = categoriesData;
	const { data: tagData = [] } = tagsData;
	const form = useFormContext<FormSchemaType>();

	return (
		<div className={cn("bg-card rounded-lg p-4 mt-2", className)}>
			<FieldGroup>
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-title">Заголовок</FieldLabel>
							<Input
								{...field}
								onChange={(e) => {
									field.onChange(e);
									setData({ title: e.currentTarget.value });
								}}
								id="form-title"
								aria-invalid={fieldState.invalid}
								placeholder="Введите заголовок статьи"
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="desc"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-description">Описание</FieldLabel>
							<InputGroup>
								<InputGroupTextarea
									{...field}
									onChange={(e) => {
										if (e.target.value.length <= 100) {
											setData({ description: e.target.value });
											field.onChange(e);
										}
									}}
									id="form-description"
									placeholder="Краткое описание статьи"
									rows={6}
									className="min-h-24 resize-none"
									aria-invalid={fieldState.invalid}
								/>
								<InputGroupAddon align="block-end">
									<InputGroupText className="tabular-nums">
										{field.value.length}/100 символов
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="category"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-category">Категория</FieldLabel>
							<Combobox
								{...field}
								id="form-category"
								items={categoryData}
								itemToStringValue={(item) => item.value}
								value={field.value}
								onValueChange={(v) => {
									field.onChange(v);
									setData({ category: v });
								}}
							>
								<ComboboxInput placeholder="Выберите категорию" />
								<ComboboxContent>
									<ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
									<ComboboxList>
										{(category) => {
											return (
												<ComboboxItem key={category.key} value={category}>
													{category.value}
												</ComboboxItem>
											);
										}}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="tags"
					control={form.control}
					render={({ field, fieldState }) => {
						return (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-tags">Теги</FieldLabel>
								<ComboboxMultiple
									{...field}
									onChange={(v) => {
										setData({ tags: v });
										field.onChange(v);
									}}
									id="form-tags"
									items={tagData.map((t) => t.name)}
								/>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						);
					}}
				/>
			</FieldGroup>
			<div className="mt-5">
				<Controller
					name="previewLength"
					control={form.control}
					render={({ fieldState }) => {
						return (
							<div className="flex flex-col gap-3">
								<FieldLabel className={cn({ "text-destructive": !!fieldState.error })}>
									Превью статьи
								</FieldLabel>
								<ArticlePreviewEditor error={fieldState.error?.message} />
								{fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}
