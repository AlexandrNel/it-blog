"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Row } from "@/shared/ui/layout";
import { Dices } from "lucide-react";
import { type ChangeEvent, useState, useCallback, ComponentProps, useMemo, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { useGenerateNickname, UseGenerateNicknameOptions } from "../api/useGenerateNickname";
import { TUser, UserQueries } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage, getFieldErrors } from "@/shared/api";
import { FieldError } from "@/shared/ui";

type Props = ComponentProps<"input"> & {
  mutateOptions?: UseGenerateNicknameOptions;
  onErrorCheck?: (message: string) => void;
  onSuccessCheck?: () => void;
  username: string;
  value: string;
};

type ErrorMessageKey = keyof TUser.UpdateUsernameRequest;

export const NicknameField = ({
  mutateOptions,
  onChange,
  onErrorCheck,
  onSuccessCheck,
  username,
  value,
  ...props
}: Props) => {
  const debounced = useDebounce(value, 300);

  const { error, status } = useQuery({
    ...UserQueries.checkNickname(debounced),
    enabled: debounced !== username,
  });

  const errorMessage = useMemo(() => {
    const fields = getFieldErrors(error);
    const message = getErrorMessage(error);
    return (fields as Partial<Record<ErrorMessageKey, string[]>>)?.username?.[0] ?? message;
  }, [error]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  }, []);

  const generate = useGenerateNickname(mutateOptions);

  useEffect(() => {
    if (status === "error") {
      onErrorCheck?.(errorMessage ?? "Ошибка валидации");
    }
    if (status === "success") {
      onSuccessCheck?.();
    }
  }, [status]);

  return (
    <Row>
      <Input {...props} aria-invalid={!!error} value={value} onChange={handleChange} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            disabled={generate.isPending}
            onClick={() => generate.mutate()}
            type="button"
            size={"icon-lg"}
          >
            <Dices className="text-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Сгенерировать никнейм</TooltipContent>
      </Tooltip>
    </Row>
  );
};
