import { getFieldErrors } from "@/shared/api";
import { getErrorMessage } from "@/shared/api/validation/get-field-errors";
import type { FieldValues, FieldPath, UseFormSetError } from "react-hook-form";

export function applyApiFieldErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  const fieldErrors = getFieldErrors(error);
  const message = getErrorMessage(error);

  if (message) {
    setError("root", { message });
  }

  if (!fieldErrors) return;

  (Object.entries(fieldErrors) as [FieldPath<T>, string[]][]).forEach(([field, messages]) => {
    if (messages.length > 0) {
      setError(field, { message: messages[0] });
    }
  });
}
