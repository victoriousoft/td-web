import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { prisma } from "$lib/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user?.isAdmin) {
		redirect(302, "/");
	}

	const saves = await prisma.save.findMany({
		where: {
			userEmail: locals.user.email
		},
		select: {
			id: true,
			title: true,
			updatedAt: true,
			content: true
		},
		orderBy: {
			updatedAt: "desc"
		}
	});

	return {
		saves,
		savesContentMap: new Map(saves.map((save) => [save.id, save.content]))
	};
};
