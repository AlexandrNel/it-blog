"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Row } from "@/shared/ui/layout";
import { Dices } from "lucide-react";
import { type ChangeEvent, useState, type InputHTMLAttributes, useCallback } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { useGenerateNickname } from "../api/useGenerateNickname";
import { UserQueries } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onSuccessGenerate?: (data: { username: string }) => void;
  onSuccessCheck?: (data: { isAvailable: boolean }) => void;
  onErrorCheck?: (error: unknown) => void;
  email?: string;
};

export const NicknameField = ({
  value = "",
  onErrorCheck,
  onSuccessCheck,
  onSuccessGenerate,
  onChange,
  ...props
}: Props) => {
  // TODO: сделать позже

  const [hasInteracted, setHasInteracted] = useState(false);
  const debounced = useDebounce(String(value), 300);
  const { error } = useQuery({ ...UserQueries.checkNickname(debounced), enabled: hasInteracted, staleTime: 1000 });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!hasInteracted) setHasInteracted(true);
    onChange?.(e);
  }, []);

  const generate = useGenerateNickname({
    onSuccess: onSuccessGenerate,
  });

  return (
    <Row>
      <Input aria-invalid={!!error} value={value} onChange={handleChange} {...props} />
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
