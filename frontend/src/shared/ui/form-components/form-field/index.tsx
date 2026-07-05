import { type PropsWithChildren } from "react";
import { Field, FieldError, FieldLabel } from "../../field";
import { type FieldError as FieldErrorType } from "react-hook-form";
import { Row } from "../../layout";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";
import { type BaseProps } from "@/shared/types/components";

export type FormFieldProps = {
  id?: string;
  label?: string;
  error?: FieldErrorType;
  required?: boolean;
} & BaseProps;

export const FormField = ({
  children,
  id,
  label,
  error,
  required,
}: PropsWithChildren<FormFieldProps>) => {
  return (
    <Field data-invalid={!!error}>
      {label && (
        <Row align={"center"}>
          <FieldLabel className="" htmlFor={id}>
            {label}
          </FieldLabel>{" "}
          {required && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-red-600 leading-3.5">*</div>
              </TooltipTrigger>
              <TooltipContent>Поле обязательное для заполнения</TooltipContent>
            </Tooltip>
          )}
        </Row>
      )}
      {children}
      {error && <FieldError>{error.message}</FieldError>}
    </Field>
  );
};
