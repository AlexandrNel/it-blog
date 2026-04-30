import { CheckAuthButton } from "@/features/auth/check-auth/ui/check-auth-button";
import { Card } from "@/shared/ui/card";
import { Child } from "./child";

export default function Page() {
	return (
		<div className="flex grow justify-center items-center">
			<Card className="w-[700px] h-screen">
				<CheckAuthButton>
					<Child />
				</CheckAuthButton>
			</Card>
		</div>
	);
}
