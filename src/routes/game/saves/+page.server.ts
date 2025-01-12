import { prisma } from "$lib/prisma";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getUnauthorizedFail } from "$lib/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		let saves = await prisma.save.findMany({
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

		return {
			saves
		};
	}

	return {
		saves: []
	};
};

export const actions = {
	async deleteSave({ locals, request }) {
		if (!locals.user) return getUnauthorizedFail();

		const id = (await request.formData()).get("id");

		if (!id || isNaN(+id)) {
			return fail(400, { title: "Bad Request", message: "Invalid save ID." });
		}

		const save = await prisma.save.delete({
			where: {
				id: +id,
				userEmail: locals.user.email
			}
		});

		if (!save) {
			return fail(404, { title: "Not Found", message: "Save not found." });
		}

		return {
			save
		};
	},

	async renameSave({ locals, request }) {
		if (!locals.user) return getUnauthorizedFail();

		const formData = await request.formData();
		const saveId = formData.get("id");
		const title = formData.get("title");

		if (!saveId || isNaN(+saveId)) {
			return fail(400, { title: "Bad Request", message: "Invalid save ID." });
		}

		if (!title || typeof title !== "string" || title.trim() === "" || title.length > 255) {
			return fail(400, { title: "Bad Request", message: "Invalid title." });
		}

		const save = await prisma.save.update({
			where: {
				id: +saveId,
				userEmail: locals.user.email
			},
			data: {
				title: title.trim()
			},
			select: {
				title: true
			}
		});

		if (!save) {
			return fail(404, { title: "Not Found", message: "Save not found." });
		}

		return {
			save
		};
	}
} satisfies Actions;
