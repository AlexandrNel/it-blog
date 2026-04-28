"use client";

import { EditorPreviewImage } from "@/features/article/article-create/components/editor-preview-image/ui/editor-preview-image";
import { formatDate } from "@/shared/lib/utils/date/format-date";
import { Card } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@base-ui/react";
import { Suspense } from "react";

export default function Page() {
	return (
		<div className="flex grow justify-center items-center">
			<Card className="w-[700px] h-screen">
				<EditorPreviewImage />
			</Card>
		</div>
	);
}
