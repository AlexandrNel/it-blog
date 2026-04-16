import type React from "react";
import { ErrorTemplate } from "./ErrorTemplate";
import type { ApiErrorProps } from "@/views/error";
import { SupportButton } from "./SupportButton";

interface Props extends ApiErrorProps {
	className?: string;
}

export const Error500: React.FC<Props> = ({ error }) => {
	return (
		<ErrorTemplate
			code={error.status}
			title="Сервис недоступен"
			text={[
				"Сервис временно недоступен. Мы уже в курсе и исправляем ошибку.",
				"Обновите страницу через несколько минут. Если проблема не решится, обратитесь в поддержку.",
			]}
			footer={<SupportButton href="https://t.me/Anonimchk">Написать в поддержку</SupportButton>}
		/>
	);
};
