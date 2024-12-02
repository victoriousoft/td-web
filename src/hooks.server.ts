import { sequence } from "@sveltejs/kit/hooks";
import { handle as googleHandle } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";

const setLocals: Handle = async ({ event, resolve }) => {
	const authSession = await event.locals.auth();

	if (authSession?.user?.name && authSession?.user?.email && authSession?.user?.image) {
		// @ts-ignore
		event.locals.user = authSession.user;
	}

	return resolve(event);
};

export const handle = sequence(googleHandle, setLocals);
