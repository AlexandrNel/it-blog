import { getTagForCache } from "@/entities/article/model/getTagForCache";
import { auth } from "@/entities/auth";
import { serverSafeFetch } from "@/shared/api/server";
import { getHeadersWithCookies } from "@/shared/lib/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function POST(_: Request, ctx: RouteContext<"/api/posts/[id]/revalidate">) {
	const cookie = await cookies();
	const { isAuthenticated } = await auth(cookie);
	const headers = getHeadersWithCookies(cookie);
	const { id } = await ctx.params;
	if (!isAuthenticated) return new Response("Unauthorized", { status: 401 });
	const { data } = await serverSafeFetch<{ canEdit: boolean }>(`/posts/${id}/can-edit`, {
		headers,
	});
	if (data?.canEdit) {
		revalidateTag(getTagForCache(id), "max");
		return Response.json({ success: true });
	}
	return new Response(undefined, { status: 403 });
}
