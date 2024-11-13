import { prisma } from "$lib/prisma";
import type { PageServerLoad } from "../../admin/post/$types";

export const load: PageServerLoad = async ({ locals }) => {
	let saves = [];

	if (locals.user) {
		saves = await prisma.save.findMany({
			where: {
				userEmail: locals.user.email
			},
			orderBy: {
				createdAt: "desc"
			}
		});
	}

	return {
		saves: saves
	};
};
