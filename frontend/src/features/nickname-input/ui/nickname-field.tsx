"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Row } from "@/shared/ui/layout";
import { Dices } from "lucide-react";
import { type ChangeEvent, useState, type InputHTMLAttributes } from "react";
import { useCheckNickname, useGenerateNickname } from "../model/nickname-queries";
import { useDebounce } from "@uidotdev/usehooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	onSuccessGenerate?: (data: { username: string }) => void;
	onSuccessCheck?: (data: { isAvailable: boolean }) => void;
	onErrorCheck?: (error: unknown) => void;
	email?: string;
};

export const NicknameField = ({
	value = "",
	onErrorCheck,
	onSuccessCheck,
	onSuccessGenerate,
	onChange,
	...props
}: Props) => {
	const debounced = useDebounce(String(value), 300);
	const [hasInteracted, setHasInteracted] = useState(false);

	const { error } = useCheckNickname({
		enabled: hasInteracted,
		username: debounced,
		onError: onErrorCheck,
		onSuccess: onSuccessCheck,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!hasInteracted) setHasInteracted(true);
		onChange?.(e);
	};
	const generate = useGenerateNickname({
		onSuccess: onSuccessGenerate,
	});

	return (
		<Row>
			<Input aria-invalid={!!error} value={value} onChange={handleChange} {...props} />
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant={"outline"}
						disabled={generate.isPending}
						onClick={() => generate.mutate()}
						type="button"
						size={"icon-lg"}
					>
						<Dices className="text-foreground" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Сгенерировать никнейм</TooltipContent>
			</Tooltip>
		</Row>
	);
};
