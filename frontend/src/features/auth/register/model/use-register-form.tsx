"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { applyApiFieldErrors } from "@/shared/lib/zod";
import { type RegisterFormValuesType, RegisterSchema } from "../model/register-schema";
import { routes } from "@/shared/config";
import { useRegister, type UseRegisterOptions } from "../api/use-register";

export function useRegisterForm(mutateOptions?: UseRegisterOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<RegisterFormValuesType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending, error } = useRegister(mutateOptions);
  const onSubmit: SubmitHandler<RegisterFormValuesType> = (data) => {
    mutate(data, {
      onError: (err) => {
        applyApiFieldErrors(err, form.setError);
      },
      onSuccess: () => {
        if (pathname === routes.auth.register()) {
          router.push(routes.home());
        }
      },
    });
  };

  return { handleSubmit: form.handleSubmit(onSubmit), form, isPending, error };
}
