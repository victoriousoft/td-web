import { prisma } from "$lib/prisma";
import type { ServerLoad } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "./schema";

export const load: ServerLoad = async () => {
	const enemies = await prisma.enemy.findMany();

	const enemyMap = enemies.reduce((acc, enemy) => {
		acc.set(enemy.id, enemy);
		return acc;
	}, new Map<number, (typeof enemies)[0]>());

	const form = await superValidate(zod(schema));

	return { enemies, enemyMap, form };
};
