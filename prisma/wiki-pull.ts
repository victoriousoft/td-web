import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadCsv(): Promise<{
	enemyData: Record<string, string>[];
	towerData: Record<string, string>[];
}> {
	const response = await fetch(process.env.WIKI_URL as string);
	const file = await response.text();

	const lines = file.split("\n");
	const enemyLines: string[][] = [];

	for (const line of lines) {
		const items = line.split(",").slice(10);
		if (items.length > 0) enemyLines.push(items);
	}

	const towerLines: string[][] = [];
	for (const line of lines.slice(0, -1)) {
		const items = line.split(",").slice(0, 9);
		if (items.length > 0) towerLines.push(items);
	}

	const enemyKeys = enemyLines.shift();

	const enemyData: Record<string, string>[] = enemyLines.map((line) => {
		const enemy: Record<string, string> = {};
		if (enemyKeys) {
			enemyKeys.forEach((key, index) => {
				enemy[key] = line[index];
			});
			return enemy;
		}
		return {};
	});

	const towerKeys = towerLines.shift();

	const towerData: Record<string, string>[] = towerLines.map((line) => {
		const tower: Record<string, string> = {};
		if (towerKeys) {
			towerKeys.forEach((key, index) => {
				tower[key.toLowerCase()] = line[index];
			});
			return tower;
		}
		return {};
	});

	return { enemyData, towerData };
}

async function main() {
	if (!process.env.WIKI_URL) {
		throw new Error("WIKI_URL is not set");
	}

	const data = await loadCsv();

	const enemyQueries = data.enemyData.map((enemy) => {
		return prisma.enemy.upsert({
			where: { name: enemy.name },
			update: {
				health: parseInt(enemy.maxHealth),
				damage: parseInt(enemy.damage),
				physicalResistance: parseInt(enemy.physicalResistance),
				magicalResistance: parseInt(enemy.magicalResistance),
				playerLives: parseInt(enemy.playerLives)
			},
			create: {
				name: enemy.name,
				description: "",
				imageUrl: "",
				health: parseInt(enemy.maxHealth),
				damage: parseInt(enemy.damage),
				physicalResistance: parseInt(enemy.physicalResistance),
				magicalResistance: parseInt(enemy.magicalResistance),
				playerLives: parseInt(enemy.playerLives)
			}
		});
	});

	await prisma.$transaction(enemyQueries);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
