import { PostSection } from "./post-section";
import { PostComments } from "./post-comments/post-comments";

export default async function Page({ params }: Pick<PageProps<"/articles/[id]">, "params">) {
	return (
		<>
			<PostSection params={params} />
			<PostComments params={params} />
		</>
	);
}
