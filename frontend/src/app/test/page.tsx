import { CheckAuthButton } from "@/features/auth/check-auth/ui/check-auth-button";
import { Card } from "@/shared/ui/card";
import { Child } from "./child";
import { Column, Row } from "@/shared/ui/layout";
export default async function Page() {
	return (
		<div className="flex grow justify-center items-center">
			<Card className="w-full">
				<Column>
					<Row>
						<CheckAuthButton>
							<Child />
						</CheckAuthButton>
					</Row>
				</Column>
			</Card>
		</div>
	);
}
