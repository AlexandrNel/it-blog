import { getTagForCache } from "@/entities/article/model/getTagForCache";
import { auth } from "@/features/auth";
import { serverSafeFetchWithCookies } from "@/shared/api/server";
import { revalidateTag } from "next/cache";

export async function POST(_: Request, ctx: RouteContext<"/api/posts/[id]/revalidate">) {
	const { isAuthenticated } = await auth();
	const { id } = await ctx.params;
	if (!isAuthenticated) return new Response("Unauthorized", { status: 401 });
	const { data } = await serverSafeFetchWithCookies<{ canEdit: boolean }>(`/posts/${id}/can-edit`);
	if (data?.canEdit) {
		revalidateTag(getTagForCache(id), "max");
		return Response.json({ success: true });
	}
	return new Response(undefined, { status: 403 });
}
