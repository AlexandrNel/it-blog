"use client";
import { EyeClosed, Eye, InfoIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../input-group";
import { TooltipContent, TooltipTrigger } from "../../tooltip";
import type { InputHTMLAttributes } from "react";
import { usePasswordToggle } from "@/shared/lib/hooks/use-password-toggle";
import { Tooltip } from "../../tooltip";

type Props = {
  tooltip?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInputPassword = ({ tooltip, ...props }: Props) => {
  const { isHidden, handleClick, type } = usePasswordToggle();

  return (
    <InputGroup className="overflow-hidden">
      <InputGroupInput aria-description="password" type={type} {...props} />
      <InputGroupAddon className="pr-2 py-0" align={"inline-end"}>
        <InputGroupButton
          className="h-full"
          aria-label={isHidden ? "show-password" : "hide-password"}
          aria-pressed={!isHidden}
          onClick={handleClick}
        >
          {isHidden ? <EyeClosed /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
      {tooltip && (
        <InputGroupAddon align={"inline-end"}>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                className=""
                variant="ghost"
                aria-label="Info"
                size="icon-xs"
              >
                <InfoIcon />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};
