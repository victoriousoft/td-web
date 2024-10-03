import { sequence } from "@sveltejs/kit/hooks";
import { handle as googleHandle } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";

async function isAdmin(email: string): Promise<boolean> {
	return (
		prisma.Admin.findFirst({
			where: {
				email
			}
		}) !== null
	);
}

const setLocals: Handle = async ({ event, resolve }) => {
	const authSession = await event.locals.auth();

	if (authSession?.user?.name && authSession?.user?.email && authSession?.user?.image) {
		event.locals.user = {
			name: authSession.user.name,
			email: authSession.user.email,
			image: authSession.user.image,
			isAdmin: await isAdmin(authSession.user.email)
		};
	}

	return resolve(event);
};

export const handle = sequence(googleHandle, setLocals);
