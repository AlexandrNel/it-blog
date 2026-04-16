/**
 *
 * @param  value
 * @returns `post:slug:${value}`
 */
export const getTagForCache = (value: string) => {
	return `post:slug:${value}`;
};
