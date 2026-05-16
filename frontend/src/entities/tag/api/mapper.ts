import type { TagDto } from "./types";

export function mapTags(dto: TagDto[]): string[] {
	return dto.map((t) => t.name);
}
