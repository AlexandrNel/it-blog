import { ErrorTemplate } from "./ErrorTemplate";
import { SupportButton } from "./SupportButton";

export const UnknownError = () => {
	return (
		<ErrorTemplate
			title={"Неизвестная ошибка"}
			text={[
				"Произиошла неизвестная ошибка, мы уже в курсе и работаем над ее исправлением",
				"Обновите страницу через несколько минут. Если проблема не решится, обратитесь в поддержку",
			]}
			footer={<SupportButton href="https://t.me/Anonimchk">Написать в поддержку</SupportButton>}
		/>
	);
};
