import { prisma } from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const latestPosts = await prisma.post.findMany({
		orderBy: { createdAt: "desc" },
		select: {
			title: true,
			content: true,
			createdAt: true
		},
		take: 5
	});

	return {
		latestPosts: latestPosts
	};
};
