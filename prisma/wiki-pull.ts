import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadCsv() {
	const response = await fetch(process.env.WIKI_URL as string);
	const file = await response.text();

	const lines = file.split("\n");
	const enemyLines: string[][] = [];

	for (const line of lines) {
		const items = line.split(",").slice(10);
		if (items.length > 0) enemyLines.push(items);
	}

	const keys = enemyLines.shift();

	const enemyData: Record<string, string>[] = enemyLines.map((line) => {
		const enemy: Record<string, string> = {};
		if (keys) {
			keys.forEach((key, index) => {
				enemy[key] = line[index];
			});
			return enemy;
		}
		return {};
	});

	return enemyData;
}
async function main() {
	if (!process.env.WIKI_URL) {
		throw new Error("WIKI_URL is not set");
	}

	const enemies = await loadCsv();

	const queries = enemies.map((enemy) => {
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

	await prisma.$transaction(queries);
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
