import { isApiError } from "./api-error";

export type FieldErrors = Record<string, string | string[]>;

export function getFieldErrors(error: unknown): FieldErrors | null {
	if (isApiError(error) && error.rawResponse?.errors) {
		return error.rawResponse.errors;
	}
	return null;
}
