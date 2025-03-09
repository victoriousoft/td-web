import { z } from "zod";

export const schema = z.object({
	id: z.number().int(),
	description: z.string().nonempty().max(255),
	imageUrl: z.string().nonempty().url(),
	unlockLevel: z.number().int()
});

export type Schema = typeof schema;
