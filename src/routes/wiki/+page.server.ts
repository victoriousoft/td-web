import { prisma } from "$lib/prisma";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () => {
	const enemies = await prisma.enemy.findMany();

	return { enemies };
};
