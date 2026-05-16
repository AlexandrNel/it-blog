"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
	notificationSettingsSchema,
	type NotificationSettingsFormValues,
} from "../model/notification-schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";

import { createHandleSubmit } from "@/shared/lib/zod";
import { Spinner } from "@/shared/ui/spinner";

export function NotificationForm() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		setError,
	} = useForm<NotificationSettingsFormValues>({
		resolver: zodResolver(notificationSettingsSchema),
	});

	const onSubmit = createHandleSubmit<NotificationSettingsFormValues>(
		setError,
		async (values) => {},
	);
	const loading = false;
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<FieldGroup>
				<Controller
					name="emailNotifications"
					control={control}
					render={({ field, fieldState }) => (
						<Field orientation="horizontal" data-invalid={fieldState.invalid}>
							<Checkbox
								id="notifications-email"
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
							<FieldLabel htmlFor="notifications-email">Email для уведомлений</FieldLabel>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="marketingEmails"
					control={control}
					render={({ field, fieldState }) => (
						<Field orientation="horizontal" data-invalid={fieldState.invalid}>
							<Checkbox
								id="notifications-marketing"
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
							<FieldLabel htmlFor="notifications-marketing">Маркетинговые рассылки</FieldLabel>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="updatesEmails"
					control={control}
					render={({ field, fieldState }) => (
						<Field orientation="horizontal" data-invalid={fieldState.invalid}>
							<Checkbox
								id="notifications-updates"
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
							<FieldLabel htmlFor="notifications-updates">Письма об обновлениях</FieldLabel>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button type="submit" disabled={loading}>
				{loading && <Spinner data-icon="inline-start" />}
				Сохранить
			</Button>
		</form>
	);
}
