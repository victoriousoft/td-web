import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
export const { handle, signIn } = SvelteKitAuth({
	trustHost: true,
	providers: [Google]
});
