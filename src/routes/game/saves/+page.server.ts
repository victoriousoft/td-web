import { prisma } from "$lib/prisma";
import { fileProxy, setError, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "../../admin/post/$types";
import { zod } from "sveltekit-superforms/adapters";
import { saveSchema } from "./schema";
import { fail, type Actions } from "@sveltejs/kit";
import { updated } from "$app/stores";

export const load: PageServerLoad = async ({ locals }) => {
	let saves = [];

	if (locals.user) {
		saves = await prisma.save.findMany({
			where: {
				userEmail: locals.user.email
			},
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				updatedAt: true
			},
			orderBy: {
				updatedAt: "desc"
			}
		});
	}

	return {
		saves: saves,
		form: await superValidate(zod(saveSchema))
	};
};

export const actions: Actions = {
	updateSave: async (event) => {
		const form = await superValidate(event, zod(saveSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (!event.locals.user) {
			return setError(form, "title", "You must be logged in to update a save");
		}

		const saveExists =
			(await prisma.save.findFirst({
				where: {
					id: form.data.id,
					userEmail: event.locals.user.email
				}
			})) !== null;

		if (!saveExists) {
			return setError(form, "title", "Save not found");
		}

		await prisma.save.update({
			where: {
				id: form.data.id
			},
			data: {
				title: form.data.title,
				content: JSON.parse(form.data.content)
			}
		});

		return { form };
	}
};
