import { prisma } from "$lib/prisma";
import { fail, type Actions, type ServerLoad } from "@sveltejs/kit";
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

export const actions: Actions = {
	update: async (event) => {
		if (!event.locals.user?.isAdmin) {
			return fail(403, {
				title: "You shall not post",
				message: "You must be an admin to create a post"
			});
		}

		const form = await superValidate(event, zod(schema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await prisma.enemy.update({
			where: { id: form.data.id },
			data: {
				description: form.data.description,
				imageUrl: form.data.imageUrl,
				unlockLevel: form.data.unlockLevel
			}
		});

		return { form };
	}
} satisfies Actions;
