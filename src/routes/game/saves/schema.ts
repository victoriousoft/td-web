import { z } from "zod";

export const saveSchema = z.object({
	id: z.number().int(),
	title: z.string().min(3).max(191),
	content: z.string().refine(
		(val) => {
			try {
				JSON.parse(val);
				return true;
			} catch {
				return false;
			}
		},
		{
			message: "Content must be a valid JSON string."
		}
	)
});

export type SaveSchema = typeof saveSchema;
