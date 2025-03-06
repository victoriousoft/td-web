import { prisma } from "$lib/prisma";
import { superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { createPostSchema } from "./schema";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		posts: await prisma.post.findMany({
			orderBy: { createdAt: "desc" }
		}),
		form: await superValidate(zod(createPostSchema))
	};
};

export const actions: Actions = {
	createPost: async (event) => {
		if (!event.locals.user?.isAdmin) {
			return fail(403, {
				title: "You shall not post",
				message: "You must be an admin to create a post"
			});
		}

		const form = await superValidate(event, zod(createPostSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await prisma.post.create({
			data: {
				title: form.data.title,
				content: form.data.content
			}
		});

		return { form };
	},
	deletePost: async (event) => {
		if (!event.locals.user?.isAdmin) {
			return fail(403, {
				title: "You shall not pass",
				message: "You must be an admin to delete a post"
			});
		}

		const id = (await event.request.formData()).get("id") as string | null;

		if (!id || isNaN(parseInt(id))) {
			return fail(400, {
				title: "Invalid ID",
				message: "Invalid post ID"
			});
		}

		await prisma.post.delete({
			where: { id: parseInt(id) }
		});
	}
};
