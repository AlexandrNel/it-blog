"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyApiFieldErrors } from "@/shared/lib/zod";
import { usePathname, useRouter } from "next/navigation";
import { LoginSchema, type LoginValuesType } from "../model/login-schema";
import { useLogin, type UseLoginOptions } from "../api/use-login";
import { routes } from "@/shared/config";

export function useLoginForm(mutateOptions?: UseLoginOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, error, isPending } = useLogin(mutateOptions);
  const form = useForm<LoginValuesType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginValuesType> = async (data) => {
    mutate(data, {
      onError: (err) => {
        applyApiFieldErrors(err, form.setError);
      },
      onSuccess: () => {
        if (pathname === routes.auth.login()) {
          router.push(routes.home());
        }
      },
    });
  };

  return { handleSubmit: form.handleSubmit(onSubmit), form, error, isPending };
}
