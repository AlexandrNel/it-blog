import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "../api/useUpdatePassword";
import { type SecuritySettingsFormValues, securitySettingsSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { createHandleSubmit } from "@/shared/lib/zod";
import { toast } from "sonner";
import type { TUser } from "@/entities/user";

export function useSecurityForm() {
  const { mutateAsync, ...updatePassword } = useUpdatePassword();
  const { handleSubmit, ...form } = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
  });

  const onSubmit = createHandleSubmit(form.setError, async (values) => {
    const body: TUser.UpdatePasswordRequest = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    await mutateAsync(body, { onSuccess: () => toast.success("Пароль успешно изменен") });
    form.reset({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  });

  return { handleSubmit: handleSubmit(onSubmit), form, updatePassword };
}
