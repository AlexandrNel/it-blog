"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { FormField, FormInputPassword } from "@/shared/ui/form-components";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types/components";
import { type ReactNode } from "react";
import { Card } from "@/shared/ui/card";
import { type UseLoginOptions } from "../api/use-login";
import { useLoginForm } from "../model/use-login-form";

type LoginrFormProps = BaseProps & {
  footer?: ReactNode;
  mutateOptions?: UseLoginOptions;
};

export function LoginForm({ className, footer = null, mutateOptions }: LoginrFormProps) {
  const { handleSubmit, form, isPending } = useLoginForm(mutateOptions);
  const {
    formState: { errors },
    register,
  } = form;
  return (
    <Card className={cn("max-w-130 p-8 w-full flex flex-col gap-6", className)}>
      <h2 className=" text-center">Вход в аккаунт</h2>
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-4">
          <FormField error={errors.login} id="login" label="Электронная почта или никнейм">
            <Input id="login" placeholder="Никнейм или почта" {...register("login")} />
          </FormField>
          <FormField error={errors.password} id="password" label="Пароль">
            <FormInputPassword id="password" placeholder="Введите пароль" {...register("password")} />
          </FormField>
        </FieldGroup>
        <Button disabled={isPending} className="w-full select-none mt-6" type="submit">
          Войти
        </Button>
      </form>
      {footer && (
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="justify-center flex">{footer}</div>
        </div>
      )}
    </Card>
  );
}
