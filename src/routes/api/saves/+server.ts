import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/prisma";
import { SaveGenerator } from "$lib/save-gen";

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		error(401, "Unauthorized");
	}

	const saveCount = await prisma.save.count({
		where: {
			userEmail: locals.user.email
		}
	});

	if (saveCount >= 5) {
		error(400, "Save limit reached");
	}

	const save = await prisma.save.create({
		data: {
			title: `New save ${saveCount + 1}`,
			userEmail: locals.user.email,
			content: SaveGenerator.generateEmptySave()
		}
	});

	return json(save.content);
};
