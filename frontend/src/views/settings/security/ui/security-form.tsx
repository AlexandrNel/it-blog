"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import { Spinner } from "@/shared/ui/spinner";
import { useSecurityForm } from "../model/useSecurityForm";

export function SecurityForm() {
  const { handleSubmit, form, updatePassword } = useSecurityForm();

  const {
    formState: { errors, isSubmitting },
    register,
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          <Input id="security-new-password" type="password" autoComplete="new-password" {...register("newPassword")} />
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
      {updatePassword.error && <FieldError>{updatePassword.error.message}</FieldError>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Spinner data-icon="inline-start" />}
        Обновить пароль
      </Button>
    </form>
  );
}
