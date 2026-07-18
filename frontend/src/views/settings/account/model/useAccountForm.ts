import { ProfileQueries } from "@/entities/profile";
import { createHandleSubmit } from "@/shared/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUpdateNickname } from "../api/useUpdateNickname";
import { type AccountSettingsFormValues, accountSettingsSchema } from "./schemas";

export function useAccountForm() {
  const query = useSuspenseQuery(ProfileQueries.getSettings());
  const account = query.data?.account;
  const { mutateAsync } = useUpdateNickname();

  const form = useForm<AccountSettingsFormValues>({
    disabled: query.isLoading,
    resolver: zodResolver(accountSettingsSchema),
    mode: "onChange",
    defaultValues: {
      email: account.email,
      username: account.username,
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { dirtyFields, isDirty, errors, isSubmitting },
  } = form;

  const onSubmit = createHandleSubmit<AccountSettingsFormValues>(setError, async (values) => {
    if (!dirtyFields.username) return;

    await mutateAsync(
      { username: values.username },
      {
        onSuccess: () => {
          reset(getValues());
        },
      },
    );
  });

  const isLoading = isSubmitting || query.isLoading;

  return {
    handleSubmit: handleSubmit(onSubmit),
    form,
    isLoading,
    disabled: !isDirty || isLoading || !!errors.username,
    data: query.data,
  };
}
