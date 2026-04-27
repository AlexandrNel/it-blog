import type {
	ProfileConnectionKind,
	ProfileConnectionsPage,
	ProfileConnectionsSummary,
	ProfileConnectionUser,
} from "../model/profile";

const MOCK_DELAY_MS = 350;

const mockUsers: ProfileConnectionUser[] = [
	{
		id: "u-1",
		username: "annadev",
		displayName: "Anna Petrova",
		avatar: "",
	},
	{
		id: "u-2",
		username: "maxcode",
		displayName: "Maxim Sidorov",
		avatar: "",
	},
	{
		id: "u-3",
		username: "frontendfox",
		displayName: "Polina",
		avatar: "",
	},
	{
		id: "u-4",
		username: "nodewave",
		displayName: "Kirill Smirnov",
		avatar: "",
	},
	{
		id: "u-5",
		username: "nextwizard",
		displayName: "",
		avatar: "",
	},
	{
		id: "u-6",
		username: "tslover",
		displayName: "Elena Volkova",
		avatar: "",
	},
	{
		id: "u-7",
		username: "pixelcraft",
		displayName: "Artem",
		avatar: "",
	},
	{
		id: "u-8",
		username: "reactflow",
		displayName: "Daria Belova",
		avatar: "",
	},
	{
		id: "u-9",
		username: "solidbranch",
		displayName: "",
		avatar: "",
	},
	{
		id: "u-10",
		username: "cachemiss",
		displayName: "Roman",
		avatar: "",
	},
	{
		id: "u-11",
		username: "bytegarden",
		displayName: "Masha Ivanova",
		avatar: "",
	},
	{
		id: "u-12",
		username: "buildship",
		displayName: "",
		avatar: "",
	},
	{
		id: "u-13",
		username: "queryloop",
		displayName: "Nikita",
		avatar: "",
	},
	{
		id: "u-14",
		username: "darkcommit",
		displayName: "Alexey",
		avatar: "",
	},
	{
		id: "u-15",
		username: "csspilot",
		displayName: "",
		avatar: "",
	},
];

const buildConnections = (indexes: number[]) => indexes.map((index) => mockUsers[index]);

const profileConnections: Record<string, Record<ProfileConnectionKind, ProfileConnectionUser[]>> = {
	default: {
		followers: buildConnections([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
		following: buildConnections([3, 5, 7, 9, 12, 13, 14]),
	},
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getConnectionsByUserId = (userId: string, type: ProfileConnectionKind) =>
	profileConnections[userId]?.[type] ?? profileConnections.default[type];

export const getMockProfileConnections = async ({
	userId,
	type,
	page,
	limit,
}: {
	userId: string;
	type: ProfileConnectionKind;
	page: number;
	limit: number;
}): Promise<ProfileConnectionsPage> => {
	await wait(MOCK_DELAY_MS);

	const items = getConnectionsByUserId(userId, type);
	const start = (page - 1) * limit;
	const end = start + limit;
	const users = items.slice(start, end);
	const nextPage = end < items.length ? page + 1 : null;

	return {
		users,
		nextPage,
		total: items.length,
	};
};

export const getMockProfileConnectionsSummary = async (
	userId: string,
): Promise<ProfileConnectionsSummary> => {
	await wait(MOCK_DELAY_MS);

	return {
		followers: getConnectionsByUserId(userId, "followers").length,
		following: getConnectionsByUserId(userId, "following").length,
	};
};
