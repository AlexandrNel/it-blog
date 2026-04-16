"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { securitySettingsSchema, type SecuritySettingsFormValues } from "../model/security-schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import { createHandleSubmit } from "@/shared/lib/zod";
import { toast } from "sonner";
import { useUpdatePassword } from "../model/queries";
import { Spinner } from "@/shared/ui/spinner";

export function SecurityForm() {
	const { mutateAsync, error } = useUpdatePassword();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
	} = useForm<SecuritySettingsFormValues>({
		resolver: zodResolver(securitySettingsSchema),
	});

	const onSubmit = createHandleSubmit<SecuritySettingsFormValues>(
		setError,
		async (values: SecuritySettingsFormValues) => {
			await mutateAsync(
				{
					oldPassword: values.currentPassword,
					newPassword: values.newPassword,
				},
				{ onSuccess: () => toast.success("Пароль успешно изменен") },
			);
			reset({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
		},
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<FieldGroup>
				<Field data-invalid={!!errors.currentPassword}>
					<FieldLabel htmlFor="security-current-password">Текущий пароль</FieldLabel>
					<Input
						id="security-current-password"
						type="password"
						autoComplete="current-password"
						{...register("currentPassword")}
					/>
					{errors.currentPassword && <FieldError errors={[errors.currentPassword]} />}
				</Field>

				<Field data-invalid={!!errors.newPassword}>
					<FieldLabel htmlFor="security-new-password">Новый пароль</FieldLabel>
					<Input
						id="security-new-password"
						type="password"
						autoComplete="new-password"
						{...register("newPassword")}
					/>
					{errors.newPassword && <FieldError errors={[errors.newPassword]} />}
				</Field>

				<Field data-invalid={!!errors.confirmNewPassword}>
					<FieldLabel htmlFor="security-confirm-password">Подтвердите новый пароль</FieldLabel>
					<Input
						id="security-confirm-password"
						type="password"
						autoComplete="new-password"
						{...register("confirmNewPassword")}
					/>
					{errors.confirmNewPassword && <FieldError errors={[errors.confirmNewPassword]} />}
				</Field>
			</FieldGroup>
			{error && <FieldError>{error.message}</FieldError>}

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting && <Spinner data-icon="inline-start" />}
				Обновить пароль
			</Button>
		</form>
	);
}
