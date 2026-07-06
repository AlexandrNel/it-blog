"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { FieldError, FieldGroup } from "@/shared/ui/field";
import { FormField } from "@/shared/ui/form-components/form-field";
import { FormInputPassword } from "@/shared/ui/form-components";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types";
import { type ReactNode } from "react";
import { Card } from "@/shared/ui/card";
import { type UseRegisterOptions } from "../api/use-register";
import { useRegisterForm } from "../model/use-register-form";

type RegisterFormProps = BaseProps & {
  mutationOptions?: UseRegisterOptions;
  footer?: ReactNode;
};

export function RegisterForm({ className, footer = null, mutationOptions }: RegisterFormProps) {
  const { form, handleSubmit, error, isPending } = useRegisterForm(mutationOptions);
  const {
    formState: { errors },
  } = form;

  return (
    <Card className={cn("max-w-130 p-8 w-full flex flex-col gap-6", className)}>
      <h2 className="text-center">Созданиe аккаунта</h2>
      <form onSubmit={handleSubmit}>
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
        <Button disabled={isPending} className="w-full mt-6" type="submit">
          Создать аккаунт
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
