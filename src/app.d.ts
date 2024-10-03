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
			};
		}
		interface PageData {
			user: {
				name: string;
				email: string;
				image: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
