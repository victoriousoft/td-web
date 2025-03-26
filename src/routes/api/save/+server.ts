import { error, json, type RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
import { SaveGenerator } from "$lib/save-gen";

export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.user) error(401, "Unauthorized");

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
			content: SaveGenerator.generateEmptySave() as any
		}
	});

	return json({
		id: save.id,
		content: save.content
	});
};

export const PATCH: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401, "Unauthorized");

	const { id: saveId, level, stars } = await request.json();

	console.log("PATCH", saveId, level, stars);
	if (saveId === undefined || level === undefined || stars === undefined) error(400, "Invalid request body");

	const save = await prisma.save.findFirst({
		where: {
			id: parseInt(String(saveId)),
			userEmail: locals.user.email
		}
	});

	if (!save) error(404, "Save not found");

	const saveContent = SaveGenerator.parseFromJson(save.content as string);
	if (!saveContent) error(400, "Invalid save content");

	const updatedSave = SaveGenerator.passLevel(saveContent, level, stars);

	await prisma.save.update({
		where: {
			id: parseInt(String(saveId)),
			userEmail: locals.user.email
		},
		data: {
			content: updatedSave as any
		}
	});

	return new Response(null, { status: 204 });
};
