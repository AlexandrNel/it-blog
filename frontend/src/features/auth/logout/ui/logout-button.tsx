import { Button } from "@/shared/ui/button";
import { useAuthStore } from "@/entities/auth";

export const LogoutButton = () => {
	const { logout } = useAuthStore();
	const handleClick = () => {
		if (window.confirm("Вы уверены, что хотите выйти?")) {
			logout();
		}
	};
	return <Button onClick={handleClick}>Выйти</Button>;
};
