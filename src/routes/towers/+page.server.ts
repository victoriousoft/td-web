import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const res = await fetch("http://minio.kristn.co.uk:9000/ratartd-models");
	const data = await res.text();

	const towerKeys = data
		.split("<Key>")
		.slice(1)
		.map((x) => x.split("</Key>")[0]);

	const towersMap = towerKeys.reduce<Record<string, string>>((acc, key) => {
		let readableName = key
			.replace(/\.\w+$/, "")
			.replace(/[_-]/g, " ")
			.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

		readableName = readableName.replace(/Archers (\d+)/i, (match, level) => `Archers ${parseInt(level) + 1}`);

		acc[readableName] = key;
		return acc;
	}, {});

	return { towers: towersMap };
};
