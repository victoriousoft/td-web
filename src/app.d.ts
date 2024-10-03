// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				email: string;
				image: string;
				isAdmin: boolean;
			} | null;
		}
		interface PageData {
			user: {
				name: string;
				email: string;
				image: string;
				isAdmin: boolean;
			} | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
