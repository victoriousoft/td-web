import { z } from "zod";

export const createPostSchema = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1).max(65535)
});

export type CreatePostSchema = typeof createPostSchema;
