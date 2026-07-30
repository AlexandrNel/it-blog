"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Row } from "@/shared/ui/layout";
import { Dices } from "lucide-react";
import type { ChangeEvent, ComponentProps } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { useGenerateNickname, type UseGenerateNicknameOptions } from "../api/useGenerateNickname";
import { UserQueries } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

type Props = ComponentProps<"input"> & {
  mutateOptions?: UseGenerateNicknameOptions;
  username: string;
  value: string;
};

export function NicknameField({ mutateOptions, onChange, username, value, ...props }: Props) {
  const debounced = useDebounce(value, 300);

  const { error } = useQuery({
    ...UserQueries.checkNickname(debounced),
    enabled: debounced !== username,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const generate = useGenerateNickname(mutateOptions);

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
}
