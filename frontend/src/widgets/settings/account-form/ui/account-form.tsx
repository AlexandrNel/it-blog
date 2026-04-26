"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { accountSettingsSchema, type AccountSettingsFormValues } from "../model/account-schema";
import { Field, FieldDescription, FieldError, FieldGroup } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useUpdateNickname } from "../model/queries";
import { applyApiFieldErrors, createHandleSubmit } from "@/shared/lib/zod";
import { FormField } from "@/shared/ui/form-components";
import { NicknameField } from "@/features/nickname-input";
import { useSettings } from "@/entities/settings";
import { Spinner } from "@/shared/ui/spinner";
import { isApiError } from "@/shared/lib/api/api-error";

export function AccountForm() {
	const { data, isLoading } = useSettings();
	const { mutate } = useUpdateNickname();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		control,
		formState: { errors, isSubmitting },
	} = useForm<AccountSettingsFormValues>({
		values: data?.account,
		disabled: isLoading,
		resolver: zodResolver(accountSettingsSchema),
	});

	const onSubmit = createHandleSubmit<AccountSettingsFormValues>(setError, async (values) =>
		mutate(values.username, {
			onError: (err) => setError("username", { message: err.message }),
		}),
	);
	const onErrorCheck = (error: unknown) => {
		if (isApiError(error) && error.status === 400) {
			setError("username", { type: "server", message: error.message });
		}
	};
	const isFething = isSubmitting || isLoading;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<FieldGroup className="gap-4">
				<Controller
					control={control}
					name="username"
					render={({ field }) => (
						<FormField id="username" error={errors.username} label="Никнейм">
							<FieldDescription>
								Уникальное имя, которое будет использоваться для идентификации вашего аккаунта и
								отображаться в вашем профиле
							</FieldDescription>
							<NicknameField
								{...field}
								onErrorCheck={onErrorCheck}
								onSuccessCheck={() => clearErrors("username")}
								onSuccessGenerate={(data) => setValue("username", data.username)}
								value={field.value}
								onChange={field.onChange}
								id="username"
							/>
						</FormField>
					)}
				/>

				<Button className=" w-max" type="submit" disabled={isFething || !!errors.username}>
					{isFething && <Spinner data-icon="inline-start" />}
					Сохранить
				</Button>
			</FieldGroup>

			<FieldGroup>
				<FormField id="email" label="Email">
					{!data?.meta.emailVerified && (
						<FieldError errors={[{ message: "Почта не подтверждена" }]} />
					)}
					<Input
						disabled
						id="email"
						type="email"
						placeholder="example@mail.com"
						{...register("email")}
					/>
				</FormField>
				<Field data-invalid={!!errors.email}></Field>
			</FieldGroup>
		</form>
	);
}
