"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth";
import { applyApiFieldErrors } from "@/shared/lib/zod";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { FormField, FormInputPassword } from "@/shared/ui/form-components";
import { useRouter } from "next/navigation";
import { LoginSchema, type LoginValuesType } from "../model/login-schema";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { Heading } from "@/shared/ui/heading";

export function LoginForm({ className }: BaseProps) {
  const router = useRouter();
  const { mutate, error, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValuesType>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<LoginValuesType> = async (data) => {
    mutate(data, {
      onError: (err) => {
        applyApiFieldErrors(err, setError);
      },
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <div className={cn("max-w-130 px-10 w-full", className)}>
      <Heading className=" text-center mb-10">Вход в аккаунт</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <FormField
            error={errors.login}
            id="login"
            label="Электронная почта или никнейм"
          >
            <Input
              id="login"
              placeholder="Никнейм или почта"
              {...register("login")}
            />
          </FormField>
          <FormField error={errors.password} id="password" label="Пароль">
            <FormInputPassword
              id="password"
              placeholder="Введите пароль"
              {...register("password")}
            />
          </FormField>
          {error?.message && (
            <FieldError aria-invalid>{error?.message}</FieldError>
          )}
        </FieldGroup>
        <Button
          disabled={isPending}
          className="w-full select-none mt-6"
          type="submit"
        >
          Войти
        </Button>
      </form>
      <Separator className="my-8" />
      <p className="flex  gap-1  justify-center">
        <span>Нет аккаунта?</span>
        <a href="/register" className="text-blue-500 font-medium">
          Регистрация
        </a>
      </p>
    </div>
  );
}
