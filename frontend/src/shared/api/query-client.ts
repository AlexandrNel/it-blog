import {
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { type ErrorMessage, ErrorUtils } from "./error-utils";
import { ERROR_CODES } from "./validation/api-error";

interface AppQueryMeta extends Record<string, unknown> {
  skipGlobalErrorToast?: boolean;
  skipGlobalValidationToast?: boolean;
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: AppQueryMeta;
    queryMeta: AppQueryMeta;
  }
}

const SERVER_BAD_VALIDATION_CODE = ERROR_CODES.VALIDATION_FAILED;

function handleValidationError(error: ErrorMessage, meta?: AppQueryMeta): boolean {
  if (error.code !== SERVER_BAD_VALIDATION_CODE) {
    return false;
  }
  if (meta?.skipGlobalValidationToast) return true;

  toast.error(error.message);
  return true;
}

function handleGlobalError(error: ErrorMessage, meta?: AppQueryMeta): void {
  if (meta?.skipGlobalErrorToast) return;

  toast.error(error.message);
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
        shouldRedactErrors: () => {
          return false;
        },
      },
    },

    queryCache: new QueryCache({
      onError(error, query) {
        const err = ErrorUtils.getErrors(error);

        if (handleValidationError(err, query.meta)) return;

        handleGlobalError(err, query.meta);
      },
    }),
    mutationCache: new MutationCache({
      onError(error, _v, _m, mutation) {
        const err = ErrorUtils.getErrors(error);

        if (handleValidationError(err, mutation.meta)) return;

        handleGlobalError(err, mutation.meta);
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const queryClient = getQueryClient();
