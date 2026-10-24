import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
		seed: "tsx prisma/seed.ts"
	},
	// DATABASE_URL is intentionally optional so commands like `prisma generate`
	// work during builds where no database is available.
	...(databaseUrl ? { datasource: { url: databaseUrl } } : {})
});
