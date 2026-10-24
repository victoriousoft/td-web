import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { Prisma, PrismaClient } from "../src/lib/generated/prisma/client";

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL as string) });

async function main() {
	await prisma.admin.upsert({
		where: { email: process.env.ADMIN_EMAIL },
		update: {},
		create: {
			email: process.env.ADMIN_EMAIL as string
		}
	});

	await prisma.save.create({
		data: {
			title: "Test save",
			userEmail: process.env.ADMIN_EMAIL as string,
			content: { foo: "bar" } as Prisma.JsonObject
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
