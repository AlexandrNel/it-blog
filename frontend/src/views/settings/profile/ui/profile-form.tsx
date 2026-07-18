"use client";

import { FieldContent, FieldGroup, FieldLabel, FieldSeparator } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Row } from "@/shared/ui/layout";
import { FormField, FormFieldInput } from "@/shared/ui/form-components";
import { GitHubIcon } from "@/shared/ui/icons";
import { Send } from "lucide-react";
import { Spinner } from "@/shared/ui/spinner";
import { useProfileForm } from "../model/useProfileForm";
import { Separator } from "@/shared/ui";

export function ProfileForm() {
  const { handleSubmit, errors, form, isLoading, disabled } = useProfileForm();
  const { register } = form;
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormFieldInput
          id="displayName"
          label="Имя или псевдоним"
          error={errors.displayName}
          {...register("displayName")}
        />

        <FormField id="bio" label="О себе" error={errors.bio}>
          <Textarea id="bio" placeholder="Коротко расскажите о себе" rows={4} {...register("bio")} />
        </FormField>

        <FormFieldInput id="location" label="Откуда вы?" error={errors.location} {...register("location")} />
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

      <FieldGroup className="gap-4">
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

      <Button type="submit" disabled={disabled}>
        {isLoading && <Spinner data-icon="inline-start" />}
        Сохранить
      </Button>
    </form>
  );
}
