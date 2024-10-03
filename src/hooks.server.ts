import { sequence } from "@sveltejs/kit/hooks";
import { handle as googleHandle } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";

const setLocals: Handle = async ({ event, resolve }) => {
	const authSession = await event.locals.auth();

	if (authSession) {
		event.locals.user = authSession.user as { name: string; email: string; image: string };
	}

	return resolve(event);
};

export const handle = sequence(googleHandle, setLocals);
