import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import { prisma } from "./prisma";

declare module "@auth/sveltekit" {
	interface Session extends DefaultSession {
		user: {
			isAdmin: boolean;
		} & DefaultSession["user"];
	}
}

export const { handle, signIn } = SvelteKitAuth({
	trustHost: true,
	providers: [Google],
	callbacks: {
		async jwt({ token, user }) {
			if (user && user.email) {
				token.isAdmin = await isAdmin(user.email);
			}
			return token;
		},
		async session({ session, token }) {
			session.user.isAdmin = (token.isAdmin as boolean) || false;
			return session;
		}
	}
});

async function isAdmin(email: string): Promise<boolean> {
	return (
		(await prisma.Admin.findFirst({
			where: {
				email
			}
		})) !== null
	);
}
