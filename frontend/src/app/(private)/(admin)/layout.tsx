import { Protect } from "@/features/auth";

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<Protect redirectTo="/login" permittedRoles={["ADMIN"]}>
			{children}
		</Protect>
	);
}
