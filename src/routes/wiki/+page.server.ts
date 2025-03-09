import { prisma } from "$lib/prisma";
import { SaveGenerator } from "$lib/save-gen";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
	const enemies = await prisma.enemy.findMany({
		orderBy: { unlockLevel: "asc" }
	});

	let highestUnlockedLevel = 0;

	if (locals.user) {
		const playerLevels = await prisma.save.findMany({
			where: { userEmail: locals.user?.email },
			select: { content: true }
		});

		highestUnlockedLevel = playerLevels.reduce((acc, save) => {
			const parsedLevel = SaveGenerator.parseFromJson(save.content);
			if (!parsedLevel) return acc;
			return Math.max(acc, SaveGenerator.getHighestUnlockedLevel(parsedLevel));
		}, 0);
	}

	return { enemies, highestUnlockedLevel };
};
