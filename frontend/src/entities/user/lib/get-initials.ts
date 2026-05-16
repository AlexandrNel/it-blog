export function getInitials(name: string) {
	if (!name) return "N";
	const parts = name
		.replace(/([a-z])([A-Z])/g, `$1 $2`)
		.split(/[\s-]+/)
		.filter(Boolean);
	const first = parts[0]?.[0] || "";
	const second = parts[1]?.[0] || "";
	return (first + second).toUpperCase();
}
