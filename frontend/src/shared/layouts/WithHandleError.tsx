import { type BaseProps } from "../types/components";
import { ApiError } from "../lib/api/api-error";
import { notFound } from "next/navigation";
import { type JSX, type ReactNode } from "react";

// type ReactNodeWithProps = ReactNode & {
//   props: { error: ApiError };
// };

interface Props extends BaseProps {
  error: unknown;
  notFoundOn404?: boolean;
  serverErrorUI?: ReactNode;
  validationErrorUI?: ReactNode;
  unknownErrorUI?: ReactNode;
}
// TODO переписать, оставить children и fallback

function ErrorHandler({
  error,
  serverErrorUI,
  validationErrorUI,
  unknownErrorUI,
  notFoundOn404 = false,
}: Props) {
  if (error instanceof ApiError) {
    if (error.status === 404 && notFoundOn404) {
      notFound();
    }
    if (error.status >= 400 && error.status < 500) {
      return (
        validationErrorUI || (
          <div className="error-container">
            <h2>Не удалось загрузить статью</h2>
            <p>{error.message || "Проверьте данные и попробуйте позже"}</p>
          </div>
        )
      );
    }
    return (
      serverErrorUI || (
        <div className="error-container">
          <h2>Что-то пошло не так на сервере</h2>
          <p>Код ошибки: {error.status}</p>
          {error.message && <p>{error.message}</p>}
          <p>Попробуйте обновить страницу позже</p>
        </div>
      )
    );
  }
  return (
    unknownErrorUI || (
      <div className="error-container">
        <h2>Неизвестная ошибка</h2>
        <p>{(error as Error).message}</p>
        <p>Попробуйте обновить страницу позже</p>
      </div>
    )
  );
}

export function WithErrorHandling({
  children,
  notFoundOn404,
  serverErrorUI,
  validationErrorUI,
  unknownErrorUI,
}: {
  children: () => Promise<JSX.Element>;
} & Omit<Props, "error" | "children">) {
  return async function ErrorHandled() {
    try {
      return await children();
    } catch (error) {
      return (
        <ErrorHandler
          notFoundOn404={notFoundOn404}
          error={error}
          serverErrorUI={serverErrorUI}
          validationErrorUI={validationErrorUI}
          unknownErrorUI={unknownErrorUI}
        />
      );
    }
  };
}
