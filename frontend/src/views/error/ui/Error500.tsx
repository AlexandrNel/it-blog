import { ErrorTemplate } from "./ErrorTemplate";
import { SupportButton } from "./SupportButton";
import { isAxiosError } from "axios";
import type { ErrorInfo } from "next/error";

export function Error500({ error }: ErrorInfo) {
  return (
    <ErrorTemplate
      code={isAxiosError(error) ? error.response?.status : undefined}
      title="Сервис недоступен"
      text={[
        "Сервис временно недоступен. Мы уже в курсе и исправляем ошибку.",
        "Обновите страницу через несколько минут. Если проблема не решится, обратитесь в поддержку.",
      ]}
      footer={<SupportButton href="https://t.me/Anonimchk">Написать в поддержку</SupportButton>}
    />
  );
}
