"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyApiFieldErrors } from "@/shared/lib/zod";
import { LoginSchema, type LoginValuesType } from "../model/login-schema";
import { useLogin, type UseLoginOptions } from "../api/use-login";
import { AccessToken } from "@/shared/api/token";

export function useLoginForm(mutateOptions?: UseLoginOptions) {
  const { mutate, error, isPending } = useLogin(mutateOptions);
  const form = useForm<LoginValuesType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginValuesType> = async (data) => {
    mutate(data, {
      onError: (err) => {
        applyApiFieldErrors(err, form.setError);
      },
      onSuccess: (data) => {
        AccessToken.token = data.token;
      },
    });
  };

  return { handleSubmit: form.handleSubmit(onSubmit), form, error, isPending };
}
