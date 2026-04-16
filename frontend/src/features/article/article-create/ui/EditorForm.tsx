"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";

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
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/shared/ui/combobox";
import { useQueries } from "@tanstack/react-query";
import { queryCategories } from "@/entities/category/api/query";
import { queryTags } from "@/entities/tag/api/query";
import { formSchema, type FormSchemaType } from "../model/schema";
import { PostAPI } from "@/entities/article";
import { toast } from "sonner";
import { isApiError } from "@/shared/lib/api/api-error";
import { ComboboxMultiple } from "@/shared/ui/ComboboxMultiple";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/shared/ui/label";
import { EditorPreviewField } from "../components/editor-preview-field";

export function EditorForm({ className, footer }: BaseProps & { footer?: React.ReactNode }) {
	const { id } = useParams();
	const router = useRouter();
	const hasId = (id: string | string[] | undefined) => {
		return typeof id === "string";
	};

	const title = useEditorStore((state) => state.title);
	const description = useEditorStore((state) => state.description);
	const tagIds = useEditorStore((state) => state.tags);
	const categoryId = useEditorStore((state) => state.category);
	const content = useEditorStore((state) => state.content);
	const previewContent = useEditorStore((state) => state.previewContent);
	const image = useEditorStore((state) => state.previewImage);
	const setTitle = useEditorStore((state) => state.setTitle);
	const setCategory = useEditorStore((state) => state.setCategory);
	const setDescription = useEditorStore((state) => state.setDescription);
	const setTags = useEditorStore((state) => state.setTags);

	const [categories, tags] = useQueries({
		queries: [queryCategories(), queryTags()],
	});
	const { data: categoryData = [] } = categories;
	const { data: tagData = [] } = tags;

	const CATEGORY_MAP = Object.fromEntries(categoryData.map((obj) => [obj.value, obj.id]));
	const TAGS_MAP = Object.fromEntries(tagData.map((obj) => [obj.name, obj.id]));
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: {
			title: title,
			desc: description,
			category: categoryId ?? "",
			tags: tagIds,
		},
	});
	const previewLength = useEditorStore((state) => state.previewLength);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (previewLength >= 50) {
			setError(false);
		}
	}, [previewLength]);

	async function onSubmit(data: FormSchemaType) {
		const { category, tags, ...rest } = data;
		const fetchData = {
			...rest,
			tagIds: tags.map((tag) => TAGS_MAP[tag]),
			categoryId: CATEGORY_MAP[category],
			content: JSON.stringify(content),
			previewContent: JSON.stringify(previewContent),
			previewImageUrl: image,
		};
		if (previewLength <= 50) {
			setError(true);
			return;
		} else {
			setError(false);
		}
		try {
			if (hasId(id)) {
				await PostAPI.updatePost(fetchData, id);
				await fetch(`/api/posts/${id}/revalidate`, { method: "POST" });
				toast.success("Статья обновлена");
			} else {
				const post = await PostAPI.createPost(fetchData);
				toast.success("Ваша статья опубликована!");
				router.push(`/articles/${post.slug}`);
			}
		} catch (error) {
			if (isApiError(error)) {
				toast.error(error.message);
			}
		}
	}

	return (
		<div className={cn("bg-card rounded-lg p-4 mt-2", className)}>
			<form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
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
										setTitle(e.currentTarget.value);
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
											setDescription(e.target.value);
											field.onChange(e);
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
									onValueChange={(v) => {
										field.onChange(v);
										setCategory(v);
									}}
									items={categoryData.map((c) => c.value)}
								>
									<ComboboxInput placeholder="Выберите категорию" />
									<ComboboxContent>
										<ComboboxEmpty>No items found.</ComboboxEmpty>
										<ComboboxList>
											{(category) => (
												<ComboboxItem key={category} value={category}>
													{category}
												</ComboboxItem>
											)}
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
											setTags(v);
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
					<Label className="mb-2">Превью статьи</Label>
					<EditorPreviewField />
					{error && (
						<FieldError>{"Напишите превью к статье. Должно быть не менее 50 символов"}</FieldError>
					)}
				</div>
				{footer && <div className="mt-4">{footer}</div>}
			</form>
		</div>
	);
}
