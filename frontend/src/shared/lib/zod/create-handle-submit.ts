import { type UseFormSetError, type FieldValues } from "react-hook-form";
import { applyApiFieldErrors } from "./apply-api-field-errors";

export function createHandleSubmit<T extends FieldValues, Response = unknown>(
  setError: UseFormSetError<T>,
  callback: (values: T) => Promise<Response>,
) {
  return async (values: T) => {
    try {
      await callback(values);
    } catch (error) {
      applyApiFieldErrors<T>(error, setError);
    }
  };
}
