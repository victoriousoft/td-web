import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "$lib/generated/prisma/client";

let client: PrismaClient | undefined;

function createClient() {
	const connectionString = process.env.DATABASE_URL;

	if (!connectionString) {
		throw new Error("DATABASE_URL is not set");
	}

	return new PrismaClient({ adapter: new PrismaMariaDb(connectionString) });
}

// Instantiate lazily so importing this module (for example during the
// SvelteKit build analysis) does not require a database connection.
export const prisma = new Proxy({} as PrismaClient, {
	get(_target, property) {
		const instance = (client ??= createClient());
		const value = Reflect.get(instance, property, instance);
		return typeof value === "function" ? value.bind(instance) : value;
	}
});
