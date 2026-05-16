"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { FormField } from "@/shared/ui/form-components/form-field";
import { FormInputPassword } from "@/shared/ui/form-components";
import { applyApiFieldErrors } from "@/shared/lib/zod";
import { useRegister } from "@/entities/auth";
import { type RegisterFormValuesType, RegisterSchema } from "../model/register-schema";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/heading";

export function RegisterForm({ className }: { className?: string }) {
	const router = useRouter();
	const form = useForm<RegisterFormValuesType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const {
		formState: { errors },
	} = form;
	const { mutate, isPending, error } = useRegister();
	const onSubmit: SubmitHandler<RegisterFormValuesType> = (data) => {
		mutate(data, {
			onError: (err) => {
				applyApiFieldErrors(err, form.setError);
			},
			onSuccess: () => router.push("/"),
		});
	};
	return (
		<div className={cn("max-w-130 px-10 w-full", className)}>
			<Heading className="text-center mb-10">Созданиe аккаунта</Heading>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup className="gap-4">
					<FormField error={errors.email} id="email" label="Электронная почта">
						<Input
							required
							autoComplete="email"
							id="email"
							placeholder="example@gmail.com"
							{...form.register("email")}
						/>
					</FormField>
					<FormField error={errors.password} id="password" label="Пароль">
						<FormInputPassword
							required
							autoComplete="new-password"
							aria-invalid={!!errors.password}
							id="password"
							placeholder="Придумайте пароль"
							{...form.register("password")}
						/>
					</FormField>
					{error?.message && <FieldError aria-invalid>{error?.message}</FieldError>}
				</FieldGroup>
				<Button size={"lg"} disabled={isPending} className="w-full mt-6" type="submit">
					Создать аккаунт
				</Button>
			</form>
			<Separator className="my-8" />
			<p className="flex gap-1 justify-center">
				<span>Есть аккаунт?</span>
				<a href="/login" className="text-blue-500 font-medium">
					Вход
				</a>
			</p>
		</div>
	);
}
