import { prisma } from "$lib/prisma";
import type { PageServerLoad } from "../../admin/post/$types";

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
