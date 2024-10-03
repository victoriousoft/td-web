import { sequence } from "@sveltejs/kit/hooks";
import { handle as googleHandle } from "$lib/auth";

export const handle = sequence(googleHandle);
