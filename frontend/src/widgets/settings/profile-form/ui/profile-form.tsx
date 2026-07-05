"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { profileSettingsSchema, type ProfileSettingsFormValues } from "../model/profile-schema";
import { FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Row } from "@/shared/ui/layout";
import { useUpdateProfile } from "../model/queries";
import { createHandleSubmit } from "@/shared/lib/zod";
import { FormField, FormFieldInput } from "@/shared/ui/form-components";
import { GitHubIcon } from "@/shared/ui/icons";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useSettings } from "@/entities/settings";
import { Spinner } from "@/shared/ui/spinner";

export function ProfileForm() {
  const { data, isLoading } = useSettings();

  const { mutateAsync } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ProfileSettingsFormValues>({
    resolver: zodResolver(profileSettingsSchema),
    values: data?.profile,
  });

  const onSubmit = createHandleSubmit<ProfileSettingsFormValues>(setError, async (values) => {
    await mutateAsync(
      { ...values, userId: data?.account.username },
      {
        onSuccess() {
          toast.success("Данные профиля обновлены");
        },
      },
    );
  });

  const loading = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Row>
          <FormFieldInput
            id="displayName"
            label="Имя или псевдоним"
            error={errors.displayName}
            {...register("displayName")}
          />
        </Row>

        <FormField id="bio" label="О себе" error={errors.bio}>
          <Textarea
            id="bio"
            placeholder="Коротко расскажите о себе"
            rows={4}
            {...register("bio")}
          />
        </FormField>

        <FormFieldInput
          id="location"
          label="Откуда вы?"
          error={errors.location}
          {...register("location")}
        />
        <FormFieldInput
          id="website"
          label="Веб сайт"
          error={errors.contacts?.site}
          placeholder="https://example.com"
          {...register("contacts.site")}
        />
        <FormFieldInput
          id="email"
          label="Отображаемый email"
          error={errors.contacts?.email}
          {...register("contacts.email")}
        />
      </FieldGroup>

      <FieldGroup className="mt-10 ">
        <h3 className="text-md font-semibold -mb-5">Публичные ссылки</h3>

        <FormField id="github" error={errors.contacts?.links?.github}>
          <FieldLabel htmlFor="github">
            <GitHubIcon />
            <span>Github</span>
          </FieldLabel>
          <Input id="github" {...register("contacts.links.github")} />
        </FormField>

        <FormField id="telegram" error={errors.contacts?.links?.telegram}>
          <FieldLabel htmlFor="telegram">
            <Send size={16} />
            <span>Telegram</span>
          </FieldLabel>
          <Input id="telegram" {...register("contacts.links.telegram")} />
        </FormField>
      </FieldGroup>

      <Button type="submit" disabled={loading}>
        {loading && <Spinner data-icon="inline-start" />}
        Сохранить
      </Button>
    </form>
  );
}
