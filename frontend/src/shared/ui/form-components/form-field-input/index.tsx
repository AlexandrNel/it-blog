import { type InputHTMLAttributes, type PropsWithChildren } from "react";
import { FieldDescription } from "../../field";
import { type FieldError as FieldErrorType } from "react-hook-form";
import { Input } from "../../input";
import { FormField } from "../form-field";

type Props = {
  id?: string;
  label?: string;
  description?: string;
  error?: FieldErrorType;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormFieldInput = ({
  id,
  label,
  description,
  error,
  required,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <FormField id={id} label={label} required={required} error={error}>
      {description && <FieldDescription>{description}</FieldDescription>}
      <Input aria-required={!!required} aria-invalid={!!error} id={id} {...props} />
    </FormField>
  );
};
