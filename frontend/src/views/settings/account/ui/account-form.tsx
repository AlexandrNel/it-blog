"use client";

import { Controller } from "react-hook-form";

import { FieldDescription, FieldGroup } from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-components";
import { NicknameField } from "@/features/nickname-input";
import { Spinner } from "@/shared/ui/spinner";

import { useAccountForm } from "../model/useAccountForm";

export function AccountForm() {
  const { handleSubmit, form, isLoading, disabled, data } = useAccountForm();

  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
                id="username"
                username={data.account.username}
                value={field.value}
                mutateOptions={{
                  onSuccess: (data) => {
                    setValue("username", data.username, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  },
                }}
              />
            </FormField>
          )}
        />

        <Button className=" w-max" type="submit" disabled={disabled}>
          {isLoading && <Spinner data-icon="inline-start" />}
          Сохранить
        </Button>
      </FieldGroup>
    </form>
  );
}
