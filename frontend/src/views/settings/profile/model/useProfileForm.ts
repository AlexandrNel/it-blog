import { useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateProfile } from "../api/useUpdateProfile";
import { ProfileQueries } from "@/entities/profile";
import { type ProfileSettingsFormValues, profileSettingsSchema } from "./schemas";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHandleSubmit } from "@/shared/lib/zod";
import { toast } from "sonner";
import { getDirtyValues } from "@/shared/lib/utils";

export function useProfileForm() {
  const query = useSuspenseQuery(ProfileQueries.getSettings());
  const profile = query.data?.profile;
  const account = query.data?.account;
  const { mutateAsync } = useUpdateProfile();

  const {
    handleSubmit,
    setError,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
    ...form
  } = useForm<ProfileSettingsFormValues>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      bio: profile?.bio ?? "",
      displayName: profile?.displayName ?? "",
      contacts: {
        email: profile?.contacts?.email ?? "",
        site: profile?.contacts?.site ?? "",
        links: {
          github: profile?.contacts?.links?.github ?? "",
          telegram: profile?.contacts?.links?.telegram ?? "",
        },
      },
      location: profile?.location ?? "",
    },
  });
  const { dirtyFields, isDirty } = useFormState({ control });

  const onSubmit = createHandleSubmit<ProfileSettingsFormValues>(setError, async (values) => {
    const dirtyValues = getDirtyValues(values, dirtyFields);

    await mutateAsync(
      { userId: account.username, ...dirtyValues },
      {
        onSuccess() {
          toast.success("Данные профиля обновлены");
          reset(form.getValues());
        },
      },
    );
  });

  const isLoading = query.isLoading;
  const disabled = !isDirty || isSubmitting || query.isLoading;

  return {
    handleSubmit: handleSubmit(onSubmit),
    form,
    errors,
    isLoading,
    disabled,
    data: query.data,
  };
}
