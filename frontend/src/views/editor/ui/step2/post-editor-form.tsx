"use client";
import { Controller, useFormContext, useFormState } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/shared/ui/input-group";
import { classNames } from "@/shared/lib/utils";
import { useQueries } from "@tanstack/react-query";
import { CategoryQueries } from "@/entities/category";
import { TagQueries } from "@/entities/tag";
import type { CreatePostValues } from "../../model/schema";
import { PostPreviewEditor } from "./post-preview-editor";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/shared/ui/combobox";
import React from "react";

export function PostEditorForm() {
  const [categoriesQuery, tagsQuery] = useQueries({
    queries: [CategoryQueries.all(), TagQueries.all()],
  });
  const { data: categories = [] } = categoriesQuery;
  const { data: tags = [] } = tagsQuery;
  const { control, setValue } = useFormContext<CreatePostValues>();
  const { defaultValues } = useFormState<CreatePostValues>({ control });

  return (
    <>
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-title">Заголовок</FieldLabel>
              <Input
                id="form-title"
                aria-invalid={fieldState.invalid}
                placeholder="Введите заголовок статьи"
                autoComplete="off"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-description">Описание</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
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
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-category">Категория</FieldLabel>
                <Combobox
                  {...field}
                  id="form-category"
                  items={categories}
                  value={field.value}
                  itemToStringValue={(i) => i.id}
                  onValueChange={(value) => {
                    const prevValue = { id: "", key: "", value: "" };
                    const isDirty = defaultValues?.category?.id !== prevValue.id;
                    setValue("category", value ?? prevValue, {
                      shouldDirty: isDirty,
                      shouldValidate: true,
                    });
                  }}
                >
                  <ComboboxInput
                    aria-invalid={!!fieldState.error}
                    placeholder="Выберите категорию"
                  />
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
            );
          }}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="tags">Теги</FieldLabel>
                <Combobox
                  multiple
                  items={tags}
                  value={field.value}
                  autoHighlight
                  isItemEqualToValue={(item, value) => item.id === value.id}
                  onValueChange={(value) =>
                    setValue("tags", value, { shouldDirty: true, shouldValidate: true })
                  }
                >
                  <ComboboxChips className="w-full px-3 py-0">
                    <ComboboxValue>
                      {(value: CreatePostValues["tags"]) => {
                        return (
                          <React.Fragment>
                            {value.map((tag) => (
                              <ComboboxChip showRemove key={tag.id}>
                                {tag.name}
                              </ComboboxChip>
                            ))}
                            <ComboboxChipsInput
                              id="tags"
                              className="h-11"
                              aria-invalid={fieldState.invalid}
                              placeholder={field.value.length === 0 ? "Выберите теги" : ""}
                            />
                          </React.Fragment>
                        );
                      }}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent>
                    <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
                    <ComboboxList>
                      {(tag: CreatePostValues["tags"][0]) => {
                        return (
                          <ComboboxItem key={tag.id} value={tag}>
                            {tag.name}
                          </ComboboxItem>
                        );
                      }}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <div className="mt-5">
        <Controller
          name="previewContentSize"
          control={control}
          render={({ fieldState, formState }) => {
            return (
              <div className="flex flex-col gap-3">
                <FieldLabel className={classNames("", { "text-destructive": fieldState.invalid })}>
                  Превью статьи
                </FieldLabel>
                <PostPreviewEditor />
                <FieldError errors={[fieldState.error, formState.errors.previewImage]} />
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
